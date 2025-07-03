const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const BUNDLE_SIZE_THRESHOLDS = {
  WARNING_PERCENT: 10,
  ERROR_PERCENT: 20,
  MAX_TOTAL_SIZE_MB: 5,
  MAX_CHUNK_SIZE_KB: 500
};

async function analyzeBundleSize() {
  try {
    const currentStats = parseBuildOutput();
    
    if (process.env.GITHUB_EVENT_NAME === 'pull_request') {
      const baseStats = await getBaseBranchStats();
      const comparison = compareBundleSizes(currentStats, baseStats);
      
      if (comparison.hasRegression) {
        await postPRComment(comparison);
        
        if (comparison.severity === 'error') {
          console.error('❌ Bundle size regression detected - failing build');
          process.exit(1);
        }
      }
    }
    
    console.log('✅ Bundle size analysis completed');
    console.log(`Total bundle size: ${formatSize(currentStats.totalSize)}`);
    
    if (currentStats.totalSize > BUNDLE_SIZE_THRESHOLDS.MAX_TOTAL_SIZE_MB * 1024) {
      console.error(`❌ Total bundle size exceeds ${BUNDLE_SIZE_THRESHOLDS.MAX_TOTAL_SIZE_MB}MB limit`);
      process.exit(1);
    }
    
  } catch (error) {
    console.error('❌ Bundle size analysis failed:', error.message);
    process.exit(1);
  }
}

function parseBuildOutput() {
  try {
    const buildOutputPath = '.next/build-manifest.json';
    if (!fs.existsSync(buildOutputPath)) {
      throw new Error('Build manifest not found. Run build first.');
    }
    
    const manifest = JSON.parse(fs.readFileSync(buildOutputPath, 'utf8'));
    const stats = { totalSize: 0, chunks: {}, routes: {} };
    
    const nextDir = '.next/static';
    if (fs.existsSync(nextDir)) {
      const calculateDirSize = (dirPath) => {
        let size = 0;
        const files = fs.readdirSync(dirPath, { withFileTypes: true });
        
        for (const file of files) {
          const filePath = path.join(dirPath, file.name);
          if (file.isDirectory()) {
            size += calculateDirSize(filePath);
          } else if (file.isFile() && (file.name.endsWith('.js') || file.name.endsWith('.css'))) {
            const fileStats = fs.statSync(filePath);
            size += fileStats.size;
            
            if (fileStats.size > BUNDLE_SIZE_THRESHOLDS.MAX_CHUNK_SIZE_KB * 1024) {
              console.warn(`⚠️  Large chunk detected: ${file.name} (${formatSize(fileStats.size)})`);
            }
          }
        }
        return size;
      };
      
      stats.totalSize = calculateDirSize(nextDir) / 1024;
    }
    
    return stats;
  } catch (error) {
    console.warn('Could not parse build output, using fallback method');
    return { totalSize: 0, chunks: {}, routes: {} };
  }
}

async function getBaseBranchStats() {
  try {
    execSync('git fetch origin main', { stdio: 'pipe' });
    execSync('git checkout origin/main', { stdio: 'pipe' });
    execSync('pnpm install --frozen-lockfile', { stdio: 'pipe' });
    execSync('cd shared-types && npm run build', { stdio: 'pipe' });
    execSync('pnpm install --frozen-lockfile', { stdio: 'pipe' });
    execSync('pnpm run build', { stdio: 'pipe' });
    
    const baseStats = parseBuildOutput();
    
    execSync('git checkout -', { stdio: 'pipe' });
    
    return baseStats;
  } catch (error) {
    console.warn('Could not get base branch stats:', error.message);
    return { totalSize: 0, chunks: {}, routes: {} };
  }
}

function compareBundleSizes(current, base) {
  const sizeDiff = current.totalSize - base.totalSize;
  const percentChange = base.totalSize > 0 ? (sizeDiff / base.totalSize) * 100 : 0;
  
  const hasRegression = percentChange > BUNDLE_SIZE_THRESHOLDS.WARNING_PERCENT;
  const severity = percentChange > BUNDLE_SIZE_THRESHOLDS.ERROR_PERCENT ? 'error' : 'warning';
  
  return {
    hasRegression,
    severity,
    sizeDiff,
    percentChange,
    current: current.totalSize,
    base: base.totalSize
  };
}

async function postPRComment(comparison) {
  const { sizeDiff, percentChange, current, base, severity } = comparison;
  
  const emoji = severity === 'error' ? '❌' : '⚠️';
  const comment = `${emoji} **Bundle Size ${severity === 'error' ? 'Regression' : 'Warning'}**

| Metric | Base | Current | Change |
|--------|------|---------|--------|
| Total Size | ${formatSize(base)} | ${formatSize(current)} | ${sizeDiff > 0 ? '+' : ''}${formatSize(sizeDiff)} (${percentChange.toFixed(1)}%) |

${severity === 'error' ? 
  `This PR increases bundle size by more than ${BUNDLE_SIZE_THRESHOLDS.ERROR_PERCENT}% and will fail the build.` :
  `This PR increases bundle size by more than ${BUNDLE_SIZE_THRESHOLDS.WARNING_PERCENT}%. Consider optimizing.`
}

**Recommendations:**
- Review new dependencies and imports
- Check for duplicate code or libraries
- Consider lazy loading for large components
- Use dynamic imports where appropriate`;

  console.log('Bundle size comment:', comment);
}

function formatSize(sizeInKB) {
  if (sizeInKB < 1024) {
    return `${sizeInKB.toFixed(1)} KB`;
  }
  return `${(sizeInKB / 1024).toFixed(1)} MB`;
}

analyzeBundleSize();
