const paths = require('razzle/config/paths');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
			cssModuleLoaders = ExtractTextPlugin.extract({
				fallback: {
					loader: require.resolve('style-loader'),
					options: {
						hmr: false
					}
				},
				use: [
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
				]
			});
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
					: ExtractTextPlugin.extract({
							fallback: {
								loader: require.resolve('style-loader'),
								options: {
									hmr: false
								}
							},
							use: [
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
					  })
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
					: ExtractTextPlugin.extract({
							fallback: {
								loader: require.resolve('style-loader'),
								options: {
									hmr: false
								}
							},
							use: [
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
					  })
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
					: ExtractTextPlugin.extract({
							fallback: {
								loader: require.resolve('style-loader'),
								options: {
									hmr: false
								}
							},
							use: [
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
					  })
		});

		if (!dev) {
			const index = config.plugins.findIndex(plugin => plugin.constructor.name === 'UglifyJsPlugin');
			if (index !== -1) {
				appConfig.plugins[index] = new UglifyJsPlugin({
					uglifyOptions: {
						compress: {
							warnings: false,
							// Disabled because of an issue with Uglify breaking seemingly valid code:
							// https://github.com/facebookincubator/create-react-app/issues/2376
							// Pending further investigation:
							// https://github.com/mishoo/UglifyJS2/issues/2011
							comparisons: false,
							collapse_vars: false
						},
						output: {
							comments: false
						}
					},
					sourceMap: true
				});
			}
		}

		return appConfig;
	}
};
