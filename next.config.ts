import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@/components'],
  },
  
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          admin: {
            test: /[\\/]src[\\/]components[\\/]admin[\\/]/,
            name: 'admin',
            chunks: 'all',
            enforce: true,
          },
          dashboard: {
            test: /[\\/]src[\\/]components[\\/]dashboard[\\/]/,
            name: 'dashboard', 
            chunks: 'all',
            enforce: true,
          },
          profile: {
            test: /[\\/]src[\\/]components[\\/]profile[\\/]/,
            name: 'profile',
            chunks: 'all',
            enforce: true,
          },
        },
      };
    }
    return config;
  },
  
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config, { dev, isServer }) => {
      if (!dev && !isServer) {
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
            reportFilename: 'bundle-analyzer-report.html',
          })
        );
      }
      return config;
    },
  }),
};

export default nextConfig;
