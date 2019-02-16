var path = require('path');

module.exports = {
  entry: './src/svgdash.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'svgdash.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  }
  /*,
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
  }*/
};
