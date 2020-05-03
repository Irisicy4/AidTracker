import Taro from '@tarojs/taro'
import { getGlobalData } from './global-data'

const DONOR = 'supplier'
const RECEIVER = 'demander'

export const isDonor = () => getGlobalData('role') === DONOR
export const isReceiver = () => getGlobalData('role') === RECEIVER

const ROLE = {
  [DONOR]: () => {
    Taro.setTabBarItem({
      index: 0,
      text: '需求列表'
    })

    // Taro.setNavigationBarTitle({
    //   title: 'Aid Tracter'
    // })
  },
  [RECEIVER]: () => {
    Taro.setTabBarItem({
      index: 0,
      text: '我的需求'
    })
  }
}

export const setTabbar = () => {
  console.log(getGlobalData('accessToken'))
  ROLE[getGlobalData('role')]()
}
