import Taro, { useState } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtButton, AtTabs, AtTabsPane  } from 'taro-ui'
import ListArea from "./components/ListArea";
import './index.scss'

export default function Receiver() {
  // config = {}
    const [current,setCurrent] = useState(0);

  const handleClick = () => {
    Taro.navigateTo({
      url: '/pages/login/index'
    })
  }

    const tabList = [{ title: '正在进行' }, { title: '已完成' }]

    return (
      <View>
          <View className='receiverMineTitleArea'>
              <Text className='receiverMineTitle'>我的项目</Text>
          </View>
          <AtTabs current={current} tabList={tabList} onClick={(e)=>{setCurrent(e)}}>
              <AtTabsPane current={current} index={0} >
                  <ListArea receiverState={0} />
                  <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;' >标签页一的内容</View>

              </AtTabsPane>
              <AtTabsPane current={current} index={1} >
                  <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;' >标签页一的内容</View>
              </AtTabsPane>
          </AtTabs>

        <AtButton type='primary' onClick={handleClick}>
          返回
        </AtButton>
      </View>
    )

}
