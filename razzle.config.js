const postcssPlugins = rtl => {
	let plugins = [
		require("postcss-flexbugs-fixes"),
		require("autoprefixer")({
			browsers: [
				">1%",
				"last 4 versions",
				"Firefox ESR",
				"not ie < 9" // React doesn't support IE8 anyway
			],
			flexbox: "no-2009"
		})
	];

	rtl && plugins.push(require("rtlcss"));

	return plugins;
};
module.exports = {
	modify: (
		config,
		{ target, dev },
		webpack
	) => {
		const appConfig = config;
		const IS_DEV = dev;
		const IS_WEB = target === "web";
		const IS_NODE = target === "node";

		let cssLoaders = [
			{
				loader: "css-loader", // translates CSS into CommonJS,
				options: {
					minimize: !IS_DEV
				}
			},
			{
				loader: "postcss-loader",
				options: {
					plugins: postcssPlugins(true)
				}
			},
			{
				loader: "less-loader", // compiles Less to CSS
				options: {
					modifyVars: {
						"font-family":
							"Shabnam FD"
					},
					javascriptEnabled: true
				}
			}
		];

		let stylusLoaders = [
			"css-loader",
			"stylus-loader"
		];

		if (IS_WEB) {
			cssLoaders.unshift("style-loader");
			stylusLoaders.unshift("style-loader");
		}

		// Prevent file-loader or any webpack loader to parse .styl files
		appConfig.module.rules.forEach(rule => {
			rule.exclude = rule.exclude || [];
			rule.exclude.push(/\.styl$/);
		});

		appConfig.module.rules.push({
			test: /\.less$/,
			use: cssLoaders
		});
		appConfig.module.rules.push({
			test: /\.styl$/,
			use: stylusLoaders
		});

		return appConfig;
	}
};
