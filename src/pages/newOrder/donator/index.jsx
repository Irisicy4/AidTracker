import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input } from '@tarojs/components'
import { AtButton, AtInput } from 'taro-ui'
import CustomInput from '@components/custom-input'
import classNames from 'classnames'
import request from '@services/api'
import eventEmitter from '@utils/event'
import './index.scss'
import { getGlobalData, setGlobalData } from '../../utils/global-data'

export default class Index extends Component {
  state = {
    materialName:'',
    materialType:'',
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
    navigationBarTitleText: '新建项目'
  }

  async componentWillMount() {

    this.setState({materialName:'医用口罩',materialType:'只'})
  }


  // handleSubmit = async () => {
  //   const res = await request.post('/api-user-fill', {
  //     id: this.getId(),
  //     role: getGlobalData('role'),
  //     orgName: this.state.orgName,
  //     orgType: this.state.orgType,
  //     supplierLocation: this.state.supplierLocation
  //   })
  //
  //   setGlobalData('userInfo', res.data.data)
  //   setGlobalData('role', res.data.data.role)
  //   eventEmitter.emit('refresh')
  //   Taro.switchTab({
  //     url: '/pages/index/index'
  //   })
  // }
  materialNameOnChange = (e) =>{
    this.setState({materialName:e},()=>{console.log(this.state.materialName)})
  }
  materialTypeOnChange = (e) =>{
    this.setState({materialType:e},()=>{console.log(this.state.materialType)})
  }

  render() {
    // const { orgType, orgName, supplierLocation } = this.state
    return (
      <View>
        <View className='area'>
          <View className='title'>物资详情</View>
          <View className='subTitle'>物资种类：</View>
          <View ><AtInput className='input' type='text' value={this.state.materialName} onChange={this.materialNameOnChange.bind(this)}  /> </View>
          <View className='subTitle'>物资规格：</View>
          <View ><AtInput className='input' type='text' value={this.state.materialType} onChange={this.materialTypeOnChange.bind(this)}  /> </View>

        </View>

      </View>
    )
  }
}
