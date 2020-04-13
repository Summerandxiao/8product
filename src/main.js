import Vue from 'vue'
import 'mint-ui/lib/style.css'
import App from './App.vue'
import router from './router'
import store from './store'
import VueTouch from 'vue-touch'
import MintUI from 'mint-ui'
import filters from '@/filters'
import Calendar from 'vue-mobile-calendar'
// import { ValidationProvider, extend } from 'vee-validate'
// import { required, email, min } from 'vee-validate/dist/rules'
import workflow from '@/workflow/es'
import '@/workflow/styles/style.css'
import '@/mock.js'
Vue.use(workflow)
Vue.use(MintUI)
Vue.use(Calendar)
Vue.use(VueTouch, { name: 'v-touch' })
VueTouch.config.swipe = {
  threshold: 100 // 手指左右滑动距离
}
Vue.prototype.$message = MintUI.MessageBox
Vue.config.productionTip = false
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))
// // 必须输入 shb
// extend('required', {
//   ...required,
//   message: '{_field_}必须输入{_value_}！！！'
// })

// // 匹配邮箱 shb
// extend('email', {
//   ...email,
//   message: '请正确输入邮箱！！！'
// })

// // 输入不能小于三个字符 shb
// extend('min', {
//   ...min,
//   message: '字符不能小于三位！！！'
// })

// // Register it globally
// Vue.component('ValidationProvider', ValidationProvider)

new Vue({
  router,
  store,
  render: h => h(App),
  data: {
    Bus: new Vue()
  }
}).$mount('#app')
