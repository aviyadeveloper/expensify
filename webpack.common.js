const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/src/app.tsx',
  output: {
    path: path.join(__dirname, 'client/dist/public'),
    filename: 'bundle.[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          { loader: 'ts-loader', options: { onlyCompileBundledFiles: true } }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './client/src/index_template.html'
    })
  ]
};
