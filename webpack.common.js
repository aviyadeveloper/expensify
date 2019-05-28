const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/app.tsx',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          { loader: 'ts-loader', options: { onlyCompileBundledFiles: true } }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'testing expensify',
      template: './src/index_template.html'
    })
  ]
};
