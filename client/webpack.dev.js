const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	plugins: [
		new webpack.DefinePlugin({
			API_URL: JSON.stringify('/api')
		})
	],
	devServer: {
		historyApiFallback: true,
		contentBase: './',
		port: 4343,
		proxy: {
			'/api': {
				target: 'http://localhost:8439',
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		},
		hot: true
	}
});
