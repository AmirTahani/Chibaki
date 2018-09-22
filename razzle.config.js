module.exports = {
	modify: (config, { target, dev }, webpack) => {
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
				loader: "less-loader", // compiles Less to CSS
				options: {
					modifyVars: {
						"font-family": "Shabnam FD"
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
	}
};
