const billEchoMain = r => require.ensure([], () => r(require('@/views/billEcho/index')), 'billEcho')
const tranlateTravel = r => require.ensure([], () => r(require('@/views/billEcho/components/TransportationFee.vue')), 'billEcho')
const houseFee = r => require.ensure([], () => r(require('@/views/billEcho/components/houseFee.vue')), 'billEcho')
const mealSub = r => require.ensure([], () => r(require('@/views/billEcho/components/mealSub.vue')), 'billEcho')
const bugetAndSettment = r => require.ensure([], () => r(require('@/views/billEcho/components/bugetAndSettment.vue')), 'billEcho')
export default [
  {
    path: '/billEchoMain',
    name: 'billEchoMain',
    meta: { title: '我的单据' },
    component: billEchoMain
  },
  {
    path: '/tranlateTravel',
    name: 'tranlateTravel',
    meta: { title: '城市间交通费' },
    component: tranlateTravel
  },
  {
    path: '/houseFee',
    name: 'houseFee',
    meta: { title: '住宿费' },
    component: houseFee
  },
  {
    path: '/mealSub',
    name: 'mealSub',
    meta: { title: '伙食补助' },
    component: mealSub
  },
  {
    path: '/bugetAndSettment',
    name: 'bugetAndSettment',
    meta: { title: '伙食补助' },
    component: bugetAndSettment
  }
]
