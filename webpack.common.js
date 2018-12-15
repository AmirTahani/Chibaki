const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const FontminPlugin = require("fontmin-webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const SaveHashes = require('assets-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


const fileLoader = (path) => ({
    loader: "file-loader",
    options: {
        name: `${path}/[name].[hash].[ext]`,
        limit: 1024,
        publicPath: "src/",
    },
});

module.exports = {
    entry: [
        "@babel/polyfill",
        path.resolve(__dirname, "src", "client.js")
    ],
    output: {
        filename: "[name].[hash].js",
        chunkFilename: "[name].[hash].js",
        path: path.resolve(__dirname, "public", "src"),
        publicPath: "src/",
    },
    resolve: {
        modules: [
            "node_modules",
        ],
        extensions: [".json", ".js", ".jsx"],
    },
    module: {
        rules: [
            {
                test: /\.json$/,
                type: "javascript/auto",
                loader: "json-loader",
            },
            {
                test: /\.(jpg|jpeg|gif|png|svg)$/,
                use: [
                    fileLoader("images"),
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    fileLoader("fonts"),
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin([
            path.resolve(__dirname, "public", "src"),
        ]),
        new SaveHashes({
            path: path.resolve(__dirname, "public")
        }),
        new FontminPlugin({
            autodetect: true, // automatically pull unicode characters from CSS
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "main.[hash].css",
            chunkFilename: "main.[hash].css"
        })
    ],
};
