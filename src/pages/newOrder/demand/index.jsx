import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtButton, AtSearchBar } from 'taro-ui'
import CardTitle from '@components/card/card-title'
import CardProgress from '@components/card/card-progress'
import CardContent from '@components/card/card-content'
import CardStatus from '@components/card/card-status'
import './index.scss'
import "taro-ui/dist/style/components/search-bar.scss"
import "taro-ui/dist/style/components/button.scss";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/index.scss";

export default class Index extends Component {
  state = {
    detail: {
      title: '急需1万个口罩',
      publishTime: '2020/03/05',
      applicationTime: '2020/03/06',
      demandSupplies: 'N95口罩',
      totalDemand: 10000,
      sponsor: '武汉某某医院',
      position: '湖北省武汉市',
      totalCount: 10000,
      finishCount: 3000
    }
      
  }
  config = {}
  getId() {
    return this.$router.params.id
  }
  //startPullDownRefresh(params)

  
  // constructor () {
  //   super(...arguments)
  //   this.state = {
  //     value: ''
  //   }
  // }
  onChange (value) {
    this.setState({
      value: value
    })
  }
  onActionClick () {
    console.log('开始搜索')
  }

  getDetailId() {
    return this.$router.params.id
  }

  enablePullDownRefresh(){
    true;
  }
  
  render () {
    const { detail } = this.state

    return (
      <View className = 'search'>
      <AtSearchBar
        inputType='number'
        value={this.state.value}
        onChange={this.onChange.bind(this)}
        onActionClick={this.onActionClick.bind(this)}
      />
      <View className= 'btn'>
      <Button type='secondary' size='mini'>综合排序</Button>
      <Button type='secondary' size='mini'>距离近</Button>
      <Button type='secondary' size='mini'>新发布</Button> 

        <View className='detail'>  
  
              <Card customStyle={{ margin: '12rpx 0 57rpx 0' }}>
                <CardTitle title={detail.title}></CardTitle>
               
                <CardProgress
                  totalCount={detail.count}
                  finishCount={detail.finishCount}
                ></CardProgress>
                 <CardStatus> </CardStatus>
                <CardContent
                  publishTime={detail.publishTime}
                  demandSupplies={detail.demandSupplies}
                  totalDemand={detail.totalDemand}
                  sponsor={detail.sponsor}
                  position={detail.position}
                ></CardContent>
              </Card>
        
              <Card customStyle={{ margin: '12rpx 0 57rpx 0' }}>
                <CardTitle title={detail.title}></CardTitle>
                <CardStatus></CardStatus>
                <CardProgress
                  totalCount={detail.count}
                  finishCount={detail.finishCount}
                ></CardProgress>
                <CardContent
                  publishTime={detail.publishTime}
                  demandSupplies={detail.demandSupplies}
                  totalDemand={detail.totalDemand}
                  sponsor={detail.sponsor}
                  position={detail.position}
                ></CardContent>
              </Card> 
   
     </View>  
     </View>
     </View>
    )
  }
}
