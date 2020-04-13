const myDeliver = {
  getCabinetList: '/port/A/ar/api/deliver/ardelivercabinet/cabinetlist', // 投递柜信息查询
  openStorage: '/port/A/ar/api/deliver/ardeliverrecord/storage', // 报销人投递，扫码开柜
  endAction: '/port/A/ar/api/deliver/ardeliverrecord/confirm', // 确认（投递/取回）操作
  getStorage: '/port/A/ar/api/deliver/ardeliverrecord/pickupByCw', // 财务取件
  backStorage: '/port/A/ar/api/deliver/ardeliverrecord/backstorage', // 财务退单，单据扫码开柜存入
  getCodeBybillId: '/port/A/ar/api/deliver/ardeliverrecord/getpickupcode', // 报销人取回，根据单据id获取取件码
  pickupbycode: '/port/A/ar/api/deliver/ardeliverrecord/pickupbycode', // 报销人取回，根据取单码开箱
  cabinetbyId: '/port/A/ar/api/deliver/ardelivercabinet/cabinetbyid' // 校验主柜是否可存
}
export default myDeliver
