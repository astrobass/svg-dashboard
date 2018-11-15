var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
  entry: './src/svgcontrols.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'svgcontrols-es.js'
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js&/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', { modules: 'umd' } ]
          }
        }
      }
    ]
  }
};
