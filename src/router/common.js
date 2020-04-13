const lead0 = r => require.ensure([], () => r(require('@/views/lead/lead')), 'lead')
const lead1 = r => require.ensure([], () => r(require('@/views/lead/lead1')), 'lead')
const lead2 = r => require.ensure([], () => r(require('@/views/lead/lead2')), 'lead')
const login = r => require.ensure([], () => r(require('@/views/login')), 'login')
const pwdConfirm = r => require.ensure([], () => r(require('@/views/login/PwdConfirm.vue')), 'login')
const ddLogin = r => require.ensure([], () => r(require('@/views/ddLogin')), 'ddLogin')
const main = r => require.ensure([], () => r(require('@/views/main')), 'main')
const diningHall = r => require.ensure([], () => r(require('@/views/diningHall')), 'diningHall')
const user = r => require.ensure([], () => r(require('@/views/user')), 'user')
const billEcho = r => require.ensure([], () => r(require('@/views/billEcho')), 'billEcho')
const fillExplain = r => require.ensure([], () => r(require('@/views/fillExplain')), 'fillExplain')
const feeList = r => require.ensure([], () => r(require('@/components/feeList')), 'feeList')
export default [
  {
    path: '/lead',
    name: 'lead',
    component: lead0
  },
  {
    path: '/lead1',
    name: 'lead1',
    component: lead1
  },
  {
    path: '/lead2',
    name: 'lead2',
    component: lead2
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/pwdConfirm',
    name: 'pwdConfirm',
    component: pwdConfirm
  },
  {
    path: '/ddLogin',
    name: 'ddLogin',
    component: ddLogin
  },
  {
    path: '/main',
    name: 'main',
    meta: { title: '移动警保' },
    component: main
  },
  {
    path: '/diningHall',
    name: 'diningHall',
    meta: { title: '智慧餐厅' },
    component: diningHall
  },
  {
    path: '/user',
    name: 'user',
    meta: { title: '我的', icon: 'icon-home' },
    component: user
  },
  {
    path: '/billEcho',
    name: 'billEcho',
    component: billEcho
  },
  {
    path: '/fillExplain',
    name: 'fillExplain',
    component: fillExplain
  },
  {
    path: '/feeList',
    name: 'feeList',
    component: feeList
  }
]
