module.exports = {
  configureWebpack: (config) => {
    config.modules.rules.push({
      test: /\.coffee$/,
      use: ['coffee-loader']
    })

    // Could also use webpack chain to modify config (SAFER)
    const newRule = {
      test:/\.(png|jp?g|gif)(\?.*)?$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 5000,
            name: 'img/[name].[hash:8].[ext]',
          }
        }
      ]
    }

    const imagesRuleIndex = config.module.rules
      .findIndex(x => x.test.source.includes('png|jp?g|gif'))

    config.module.rules.splice(imagesRuleIndex, 1, newRule)
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8081',
        changeOrigin: true,
      }
    }
  }
}