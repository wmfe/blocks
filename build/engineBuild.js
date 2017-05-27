var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var merge = require('webpack-merge')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
var ExtractTextPlugin = require('extract-text-webpack-plugin')

require('./check-versions')()

process.env.NODE_ENV = 'production'

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')

var spinner = ora('building for production...')
spinner.start()

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

var webpackConfig = {
    entry: {
        engine: './src/engine.js'
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            'src': path.resolve(__dirname, '../src'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'components': path.resolve(__dirname, '../src/components')
        }
    },
    externals: {
        'element-ui': 'ElementUI',
        'vue': 'Vue',
        'element-ui/lib/theme-default/index.css': 'element-ui/lib/theme-default/index.css',
        'vuex': 'vuex',
        'lodash': 'lodash'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            // filename: utils.assetsPath('css/[name].[contenthash].css')
            filename: '[name].[contenthash].css'
        }),
        new BundleAnalyzerPlugin(),
    ]
}

webpackConfig.module.rules = webpackConfig.module.rules.concat(utils.styleLoaders({
    sourceMap: config.build.productionSourceMap,
    extract: true
}))
// webpackConfig = merge(webpackConfig, {
//     module: {
//         rules: utils.styleLoaders({
//             sourceMap: config.build.productionSourceMap,
//             extract: true
//         })
//     }
// })

// rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
rm(path.join(config.build.assetsRoot), err => {
    if (err) throw err
    webpack(webpackConfig, function (err, stats) {
        spinner.stop()
        if (err) throw err
        /*process.stdout.write(stats.toString({
                colors: true,
                modules: true,
                children: true,
                chunks: true,
                chunkModules: true
            }) + '\n\n')*/

        console.log(chalk.cyan('  Build complete.\n'))
        console.log(chalk.yellow(
            '  Tip: built files are meant to be served over an HTTP server.\n' +
            '  Opening index.html over file:// won\'t work.\n'
        ))
    })
})