import Vue from 'vue'
import App from './app.vue'

import './assets/styles/global.styl'

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
  //Vue 在创建 Vue 实例时，通过调用 render 方法来渲染实例的 DOM 树。
  //$mount这个API把内容挂载到html的一个节点上
  render: (h) => h(App)
}).$mount(root)
