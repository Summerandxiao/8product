import request from '@/utils/request'
import { api } from '@/api'
import { MessageBox } from 'mint-ui'
import * as Auth from '@/utils/auth'
let obj = {}
const fund = {
  state: {
    // 项目列表数据
    proList: [],
    // 项目各月份总览
    proOneList: [],
    // 项目每月月份的执行情况
    proMonthList: [],
    // 查询各部门项目经费情况总览
    sumRepInDepList: [],
    // 查询部门各月份执行明细
    depOneList: [],
    // 查询部门每月的执行情况
    depMonthList: [],
    // 部门项目总览
    sumRepInDepListALL: [],
    // 某部门各项目
    depSumItem: [],
    // 某部门某项目各月份执行明细
    depProAllMonthList: [],
    // 某部门某项目某月的执行情况
    depProMonthList: []
  },
  mutations: {
    SET_PROLIST (state, info) {
      state.proList = info
    },
    SET_PROONELIST (state, info) {
      state.proOneList = info
    },
    SET_PROMONTHLIST (state, info) {
      state.proMonthList = info
    },
    SET_SUMREPINDEPLIST (state, info) {
      state.sumRepInDepList = info
    },
    SET_DEPONELIST (state, info) {
      state.depOneList = info
    },
    SET_DEPMONTHLIST (state, info) {
      state.depMonthList = info
    },
    SET_SUMLIST (state, info) {
      state.sumRepInDepListALL = info
    },
    SET_DEPSUMITEM (state, info) {
      state.depSumItem = info
    },
    SET_DEPPROALLMONTH (state, info) {
      state.depProAllMonthList = info
    },
    SET_DEPPROMONTH (state, info) {
      state.depProMonthList = info
    }
  },
  actions: {
    // 获取项目经费列表数据
    getProList ({ commit }, params) {
      obj = JSON.parse(Auth.getStorage('userInfo'))
      return new Promise((resolve, reject) => {
        request({
          url: `${api.getProList}?agencyCode=${obj.agency_code}&setYear=${params}&rgCode=${obj.rg_code}`,
          method: 'post'
        }).then(res => {
          if (res) {
            if (res.flag === 'success') {
              resolve(res)
              this.commit('SET_PROLIST', res.data)
            } else {
              MessageBox('提示', res.msg)
            }
          } else {
            MessageBox('提示', '查询失败')
            resolve('error')
          }
        })
      })
    },
    // 获取项目各月份经费列表数据
    getProOneList ({ commit }, params) {
      obj = JSON.parse(Auth.getStorage('userInfo'))
      let data = {}
      data.projectCode = params.projectCode
      return new Promise((resolve, reject) => {
        request({
          url: `${api.getProOnethList}?agencyCode=${obj.agency_code}&rgCode=${obj.rg_code}&setYear=${params.year}`,
          method: 'post',
          data: data
        }).then(res => {
          if (res) {
            if (res.flag === 'success') {
              resolve(res)
              this.commit('SET_PROONELIST', res.data)
            } else {
              MessageBox('提示', res.msg)
            }
          } else {
            MessageBox('提示', '查询失败')
            resolve('error')
          }
        })
      })
    },
    // 获取项目某月份x经费列表数据
    getProOneMonththList ({ commit }, params) {
      obj = JSON.parse(Auth.getStorage('userInfo'))
      let data = {}
      data.projectCode = params.projectCode
      data.month = params.month
      return new Promise((resolve, reject) => {
        request({
          url: `${api.getProOneMonththList}?agencyCode=${obj.agency_code}&rgCode=${obj.rg_code}&setYear=${params.year}`,
          method: 'post',
          data: data
        }).then(res => {
          if (res) {
            if (res.flag === 'success') {
              resolve(res)
              this.commit('SET_PROMONTHLIST', res.data)
            } else {
              MessageBox('提示', res.msg)
            }
          } else {
            MessageBox('提示', '查询失败')
            resolve('error')
          }
        })
      })
    },
    // 查询部门经费执行情况
    getSumReportInDepartment ({ commit }, year) {
      obj = JSON.parse(Auth.getStorage('userInfo'))
      return new Promise((resolve, reject) => {
        request({
          url: `${api.getSumReportInDepartment}?agencyCode=${obj.agency_code}&rgCode=${obj.rg_code}&setYear=${year}`,
          method: 'post',
          data: {
            'projectIsNull': false
          }
        }).then(res => {
          if (res) {
            if (res.flag === 'success') {
              resolve(res)
              this.commit('SET_SUMREPINDEPLIST', res.data)
            } else {
              MessageBox('提示', res.msg)
            }
          } else {
            MessageBox('提示', '查询失败')
            resolve('error')
          }
        })
      })
    },
    // 获取部门各月份经费列表数据
    getOneDepartmentReport ({ commit }, params) {
      obj = JSON.parse(Auth.getStorage('userInfo'))
      let data = {}
      data.departmentCode = params.departmentCode
      return new Promise((resolve, reject) => {
        request({
          url: `${api.getOneDepartmentReport}?agencyCode=${obj.agency_code}&rgCode=${obj.rg_code}&setYear=${params.year}`,
          method: 'post',
          data: data
        }).then(res => {
          if (res) {
            if (res.flag === 'success') {
              resolve(res)
              this.commit('SET_DEPONELIST', res.data)
            } else {
              MessageBox('提示', res.msg)
            }
          } else {
            MessageBox('提示', '查询失败')
            resolve('error')
          }
        })
      })
    },
    // 获取部门某月份经费列表数据
    getOneDepartmentReportByMonth ({ commit }, params) {
      obj = JSON.parse(Auth.getStorage('userInfo'))
      let data = {}
      data.departmentCode = params.departmentCode
      data.month = params.month
      return new Promise((resolve, reject) => {
        request({
          url: `${api.getOneDepartmentReportByMonth}?agencyCode=${obj.agency_code}&rgCode=${obj.rg_code}&setYear=${params.year}`,
          method: 'post',
          data: data
        }).then(res => {
          if (res) {
            if (res.flag === 'success') {
              resolve(res)
              this.commit('SET_DEPMONTHLIST', res.data)
            } else {
              MessageBox('提示', res.msg)
            }
          } else {
            MessageBox('提示', '查询失败')
            resolve('error')
          }
        })
      })
    },
    // 部门项目经费
    getSumReportInDepartmentAll ({ commit }, year) {
      obj = JSON.parse(Auth.getStorage('userInfo'))
      return new Promise((resolve, reject) => {
        request({
          url: `${api.getSumReportInDepartment}?agencyCode=${obj.agency_code}&rgCode=${obj.rg_code}&setYear=${year}`,
          method: 'post',
          data: {
            'projectIsNull': true
          }
        }).then(res => {
          if (res) {
            if (res.flag === 'success') {
              resolve(res)
              this.commit('SET_SUMLIST', res.data)
            } else {
              MessageBox('提示', res.msg)
            }
          } else {
            MessageBox('提示', '查询失败')
            resolve('error')
          }
        })
      })
    },
    // 某部门各项目
    getOneDeptReportByProject ({ commit }, params) {
      obj = JSON.parse(Auth.getStorage('userInfo'))
      let data = {}
      data.departmentCode = params.departmentCode
      return new Promise((resolve, reject) => {
        request({
          url: `${api.getOneDeptReportByProject}?agencyCode=${obj.agency_code}&rgCode=${obj.rg_code}&setYear=${params.year}`,
          method: 'post',
          data: data
        }).then(res => {
          if (res) {
            if (res.flag === 'success') {
              resolve(res)
              this.commit('SET_DEPSUMITEM', res.data)
            } else {
              MessageBox('提示', res.msg)
            }
          } else {
            MessageBox('提示', '查询失败')
            resolve('error')
          }
        })
      })
    },
    // 某部门某项目各月份执行明细
    getDeptAndProjectReport ({ commit }, params) {
      obj = JSON.parse(Auth.getStorage('userInfo'))
      let data = {}
      data.departmentCode = params.departmentCode
      data.projectCode = params.projectCode
      return new Promise((resolve, reject) => {
        request({
          url: `${api.getDeptAndProjectReport}?agencyCode=${obj.agency_code}&rgCode=${obj.rg_code}&setYear=${params.year}`,
          method: 'post',
          data: data
        }).then(res => {
          if (res) {
            if (res.flag === 'success') {
              resolve(res)
              this.commit('SET_DEPPROALLMONTH', res.data)
            } else {
              MessageBox('提示', res.msg)
            }
          } else {
            MessageBox('提示', '查询失败')
            resolve('error')
          }
        })
      })
    },
    getDeptAndProjectReportByMonth ({ commit }, params) {
      obj = JSON.parse(Auth.getStorage('userInfo'))
      let data = {}
      data.departmentCode = params.departmentCode
      data.projectCode = params.projectCode
      data.month = params.month
      return new Promise((resolve, reject) => {
        request({
          url: `${api.getDeptAndProjectReportByMonth}?agencyCode=${obj.agency_code}&rgCode=${obj.rg_code}&setYear=${params.year}`,
          method: 'post',
          data: data
        }).then(res => {
          if (res) {
            if (res.flag === 'success') {
              resolve(res)
              this.commit('SET_DEPPROMONTH', res.data)
            } else {
              MessageBox('提示', res.msg)
            }
          } else {
            MessageBox('提示', '查询失败')
            resolve('error')
          }
        })
      })
    }
  }
}
export default fund
