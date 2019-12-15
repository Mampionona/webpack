const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const CompressionPlugin = require('compression-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const webpack = require('webpack');
const devMode = process.env.NODE_ENV !== 'production';
const MinifyPlugin = require('babel-minify-webpack-plugin');
// Babel minify options
const minifyOpts = {};
const pluginOpts = {
	test: /\.js($|\?)/i,
	sourceMap: "source-map"
};

module.exports = {
	mode: devMode ? "development" : "production",
	// devtool: devMode ? "source-map" : false,
	devtool: false,
	entry: {
		app: ["./src/assets/sass/app.scss", "./src/assets/js/app.js"]
	},
	output: {
		filename: "js/[name].js",
		path: path.resolve(__dirname, "dist")
	},
	devServer: {
		contentBase: "./dist"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"]
					}
				}
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			},
			{
				test: /\.s[ac]ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							sourceMap: true
						}
					},
					// 'style-loader',
					"css-loader",
					"postcss-loader",
					"sass-loader"
				]
			},
			{
				test: /\.(png|jpg|jpeg|gif|bmp|svg)/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "images/[name].[hash:8].[ext]",
							publicPath: "../"
						}
					}
				]
			},
			{
				test: /\.(ttf|woff|woff2|eot|otf)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "fonts/[name].[hash:8].[ext]",
							publicPath: "../"
						}
					}
				]
			}
		]
	},
	plugins: [
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
		new ManifestPlugin({ filter: ({ isInitial }) => isInitial })
	]
};
