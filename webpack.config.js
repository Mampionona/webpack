const path = require('path');
const devMode = process.env.NODE_ENV !== 'production';
const plugins = require('./plugins');
const rules = require('./rules');


module.exports = {
	mode: devMode ? "development" : "production",
	devtool: devMode ? "source-map" : false,
	// devtool: false,
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
	module: { rules },
	plugins
};
