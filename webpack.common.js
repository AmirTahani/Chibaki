const path = require('path');
const FontminPlugin = require('fontmin-webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const SaveHashes = require('assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

const fileLoader = path => ({
    loader: 'file-loader',
    options: {
        name: `${path}/[name].[hash].[ext]`,
        limit: 1024,
        publicPath: 'chunks/'
    },
});

module.exports = {
    entry: [
        '@babel/polyfill',
        path.resolve(__dirname, 'src', 'client.js'),
        'webpack-hot-middleware/client',
    ],
    output: {
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].js',
        path: path.resolve(__dirname, 'public', 'chunks'),
        publicPath: 'chunks/'
    },
    resolve: {
        modules: [
            'node_modules',
        ],
        extensions: ['.json', '.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.json$/,
                type: 'javascript/auto',
                loader: 'json-loader',
            },
            {
                test: /\.(jpg|jpeg|gif|png|svg)$/,
                use: [
                    fileLoader('images'),
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    fileLoader('fonts'),
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin([
            path.resolve(__dirname, 'public', 'chunks')
        ]),
        new SaveHashes({
            path: path.resolve(__dirname, 'public')
        }),
        new FontminPlugin({
            autodetect: true, // automatically pull unicode characters from CSS
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].[hash].css',
            chunkFilename: '[name].[hash].css',
            publicPath: 'src/'
        }),
        new Dotenv()
    ]
};
