const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

const baseConfig = require('./webpack.base.config.js')

module.exports = merge(baseConfig, {
  entry: './entry-server.js',
  target: 'node',
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2',
  },
  externals: nodeExternals({
    whitelist: [/\.vue$/, /\.css$/],
  }),
  plugins: [new VueSSRServerPlugin()],
})
