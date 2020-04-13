import { MessageBox } from 'mint-ui'
import request from '@/utils/request'
import { api } from '@/api'
import workflow from '@/workflow/es'
import * as Auth from '@/utils/auth'

const backlog = {
  state: {
    over: false,
    haveNodata: false,
    backlogList: []
  },
  mutations: {
    /**
     * 清空待办列表
    */
    CLEARBACKLOGLIST (state) {
      state.backlogList = []
      state.over = false
      state.haveNodata = false
    },
    /**
     * 设置待办列表
     */
    SETBACKLOGLIST (state, list) {
      state.over = false
      list.forEach(ele => {
        ele.billTypeName = ele.billTypeName.length > 5 ? ele.billTypeName.substring(0, 4) + '...' : ele.billTypeName
      })
      state.backlogList.push.apply(state.backlogList, list)
    },
    /**
     * 修改加载状态
    */
    CHANGEBACKLOGOVER (state, bool) {
      state.over = bool
      if (state.backlogList.length === 0) {
        state.haveNodata = true
      } else {
        state.haveNodata = false
      }
    }
  },
  actions: {
    /**
     * 获取列表数据
     */
    getBacklogList ({ commit }, obj) {
      obj.roleId = JSON.parse(Auth.getStorage('userInfo')).roleId
      return new Promise((resolve, reject) => {
        request({
          url: api.getBacklogList,
          method: 'post',
          data: obj
        }).then(rs => {
          // 返回中的data.offset代表本次请求回数据的起始下标
          if (rs.data.results) {
            if (rs.data.offset + rs.data.results.length < rs.data.total) {
              commit('SETBACKLOGLIST', rs.data.results)
              resolve('success')
            } else if (rs.data.offset + rs.data.results.length === rs.data.total) {
              commit('SETBACKLOGLIST', rs.data.results)
              commit('CHANGEBACKLOGOVER', true)
              resolve('success')
            } else {
              commit('CHANGEBACKLOGOVER', true)
              resolve('success')
            }
          } else {
            MessageBox('提示', '查询失败')
            resolve('error')
          }
        })
      })
    },
    /**
     * 获取工作流配置参数
     */
    getWorkflowConfig ({ commit }) {
      const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
      return new Promise((resolve, reject) => {
        request({
          url: `/port/A/ar/api/workflow/getWfPath`,
          method: 'get'
        }).then(data => {
          if (data.flag === 'SUCCESS') {
            let res = data.data
            workflow.config({
              debug: process.env.NODE_ENV === 'development',
              authToken: '',
              appCode: res.appCode,
              rgCode: res.rgCode,
              userCode: userInfo.userCode || '',
              flowModelerBaseUrl: res.flowModelerBaseUrl,
              flowProcessBaseUrl: res.flowProcessBaseUrl
            })
            if (res.hasSign) {
              sessionStorage.setItem('hasSign', 'Y')
              sessionStorage.setItem('signType', res.signType)
              sessionStorage.setItem('signRequired', res.signRequired)
            }
            resolve()
          }
        })
      })
    },
    /**
     * 获取工作流所需参数
    */
    getVariables ({ commit }, id) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.getVariables}/${id}`,
          method: 'get'
        }).then(rs => {
          if (rs.flag === 'SUCCESS') resolve(rs.data)
          else {
            MessageBox('提示', rs.msg)
          }
        })
      })
    },
    /**
     * 审批同意之后更改单据的工作流状态
     */
    doneRecord ({ commit }, id) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.doneRecord}/${id}`,
          method: 'get'
        }).then(rs => {
          if (rs.flag === 'SUCCESS') resolve()
          else {
            MessageBox('提示', rs.msg)
          }
        })
      })
    },
    // 获取工作流签证信息
    getSignConfig ({ commit }) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.getSignConfig}`,
          method: 'get'
        }).then(rs => {
          if (rs.flag === 'SUCCESS') resolve(rs.data)
          else {
            MessageBox('提示', rs.msg)
          }
        })
      })
    },
    // 修改单据状态
    changeStatus ({ commit }, id) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.changeStatus}/${id}`,
          method: 'get'
        }).then(rs => {
          if (rs.flag === 'SUCCESS') resolve(rs.data)
          else {
            MessageBox('提示', rs.msg)
          }
        })
      })
    },
    // 收回
    cancel ({ commit }, id) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.cancel}/${id}`,
          method: 'get'
        }).then(rs => {
          if (rs.flag === 'SUCCESS') resolve()
          else {
            MessageBox('提示', rs.msg)
          }
        })
      })
    },
    // 驳回
    back ({ commit }, id) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.back}/${id}`,
          method: 'get'
        }).then(rs => {
          if (rs.flag === 'SUCCESS') resolve()
          else {
            MessageBox('提示', rs.msg)
          }
        })
      })
    },
    // 重新提交
    reSubmit ({ commit }, id) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.reSubmit}/${id}`,
          method: 'get'
        }).then(rs => {
          if (rs.flag === 'SUCCESS') resolve()
          else {
            MessageBox('提示', rs.msg)
          }
        })
      })
    }
  }
}
export default backlog
