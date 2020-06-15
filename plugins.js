const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
// Babel minify options
const minifyOpts = {};
const pluginOpts = {
	test: /\.js($|\?)/i,
	sourceMap: "source-map"
};
// const { module } = require("./webpack.config");

module.exports = [
	// new webpack.ProvidePlugin({
	// 	$: 'jquery',
	// 	jQuery: 'jquery'
	// }),
	new webpack.SourceMapDevToolPlugin({
		filename: "[file].map",
		// publicPath: "https://example.com/project/",
		// fileContext: "public"
	}),
	new CleanWebpackPlugin({
		cleanStaleWebpackAssets: false
	}),
	new MiniCssExtractPlugin({
		filename: "css/[name].css"
	}),
	new MinifyPlugin(minifyOpts, pluginOpts),
	new WebpackNotifierPlugin(),
	new CompressionPlugin({
		test: /\.(js|css)$/,
		filename: "[path].gz[query]"
	}),
	new ManifestPlugin()
];
