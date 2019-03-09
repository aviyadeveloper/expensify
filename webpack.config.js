const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/app.tsx",
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: "ts-loader" },
      { test: /\.s?css$/, use: ["style-loader", "css-loader", "sass-loader"] }
    ]
  },
  resolve: {
    extensions: [".js", ".json", ".ts", ".tsx"]
  },
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: path.join(__dirname, "public")
  }
};
