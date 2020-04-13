const backlog = {
  getBacklogList: '/port/A/ar/api/bill/arBill/app/getArBillAll', // 获取我的待办列表
  getVariables: '/port/A/ar/api/workflow/variables', // 获取我的待办列表
  doneRecord: '/port/A/ar/api/workflow/doneRecord/next', // 同意审批之后更改工作流状态
  getSignConfig: '/port/A/ar/api/workflow/getSign', // 获取签证信息
  changeStatus: '/port/A/ar/api/bill/arBill', // 修改单据状态
  reSubmit: '/port/A/ar/api/workflow/doneRecord/submit', // 提交单据状态
  cancel: '/port/A/ar/api/workflow/doneRecord/cancel', // 修改单据状态
  back: '/port/A/ar/api/workflow/doneRecord/back' // 驳回单据状态
}
export default backlog
