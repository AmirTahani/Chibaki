const paths = require('razzle/config/paths');
const ExtractTextPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const postCssOptions = rtl => {
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

    if (rtl) plugins.push(require('rtlcss'));

    return {
        ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
        plugins
    };
};
module.exports = {
    modify: (config, { target, dev }, webpack) => {
        const appConfig = config;
        const IS_DEV = dev;
        const IS_WEB = target === 'web';
        const IS_NODE = target === 'node';
        appConfig.optimization = {
            minimizer: [
                new UglifyJsPlugin({
                    uglifyOptions: {
                        parse: {
                            // we want uglify-js to parse ecma 8 code. However, we don't want it
                            // to apply any minfication steps that turns valid ecma 5 code
                            // into invalid ecma 5 code. This is why the 'compress' and 'output'
                            // sections only apply transformations that are ecma 5 safe
                            // https://github.com/facebook/create-react-app/pull/4234
                            ecma: 6,
                        },
                        compress: {
                            ecma: 5,
                            warnings: true,
                            collapse_vars: false,
                            // Disabled because of an issue with Uglify breaking seemingly valid code:
                            // https://github.com/facebook/create-react-app/issues/2376
                            // Pending further investigation:
                            // https://github.com/mishoo/UglifyJS2/issues/2011
                            comparisons: false,
                        },
                        mangle: {
                            safari10: true,
                        },
                        output: {
                            ecma: 5,
                            comments: false,
                            // Turned on because emoji and regex is not minified properly using default
                            // https://github.com/facebook/create-react-app/issues/2488
                            ascii_only: true,
                        },
                    },
                    // Use multi-process parallel running to improve the build speed
                    // Default number of concurrent runs: os.cpus().length - 1
                    parallel: true,
                    // Enable file caching
                    cache: !IS_DEV,
                    // @todo add flag for sourcemaps
                    sourceMap: !IS_DEV,
                }),
            ],
        };
        appConfig.optimization.splitChunks = IS_DEV ? {} : {
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        };

        // Stylus
        const stylusLoaders = [
            {
                loader: 'css-loader',
                options: { url: false }
            },
            {
                loader: 'postcss-loader',
                options: postCssOptions(false)
            },
            'stylus-loader'
        ];

        if (IS_DEV && !IS_NODE) {
            stylusLoaders.unshift('style-loader');
        }

        let cssModuleLoaders;
        if (IS_NODE) {
            cssModuleLoaders = [
                {
                    // on the server we do not need to embed the css and just want the identifier mappings
                    // https://github.com/webpack-contrib/css-loader#scope
                    loader: require.resolve('css-loader/locals'),
                    options: {
                        modules: true,
                        importLoaders: 1,
                        localIdentName: '[path]__[name]___[local]'
                    }
                }
            ];
        } else if (IS_DEV) {
            cssModuleLoaders = [
                require.resolve('style-loader'),
                {
                    loader: require.resolve('css-loader'),
                    options: {
                        modules: true,
                        importLoaders: 2,
                        localIdentName: '[path]__[name]___[local]'
                    }
                },
                {
                    loader: require.resolve('postcss-loader'),
                    options: postCssOptions(false)
                }
            ];
        } else {
            cssModuleLoaders = [
                ExtractTextPlugin.loader,
                {
                    loader: require.resolve('css-loader'),
                    options: {
                        modules: true,
                        importLoaders: 2,
                        minimize: true,
                        localIdentName: '[path]__[name]___[local]'
                    }
                },
                {
                    loader: require.resolve('postcss-loader'),
                    options: postCssOptions(false)
                }
            ];
        }

        // Prevent file-loader or any webpack loader to parse .styl files
        appConfig.module.rules.forEach(rule => {
            rule.exclude = rule.exclude || [];
            rule.exclude.push(/\.styl$/);
        });

        // LESS
        appConfig.module.rules.push({
            test: /\.module\.styl$/,
            exclude: [paths.appBuild],
            use: IS_NODE
                ? [
                    {
                        // on the server we do not need to embed the css and just want the identifier mappings
                        // https://github.com/webpack-contrib/css-loader#scope
                        loader: require.resolve('css-loader/locals'),
                        options: {
                            modules: true,
                            importLoaders: 2,
                            localIdentName: '[path]__[name]___[local]'
                        }
                    },
                    'stylus-loader'
                ]
                : IS_DEV
                    ? [
                        require.resolve('style-loader'),
                        {
                            loader: require.resolve('css-loader'),
                            options: {
                                modules: true,
                                importLoaders: 2,
                                localIdentName: '[path]__[name]___[local]'
                            }
                        },
                        {
                            loader: require.resolve('postcss-loader'),
                            options: postCssOptions(false)
                        },
                        {
                            loader: 'stylus-loader'
                        }
                    ]
                    : [
                        ExtractTextPlugin.loader,
                        {
                            loader: require.resolve('css-loader'),
                            options: {
                                modules: true,
                                importLoaders: 2,
                                minimize: true,
                                localIdentName: '[path]__[name]___[local]'
                            }
                        },
                        {
                            loader: require.resolve('postcss-loader'),
                            options: postCssOptions(false)
                        },
                        'stylus-loader'
                    ]
        });

        appConfig.module.rules.push({
            test: /\.less$/,
            use: IS_NODE
                ? [
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: '2'
                        }
                    },
                    {
                        loader: 'less-loader', // compiles Less to CSS
                        options: {
                            modifyVars: {
                                'font-family': 'Shabnam FD'
                            },
                            javascriptEnabled: true
                        }
                    }
                ]
                : IS_DEV
                    ? [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 2,
                                minimize: false
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: postCssOptions(true)
                        },
                        {
                            loader: 'less-loader', // compiles Less to CSS
                            options: {
                                modifyVars: {
                                    'font-family': 'Shabnam FD'
                                },
                                javascriptEnabled: true
                            }
                        }
                    ]
                    : [
                        ExtractTextPlugin.loader,
                        {
                            loader: require.resolve('css-loader'),
                            options: {
                                importLoaders: 2,
                                minimize: true
                            }
                        },
                        {
                            loader: require.resolve('postcss-loader'),
                            options: postCssOptions(true)
                        },
                        {
                            loader: 'less-loader', // compiles Less to CSS
                            options: {
                                modifyVars: {
                                    'font-family': 'Shabnam FD'
                                },
                                javascriptEnabled: true
                            }
                        }
                    ]
        });
        appConfig.module.rules.push({
            test: /\.styl$/,
            exclude: [/\.module\.styl$/],
            use: IS_NODE
                ? [
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: '2'
                        }
                    },
                    'stylus-loader'
                ]
                : IS_DEV
                    ? [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 2,
                                minimize: false
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: postCssOptions(false)
                        },
                        'stylus-loader'
                    ]
                    : [
                        ExtractTextPlugin.loader,
                        {
                            loader: require.resolve('css-loader'),
                            options: {
                                importLoaders: 2,
                                minimize: true
                            }
                        },
                        {
                            loader: require.resolve('postcss-loader'),
                            options: postCssOptions(false)
                        },
                        'stylus-loader'
                    ]
        });
        return appConfig;
    }
};
