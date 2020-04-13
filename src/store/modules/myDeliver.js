import { MessageBox } from 'mint-ui'
import request from '@/utils/request'
import { api } from '@/api'

const myDeliver = {
  actions: {
    /**
     * 获取投递柜信息
     */
    getCabinetList ({ commit }, obj) {
      return new Promise((resolve, reject) => {
        request({
          url: api.getCabinetList,
          method: 'post',
          data: obj
        }).then(rs => {
          if (rs.data) {
            if (rs.data.results && rs.data.results.length) {
              resolve(rs.data)
            } else {
              MessageBox('提示', '暂无可选择的投递柜')
            }
          } else {
            MessageBox('提示', '查询失败')
            resolve('error')
          }
        })
      })
    },
    /**
     * 报销人扫码开柜存入
    */
    openStorage ({ commit }, cabinetId, billId) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.openStorage}?cabinetId=${cabinetId}&billId=${billId}`,
          method: 'get'
        }).then(rs => {
          if (rs.data) {
            resolve(rs.data.id)
          } else {
            MessageBox('提示', '开柜失败')
            resolve('error')
          }
        })
      })
    },
    /**
     * 确认（投递/取回）操作
    */
    endAction ({ commit }, recordId) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.endAction}/${recordId}`,
          method: 'get'
        }).then(rs => {
          resolve()
        })
      })
    },
    /**
     * 财务根据柜子id和密码取件
    */
    getStorage ({ commit }, obj) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.getStorage}`,
          method: 'post',
          data: obj
        }).then(rs => {
          if (rs.data) {
            resolve(rs.data.id)
          } else {
            MessageBox('提示', rs.msg)
          }
        })
      })
    },
    /**
     * 财务根据退单柜和billId退单
    */
    backStorage ({ commit }, obj) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.backStorage}?cabinetId=${obj.id}&billId=${obj.billId}`,
          method: 'get'
        }).then(rs => {
          if (rs.data) {
            resolve(rs.data.id)
          } else {
            MessageBox('提示', rs.msg)
          }
        })
      })
    },
    /**
     * 报销人根据柜子id和单据id获取取件码
    */
    getCodeBybillId ({ commit }, obj) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.getCodeBybillId}?cabinetId=${obj.cabinetId}&billId=${obj.billId}`,
          method: 'get'
        }).then(rs => {
          if (rs.data) {
            resolve(rs.data.pickupCode)
          } else {
            MessageBox('提示', '获取取件码失败')
            resolve('error')
          }
        })
      })
    },
    /**
     * 报销人根据柜子id和pickupCode取件
    */
    pickupbycode ({ commit }, obj) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.pickupbycode}?cabinetId=${obj.cabinetId}&pickupCode=${obj.pickupCode}`,
          method: 'get'
        }).then(rs => {
          if (rs.data) {
            resolve(rs.data.id)
          } else {
            MessageBox('提示', '开柜失败')
            resolve('error')
          }
        })
      })
    },
    /**
     * 校验主柜是否可存
     */
    cabinetbyId ({ commit }, id) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.cabinetbyId}/${id}`,
          method: 'get'
        }).then(rs => {
          if (rs.data) {
            resolve(rs.data.openNum)
          } else {
            MessageBox('提示', '此柜已满')
          }
        })
      })
    }
  }
}
export default myDeliver
