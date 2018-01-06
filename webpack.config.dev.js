const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const validate = require("webpack-validator");

const config = {
    resolve: { extensions: ["", ".js", ".jsx"] },
    debug: true,
    devtool: "eval-source-map", // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
    // noInfo: true, // set to false to see a list of every file being bundled.
    entry: [
        // must be first entry to properly set public path
        "./src/webpack-public-path",
        "webpack-hot-middleware/client?reload=true",
        path.resolve(__dirname, "src/index.js"), // Defining path seems necessary for this to work consistently on Windows machines.
    ],
    target: "node", // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
    output: {
        path: path.resolve(__dirname, "dist"), // Note: Physical files are only output by the production build task `npm run build`.
        publicPath: "/",
        filename: "bundle.js",
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("development"), // Tells React to build in either dev or prod modes. https://facebook.github.io/react/downloads.html (See bottom)
            __DEV__: true,
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            // Create HTML file that includes references to bundled CSS and JS.
            template: "src/index.ejs",
            minify: {
                removeComments: true,
                collapseWhitespace: true,
            },
            inject: true,
        }),
    ],
    module: {
        loaders: [{ test: /\.js?$/, exclude: /node_modules/, loaders: ["babel"] }],
    },
    // postcss: () => [autoprefixer]
};

module.exports = validate(config, { quiet: false });
