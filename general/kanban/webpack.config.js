var webpack = require('webpack');
var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var merge = require('webpack-merge');
var HotModuleReplacementPlugin = webpack.HotModuleReplacementPlugin;
var TARGET = process.env.npm_lifecycle_event;

var PATH = {
	app: path.join(__dirname,'app'),
	build: path.join(__dirname,'build')
};

var common = {
	entry: {
	     app: PATH.app,
            vendors: ['react','react-dom','redux','react-dnd','react-dnd-html5-backend','react-router','react-redux','redux-thunk','reselect']
	},
	output: {
		path: PATH.build,
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['','.js','.jsx']
	},
	plugins: [
		new HtmlwebpackPlugin({
			template: 'template.html',
			inject: 'body',
			hash: true
		}),
                new webpack.optimize.CommonsChunkPlugin('vendors','vendors.js'),
                new ExtractTextPlugin('bundle.css')
	],
	module: {
		loaders: [
			{
				test: /\.css$/,
				include: PATH.app,
				loader: ExtractTextPlugin.extract('style-loader','css-loader')
			},
			{
				test: /\.(png|jpg)$/,
				loader: 'url-loader?limit=8000'
			},
			{
				test: /\.jsx?$/,
				include: PATH.app,
				loader: 'babel-loader',
				query: {
					presets: ['react','es2015','stage-0']
				}
			}
		]
	},
	externals: {
		jquery: 'jQuery'
	}
};


if(TARGET === "start"){
	module.exports = merge(common,{
		devServer: {
			hot: true,
			inline: true,
			stats: 'errors-only',
			contentBase: PATH.build
		},
		plugins: [
			new HotModuleReplacementPlugin()
		],
		devtool: 'source-map'
	});
}
if(TARGET === "build"){
	module.exports = merge(common,{
		plugins: [
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false
				}
			}),
			new webpack.DefinePlugin({
			    'process.env.NODE_ENV': '"production"'
			})
		]
	});
}
