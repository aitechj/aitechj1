import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@/components'],
  },
  
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -10,
            chunks: 'all',
            reuseExistingChunk: true,
          },
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react',
            priority: 20,
            chunks: 'all',
            reuseExistingChunk: true,
          },
          common: {
            test: /[\\/]src[\\/]components[\\/](Navigation|auth)[\\/]/,
            name: 'common',
            priority: 15,
            chunks: 'all',
            enforce: true,
            reuseExistingChunk: true,
          },
          admin: {
            test: /[\\/]src[\\/]components[\\/]admin[\\/]/,
            name: 'admin',
            priority: 10,
            chunks: 'all',
            enforce: true,
            reuseExistingChunk: true,
          },
          dashboard: {
            test: /[\\/]src[\\/]components[\\/]dashboard[\\/]/,
            name: 'dashboard', 
            priority: 10,
            chunks: 'all',
            enforce: true,
            reuseExistingChunk: true,
          },
          profile: {
            test: /[\\/]src[\\/]components[\\/]profile[\\/]/,
            name: 'profile',
            priority: 10,
            chunks: 'all',
            enforce: true,
            reuseExistingChunk: true,
          },
          utils: {
            test: /[\\/]src[\\/]utils[\\/]/,
            name: 'utils',
            priority: 5,
            chunks: 'all',
            minChunks: 2,
            reuseExistingChunk: true,
          },
        },
      };
      
      config.optimization.concatenateModules = true;
      
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
    }
    return config;
  },
};

if (process.env.ANALYZE === 'true') {
  const originalWebpack = nextConfig.webpack;
  nextConfig.webpack = (config, options) => {
    if (originalWebpack) {
      config = originalWebpack(config, options);
    }
    
    if (!options.dev && !options.isServer) {
      try {
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
            reportFilename: 'bundle-analyzer-report.html',
          })
        );
      } catch (error) {
        console.warn('webpack-bundle-analyzer not available, skipping bundle analysis');
      }
    }
    return config;
  };
}

export default nextConfig;
