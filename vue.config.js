module.exports = {
  // publicPath: '/arapp', // 路由为history模式打包时，设置为/
  publicPath: process.env.NODE_ENV === 'production' ? '/arapp/' : '/', // 设置环境变量，待测
  // publicPath: '', // 路由为hash模式打包时，设置为空
  outputDir: 'arapp',
  devServer: {
    proxy: {
      // 门户
      '/port': {
        // target: 'http://10.16.21.29:8080', // 测试服域名
        target: 'http://10.10.66.107:80', // 测试服域名
        ws: false,
        changOrigin: true,
        pathRewrite: {
          '^/port': ''
        }
      },
      '/dd': {
        target: 'https://oapi.dingtalk.com', // 钉钉
        ws: false,
        changOrigin: true,
        pathRewrite: {
          '^/dd': ''
        }
      },
      '/ocr': {
        target: 'https://ocr.ele-cloud.com', // 钉钉
        ws: false,
        changOrigin: true,
        pathRewrite: {
          '^/ocr': ''
        }
      },
      // 项目经费
      '/fund': {
        target: 'http://10.4.40.22:8085',
        ws: false,
        changOrigin: true,
        pathRewrite: {
          '^/fund': ''
        }
      }
    },
    overlay: {
      warnings: true,
      errors: true
    }
  }
}
