var path = require('path');

module.exports = {
  entry: ['./src/svgdash.js'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'svgdash.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  }
};
