const invoice = {
  getInvoiceList: '/port/A/ar/api/app/appInvoice/invoiceList', // 获取我的发票列表
  getInvoiceDetailById: '/port/A/ar/api/app/appInvoice/invoiceById', // 根据发票id获取发票详情
  saveInvoice: '/port/A/ar/api/app/appInvoice/invoiceHeHeSave', // 保存识别出来的发票信息
  uploadImage: '/port/A/ar/api/file/billFile/uploadBase64FromApp', // 上传图片
  bindBillFile: '/port/A/ar/api/file/billFile/arFileInfoSave', // 将图片和发票进行绑定
  identifyInvoice: '/port/A/ar/api/app/appInvoice/hhOcrAndSaveByPath', // 识别发票
  deleteInvoice: '/port/A/ar/api/app/appInvoice/invoiceDelete', // 删除发票
  getInvoicePicture: '/port/A/ar/api/file/billFile/fileListByBillId', // 查看附件发票
  getTagList: '/port/A/ar/api/app/appInvoiceTag/invoiceTagList', // 获取标签列表
  addTag: '/port/A/ar/api/app/appInvoiceTag/invoiceTagSave', // 添加标签
  deleteTag: '/port/A/ar/api/app/appInvoiceTag/invoiceTagDelete', // 删除标签
  invoiceAddTag: '/port/A/ar/api/app/appInvoice/invoiceAddTag', // 票据添加页签
  batchInvoice: '/port/A/ar/api/app/appInvoice/batchUpdateInvoiceStatus' // 我的发票批量报销
}
export default invoice
