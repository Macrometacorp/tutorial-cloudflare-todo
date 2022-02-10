const dotenv = require("dotenv")
const { DefinePlugin } = require("webpack")

module.exports = {
    target: "webworker",
    entry: "./index.js", // inferred from "main" in package.json
    plugins: [
        new DefinePlugin({
            "process.env": JSON.stringify(dotenv.config().parsed),
        }),
    ],
    // FOR DEVELOPMENT MODE
    // devtool: 'cheap-module-source-map', // avoid 'eval': Workers environment doesn't allow it
    // mode: 'development',
}
