const paths = require('razzle/config/paths');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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

    rtl && plugins.push(require('rtlcss'));

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

        // LESS
        const cssLoaders = [
            {
                loader: 'css-loader', // translates CSS into CommonJS,
                options: {
                    minimize: !IS_DEV
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
        ];

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

        if (IS_WEB) {
            cssLoaders.unshift('style-loader');
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
                        localIdentName: '[path]__[name]___[local]',
                    },
                },
            ];
        } else if (IS_DEV) {
            cssModuleLoaders = [
                require.resolve('style-loader'),
                {
                    loader: require.resolve('css-loader'),
                    options: {
                        modules: true,
                        importLoaders: 2,
                        localIdentName: '[path]__[name]___[local]',
                    },
                },
                {
                    loader: require.resolve('postcss-loader'),
                    options: postCssOptions(false),
                }
            ];
        } else {
            cssModuleLoaders = ExtractTextPlugin.extract({
                fallback: {
                    loader: require.resolve('style-loader'),
                    options: {
                        hmr: false,
                    },
                },
                use: [
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            modules: true,
                            importLoaders: 2,
                            minimize: true,
                            localIdentName: '[path]__[name]___[local]',
                        },
                    },
                    {
                        loader: require.resolve('postcss-loader'),
                        options: postCssOptions(false),
                    }
                ],
            });
        }

        // Prevent file-loader or any webpack loader to parse .styl files
        appConfig.module.rules.forEach((rule) => {
            rule.exclude = rule.exclude || [];
            rule.exclude.push(/\.styl$/);
        });

        appConfig.module.rules.push({
            test: /\.module\.styl$/,
            exclude: [paths.appBuild],
            use: IS_NODE ? [
                {
                    // on the server we do not need to embed the css and just want the identifier mappings
                    // https://github.com/webpack-contrib/css-loader#scope
                    loader: require.resolve('css-loader/locals'),
                    options: {
                        modules: true,
                        importLoaders: 2,
                        localIdentName: '[path]__[name]___[local]',
                    }
                },
                'stylus-loader'
            ] : IS_DEV ? [
                require.resolve('style-loader'),
                {
                    loader: require.resolve('css-loader'),
                    options: {
                        modules: true,
                        importLoaders: 2,
                        localIdentName: '[path]__[name]___[local]',
                    },
                },
                {
                    loader: require.resolve('postcss-loader'),
                    options: postCssOptions(false),
                },
                {
                    loader: 'stylus-loader'
                }
            ] : ExtractTextPlugin.extract({
                fallback: {
                    loader: require.resolve('style-loader'),
                    options: {
                        hmr: false,
                    },
                },
                use: [
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            modules: true,
                            importLoaders: 2,
                            minimize: true,
                            localIdentName: '[path]__[name]___[local]',
                        },
                    },
                    {
                        loader: require.resolve('postcss-loader'),
                        options: postCssOptions(false),
                    },
                    'stylus-loader'
                ],
            }),
        }
        );

        appConfig.module.rules.push({
            test: /\.less$/,
            use: cssLoaders
        });
        appConfig.module.rules.push({
            test: /\.styl$/,
            exclude: [/\.module\.styl$/],
            use: stylusLoaders
        });

        return appConfig;
    }
}
;
