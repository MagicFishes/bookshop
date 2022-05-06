/*
 * @Author: your name
 * @Date: 2022-03-22 16:13:19
 * @LastEditTime: 2022-03-22 17:11:55
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \twice_html\bookshop\babel.config.js
 */
module.exports = {
    presets: [
      '@vue/cli-plugin-babel/preset',
      { "plugins": [ ["import", { "libraryName": "vant", "libraryDirectory": "es", "style": true }] ] }
    ]
  }
