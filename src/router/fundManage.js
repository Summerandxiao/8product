const proFund = r => require.ensure([], () => r(require('@/views/fundManage/projectFund/index')), 'proFund')
const proOne = r => require.ensure([], () => r(require('@/views/fundManage/projectFund/detail/proOne')), 'proOne')
const monthDetail = r => require.ensure([], () => r(require('@/views/fundManage/projectFund/detail/monthDetail')), 'monthDetail')

const depFund = r => require.ensure([], () => r(require('@/views/fundManage/depFund/index')), 'depFund')
const depOne = r => require.ensure([], () => r(require('@/views/fundManage/depFund/detail/depOne')), 'depOne')
const depMonthDetail = r => require.ensure([], () => r(require('@/views/fundManage/depFund/detail/depMonthDetail')), 'depMonthDetail')

const depProFund = r => require.ensure([], () => r(require('@/views/fundManage/depProFund/index')), 'depProFund')
const depProOne = r => require.ensure([], () => r(require('@/views/fundManage/depProFund/detail/depProOne')), 'depProOne')
const depProMonthDetail = r => require.ensure([], () => r(require('@/views/fundManage/depProFund/detail/depProMonthDetail')), 'depProMonthDetail')
const depProMonth = r => require.ensure([], () => r(require('@/views/fundManage/depProFund/detail/depProMonth')), 'depProMonth')
export default [
  {
    path: '/proFund',
    name: 'proFund',
    meta: { title: '项目经费' },
    component: proFund
  },
  {
    path: '/proFund/proOne',
    name: 'proOne',
    meta: { title: '项目各月份执行情况汇总' },
    component: proOne
  },
  {
    path: '/proFund/monthDetail',
    name: 'monthDetail',
    meta: { title: '某项目某月份执行情况汇总' },
    component: monthDetail
  },
  {
    path: '/depFund',
    name: 'depFund',
    meta: { title: '部门经费' },
    component: depFund
  },
  {
    path: '/depFund/depOne',
    name: 'depOne',
    meta: { title: '部门各月份执行情况汇总' },
    component: depOne
  },
  {
    path: '/depFund/depMonthDetail',
    name: 'depMonthDetail',
    meta: { title: '某部门某月份执行情况汇总' },
    component: depMonthDetail
  },
  {
    path: '/depProFund',
    name: 'depProFund',
    meta: { title: '部门项目经费' },
    component: depProFund
  },
  {
    path: '/depProFund/depProOne',
    name: 'depProOne',
    meta: { title: '部门各月份执行情况汇总' },
    component: depProOne
  },
  {
    path: '/depProFund/depProMonthDetail',
    name: 'depProMonthDetail',
    meta: { title: '某部门某月份执行情况汇总' },
    component: depProMonthDetail
  }, {
    path: '/depProFund/depProMonth',
    name: 'depProMonth',
    meta: { title: '某项目某部门某月份执行情况' },
    component: depProMonth
  }
]
