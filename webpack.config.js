'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'produccion';
let scssLoaders = [];

if (isProduction) {
    scssLoaders = ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader?&sourceMap=true', 'sass-loader?sourceMap=true']
    });
}
else {
    scssLoaders = [{
        loader: 'style-loader',
    }, {
        loader: 'css-loader?url=false&sourceMap=true',
    },{
        loader: 'sass-loader?sourceMap=true'
    }];
}

module.exports = {

    entry: ['babel-polyfill', path.join(__dirname, 'src', 'index.js')],

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    module : {
        rules: [
            {
                test: /\.scss$/,
                use: scssLoaders
            }, {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: path.join(__dirname, 'node_modules')
            },
            {
                test: /\.(webm|mp4)$/,
                use: 'file-loader?name=[name].[ext]&useRelativePath=true'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [
                    'file-loader?name=[name].[ext]&useRelativePath=true',
                    'image-webpack-loader'
                ]
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            title: 'home',
            template: path.join(__dirname, 'src/pages/index.html'),
            minify: {
                collapseWhitespace: true
            }
        }),
        new HtmlWebpackPlugin({
            title: 'article',
            filename: 'article.html',
            template: path.join(__dirname, 'src/pages/article.html'),
            minify: {
                collapseWhitespace: true
            }
        }),
        new ExtractTextPlugin('style.css')
    ],

    devServer: {
        open: true,
        port: 3000,
        overlay: true,
        hot: true,
        contentBase: [
            path.join(__dirname, 'src'),
            path.join(__dirname, 'src/pages'),
            path.join(__dirname, 'src/pages/partials')
        ],
        watchContentBase: true
    }
};

