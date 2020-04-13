const myDeliver = r => require.ensure([], () => r(require('@/views/myDeliver/')), 'myDeliver')
const chooseCabinet = r => require.ensure([], () => r(require('@/views/myDeliver/components/ChooseCabinet')), 'myDeliver')
const operation = r => require.ensure([], () => r(require('@/views/myDeliver/components/Operation')), 'myDeliver')
const successDeliver = r => require.ensure([], () => r(require('@/views/myDeliver/components/Success')), 'myDeliver')
const inputCode = r => require.ensure([], () => r(require('@/views/myDeliver/components/InputCode')), 'myDeliver')
export default [
  {
    path: '/myDeliver',
    name: 'myDeliver',
    meta: { title: '我的投递' },
    component: myDeliver
  },
  {
    path: '/chooseCabinet',
    name: 'chooseCabinet',
    meta: { title: '选择投递柜' },
    component: chooseCabinet
  },
  {
    path: '/operation',
    name: 'operation',
    meta: { title: '选择投递柜' },
    component: operation
  },
  {
    path: '/successDeliver',
    name: 'successDeliver',
    meta: { title: '选择投递柜' },
    component: successDeliver
  },
  {
    path: '/inputCode',
    name: 'inputCode',
    meta: { title: '选择投递柜' },
    component: inputCode
  }
]
