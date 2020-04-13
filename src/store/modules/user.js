import request from '@/utils/request'
import { api } from '@/api'
import * as Auth from '@/utils/auth'
import { MessageBox } from 'mint-ui'
import md5 from 'js-md5'
const user = {
  state: {
    tokenid: Auth.getStorage('tokenid'),
    userInfo: {}
  },
  mutations: {
    CLEAR () {
      Auth.clear()
    },
    SET_TOKEN (state, tokenid) {
      Auth.setStorage('tokenid', tokenid)
      state.tokenid = tokenid
    },
    SET_USERINFO (state, info) {
      /*
      * 防止用户刷新，遗失数据，将请求得到的userInfo进行缓存
      */
      Auth.setStorage('userInfo', JSON.stringify(info))
      console.log(info, '这是用户信息')
      state.userInfo = info
    }
  },
  actions: {
    ddLogin ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        request({
          url: api.ddLogin,
          method: 'post',
          contentType: 'application/json',
          data: userInfo
        }).then(rs => {
          if (rs.data.tokenid) {
            commit('SET_TOKEN', rs.data.tokenid)
            resolve()
          } else {
            MessageBox('提示', `获取tokenid失败,result=${rs.data.result}`)
          }
        }).catch(error => reject(error))
      })
    },
    login ({ commit }, userInfo) {
      userInfo.password = md5(userInfo.password)
      return new Promise((resolve, reject) => {
        request({
          url: api.login,
          method: 'post',
          contentType: 'application/json',
          data: userInfo
        }).then(rs => {
          console.log(rs)
          if (rs.flag === 'SUCCESS') {
            Auth.setStorage('tokenid', rs.data.tokenid)
            resolve(rs)
          } else {
            switch (rs.data && rs.data.result) {
              case '0': MessageBox('提示', '用户名或密码错误'); break
              case '2': MessageBox('提示', '用户名或密码错误'); break
              case '3': MessageBox('提示', '用户已被锁定'); break
              case '4': MessageBox('提示', '用户已被停用'); break
              case '5': MessageBox('提示', '密码已被修改'); break
              case '6': MessageBox('提示', '验证码不正确'); break
              case '7': MessageBox('提示', '系统错误'); break
              case '8': MessageBox('提示', '账户异常'); break
              case '9': MessageBox('提示', '区划不正确'); break
            }
          }
        }).catch(error => reject(error))
      })
    },
    pwdConfirm ({ commit }, pwd) {
      const obj = {}
      obj.password = md5(pwd)
      return new Promise((resolve, reject) => {
        request({
          url: api.pwdConfirm,
          method: 'post',
          contentType: 'application/json',
          data: obj
        }).then(rs => {
          if (rs.flag === 'SUCCESS') {
            resolve()
          }
        }).catch(error => reject(error))
      })
    },
    /**
     * 退出登录
     */
    loginOut ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        request({
          url: api.loginOut,
          method: 'get'
        }).then(rs => {
          if (rs) {
            commit('CLEAR')
            MessageBox('提示', '退出登录成功')
            resolve()
          }
        }).catch(error => reject(error))
      })
    },
    /*
    * 根据tokenid获取用户信息
    */
    cwGetUserInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.cwGetUserInfo}`,
          method: 'get'
        }).then(rs => {
          if (rs.data) {
            Auth.setStorage('userInfo', JSON.stringify({ ...rs.data, ...rs.data.sessionMap }))
            resolve(rs.data)
          }
        }).catch(error => reject(error))
      })
    },
    pfGetUserInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.pfGetUserInfo}?tokenid=${Auth.getStorage('tokenid')}`,
          method: 'get'
        }).then(rs => {
          if (rs) resolve()
        }).catch(error => reject(error))
      })
    },
    /**
     * 钉钉小程序根据authCode获取用户是否绑定，如果已绑定返回tokenid，未绑定返回ddToken，再填入用户名密码进行登录绑定
     */
    getIfBind ({ commit }, authCode) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.getIfBind}${authCode}`,
          method: 'get'
        }).then(rs => {
          if (rs.isBind === 'Y') {
            commit('SET_TOKEN', rs.tokenid)
          }
          resolve(rs)
        }).catch(error => { MessageBox('提示', `错误码为${error}`) })
      })
    },
    // 获取角色列表
    getRoleList ({ commit }, obj) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.getRoleList}`,
          method: 'get'
        }).then(rs => {
          if (rs && rs.data) {
            resolve(rs.data)
          }
        })
      })
    },
    // 获取单位列表
    getAgencyList ({ commit }, obj) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.getAgencyList}/${obj.roleId}`,
          method: 'get'
        }).then(rs => {
          if (rs && rs.data) {
            resolve(rs.data)
          }
        })
      })
    },
    /*
    * 获取是否需要验证码
    */
    getIfVerify ({ commit }) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.getIfVerify}`,
          method: 'get'
        }).then(rs => {
          resolve(rs)
        }).catch(error => reject(error))
      })
    },
    saveDefaultSetting ({ commit }, obj) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.saveDefaultSetting}?userId=${obj.userId}&svAgencyCode=${obj.svAgencyCode}&svAgencyName=${obj.svAgencyName}&svAccountCode=${obj.svAccountCode}&svAccountName=${obj.svAccountName}&svRoleId=${obj.svRoleId}&svRoleCode=${obj.svRoleCode}&svRoleName=${obj.svRoleName}&svTransDate=${obj.svTransDate}&setYear=${obj.setYear}`,
          method: 'get'
        }).then(rs => {
          resolve(rs)
        })
      })
    },
    saveBaseDataToSession ({ commit }, obj) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.saveBaseDataToSession}`,
          method: 'post',
          data: obj
        }).then(rs => {
          resolve(rs)
        })
      })
    },
    // 角色权限查询
    getMenuByRole ({ commit }, roleId) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.getMenuByRole}?roleId=${roleId}`,
          method: 'get'
        }).then(rs => {
          if (rs.data) {
            resolve(rs.data)
          }
        })
      })
    },
    // 根据角色查看控制台列表
    getMenuListByRole ({ commit }, roleId) {
      return new Promise((resolve, reject) => {
        request({
          url: `${api.getMenuListByRole}?roleId=${roleId}`,
          method: 'get'
        }).then(rs => {
          if (rs.data) {
            Auth.setStorage('menuList', JSON.stringify(rs.data))
            resolve(rs.data)
          }
        })
      })
    }
  }
}
export default user
