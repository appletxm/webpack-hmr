var path = require('path');
var webpack = require('webpack');
var HtmlWebPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyPlugin = require('copy-webpack-plugin');

var publicPath = '';
//var publicPath = path.resolve('./dist');
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

process.env.NODE_ENV = 'production';

var devConfig = {
    entry: {
        app: ['./src/js/index.js'],
        vendor: ['./src/assets/js-libs/auto-fix-screen.js', 'react', 'react-dom', 'axios', 'redux', 'react-redux']
        //page2: ['./client/page2', hotMiddlewareScript]
    },
    output: {
        filename: 'js/[name].min.[hash].js',
        path: path.resolve('./dist'),
        publicPath: publicPath
    },
    devtool: 'source-map',
    strictExportPresence: true,
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel',
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=8192&context=client&name=[path][name].[ext]',
                exclude: /(node_modules|bower_components)/,
            }, {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap', 'sass?sourceMap'),
                exclude: /(node_modules|bower_components)/
            }
        ]
    },
    resolve: {
        extensions: ['','.js', '.scss', '.html', '.json']
    },
    plugins: [
         new webpack.DefinePlugin({
            "process.env": { 
                NODE_ENV: JSON.stringify("production") 
            }
        }),
        new webpack.optimize.CommonsChunkPlugin('vendor',  '../dist/js/vendor.min.[hash].js'),
        new CopyPlugin([{ from: path.join(__dirname, '../src/assets'), to: path.join(__dirname, '../dist/assets')}]),
        new ExtractTextPlugin('../dist/css/[name].[hash].css'),
        new HtmlWebPlugin({
            title: 'txm test app',
            filename: path.join(__dirname, '../dist/', 'index.html'),
            template: path.join(__dirname, '../src/', 'index.html'),
            favicon: '',
            inject: 'body'
        }),
    ]
};

module.exports = devConfig;