const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './public',
    historyApiFallback: true,
    inline: true,
    proxy: {
      '/api': 'http://10.10.65.84',
      '/hackday': 'http://attence.qunhequnhe.com',
    },
    overlay: {
      errors: true,
      warning: true,
    },
    port: 80,
  },
});
