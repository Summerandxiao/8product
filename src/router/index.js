import Vue from 'vue'
import Router from 'vue-router'
import common from './common.js' // 公共页面路由
import backlog from './backlog.js' // 我的待办页面路由
import invoice from './invoice.js' // 我的发票页面路由
import myDeliver from './myDeliver.js' // 我的投递页面路由
import reimbursement from './reimbursement.js' // 我的报销页面路由
import billEcho from './billEcho.js'
import article from './article' // 通知公告页面路由
import fund from './fundManage.js'
Vue.use(Router)
const router = new Router({
  base: '/arapp/',
  mode: 'history',
  routes: [
    ...common,
    ...backlog,
    ...invoice,
    ...myDeliver,
    ...reimbursement,
    ...billEcho,
    ...article,
    ...fund
  ]
})

router.beforeEach((to, from, next) => {
  if (from.meta.keepAlive) {
    const content = document.querySelector('.page-infinite-list')
    const scrollTop = content ? content.scrollTop : 0
    from.meta.scrollTop = scrollTop
  }
  if (to.name === 'billEcho') {
    from.meta.keepAlive = true
  }
  /* 路由变化修改title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
export default router
