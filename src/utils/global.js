// 我的发票
export const invoiceType = {
  '01': '增值税专用发票',
  '04': '增值税普通发票',
  '10': '增值税普通发票( 电子)',
  '11': '增值税普通发票( 卷式)',
  '91': '出租车票',
  '92': '火车票',
  '93': '飞机票',
  '24': '定额发票',
  '98': '通行发票',
  '': ''
}
export const checkState = {
  '0': '查验异常',
  '1': '查验成功',
  '2': '未查验'
}
// 我的待办
export const business = {
  '0': '报销单'
}
export const invoiceLabels = [
  {
    id: '1',
    label: '未报销'
  },
  {
    id: '2',
    label: '已报销'
  }
]
export const reimbursementLabels = [
  {
    id: '1',
    label: '未提交'
  },
  {
    id: '2',
    label: '已提交'
  }
]
// 关联单据对应表
export const billList = {
  'APPLY': 'applyList',
  'FACARD': 'faCardList',
  'LOAN': 'loanList',
  'MAINTENANCE': 'maintenanceList',
  'CONTRACT': 'contractList',
  'PURCHASE': 'purchaseList',
  'APPLY_ITEM': 'itemApplyList'
}
export const userlabel = [
  {
    label: 'role_name',
    value: '岗位',
    icon: 'iconfont icon-icon-person'
  },
  {
    label: 'userName',
    value: '账户',
    icon: 'iconfont icon-icon-person'
  },
  {
    label: 'userCode',
    value: '编号',
    icon: 'iconfont icon-zuzhiqunzu'
  },
  {
    label: 'agency_name',
    value: '机构',
    icon: 'iconfont icon-zuzhiqunzu'
  }
]
