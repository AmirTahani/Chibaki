const modifyBuilder = require("razzle-plugin-postcss")
	.default;
const postcssPlugins = [
	require("rtlcss"),
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
const cssConfig = {
	postcssPlugins
};
const modify = modifyBuilder({ cssConfig });

module.exports = {
	modify: (
		config,
		{ target, dev },
		webpack
	) => {
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
					plugins: postcssPlugins
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

		if (IS_WEB) {
			cssLoaders.unshift({
				loader: "style-loader"
			});
		}

		config.module.rules.push({
			test: /\.less$/,
			use: cssLoaders
		});

		return config;
	},
	plugins: [{ func: modify }]
};
