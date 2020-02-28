const webpack = require('webpack')
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const pkg = require('../package.json')

const compiler = webpack({
  mode: 'production',
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: `cov-comment-v${pkg.version}.min.js`
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.less$/,
        use: [
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre"
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      exclude: /\/node_modules/,
      terserOptions: {
        output: {
          comments: false
        }
      },
      extractComments: false
    })]
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
})

compiler.run((err, stats) => {
  if (err || stats.hasErrors()) {
    console.error(err)
  }

  console.log(stats.toString({
    assets: true,
    colors: true
  }))
})
