const CompressionWebpackPlugin = require('compression-webpack-plugin')
// 定义压缩文件类型
const productionGzipExtensions = ['js', 'css']

module.exports = {
    // 基本路径
    publicPath: process.env.NODE_ENV === 'production' ? '/console/' : '/',
    outputDir: 'dist',
    productionSourceMap: false,
    assetsDir: 'static',
    filenameHashing: true,
    transpileDependencies: [
        'vue-particles'
    ],

    // 高级的方式
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
            // config.externals = externals
            config.plugins.push(
                new CompressionWebpackPlugin({
                    filename: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                    threshold: 10240,
                    minRatio: 0.8
                })
            )
            const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
            config.plugins.push(new BundleAnalyzerPlugin())
        }
    },

    css: {
        sourceMap: false,
        // 为所有的css以预处理文件开启CSS Modules
        loaderOptions: {
            less: {
                lessOptions: {
                    modifyVars: {
                        'primary-color': '#1DA57A',
                        'link-color': '#1DA57A',
                        'border-radius-base': '2px',
                    },
                    javascriptEnabled: true
                }
            }
        }
    }
}