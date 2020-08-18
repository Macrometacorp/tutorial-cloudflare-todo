module.exports = {
  target: 'webworker',
  entry: './index.js', // inferred from "main" in package.json
  devtool: 'cheap-module-source-map', // avoid 'eval': Workers environment doesn't allow it
  mode: 'development',
}
