const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = [
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
];
