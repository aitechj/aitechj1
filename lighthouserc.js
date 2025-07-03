module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000', 'http://localhost:3000/dashboard', 'http://localhost:3000/admin', 'http://localhost:3000/profile'],
      numberOfRuns: 3,
      staticDistDir: '.next',
      settings: {
        chromeFlags: '--no-sandbox --disable-dev-shm-usage --disable-gpu --headless --disable-web-security --disable-features=VizDisplayCompositor',
        preset: 'desktop',
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 3000 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
        'speed-index': ['error', { maxNumericValue: 3000 }],
        
        'resource-summary:script:size': ['error', { maxNumericValue: 500000 }],
        'resource-summary:total:size': ['error', { maxNumericValue: 2000000 }],
        'unused-css-rules': ['error', { maxNumericValue: 50000 }],
        'unused-javascript': ['error', { maxNumericValue: 100000 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
