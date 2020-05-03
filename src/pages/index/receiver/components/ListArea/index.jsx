import Taro, { useState } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtButton, AtTabs, AtTabsPane  } from 'taro-ui'
import './index.scss'

export default function ListArea(props) {
  // config = {}
    const receiverState = props.receiverState;


    return (
      <View>

          {receiverState==0
              ? <View className='receiverTitleArea'>
                  <Text className='receiverTitle'>共有 02 个正在进行的项目，合计：/n</Text>
                  <Text className='receiverTitle'>对接中 02，运输中 06，待发证明 08，已完成 22</Text>
                </View>
              : ""
          }


      </View>
    )

}
