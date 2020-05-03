import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import CustomInput from '@components/custom-input'
import classNames from 'classnames'
import request from '@services/api'
import eventEmitter from '@utils/event'
import './index.scss'
import { getGlobalData, setGlobalData } from '../../utils/global-data'

export default class Index extends Component {
  state = {
    list: [
      {
        name: '个人',
        value: 'myself',
        isChecked: false
      },
      {
        name: '学校',
        value: 'school',
        isChecked: false
      },
      {
        name: '企业',
        value: 'company',
        isChecked: false
      },
      {
        name: '其他团体（有国家慈善认证)',
        value: 'other_have',
        isChecked: false
      },
      {
        name: '其他团体（无国家慈善认证)',
        value: 'other_no',
        isChecked: false
      }
    ],
    selectValue: '',
    orgName: '',
    orgType: '',
    supplierLocation: ''
  }
  config = {
    navigationBarTitleText: '注册'
  }

  handleClick(item) {
    console.log(this.state.selectValue)
    this.setState(pre => ({
      selectValue: pre.selectValue.push(item.value),
      list: pre.list.map(v => {
        if (v.value === item.value) {
          return Object.assign(v, {
            isChecked: !v.isChecked
          })
        }
        return v
      })
    }))
  }

  renderTag(item) {
    return (
      <Text
        className={classNames({ tag: true, 'tag-active': item.isChecked })}
        onClick={this.handleClick.bind(this, item)}
      >
        {item.name}
      </Text>
    )
  }

  handleChange = (value, key) => {
    this.setState({
      [key]: value
    })
  }

  getId() {
    return this.$router.params.id
  }

  handleSubmit = async () => {
    const res = await request.post('/api-user-fill', {
      id: this.getId(),
      role: getGlobalData('role'),
      orgName: this.state.orgName,
      orgType: this.state.orgType,
      supplierLocation: this.state.supplierLocation
    })

    setGlobalData('userInfo', res.data.data)
    setGlobalData('role', res.data.data.role)
    eventEmitter.emit('refresh')
    Taro.switchTab({
      url: '/pages/index/index'
    })
  }

  render() {
    // const { orgType, orgName, supplierLocation } = this.state
    return (
      <View className='registered'>
        <Text className='title'>捐赠者信息完善</Text>

        <CustomInput
          label='名称'
          onInput={e => this.handleChange(e.target.value, 'orgName')}
        ></CustomInput>
        <CustomInput
          label='所在地'
          onInput={e => this.handleChange(e.target.value, 'supplierLocation')}
        ></CustomInput>
        <CustomInput
          label='规模'
          onInput={e => this.handleChange(e.target.value, 'orgType')}
        ></CustomInput>
        {/* <View className='type'>
          <View className='sub-title'>规模资质</View>
          <View className='select'>
            {list.map(item => (
              <View key={item.value}>{this.renderTag(item)}</View>
            ))}
          </View>
        </View> */}

        <AtButton type='primary' onClick={this.handleSubmit}>
          完善信息
        </AtButton>
      </View>
    )
  }
}
