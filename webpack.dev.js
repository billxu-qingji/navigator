const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './public',
    historyApiFallback: true,
    inline: true,
    proxy: {
      '/api/audit': {
        target: 'http://10.1.15.249',
      },
      '/api': {
        target: 'http://coops.qunhequnhe.com/',
        changeOrigin: true,
      },
    },
    overlay: {
      errors: true,
      warning: true,
    },
  },
});
