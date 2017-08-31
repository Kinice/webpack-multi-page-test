const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

let entries = getEntry('src/js/*.js', 'src/js/')
let chunks = Object.keys(entries)
 
let config = {
    entry: entries,
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: 'js/[name].js',
        chunkFilename: 'js/[id].chunk.js?[chunkhash]'
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
                },{
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015']
                    }
                }
        ]
    },
    plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                'wx': 'weixin-js-sdk',
                'weui': 'weui.js'
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendors',
                chunks: chunks,
                minChunks: 1
            }),
            new ExtractTextPlugin('css/[name].css'),
            // new HtmlWebpackPlugin({
            //     favicon: './src/img/favicon.ico',
            //     filename: './view/index.html',
            //     template: './src/view/index.html',
            //     indect: 'body',
            //     hash: true,
            //     chunks: ['vendors', 'index'],
            //     minify: {
            //         removeComments: true,
            //         collapseWhitespace: false
            //     }
            // }),
            new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: './dist/view/',
        host: 'localhost',
        port: '9081',
        inline: true,
        hot: true
    }
}
let pages = Object.keys(getEntry('src/view/*.html', 'src/view/'))

pages.forEach((pathname) => {
    let conf = {
        filename: 'view/' + pathname + '.html',
        template: 'src/view/' + pathname + '.html',
        inject: false
    }
    if(pathname in config.entry){
        conf.favicon = 'src/img/favicon.ico'
        conf.inject = 'body'
        conf.chunks = ['vendors', pathname]
        conf.hash = true
    }
    config.plugins.push(new HtmlWebpackPlugin(conf))
})

module.exports = config

function getEntry(globPath, pathDir) {
    let files = glob.sync(globPath)
    let entries = {},entry, dirname, basename, pathname, extname

    for(let i = 0; i < files.length; i++){
        entry = files[i]
        dirname = path.dirname(entry)
        extname = path.extname(entry)
        basename = path.basename(entry, extname)
        pathname = path.join(dirname, basename)
        pathname = pathDir ? pathname.replace(new RegExp('^' + pathDir), '') : pathname
        entries[pathname] = ['./' + entry]
    }
    return entries
}
