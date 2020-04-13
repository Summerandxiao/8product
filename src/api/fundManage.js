const fundManage = {
  getProList: '/port/bg/app/report/project/getSumReportInProject', // 获取项目经费列表
  getProOnethList: '/port/bg/app/report/project/getOneProjectReport', // 获取项目各月份经费列表
  getProOneMonththList: '/port/bg/app/report/project/getOneProjectReportByMonth', // 获取项目每月经费列表
  getSumReportInDepartment: '/port/bg/app/report/department/getSumReportInDepartment', // 查询部门经费执行情况总览
  getOneDepartmentReport: '/port/bg/app/report/department/getOneDepartmentReport', // 某部门各月份执行情况
  getOneDepartmentReportByMonth: '/port/bg/app/report/department/getOneDepartmentReportByMonth', // 某部门各月份执行情况
  getOneDeptReportByProject: '/port/bg/app/report/department/getOneDeptReportByProject', // 某部门各项目执行情况
  getDeptAndProjectReport: '/port/bg/app/report/department/getDeptAndProjectReport', // 某部门某项目各月份执行明细
  getDeptAndProjectReportByMonth: '/port/bg/app/report/department/getDeptAndProjectReportByMonth'
}
export default fundManage
