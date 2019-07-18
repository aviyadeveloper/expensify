const merge = require('webpack-merge');
const common = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.[hash].css',
      chunkFilename: '[id].[hash].css'
    }),
    new webpack.DefinePlugin({
      'process.env.FIREBASE_API_KEY': JSON.stringify(
        process.env.FIREBASE_API_KEY
      ),
      'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(
        process.env.FIREBASE_AUTH_DOMAIN
      ),
      'process.env.FIREBASE_DATABASE_URL': JSON.stringify(
        process.env.FIREBASE_DATABASE_URL
      ),
      'process.env.FIREBASE_PROJECT_ID': JSON.stringify(
        process.env.FIREBASE_PROJECT_ID
      ),
      'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(
        process.env.FIREBASE_STORAGE_BUCKET
      ),
      'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(
        process.env.FIREBASE_MESSAGING_SENDER_ID
      ),
      'process.env.FIREBASE_APP_ID': JSON.stringify(
        process.env.FIREBASE_APP_ID
      ),
      'process.env.FIREBASE_PROJECT_ID': JSON.stringify(
        process.env.FIREBASE_PROJECT_ID
      )
    })
  ],
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: false
            }
          },
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
});
