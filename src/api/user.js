const user = {
  getIfBind: '/port/A/ar/api/app/appLogin/login/',
  ddLogin: '/port/A/ar/api/app/appLogin/bindLogin',
  login: '/port/A/ar/api/app/appLogin/normalLogin', // 登录接口
  pwdConfirm: '/port/A/ar/api/app/appUser/changePwd', // 确认密码
  cwGetUserInfo: '/port/A/ar/api/app/appUser/getUserInfoByTokenId', // 财务云获取用户信息接口
  pfGetUserInfo: '/port/pf/portal/initIndex.do', // 门户获取用户信息接口
  loginOut: '/port/pf/login/loginOut.do', // 退出登录
  getRoleList: '/port/A/ar/api/app/appUser/getPermissionsRole', // 获取角色列表
  getAgencyList: '/port/A/ar/api/app/appUser/getPermissionsAgency', // 获取单位列表
  getIfVerify: '/port/pf/login/LoginPageSet.do', // 获取是否校验
  saveDefaultSetting: '/port/pf/portal/saveDefaultSetting.do', // 将修改的用户信息设为默认并应用
  saveBaseDataToSession: '/port/A/ar/api/app/appUser/updateToken', // 应用修改的用户信息
  getMenuByRole: `/port/A/ar/api/app/protal/getMenuByRole`, // 角色权限查询
  getMenuListByRole: `/port/A/ar/api/app/protal/getMenuListByRole` // 根据角色查看控制台列表
}
export default user
