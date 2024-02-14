const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PRODUCTION = false;
module.exports = {
  entry: './src/scripts/pong.js',
  mode : (PRODUCTION ? 'production' : 'development'),
  devtool : (PRODUCTION ? undefined : 'eval-source-map'),
  output: {
    path: path.resolve(__dirname, '../server/public'),
    filename: 'scripts/bundle.js'
  },
  devServer: {
    static: {
       publicPath: path.resolve(__dirname, 'dist'),
       watch : true
    },
    host: 'localhost',
    port : 8888,
    open : true
},
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name : '[name].[ext]',
              outputPath : 'images'
            }
          }
        ]
      },
      {
        test: /\.(m?js$|jsx)/,
        exclude: /(node_modules)/
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
         template: "./src/index.html",
          filename: "./index.html",
          hash: true,
    }),
    new HtmlWebpackPlugin({
      template: "./src/html/disconnect.html",
       filename: "./disconnect.html",
       hash: true,
 }),
    new CopyPlugin({
        patterns: [
         {
          context: path.resolve(__dirname, "src", "html"),
          from: "**/*.html",
          globOptions: { },
          noErrorOnMissing: true,
          to:  'html'
         },
         {
          context: path.resolve(__dirname, "vendor"),
          from: "**/*.js",
          globOptions: { },
          noErrorOnMissing: true,
          to:  'vendor'
         },
          {
            from: 'src/images/*',
            to:  'images/[name][ext]',
            noErrorOnMissing: true,
          },
         {
           from: 'src/style/*',
           to:  'style/[name][ext]',
             noErrorOnMissing: true,
         },
       ]
     }),
   ]
};