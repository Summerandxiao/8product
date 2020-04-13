const list = r => require.ensure([], () => r(require('@/views/backlog/index')), 'backlog')
const processTracking = r => require.ensure([], () => r(require('@/components/processTracking')), 'backlog')

export default [
  {
    path: '/backlog',
    name: 'backlog',
    meta: { title: '我的待办', keepAlive: true, scrollTop: 0 },
    component: list
  },
  {
    path: '/processTracking',
    name: 'processTracking',
    meta: { title: '流程跟踪' },
    component: processTracking
  }
]
