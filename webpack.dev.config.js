const path = require('path');

module.exports = {
  entry: {
    ap_theme: path.resolve(__dirname, './resources/js/ap_theme.js')
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './public/'),
    filename: 'js/[name].js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, './public/'),
    open: true,
    port: 9005
    //host: '192.168.187.100'
  },
  module:{
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: "css-loader",
            options: { 
              sourceMap: false
            },
          },
          'sass-loader'
        ],
        exclude: /node_modules/
      }
    ]
  }
};
