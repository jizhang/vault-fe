const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const apiMocker = require('mocker-api')
const glob = require('glob')
const Config = require('./src/common/config.js')

const styleLoader = process.env.NODE_ENV === 'production'
  ? MiniCssExtractPlugin.loader
  : 'vue-style-loader'

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: Config.prefix + '/',
    filename: '[name].dev.js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly: true,
        },
      },
      {
        test: /\.css$/,
        use: [styleLoader, 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [styleLoader, 'css-loader', 'less-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        type: 'asset/resource',
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      '@': path.resolve('./src'),
    },
  },
  devServer: {
    host: '127.0.0.1',
    port: 8080,
    historyApiFallback: true,
  },
  performance: {
    hints: false,
  },
  devtool: 'eval-source-map',
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/assets/favicon.ico',
    }),
  ],
}

if (process.env.MOCK === 'none') {
  module.exports.devServer.proxy = {
    '/api': {
      target: 'http://127.0.0.1:5050',
    },
  }
} else {
  module.exports.devServer.setupMiddlewares = (middlewares, devServer) => {
    apiMocker(devServer.app, glob.sync('mock/**/*.js'))
    return middlewares
  }
}

if (process.env.NODE_ENV === 'production') {
  module.exports.output.filename = '[name].[chunkhash].js'
  module.exports.devtool = 'source-map'
  module.exports.optimization = {
    splitChunks: {
      chunks: 'all',
    },
  }
  module.exports.plugins = module.exports.plugins.concat([
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ])

  if (process.env.ANALYZE === '1') {
    module.exports.plugins.push(new BundleAnalyzerPlugin())
  }
}
