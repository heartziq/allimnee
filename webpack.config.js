const path = require("path");
// const { nodeEnv } = require('./config')
// console.log(nodeEnv === "development")

module.exports = {
  entry: ["core-js/stable", "regenerator-runtime/runtime", "./src/index.js"],
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: path.join(__dirname, "public"),
    historyApiFallback: true
  }
};
