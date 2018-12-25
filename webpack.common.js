const path = require('path');
const FontminPlugin = require('fontmin-webpack');
const SaveHashes = require('assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

const fileLoader = path => ({
    loader: 'file-loader',
    options: {
        name: `${path}/[name].[hash].[ext]`,
        limit: 1024,
        publicPath: '/chunks/'
    },
});

module.exports = {
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
        new SaveHashes({
            path: path.resolve(__dirname, 'public')
        }),
        new FontminPlugin({
            autodetect: true, // automatically pull unicode characters from CSS
        }),
        new Dotenv({
            path: path.resolve(__dirname, './.env')
        })
    ],
    stats: {
        children: false,
        warningsFilter: (warning) => false,
        colors: true
    }
};
