const merge = require("webpack-merge");
const common = require("./webpack.common.js");

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

const cssModuleLoaders = [
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



module.exports = merge(common, {
  mode: "development",
  module: {
    rules: [
        require.resolve('style-loader'),
        {
            loader: require.resolve('css-loader'),
            options: {
                modules: true,
                importLoaders: 1,
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
    ]
  },
});