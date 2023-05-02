const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       './vdom': '@fullcalendar/core/common/vdom',
  //     }
  //   }
  // }
})
