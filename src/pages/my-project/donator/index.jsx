import Taro, { Component } from '@tarojs/taro'
import { AtTabs, AtTabsPane } from 'taro-ui'
import './index.scss'
import Preparation from './preparation'

export default class Donator extends Component {
  state = {
    current: 0
  }

  config = {}

  handleClick(value) {
    this.setState({
      current: value
    })
  }

  render() {
    return (
      <AtTabs
        current={this.state.current}
        tabList={[
          { title: '筹备中' },
          { title: '运输中' },
          { title: '已完成' }
        ]}
        onClick={this.handleClick.bind(this)}
      >
        <AtTabsPane current={this.state.current} index={0}>
          <Preparation type='preparation'></Preparation>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1}>
          <Preparation type='inTransit'></Preparation>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={2}>
          <Preparation type='comleted'></Preparation>
        </AtTabsPane>
      </AtTabs>
    )
  }
}
