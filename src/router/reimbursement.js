const reimbursement = r => require.ensure([], () => r(require('@/views/reimbursement')), 'reimbursement')
const reimburseDetail = r => require.ensure([], () => r(require('@/views/reimbursement/components/detail/index')), 'reimbursement')
const billInfo = r => require.ensure([], () => r(require('@/components/billInfo/components/BillDetail')), 'reimbursement')
const chooseBillType = r => require.ensure([], () => r(require('@/components/billInfo/components/ChooseBillType')), 'reimbursement')
const chooseRelateDoc = r => require.ensure([], () => r(require('@/components/relateDoc/components/ChooseRelateDoc')), 'reimbursement')
const changeRelateDoc = r => require.ensure([], () => r(require('@/components/relateDoc/components/ChangeRelateDoc')), 'reimbursement')
const chooseTarget = r => require.ensure([], () => r(require('@/components/budget/components/ChooseTarget')), 'reimbursement')
const changeTarget = r => require.ensure([], () => r(require('@/components/budget/components/ChangeTarget')), 'reimbursement')
const editCharge = r => require.ensure([], () => r(require('@/components/detailOfCharge/components/EditCharge')), 'reimbursement')
const fileList = r => require.ensure([], () => r(require('@/components/fileList/components/FileListBox')), 'reimbursement')
const billType = r => require.ensure([], () => r(require('../views/reimbursement/components/BillType')), 'billType')
export default [
  {
    path: '/reimbursement',
    name: 'reimbursement',
    meta: { title: '我的报销', keepAlive: true, scrollTop: 0 },
    component: reimbursement
  },
  {
    path: '/reimburseDetail',
    name: 'reimburseDetail',
    meta: { title: '报销单详情' },
    component: reimburseDetail
  },
  {
    path: '/billInfo',
    name: 'billInfo',
    meta: { title: '结算信息' },
    component: billInfo
  },
  {
    path: '/chooseBillType',
    name: 'chooseBillType',
    meta: { title: '选择结算方式' },
    component: chooseBillType
  },
  {
    path: '/chooseRelateDoc',
    name: 'chooseRelateDoc',
    meta: { title: '选择关联单据' },
    component: chooseRelateDoc
  },
  {
    path: '/changeRelateDoc',
    name: 'changeRelateDoc',
    meta: { title: '修改关联单据' },
    component: changeRelateDoc
  },
  {
    path: '/editCharge',
    name: 'editCharge',
    meta: { title: '编辑费用明细' },
    component: editCharge
  },
  {
    path: '/billType',
    name: 'billType',
    meta: { title: '选择单据类型' },
    component: billType
  },
  {
    path: '/changeTarget',
    name: 'changeTarget',
    meta: { title: '修改预算指标' },
    component: changeTarget
  },
  {
    path: '/chooseTarget',
    name: 'chooseTarget',
    meta: { title: '预算指标' },
    component: chooseTarget
  },
  {
    path: '/fileList',
    name: 'fileList',
    meta: { title: '附件列表' },
    component: fileList
  }
]
