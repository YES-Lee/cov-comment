const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const path = require('path')
const fs = require('fs')

const doc = fs.readFileSync(path.resolve(__dirname, '../README.md'), { encoding: 'utf8' })

const template = `
(function () {
  window.__doc__ = unescape('${escape(doc)}')
})()
`
fs.writeFileSync(path.resolve(__dirname, '../public/doc.js'), template, { encoding: 'utf8' })

const compiler = webpack({
  mode: 'development',
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'cov-comment.js'
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
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader'
          }
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
  }
})

const server = new WebpackDevServer(compiler, {
  contentBase: path.resolve(__dirname, '../public'),
  compress: true,
  hot: true,
  // noInfo: true
})

server.listen(9999, '127.0.0.1', () => {
  console.log('Starting server on http://localhost:9999');
});
