/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
  mode: 'development',
  devtool: false,
  entry: path.resolve(__dirname, './src/index.tsx'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    chunkFilename: '[name]-chunk.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react', '@babel/preset-typescript'],
          plugins: [
            [
              'import',
              {
                libraryName: '@mookiepiece/strawberry-farm',
                customStyleName(name) {
                  return `@mookiepiece/strawberry-farm/src/_theme/${name}.scss`;
                },
                camel2DashComponentName: false,
              },
              '@mookiepiece/strawberry-farm',
            ],
            [
              'import',
              {
                libraryName: '@mookiepiece/starfall',
                customStyleName(name) {
                  return `@mookiepiece/starfall/src/_theme/${name}.scss`;
                },
                camel2DashComponentName: false,
              },
              '@mookiepiece/starfall',
            ],
          ],
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
        },
      },
    },
    runtimeChunk: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
    }),
    new MiniCssExtractPlugin(),
  ],
};

module.exports = config;
