import { MessageBox } from 'mint-ui'
import request from '@/utils/request'
import { billList } from '@/utils/global'
import { api } from '@/api'
import * as Auth from '@/utils/auth'
// import axios from 'axios'

const reimbursement = {
  state: {
    over: false,
    haveNodata: false,
    reimburseList: [],
    typeList: [{ billType: '', billName: '请选择' }], // 报销单据类型
    templateInfo: {},
    billInfo: {
      arBill: {}
    }, // 结算信息保存
    relateDocHead: [], // 关联单据的信息项名称，对应getRefInfoList里的
    area: [],
    standardObj: {}
  },
  mutations: {
    /**
     * 清空报销列表
    */
    CLEARREIMBURSELIST (state) {
      state.reimburseList = []
      state.over = false
      state.haveNodata = false
    },
    /**
     * 清空报销单信息
    */
    CLEARBILLINFO (state) {
      state.billInfo = {}
    },
    /**
     * 设置报销列表
     */
    SETREIMBURSELIST (state, list) {
      state.over = false
      state.reimburseList.push.apply(state.reimburseList, list)
    },
    /**
     * 修改加载状态
    */
    CHANGEREIMBURSEOVER (state, bool) {
      state.over = bool
      if (state.reimburseList.length === 0) {
        state.haveNodata = true
      } else {
        state.haveNodata = false
      }
    },
    /**
     * 获取报销单据类型
    */
    SETTYPELIST (state, list) {
      list.unshift({ billType: '', billName: '请选择' })
      state.typeList = list
    },
    /**
     * 保存报销单模版信息
    */
    CHANGETMPINFO (state, data) {
      state.templateInfo = data
    },
    /**
     * 清空模版信息
     */
    CLEARTMPINFO (state, data) {
      state.templateInfo = {}
    },
    /**
     * 保存或新增报销单信息
    */
    SETBILLINFO (state, obj) {
      // 不传type表示初始化，传type和info表示更新报销单里的对应数据
      if (!obj.type) {
        state.billInfo = obj
        return
      }
      // 更新报销单结算信息
      switch (obj.info) {
        case 'settlement': // 结算信息存储
          if (!state.billInfo.settlementList) {
            state.billInfo.settlementList = []
          }
          state.billInfo.settlementList.push({ ...obj.data, settlementType: obj.type })
          break
        case 'relate': // 关联单据信息存储
          // 选择关联单据之后billInfo对应的list与选中的数据同步
          if (!state.billInfo[billList[obj.infoId]]) state.billInfo[billList[obj.infoId]] = []
          state.billInfo[billList[obj.infoId]] = obj.data
          break
        case 'balance': // 预算指标信息存储
          if (!state.billInfo.arBillBalanceList) state.billInfo.arBillBalanceList = []
          state.billInfo.arBillBalanceList.push(...obj.data)
          break
        case 'expenseList': // 费用明细信息存储
          if (!state.billInfo.expenseList) state.billInfo.expenseList = []
          state.billInfo.expenseList.push({ ...obj.data })
          break
      }
    },
    /**
     * 更新报销单信息
    */
    CHANGEBILLINFO (state, obj) {
      // 更新报销单结算信息
      if (obj.type && obj.info === 'settlement') {
        // 直接在循环中更改item，computed监听不到数据变化，所以直接删除并替换数据
        state.billInfo.settlementList.splice(obj.index, 1, { ...obj.data, settlementType: obj.type })
      } else if (obj.info === 'relate') {
        state.billInfo[billList[obj.infoId]].splice(obj.index, 1, { ...obj.data })
      } else if (obj.info === 'balance') {
        state.billInfo.arBillBalanceList.splice(obj.index, 1, { ...obj.data })
      } else if (obj.info === 'expenseList') {
        const expenseType = obj.type
        const itemIdx = obj.index
        let count = -1 // 记录expenseType可以对应上的数据的个数
        let idx0 = 0 // 记录需要替换的数据的下标
        state.billInfo.expenseList.forEach((item, index) => {
          if (item.expenseType === expenseType) {
            count += 1
            if (count === itemIdx) {
              idx0 = index
            }
          }
        })
        state.billInfo.expenseList.splice(idx0, 1, { ...obj.data })
      } else if (obj.info === 'arBill') {
        state.billInfo.arBill = obj.data
      }
    },
    /**
     * 设置地区
     */
    SETAREA (state, arr) {
      state.area = arr
    },
    /**
     * 保存平铺类型的标准信息
     */
    SAVESTANDARD (state, obj) {
      state.standardObj[obj.key] = obj.value
    }
  },
  actions: {
    getRemburseTypeList ({ commit }, arr) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.getRemburseTypeList}?pTypes=${arr}`,
          method: 'get'
        }).then(rs => {
          commit('SETTYPELIST', rs.data)
        })
      })
    },
    /**
     * 获取报销单列表
    */
    getReimburseList ({ commit }, obj) {
      return new Promise((resolve, reject) => {
        // axios.post('/port/A/ar/api/bill/arBill/app/getArBillAll').then((res) => {
        //   commit('SETREIMBURSELIST', res.data)
        //   resolve('success')
        // })
        request({
          url: api.getReimburseList,
          method: 'post',
          data: obj
        }).then(rs => {
          // 返回中的data.offset代表本次请求回数据的起始下标
          if (rs.data.results) {
            if (rs.data.offset + rs.data.results.length < rs.data.total) {
              commit('SETREIMBURSELIST', rs.data.results)
              resolve('success')
            } else if (rs.data.offset + rs.data.results.length === rs.data.total) {
              commit('SETREIMBURSELIST', rs.data.results)
              commit('CHANGEREIMBURSEOVER', true)
              resolve('success')
            } else {
              commit('CHANGEREIMBURSEOVER', true)
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
     * 删除报销单
    */
    deleteReimburseMent ({ commit }, id) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.deleteReimburseMent}/${id}`,
          method: 'DELETE'
        }).then(rs => {
          if (rs.code === 200) {
            resolve()
          }
        })
      })
    },
    /**
     * 获取报销单模版
    */
    getTemplateInfo ({ commit }, obj) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.getTemplateInfo}/${obj.billType}/${obj.templetCode}/${obj.coCode}/${obj.role_code}`,
          method: 'get'
        }).then(rs => {
          if (rs.data) {
            commit('CHANGETMPINFO', rs.data)
            resolve()
          }
        })
      })
    },
    /**
     * 获取已有的汇款转账账户
    */
    getCurrentAccount ({ commit }) {
      return new Promise((resolve, reject) => {
        request({
          url: api.getCurrentAccount,
          method: 'get'
        }).then(rs => {
          if (rs.data) {
            resolve(rs.data)
          }
        })
      })
    },
    /**
     * 获取现有的公务卡账户
    */
    getBusinessAccount ({ commit }, obj) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.getRefInfoList}?billType=${obj.billType}&infoId=${obj.infoId}`,
          method: 'get'
        }).then(rs => {
          if (rs.data) {
            resolve(rs.data.refListData)
          }
        })
      })
    },
    /**
     * 获取支票类型
    */
    getCheckTypeList ({ commit }, obj) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.getRefInfoList}?billType=${obj.billType}&infoId=${obj.infoId}&settlementTypeCode=${obj.settlementTypeCode}`,
          method: 'get'
        }).then(rs => {
          if (rs.data) {
            resolve(rs.data.refListData)
          }
        })
      })
    },
    /**
     * 获取支票类型
    */
    getCashTypeList ({ commit }, obj) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.getRefInfoList}?billType=${obj.billType}&infoId=${obj.infoId}&settlementTypeCode=${obj.settlementTypeCode}`,
          method: 'get'
        }).then(rs => {
          if (rs.data) {
            resolve(rs.data.refListData)
          }
        })
      })
    },
    /**
     * 获取报销单单据数据
     */
    getBillInfo ({ commit }, id) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.getBillInfo}/${id}`,
          method: 'get'
        }).then(rs => {
          if (rs.data) {
            commit('SETBILLINFO', rs.data)
            resolve()
          }
        })
      })
    },
    /**
     * 获取关联单据列表
     */
    getRelateBill ({ commit }, obj) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.getRefInfoList}?infoId=${obj.infoId}&billType=${obj.billType}`,
          method: 'get'
        }).then(rs => {
          if (rs.data) {
            resolve(rs.data)
          }
        })
      })
    },
    /**
     * 获取费用明细相关信息
     */
    getCostItemList ({ commit }, infoId) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.getRefInfoList}?infoId=${infoId}`,
          method: 'get'
        }).then(rs => {
          if (rs.data) {
            resolve(rs.data.refListData)
          }
        })
      })
    },
    getFullArea ({ commit }) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.getFullArea}`,
          method: 'get'
        }).then(rs => {
          if (rs.data) {
            commit('SETAREA', rs.data)
            resolve()
          }
        })
      })
    },
    /**
     * 根据positionCod和billType获取模版templateCode
     */
    getPositionList ({ commit }, obj) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.getPositionList}?billType=${obj.billType}&positionCode=${obj.positionCode}`,
          method: 'get'
        }).then(rs => {
          if (rs.flag === 'SUCCESS') {
            resolve(rs.data[0])
          } else {
            MessageBox('提示', rs.msg)
          }
        })
      })
    },
    /*
     * 获取报销基本信息报销部门
    */
    getDepartmentList ({ commit }, obj) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.getRefInfoList}?infoId=${obj.infoId}&billType=${obj.billType}&areaInfoCode=${obj.areaInfoCode}`,
          method: 'get'
        }).then(rs => {
          if (rs.data) {
            resolve(rs.data)
          }
        })
      })
    },
    // 根据报销部门，获取报销人信息
    getHumanList ({ commit }, obj) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.getRefInfoList}?orgCode=${obj.orgCode}&billType=${obj.billType}&areaInfoCode=${obj.areaInfoCode}&infoId=${obj.infoId}`,
          method: 'get'
        }).then(rs => {
          if (rs.data) {
            resolve(rs.data)
          }
        })
      })
    },
    /**
     * 根据明细类型获取对应条目之间的关联情况
    */
    getFunc ({ commit }, obj) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.getFunc}?expenseType=${obj.expenseType}&templateCode=${obj.templetCode}`,
          method: 'get'
        }).then(rs => {
          if (rs.data) {
            resolve(rs.data)
          }
        })
      })
    },
    /**
     * 根据影响因素获取标准
     */
    queryTravelStandard ({ commit }, obj) {
      return new Promise((resolve, reject) => {
        request({
          url: api.queryTravelStandard,
          method: 'post',
          data: obj
        }).then(rs => {
          if (rs.data) resolve(rs.data)
        })
      })
    },
    // 获取会议计划信息
    getMettingPlan ({ commit }, obj1) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.getRefInfoList}?infoId=${obj1.infoId}&orgCode=${obj1.orgCode}`,
          method: 'get'
        }).then(rs => {
          if (rs.data) {
            resolve(rs.data)
          }
        })
      })
    },
    /**
     * 指标信息，选择项目
     */
    getProInfo ({ commit }, obj) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.getRefInfoList}?infoId=${obj.infoId}&userId=${obj.userId}&appId=${obj.appId}`,
          method: 'get'
        }).then(rs => {
          if (rs.data) resolve(rs.data)
        })
      })
    },
    /**
     * 获取对应的指标信息
     */
    getTargets ({ commit }, obj) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.getTargets}?projectCode=${obj.projectCode}&departmentCode=${obj.departmentCode}&tabName=${obj.tabName}&billType=${obj.billType}&expecoCode=`,
          method: 'get'
        }).then(rs => {
          if (rs.data && rs.data.refListData) resolve(rs.data.refListData)
        })
      })
    },
    /**
     * 检查单据
     */
    checkBill ({ commit }, obj) {
      const tmp = reimbursement.state.templateInfo
      const showType = tmp.showType
      const templetCode = Auth.getStorage('templetCode')
      const billType = Auth.getStorage('billType')
      obj.expenseList.forEach(item => {
        for (let key in item) {
          if (item[key] instanceof Array) {
            item[key] = JSON.stringify(item[key])
          }
        }
      })
      let obj1 = { showType, templetCode, billType, expenseList: obj.expenseList }
      return new Promise((resolve, reject) => {
        request({
          url: api.checkBill,
          method: 'post',
          data: obj1
        }).then(rs => {
          if (rs.data) resolve(rs.data)
          else { MessageBox('提示', rs.msg) }
        })
      })
    },
    /**
     * 保存单据
     */
    saveBill ({ commit }, obj) {
      if (obj.expenseList) {
        let billMoney = 0
        obj.expenseList.forEach((item) => {
          billMoney += Number(item.money)
        })
        obj.arBill.billMoney = billMoney
      }
      obj.arBill.setYear = JSON.parse(Auth.getStorage('userInfo')).setYear
      return new Promise((resolve, reject) => {
        request({
          url: api.saveBill,
          method: 'post',
          data: obj
        }).then(rs => {
          if (rs.flag === 'SUCCESS') resolve(rs.data)
          else {
            MessageBox('提示', rs.msg)
          }
        })
      })
    },
    /**
     * 根据会议类别获取综合定额标准
     */
    getRatiStandOfMeet ({ commit }, meetingType) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.getRatiStandOfMeet}?meetingTypeVal=${meetingType}&coCode=${JSON.parse(Auth.getStorage('userInfo')).coCode}`,
          method: 'get'
        }).then(rs => {
          resolve(rs.data)
        })
      })
    },
    /**
     * 根据培训类别获取综合定额标准
     */
    getRatiStandOftrain ({ commit }, trainType) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.getRatiStandOftrain}?trainningTypeVal=${trainType}&coCode=${JSON.parse(Auth.getStorage('userInfo')).coCode}`,
          method: 'get'
        }).then(rs => {
          resolve(rs.data)
        })
      })
    }
  }
}
export default reimbursement
