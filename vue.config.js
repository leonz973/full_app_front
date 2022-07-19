/** @format */

// const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const productionGzipExtensions = ['js', 'css']

// module.exports = {
//         configureWebpack: {
//             plugins: [
//                 new CompressionWebpackPlugin({
//                     filename: '[path].gz[query]',
//                     algorithm: 'gzip',
//                     test: new RegExp('\\.('+productionGzipExtensions.join('|')+')$'),//匹配文件名
//                     threshold: 102400,//对10K以上的数据进行压缩
//                     minRatio: 0.8,
//                     deleteOriginalAssets:false,//是否删除源文件
//                 })
//             ]
//         }
//     };

module.exports = {
    productionSourceMap: false,
    configureWebpack: (config) => {
        return {
            optimization: {
                minimize: true
            },
            module: {
                rules: [
                    {
                        test: /echarts\.js$/,
                        use: {
                            loader: 'babel-loader'
                        }
                    }
                ]
            }
        };
    },
    devServer: {
        disableHostCheck: true //正式环境要注释掉
    }
};
