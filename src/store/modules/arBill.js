import request from '@/utils/request'
import { api } from '@/api'
import { MessageBox } from 'mint-ui'

const arBill = {
  state: {
    areData: {},
    typeString: '',
    translateData: {}
  },
  mutations: {
    SET_AREDATA (state, info) {
      state.areData = info
    },
    SET_TYPESTRING (state, info) {
      state.typeString = info
    },
    SET_TRANSLATEDATA (state, info) {
      state.translateData = info
    }
  },
  actions: {
    // 获取单据模板详细信息，此接口获取的信息作为渲染模板的唯一依据，对应岗位需要配置相应的模板信息，否则没有信息
    getTplInfoMation ({ commit }, params) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.getTpl}/${params}`,
          method: 'get'
        }).then(res => {
          if (res) {
            resolve(res)
            if (res.flag === 'SUCCESS') {
              this.commit('SET_AREDATA', res.data)
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
    // 根据用户信息获取单据模板信息
    getPosiList ({ commit }, obj) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.getPosiList}?positionCode=${obj.positionCode}&coCode=${obj.coCode}&billType=${obj.billType}`,
          method: 'get'
        }).then(res => {
          if (res && res.data) {
            if (res.data.length > 0) {
              let dataParam = res.data[0]
              resolve(dataParam)
              commit('SET_TYPESTRING', dataParam.templetCode)
            }
          } else {
            MessageBox('提示', res.msg)
          }
        })
      })
    },
    // 根据单据id获取单据预览数据，此接口数据已经全部转义，只做显示使用，给审核岗等不能修改单据只能查看的时候使用
    translateBill ({ commit }, params) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.translateBill}/${params}`,
          method: 'get'
        }).then(res => {
          if (res.flag === 'SUCCESS') {
            resolve(res)
            this.commit('SET_TRANSLATEDATA', res.data)
          } else {
            MessageBox('提示', res.msg)
          }
        })
      })
    }
  }
}
export default arBill
