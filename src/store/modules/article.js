import { api } from '@/api'
import request from '@/utils/request'
import { MessageBox } from 'mint-ui'

const article = {
  state: {},
  actions: {
    // 获取公告标题
    getArticle ({ commit }, obj) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.getAttachData}?ruleID=${obj.ruleID}&pgPletId=${obj.pgPletId}&roleCode=${obj.roleCode}&rgCode=${obj.rgCode}&searchKey=${obj.searchKey}&userId=${obj.userId}&start=${obj.start}&limit=${obj.limit}`,
          method: 'get'
        }).then(rs => {
          if (rs) {
            resolve(rs)
          } else {
            MessageBox('提示', '查询失败')
          }
        })
      })
    },
    // 获取公告内容信息
    getArticleData ({ commit }, obj) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.getArticleData}?ruleID=${obj.ruleID}&articleId=${obj.articleId}&start=${obj.start}&limit=${obj.limit}&pgPletId=${obj.pgPletId}&roleCode=${obj.roleCode}`,
          method: 'get'
        }).then(rs => {
          if (rs) {
            resolve(rs)
          } else {
            MessageBox('提示', '查询失败')
          }
        })
      })
    },
    // 获取公告附件信息
    getAttachData ({ commit }, obj) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.getAttachData}?ruleID=${obj.ruleID}&articleId=${obj.articleId}&start=${obj.start}&limit=${obj.limit}`,
          method: 'get'
        }).then(rs => {
          if (rs) {
            resolve(rs)
          } else {
            MessageBox('提示', '查询失败')
          }
        })
      })
    }
  }
}
export default article
