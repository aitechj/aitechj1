module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000', 'http://localhost:3000/dashboard', 'http://localhost:3000/admin', 'http://localhost:3000/profile'],
      numberOfRuns: 3,
      staticDistDir: '.next',
      settings: {
        chromeFlags: '--no-sandbox --disable-dev-shm-usage --disable-gpu',
        preset: 'desktop',
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.6 }],
        'categories:accessibility': ['error', { minScore: 0.7 }],
        'categories:best-practices': ['error', { minScore: 0.7 }],
        'categories:seo': ['error', { minScore: 0.8 }],
        
        'first-contentful-paint': ['error', { maxNumericValue: 3000 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 4000 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.2 }],
        'total-blocking-time': ['error', { maxNumericValue: 500 }],
        'speed-index': ['error', { maxNumericValue: 4000 }],
        
        'resource-summary:script:size': ['error', { maxNumericValue: 800000 }],
        'resource-summary:total:size': ['error', { maxNumericValue: 3000000 }],
        
        'color-contrast': 'off',
        'csp-xss': 'off',
        'errors-in-console': 'off',
        'heading-order': 'off',
        'installable-manifest': 'off',
        'maskable-icon': 'off',
        'service-worker': 'off',
        'splash-screen': 'off',
        'themed-omnibox': 'off',
        'uses-rel-preconnect': 'off',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
