const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin('styles.min.css');

module.exports = {
  entry: './src/App.jsx',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: "index.js"
  },
  module: {
    rules: [{
        test: /\.html$/,
        use: {
          loader: "html-loader",
          options: {
            minimize: true
          }
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"] 
        }
      },
      {
        test: /\.css$/,
        use: extractCSS.extract([
          'css-loader',
          'postcss-loader'
      ])
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      title: 'My App',
      template: "./client/index.html",
      filename: "index.html"
    }),
    extractCSS
  ]
};