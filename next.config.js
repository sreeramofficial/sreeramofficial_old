/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const path = require('path');

const runtimeCaching = require('./runtimeCaching');
const publicRuntimeConfig = require('./runtimeConfig');

module.exports = withPWA({
  productionBrowserSourceMaps: true,
  webpack: (config, { isServer }) => {
    config.module.rules.push(
      {
        test: /\.md$/,
        exclude: /node_modules/,
        use: {
          loader: 'raw-loader',
        },
      },
      {
        test: /\.(png|gif|jpg|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              emitFile: isServer,
              publicPath: `/_next/static/`,
              outputPath: `${isServer ? '../' : ''}static/`,
              name: '[path][name].[ext]',
            },
          },
        ],
      });
    config.plugins = [
      ...config.plugins,
      new WebpackManifestPlugin({
        fileName: path.resolve(__dirname, './public/static/manifest.json'),
        seed: publicRuntimeConfig.seed,
        generate: seed => seed,
      }),
    ];

    return config;
  },
  publicRuntimeConfig,
  typescript: {
    ignoreBuildErrors: true,
  },
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
    scope: '/',
    sw: 'service-worker.js',
    exclude: [ 'build-manifest.json', 'react-loadable-manifest.json' ],
    runtimeCaching,
  },
});
