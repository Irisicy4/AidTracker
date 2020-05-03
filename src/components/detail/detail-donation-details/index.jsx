import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {
  static defaultProps = {
    title: '捐赠物资申请表明细',
    materialDetail: {
      materialTypes: '医用口罩',
      materialSpecifications: 'N95',
      manufacturer: '合肥医药制品厂',
      planToDonate: '5000枚'
    },
    estimatedDelivery: {
      materialStatus: '等待供应中',
      shippingMethods: '现货',
      deliveryAddress: '广东省佛山市'
    },
    contactDetails: {
      contactPerson: '祝融',
      phone: '13512345678',
      weixin: 'weiixnhao'
    },
    note: ''
  }

  renderMaterialDetail(detail) {
    return (
      <View className='box'>
        <Text className='sub-title'>物资详情</Text>
        <Text>物资种类：{detail.materialTypes}</Text>
        <Text>物资规格：{detail.materialSpecifications}</Text>
        <Text>生产厂家：{detail.manufacturer}</Text>
        <Text>计划捐赠：{detail.planToDonate}</Text>
      </View>
    )
  }

  renderContactDetails(detail) {
    return (
      <View className='box'>
        <Text className='sub-title'>联系方式</Text>
        <Text>联系人：{detail.contactPerson}</Text>
        <Text>联系方式：</Text>
        <Text>(电话) {detail.phone}</Text>
        <Text>(微信) {detail.weixin}</Text>
      </View>
    )
  }

  renderNote(note) {
    if (note === '' || note === undefined || note === null) {
      return (
        <View className='box'>
          <Text className='sub-title'>备注</Text>
          <Text>无</Text>
        </View>
      )
    }
    return (
      <View className='box'>
        <Text className='sub-title'>备注</Text>
        <Text>{note}</Text>
      </View>
    )
  }

  render() {
    const {
      title,
      materialDetail,
      estimatedDelivery,
      contactDetails,
      note
    } = this.props
    return (
      <View>
        <Text className='title'>{title}</Text>
        {materialDetail && this.renderMaterialDetail(materialDetail)}
        {estimatedDelivery && this.renderMaterialDetail(estimatedDelivery)}
        {contactDetails && this.renderContactDetails(contactDetails)}
        {(note !== undefined || note !== null) && this.renderNote(note)}
      </View>
    )
  }
}
