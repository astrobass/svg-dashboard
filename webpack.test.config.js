var path = require('path');

module.exports = {
  entry: './test/test.js',
  output: {
    path: path.resolve(__dirname, 'test'),
    filename: 'test-bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules', path.resolve(__dirname, 'dist')]
  },
  devServer: {
    contentBase: path.join(__dirname, 'test')
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
