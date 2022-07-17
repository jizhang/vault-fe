const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const apiMocker = require('mocker-api')
const glob = require('glob')

module.exports = (env, args) => {
  const styleLoader = args.mode === 'production' ? MiniCssExtractPlugin.loader : 'vue-style-loader'
  const config = {
    entry: './src/main.ts',
    output: {
      path: path.resolve(__dirname, './dist'),
      publicPath: '/',
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
        vue$: 'vue/dist/vue.esm.js',
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
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          extensions: {
            vue: true,
          },
        },
      }),
    ],
  }

  if (env.mock === 'none') {
    config.devServer.proxy = {
      '/api': {
        target: 'http://127.0.0.1:5050',
      },
    }
  } else {
    config.devServer.setupMiddlewares = (middlewares, devServer) => {
      apiMocker(devServer.app, glob.sync('mock/**/*.js'))
      return middlewares
    }
  }

  if (args.mode === 'production') {
    config.output.filename = '[name].[chunkhash].js'
    config.devtool = 'source-map'
    config.optimization = {
      splitChunks: {
        chunks: 'all',
      },
    }
    config.plugins = config.plugins.concat([
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].[chunkhash].css',
      }),
    ])

    if (env.analyze) {
      config.plugins.push(new BundleAnalyzerPlugin())
    }
  }

  return config
}
