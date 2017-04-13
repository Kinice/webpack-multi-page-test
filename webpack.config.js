const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        index: './src/js/index.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: 'js/[name].js',
        chunkFilename: 'js/[id].chunk.js'
    },
    module: {
        loaders: [
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
                },{
                    test: /\.less$/,
                    loader: ExtractTextPlugin.extract('css-loader!less-loader')
                },{
                    test: /\.html$/,
                    loader: 'html-loader?attrs=img:src img:data-src'
                },{
                    test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'file-loader?name=./fonts/[name].[ext]'
                },{
                    test: /\.(png|jpg|gif)$/,
                    loader: 'url-loader?limit=8192&name=./img/[hash].[ext]'
                }
        ]
    },
    plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery'
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendors',
                chunks: ['index'],
                minChunks: 1
            }),
            new ExtractTextPlugin('css/[name].css'),
            new HtmlWebpackPlugin({
                favicon: './src/img/favicon.ico',
                filename: './view/index.html',
                template: './src/view/index.html',
                indect: 'body',
                hash: true,
                chunks: ['vendors', 'index'],
                minify: {
                    removeComments: true,
                    collapseWhitespace: false
                }
            }),
            new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: './',
        host: 'localhost',
        port: '9090',
        inline: true,
        hot: true
    }
}