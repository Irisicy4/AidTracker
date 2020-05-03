import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import CustomInput from '@components/custom-input'
import CustomRadioGroup from '@components/custom-radio-group'
import './index.scss'

export default class Index extends Component {
  state = {
    statusList: [
      {
        value: 'spot',
        text: '现货',
        checked: false
      },
      {
        value: 'wait',
        text: '等待供应中',
        checked: true
      }
    ],
    methedList: [
      {
        value: 'delivery',
        text: '送货上门',
        checked: false
      },
      {
        value: 'pickUp',
        text: '受赠方自取',
        checked: true
      }
    ],
    detail: {
      materialTypes: '',
      materialSpecifications: '',
      manufacturer: '',
      amount: '',
      unit: '',
      suppliesStatus: 'delivery',
      shippingMethods: 'spot',
      deliveryAddress: '',
      contactPerson: '',
      contactDetails: '',
      note: ''
    }
  }
  config = {
    navigationBarTitleText: '物资捐赠表'
  }

  handleChange = (e, key) => {
    this.setState(pre => ({
      detail: Object.assign(pre.detail, {
        [key]: e
      })
    }))
  }

  handleClick = () => {
    console.log(this.state.detail)
    Taro.navigateTo({
      url: '/pages/detail/donator/detail-receipt/index?id: 1'
    })
  }

  render() {
    const { statusList, methedList } = this.state
    return (
      <View className='donate-form'>
        <View className='tips'>
          提示：您在此页面填写的信息将直接发给受捐方审核；如需受捐方联系方式，请前往“我的项目”页面
        </View>

        <View className='detail'>
          <View className='title'>物资详情</View>
          <CustomInput
            label='物资种类'
            onInput={e => this.handleChange(e.target.value, 'materialTypes')}
          ></CustomInput>
          <CustomInput
            label='物资规格'
            onInput={e =>
              this.handleChange(e.target.value, 'materialSpecifications')
            }
          ></CustomInput>
          <CustomInput
            label='生产厂家'
            onInput={e => this.handleChange(e.target.value, 'manufacturer')}
          ></CustomInput>

          <View className='label'>计划捐赠：</View>
          <View className='row-box'>
            <Text className='row-label'>数量</Text>
            <CustomInput
              type='number'
              placeholder='输入数字'
              customStyle={{ width: '360rpx' }}
              onInput={e => this.handleChange(e.target.value, 'amount')}
            ></CustomInput>

            <Text className='row-label' style='padding-left: 20px'>
              单位
            </Text>
            <CustomInput
              placeholder='枚'
              customStyle={{ width: '146rpx' }}
              onInput={e => this.handleChange(e.target.value, 'unit')}
            ></CustomInput>
          </View>
        </View>

        <View className='payment-method'>
          <View className='title'>预计交付方式（后续细化）</View>
          <View className='row-box'>
            <Text className='row-label'>物资状态：</Text>
            <CustomRadioGroup
              list={statusList}
              onChange={e =>
                this.handleChange(e.detail.value, 'suppliesStatus')
              }
            ></CustomRadioGroup>
          </View>
          <View className='row-box'>
            <Text className='row-label'>物流方式：</Text>
            <CustomRadioGroup
              list={methedList}
              onChange={e =>
                this.handleChange(e.detail.value, 'suppliesMethods')
              }
            ></CustomRadioGroup>
          </View>
          <CustomInput
            label='发货地址'
            onInput={e => this.handleChange(e.target.value, 'deliveryAddress')}
          ></CustomInput>
        </View>

        <View className='contact'>
          <View className='title'>联系方式</View>
          <CustomInput
            label='联系人'
            onInput={e => this.handleChange(e.target.value, 'contactPerson')}
          ></CustomInput>
          <CustomInput
            label='联系方式'
            onInput={e => this.handleChange(e.target.value, 'contactDetails')}
          ></CustomInput>
        </View>

        <View className='other'>
          <View className='title'>备注</View>
          <CustomInput
            onInput={e => this.handleChange(e.target.value, 'note')}
          ></CustomInput>
        </View>

        <AtButton type='primary' className='btn' onClick={this.handleClick}>
          发送给受赠方
        </AtButton>
      </View>
    )
  }
}
