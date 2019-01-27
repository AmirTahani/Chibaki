const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const StripLoader = require('strip-loader');
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
        path.resolve(__dirname, 'src', 'client.js')
    ],
    output: {
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].js',
        path: path.resolve(__dirname, 'public', 'chunks'),
        publicPath: '/chunks/'
    },
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            test: /\.js(\?.*)?$/i,
            exclude: /node_modules/,
            parallel: true,
            terserOptions: {
                ecma: undefined,
                warnings: false,
                parse: {},
                compress: {},
                module: false,
                output: null,
                toplevel: false,
                nameCache: null,
                ie8: false,
                keep_classnames: undefined,
                keep_fnames: false,
                safari10: false,
            },
        })]
    },
    module: {
        rules: [
            {
                test: /\.module\.styl$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            publicPath: '../'
                        }
                    },
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
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                // you can specify a publicPath here
                                // by default it use publicPath in webpackOptions.output
                                publicPath: '../'
                            }
                        },
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
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                // you can specify a publicPath here
                                // by default it use publicPath in webpackOptions.output
                                publicPath: '../'
                            }
                        },
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
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            publicPath: '../'
                        }
                    },
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
                    {
                        loader: StripLoader.loader('debugger', 'console.log', 'console.info'),
                    },
                ],
            }
        ],
    },
    plugins: [
        new CleanWebpackPlugin([
            path.resolve(__dirname, 'public', 'chunks')
        ]),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].[hash].css',
            chunkFilename: '[name].[hash].css',
            publicPath: 'chunks/'
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/,
            cssProcessorOptions: {
                discardComments: {
                    removeAll: true
                }
            },
        }),
        new webpack.optimize.LimitChunkCountPlugin({
            minChunkSize: 10000,
            maxChunks: 15
        })
    ]
});


module.exports = appConfig;
