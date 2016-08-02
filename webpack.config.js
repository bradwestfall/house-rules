module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "./index.js",
    sourceMapFilename: "./index.map"
  },
  devtool: '#source-map',
  module: {
    loaders: [
      {
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  }
}
