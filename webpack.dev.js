const merge = require('webpack-merge');
const path = require('path');
const StripLoader = require('strip-loader');
const { HotModuleReplacementPlugin } = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const postCssOptions = (rtl) => {
    const plugins = [
        require('postcss-flexbugs-fixes'),
        require('autoprefixer')({
            browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9' // React doesn't support IE8 anyway
            ],
            flexbox: 'no-2009'
        })
    ];

    return {
        ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
        plugins
    };
};


const appConfig = merge(common, {
    entry: [
        '@babel/polyfill',
        path.resolve(__dirname, 'src', 'client.js'),
        'webpack-hot-middleware/client'
    ],
    output: {
        filename: '[name].js',
        chunkFilename: '[name].js',
        path: path.resolve(__dirname, 'public', 'chunks'),
        publicPath: '/chunks/'
    },
    mode: 'development',
    optimization: {
        minimize: false,
    },
    module: {
        rules: [
            {
                test: /\.module\.styl$/,
                use: [
                    'style-loader',
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            modules: true,
                            importLoaders: 2,
                            // localIdentName: '[path]__[name]___[local]'
                        }
                    },
                    {
                        loader: require.resolve('postcss-loader'),
                        options: postCssOptions(false)
                    },
                    {
                        loader: require.resolve('stylus-loader')
                    }
                ]
            },
            {
                test: /\.css$/,
                use:
                    [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                // modules: true,
                                importLoaders: 1,
                                // localIdentName: '[path]__[name]___[local]'
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: postCssOptions(false),
                        }
                    ],
            },
            {
                test: /\.less$/,
                use:
                    [
                        'style-loader',
                        {
                            loader: require.resolve('css-loader'),
                            options: {
                                importLoaders: 2,
                            }
                        },
                        {
                            loader: require.resolve('postcss-loader'),
                            options: postCssOptions(false)
                        },
                        {
                            loader: 'less-loader', // compiles Less to CSS
                            options: {
                                modifyVars: {
                                    'font-family': 'Shabnam FD',
                                    'text-align': 'right'
                                },
                                javascriptEnabled: true
                            }
                        }
                    ]
            },
            {
                test: /\.styl$/,
                exclude:
                    [/\.module\.styl$/],
                use: [
                    'style-loader',
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 2,
                            url: false
                        }
                    },
                    {
                        loader: require.resolve('postcss-loader'),
                        options: postCssOptions(false)
                    },
                    {
                        loader: require.resolve('stylus-loader')
                    }
                ]
            },
            {
                test: /\.js[x]?$/,
                exclude:
                    [/node_modules/],
                use: [
                    'babel-loader',
                    'react-hot-loader/webpack'
                ]
            }
        ],
    },
    plugins: [
        new HotModuleReplacementPlugin()
    ],
});

module.exports = appConfig;
