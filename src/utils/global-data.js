const globalData = {
  role: 'supplier', //捐赠方(supplier)or受赠方(demander)
  baseToken: '',
  accessToken: '',
  userInfo: ''
}

export const setGlobalData = (key, value) => {
  globalData[key] = value
}

export const getGlobalData = key => globalData[key]
