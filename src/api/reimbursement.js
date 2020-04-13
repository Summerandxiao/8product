const reimbursement = {
  getRemburseTypeList: '/port/A/ar/api/typeset/artype/queryTypeByPtype', // 获取报销单据类型
  getReimburseList: '/port/A/ar/api/bill/arBill/app/getArBillAll', // 获取我的报销列表
  deleteReimburseMent: '/port/A/ar/api/bill/arBill', // 删除报销单接口
  getTemplateInfo: '/port/A/ar/api/tplset/arTplBuild/getTpl', // 获取单据模版信息
  getPositionList: '/port/A/ar/api/tplset/arTplTemplet/getPosiList', // 获取模版templateCode
  getFunc: '/port/A/ar/api/tplset/arTplBuild/getFunc', // 获取天数金额标准的关联关系
  getBillInfo: '/port/A/ar/api/bill/arBill', // 获取单据模版信息
  getCurrentAccount: '/port/A/ar/api/bill/ma/getCurrentAccount', // 结算方式汇款转账：获取已有账户
  /**
   * 结算方式汇款转账：获取已有账户
   * 结算方式支票：获取支票类型
   * 结算方式现金：获取收支类型
   */
  getRefInfoList: '/port/A/ar/api/tplset/arTplBuild/getRefInfoList',
  getFullArea: '/port/A/ar/api/basicset/arBasicAreaLevel/getFullArea', // 获取城市三级联动
  queryTravelStandard: '/port/A/ar/api/basicset/arBasicExpenseStandard/queryTravelStandard', // 根据影响因素获取标准
  getTargets: '/port/A/ar/api/tplset/arTplBuild/getBgBalanceDetail', // 获取相对应的指标，可以根据项目过滤指标，也可以直接选择指标
  saveBill: '/port/A/ar/api/bill/arBill', // 保存单据
  checkBill: '/port/A/ar/api/bill/arBill/checkBill', // 校验单据,
  getRatiStandOfMeet: '/port/A/ar/api/basicset/arBasicMeetingStandard', // 根据会议类别获取综合定额标准
  getRatiStandOftrain: '/port/A/ar/api/basicset/arBasicCultivateStandard' // 根据会议类别获取综合定额标准
}
export default reimbursement
