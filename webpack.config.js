/**
 * Arquivo: webpack.config.js
 * Data: 01/11/2018
 * Descrição: Arquivo responsável por tratar a questão do build da aplicação.
 * Author: Glaucia Lemos
 */

const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/app.js',
  // Aqui todas as vezes que executar o comando de build.. irá criar a pasta 'dist'
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js',
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm.js',
    },
  },
  target: 'electron-renderer',
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
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file',
        query: {
          name: '[name].[ext]?[hash]',
        },
      },
    ],
  },
};

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: 'production',
      },
    }),
  ];
} else {
  module.exports.devtool = '#source-map';
}
