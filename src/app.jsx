import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
  config = {
    pages: [
      // 'pages/index/index',
      'pages/newOrder/donator/index',
      'pages/start/index',
      'pages/login/index',
      'pages/index/index',
      'pages/my-project/index',
      'pages/me/index',
      'pages/detail/donator/detail-receipt/index',
      'pages/detail/donator/detail-preparation/index',
      'pages/detail/donator/detail-doing/index',
      'pages/edit/donator/donate-form/index',
      'pages/registered/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      borderStyle: 'black',
      selectedColor: '#454166',
      list: [
        {
          pagePath: 'pages/index/index',
          iconPath: './assets/images/bar_need_list.png',
          selectedIconPath: './assets/images/bar_need_list_active.png',
          text: '需求列表'
        },
        {
          pagePath: 'pages/my-project/index',
          iconPath: './assets/images/bar_my_project.png',
          selectedIconPath: './assets/images/bar_my_project_active.png',
          text: '我的项目'
        },
        {
          pagePath: 'pages/me/index',
          iconPath: './assets/images/bar_user_center.png',
          selectedIconPath: './assets/images/bar_user_center_active.png',
          text: '个人中心'
        }
      ]
    }
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Index />
  }
}

Taro.render(<App />, document.getElementById('app'))
