const path = require('path');
const webpack = require('webpack');
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
        }),
        new webpack.DefinePlugin({
            'process.env': {
                API_PATH: JSON.stringify(process.env.API_PATH),
                SITE_PATH: JSON.stringify(process.env.SITE_PATH),
                PORT: JSON.stringify(process.env.PORT),
                IS_DEV: JSON.stringify(process.env.IS_DEV),
                MODE: JSON.stringify(process.env.MODE),
            },
        }),
    ],
    stats: {
        children: false,
        warningsFilter: (warning) => false,
        colors: true
    }
};
