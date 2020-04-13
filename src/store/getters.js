const getters = {
  userInfo: state => state.user.userInfo,
  tokenid: state => state.user.tokenid,
  invoiceList: state => state.invoice.invoiceList, // 发票列表
  invoiceTagList: state => state.invoice.tagList, // 发票标签列表
  over: state => state.invoice.over, // 是否加载完毕
  haveNodata: state => state.invoice.haveNodata, // 是否有发票
  backlogList: state => state.backlog.backlogList, // 待办列表
  backlogOver: state => state.backlog.over, // 待办列表是否加载完毕
  backlogNodata: state => state.backlog.haveNodata, // 待办列表是否有数据
  reimburseList: state => state.reimbursement.reimburseList, // 报销列表
  reimburseOver: state => state.reimbursement.over, // 报销列表是否加载完毕
  reimburseNodata: state => state.reimbursement.haveNodata, // 报销列表是否有数据
  reimburseTypeList: state => state.reimbursement.typeList, // 报销单据类型列表
  reimburseTmpInfo: state => state.reimbursement.templateInfo, // 报销单单据模版信息
  reimburseBillInfo: state => state.reimbursement.billInfo, // 结算信息数据
  areaData: state => state.reimbursement.area, // 地区信息
  areData: state => state.arBill.areData, // 模板信息数据
  typeString: state => state.arBill.typeString,
  translateData: state => state.arBill.translateData, // 回显单据的转换数据
  standTypeOf03: state => state.reimbursement.standardObj // 保存平铺类型时相关的标准数据和影响因素
}
export default getters
