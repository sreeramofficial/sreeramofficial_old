const path = require('path');

module.exports = {
  webpackFinal: async (baseConfig, options) => {
    const { module = {}, resolve = {} } = baseConfig;

    const newConfig = {
      ...baseConfig,
      module: {
        ...module,
        rules: [
          ...module.rules,
          {
            test: /\.module\.css$/,
            include: path.resolve(__dirname, '../src'),
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                  modules: true
                }
              }
            ]
          }
        ],
      },
      resolve: {
        ...resolve,
        alias: {
          ...resolve.alias,
          "@": path.resolve(__dirname, "../src"),
        },
      },
    };

    newConfig.module.rules.find(
      rule => rule.test.toString() === '/\\.css$/'
    ).exclude = /\.module\.css$/;

    return newConfig;
  },
};
