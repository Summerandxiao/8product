import request from '@/utils/request'
import { api } from '@/api'
import { MessageBox } from 'mint-ui'
import * as Auth from '@/utils/auth'
import * as PY from '@/utils/pinying.js'

const invoice = {
  state: {
    invoiceList: [],
    tagList: [],
    over: false,
    haveNodata: false
  },
  mutations: {
    /**
     * 设置发票列表
     */
    SETINVOICELIST (state, list) {
      state.over = false
      state.invoiceList.push.apply(state.invoiceList, list)
    },
    /**
     * 模糊查询修改发票列表
     */
    CHANGEINVOICELIST (state, arr) {
      state.invoiceList = arr
    },
    /**
     * 清除发票信息
     */
    CLEARINVOICELIST (state) {
      state.invoiceList = []
      state.over = false
      state.haveNodata = false
    },
    /**
     * 修改加载状态
    */
    CHANGEOVER (state, bool) {
      state.over = bool
      if (state.invoiceList.length === 0) {
        state.haveNodata = true
      } else {
        state.haveNodata = false
      }
    },
    SETTAGLIST (state, arr) {
      arr.forEach(ele => {
        // 获取汉字首字母,传入字符串
        if (ele.tagName) {
          ele.firstLetter = PY.makePy(ele.tagName)[0][0]
        }
      })
      state.tagList = arr
    }
  },
  actions: {
    /**
     * 获取发票列表
     */
    getInvoiceList ({ commit }, obj) {
      return new Promise((resolve, reject) => {
        request({
          url: api.getInvoiceList,
          method: 'post',
          data: obj
        }).then(rs => {
          // 返回中的data.offset代表本次请求回数据的起始下标
          if (rs.data.results) {
            if (rs.data.offset + rs.data.results.length < rs.data.total) {
              commit('SETINVOICELIST', rs.data.results)
              resolve('success')
            } else if (rs.data.offset + rs.data.results.length === rs.data.total) {
              commit('SETINVOICELIST', rs.data.results)
              commit('CHANGEOVER', true)
              resolve('success')
            } else {
              commit('CHANGEOVER', true)
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
     * 搜索发票根据关键字模糊查询
     */
    changeInvoiceList ({ commit }, arr) {
      return new Promise((resolve, reject) => {
        commit('CHANGEINVOICELIST', arr)
        resolve()
      })
    },
    /**
     * 根据票据id查询票据详细信息
     */
    getInvoiceDetailById ({ commit }, id) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.getInvoiceDetailById}/${id}`,
          method: 'get'
        }).then(rs => {
          if (rs.data) {
            resolve(rs.data)
          } else {
            MessageBox('提示', '查询失败')
            resolve('error')
          }
        })
      })
    },
    /**
     * 删除发票信息
     */
    deleteInvoice ({ commit }, id) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.deleteInvoice}/${id}`,
          method: 'get'
        }).then(rs => {
          if (rs.code === 200) {
            resolve()
          }
        })
      })
    },
    /**
     * 保存发票信息,拿到id替换上传文件返回值里的billId并进行关联保存
     */
    saveInvoice ({ commit }, obj) {
      return new Promise((resolve, reject) => {
        request({
          url: api.saveInvoice,
          method: 'post',
          data: obj
        }).then(rs => {
          resolve(rs.data.id)
        })
      })
    },
    /**
     * 图像识别，识别出来之后存储信息，在详情页读取并填充页面
     */
    identifyInvoice ({ commit }, filePath) {
      const form = new FormData()
      form.append('filePath', filePath)
      return new Promise((resolve, reject) => {
        request({
          url: `${api.identifyInvoice}`,
          method: 'post',
          data: form
        }).then(rs => {
          if (rs.flag === 'SUCCESS') {
            Auth.setStorage('invoiceDetail', JSON.stringify(rs.data))
            resolve(rs.data)
          } else {
            MessageBox('提示', '查验失败')
            resolve('')
          }
        })
      })
    },
    /**
     * 上传文件接口
     */
    uploadImage ({ commit }, base64) {
      return new Promise((resolve, reject) => {
        request({
          url: api.uploadImage,
          method: 'post',
          contentType: 'application/json',
          data: {
            url: base64
          }
        }).then(rs => {
          if (rs.flag === 'SUCCESS') {
            Auth.setStorage('image', JSON.stringify(rs.data))
            resolve(rs.data)
          } else {
            MessageBox('提示', '上传失败')
            resolve('')
          }
        })
      })
    },
    /**
     * 绑定发票和附件
     */
    bindBillFile ({ commit }, obj) {
      return new Promise((resolve, reject) => {
        request({
          url: api.bindBillFile,
          method: 'post',
          data: obj
        }).then(rs => {
          resolve(rs)
        })
      })
    },
    /**
     * 根据票据id查看附件
     */
    getInvoicePicture ({ commit }, id) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.getInvoicePicture}/${id}`,
          method: 'get'
        }).then(rs => {
          if (rs.data) {
            resolve(rs.data)
          } else {
            MessageBox('提示', '查询失败')
            resolve('error')
          }
        })
      })
    },
    /**
     * 获取发票标签列表
     */
    getTagList ({ commit }) {
      return new Promise((resolve, reject) => {
        request({
          url: api.getTagList,
          method: 'get'
        }).then(rs => {
          commit('SETTAGLIST', rs.data)
          resolve(rs.data)
        })
      })
    },
    /**
     * 添加标签
     */
    addTag ({ commit }, obj) {
      return new Promise((resolve, reject) => {
        request({
          url: api.addTag,
          method: 'post',
          data: obj
        }).then(rs => {
          if (rs.flag === 'SUCCESS') {
            MessageBox('提示', '页签保存成功')
            resolve(rs.data)
          } else {
            MessageBox('提示', rs.msg)
          }
        })
      })
    },
    deleteTag ({ commit }, id) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.deleteTag}/${id}`,
          method: 'get'
        }).then(rs => {
          resolve(rs)
        })
      })
    },
    /**
     * 票据添加页签
     */
    invoiceAddTag ({ commit }, obj) {
      return new Promise((resolve, reject) => {
        request({
          url: api.invoiceAddTag,
          method: 'post',
          data: obj
        }).then(rs => {
          resolve(rs.data)
        })
      })
    },
    /**
     * 批量报销发票
     */
    batchInvoice ({ commit }, arr) {
      return new Promise((resolve, reject) => {
        request({
          url: api.batchInvoice,
          method: 'post',
          data: arr
        }).then(rs => {
          if (rs.flag === 'SUCCESS') {
            MessageBox('提示', '批量报销成功')
            resolve(rs.data)
          } else {
            MessageBox('提示', '批量报销失败')
          }
        })
      })
    }
  }
}
export default invoice
