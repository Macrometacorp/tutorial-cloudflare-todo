const { EnvironmentPlugin } = require('webpack')

module.exports = {
  target: 'webworker',
  entry: './index.js', // inferred from "main" in package.json
  plugins: [
    new EnvironmentPlugin({
      // ADD YOUR ENV VARIABLES HERE
      apiKey:
        'demo.todoKey.53ca17c186924549e08ae21ab8499de8cda5b74a0a67a1846e1b355f00000000',
    }),
  ],
  // FOR DEVELOPMENT MODE
  // devtool: 'cheap-module-source-map', // avoid 'eval': Workers environment doesn't allow it
  // mode: 'development',
}
