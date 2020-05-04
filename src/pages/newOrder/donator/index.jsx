import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input, Icon, Picker } from '@tarojs/components'
import { AtButton, AtInput, AtSwitch, AtTextarea, AtMessage  } from 'taro-ui'
import CustomInput from '@components/custom-input'
import classNames from 'classnames'
import request from '@services/api'
import eventEmitter from '@utils/event'
import './index.scss'
import { getGlobalData, setGlobalData } from '../../utils/global-data'

export default class Index extends Component {
  state = {
    materialName:'',  //物资种类
    materialType:'', //物资规格
    factoryName:'', //生产厂家
    countNumber:'', //数量
    unit:'',  //单位
    transTypeSelected:'请选择', //选择运输方式
    add:'', //用户提交的地址
    post:'',  //用户提交的邮编
    reciverSAdd:'',   //求助人的地址
    reciverSPost:'',  //求助人的邮编
    contactPersonName:'', //联系人姓名
    contactPersonPhone:'', //联系人手机号
    contactPersonWechat:'', //联系人微信
    isPhoneSelected:'', //手机是否被选择
    isWechatSelected:'', //微信是否被选择
    firstSelected:'请选择', //第一个选择的
    secondSelected:'请选择',  //第二个选择
    contactCount:1, //添加了几个联系方式
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

    this.setState({materialName:'医用口罩',materialType:'只',unit:'枚',reciverSAdd:'河南省焦作市山阳区馨园小区',reciverSPost:'454002'})
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
  //物资种类
  materialNameOnChange = (e) =>{
    this.setState({materialName:e},()=>{console.log(this.state.materialName)})
  }
  //物资规格
  materialTypeOnChange = (e) =>{
    this.setState({materialType:e},()=>{console.log(this.state.materialType)})
  }
  //生产厂家
  factoryNameOnChange = (e) =>{
    this.setState({factoryName:e},()=>{console.log(this.state.factoryName)})
  }
  //
  countNumberOnChange=(e)=>{
    this.setState({countNumber:e},()=>{console.log(this.state.countNumber)})
  }
  unitOnChange=(e)=>{
    this.setState({unit:e},()=>{console.log(this.state.unit)})
  }
  transTypeOnChange=(e)=>{
    console.log(e);
    let transType = '';
    if(e.detail.value == '0'){
      transType = '捐赠方负责运输'
    } else if(e.detail.value == '1'){
      transType = '受赠方自取'
    }
    this.setState({transTypeSelected:transType},()=>{console.log(this.state.transTypeSelected)})
  }
  handleSwitchChange=(e)=>{
    console.log(e);
    if(e){
      this.setState({add:this.state.reciverSAdd,post:this.state.reciverSPost})
    } else {
      this.setState({add:'',post:''})
    }
  }
  firstSelectedOnChange=(e)=>{
    console.log(e);
    let contactType = '';
    if(e.detail.value == '0'){
      contactType = '手机号'
    } else if(e.detail.value == '1'){
      contactType = '微信号'
    }
    this.setState({firstSelected:contactType,contactPersonPhone:'',contactPersonWeChat:''},()=>{console.log(this.state.firstSelected)})
  }
  secondSelectedOnChange=(e)=>{
    console.log(e);
    let contactType = '';
    if(e.detail.value == '0'){
      if(this.state.firstSelected == '手机号'){
        Taro.atMessage({
          'message': '手机号已经被选择过，请重新选择',
          'type': 'error',
        })
        Taro.showToast({
          title: '手机号已经被选择过，请重新选择',
          duration: 5000,
        })
        return;
      }
      contactType = '手机号'
    } else if(e.detail.value == '1'){
      if(this.state.firstSelected == '微信号'){
        Taro.atMessage({
          'message': '微信号已经被选择过，请重新选择',
          'type': 'error',
        })
        Taro.showToast({
          title: '微信号已经被选择过，请重新选择',
          duration: 5000,
        })
        return;
      }
      contactType = '微信号'
    }
    this.setState({secondSelected:contactType},()=>{console.log(this.state.secondSelected)})
  }
  addHandleChange=(e)=>{
    console.log(e);
    this.setState({add:e.target.value})
  }
  postHandleChange=(e)=>{
    this.setState({post:e},()=>{console.log(this.state.post)});
  }
  firstContactOnChange=(e)=>{
    if(this.state.firstSelected == '手机号'){
      this.setState({contactPersonPhone:e},()=>{console.log('contactPersonPhone',this.state.contactPersonPhone)})
    } else if(this.state.firstSelected == '微信号'){
      this.setState({contactPersonWechat:e},()=>{console.log('contactPersonWechat',this.state.contactPersonWechat)})
    }
  }
  secondContactOnChange=(e)=>{
    if(this.state.secondSelected == '手机号'){
      this.setState({contactPersonPhone:e},()=>{console.log('contactPersonPhone',this.state.contactPersonPhone)})
    } else if(this.state.secondSelected == '微信号'){
      this.setState({contactPersonWechat:e},()=>{console.log('contactPersonWechat',this.state.contactPersonWechat)})
    }
  }
  addContact=()=>{
    this.setState({contactCount:2})
  }

  render() {
    // const { orgType, orgName, supplierLocation } = this.state
    const transType = ['捐赠方负责运输','受赠方自取']
    const contactType = ['手机号','微信号']
    return (
      <View>
        <AtMessage />
        <View className='notice'>
          <Text>提示：您在此页面填写的信息将直接发给受捐方审核；如需受赠方联系方式，请前往“我的项目”页面</Text>
        </View>

        <View className='area'>
          <View className='title'>物资详情</View>
          <View className='subTitle'>物资种类：</View>
          <View ><AtInput className='input' type='text' value={this.state.materialName} onChange={this.materialNameOnChange.bind(this)}  /> </View>
          <View className='subTitle'>物资规格：</View>
          <View><AtInput className='input' type='text' value={this.state.materialType} onChange={this.materialTypeOnChange.bind(this)}  /> </View>
          <View style={{margin:'12rpx 12rpx'}} ><Icon color='#F3E29A' size='14' type='warn' /><Text style={{color:'#BFB06B',fontFamily:'Segoe UI',fontSize:'28rpx',marginLeft:'12rpx',top:'-3rpx'}} >规格与需求不一致，请填写完后续与需求方沟通</Text> </View>
          <View className='subTitle'>生产厂家：</View>
          <View><AtInput className='input' type='text' placeholder='请填入生产厂商名称' value={this.state.factoryName} onChange={this.factoryNameOnChange.bind(this)}  /> </View>
          <View className='subTitle'>计划捐赠数量：</View>
          <View style={{display:'flex',justifyContent:'center',marginLeft:'-36rpx'}} >
            <View style={{padding:'18rpx 0rpx',color:'#353535'}} >数量</View>
            <View style={{marginRight:'38rpx',marginLeft:'12rpx'}} ><AtInput className='inputNum' type='number' placeholder='请填入数量' value={this.state.countNumber} onChange={this.countNumberOnChange.bind(this)}  /></View>
            <View style={{padding:'18rpx 0rpx',color:'#353535'}} >单位</View>
            <View style={{marginLeft:'12rpx'}} ><AtInput className='inputUnit' value={this.state.unit} onChange={this.unitOnChange.bind(this)}  /></View>
          </View>          
        </View>
        
        <View className='area'>
          <View className='title'>预计交付方式（后续可更改）</View>
          <View style={{display:'flex'}} >
            <View className='subTitle'>预计运输方式：</View>
            <View>
              <Picker style={{padding:'15rpx 0rpx',fontSize:'28rpx'}} mode='selector' range={transType} onChange={this.transTypeOnChange.bind(this)}>
                <View className='picker'>
                  {this.state.transTypeSelected}
                </View>
              </Picker>
            </View>
          </View>
          <View className='subTitle'>预计交货地址：</View>
          <View className='boxArea'>
            <View style={{padding:'23rpx 22rpx',backgroundColor:'#F5F5F5',display:'flex',marginBottom:'16rpx'}}>
              <View style={{color:'#353535',fontSize:'28rpx',padding:'12rpx',marginRight:'94rpx'}}>使用受赠方提供的收货地址</View>
              <AtSwitch onChange={this.handleSwitchChange} color='#6D5CE6' />
            </View>
            <View style={{display:'flex',marginBottom:'16rpx'}}>
              <View style={{color:'#353535',fontSize:'28rpx',padding:'20rpx',width:'152rpx'}}>详细地址</View>
              <AtTextarea maxLength={50} count={false} className='atTextarea' value={this.state.add} onChange={this.addHandleChange.bind(this)}/>
            </View>
            <View style={{display:'flex'}}>
              <View style={{color:'#353535',fontSize:'28rpx',padding:'20rpx',width:'152rpx'}}>邮政编码</View>
              <AtInput className='inputPost' type='number' maxLength={6} value={this.state.post} onChange={this.postHandleChange.bind(this)}/>
            </View>
          </View>
          </View>

          <View className='area'>
            <View className='title'>联系方式</View>
            <View className='boxArea'>
              <View style={{display:'flex',margin:'20rpx 0rpx'}}>
                <View style={{color:'#353535',fontSize:'28rpx',padding:'20rpx',width:'152rpx',marginLeft:'20rpx'}}>联系人</View>
                <AtInput className='inputPost' placeholder='请填入联系人姓名' value={this.state.post} onChange={this.postHandleChange.bind(this)}/>
              </View>

              <View style={{display:'flex',margin:'20rpx 0rpx'}} >
                <View style={{color:'#353535',fontSize:'28rpx',padding:'20rpx',width:'152rpx',marginLeft:'20rpx',marginLeft:'20rpx'}}>联系方式</View>
                <View>
                  <Picker style={{padding:'15rpx 0rpx',fontSize:'28rpx',marginLeft:'20rpx'}} mode='selector' range={contactType} onChange={this.firstSelectedOnChange.bind(this)}>
                    <View className='picker'>
                      {this.state.firstSelected}
                    </View>
                  </Picker>
                </View>
                <View>
                  <AtInput className='input' type='text' placeholder='填入联系方式' value={this.state.firstSelected == '手机号'?this.state.contactPersonPhone:this.state.firstSelected == '微信号'?this.state.contactPersonWeChat:''} onChange={this.firstContactOnChange.bind(this)}  />
                </View>
              </View>

              {this.state.contactCount == 1
                ? <View style={{display:'flex',margin:'20rpx 0rpx'}} >
                    <AtButton type="secondary" onClick={this.addContact} >添加联系方式</AtButton>
                  </View>
                : <View style={{display:'flex'}} >
                    <View tyle={{color:'#353535',fontSize:'28rpx',padding:'20rpx',width:'152rpx',marginLeft:'20rpx',marginLeft:'20rpx'}}>联系方式</View>
                    <View>
                      <Picker style={{padding:'15rpx 0rpx',fontSize:'28rpx',marginLeft:'20rpx'}} mode='selector' range={contactType} onChange={this.secondSelectedOnChange.bind(this)}>
                        <View className='picker'>
                          {this.state.secondSelected}
                        </View>
                      </Picker>
                    </View>
                    <View>
                      <AtInput className='input' type='text' placeholder='填入联系方式' value={this.state.firstSelected == '手机号'?this.state.contactPersonPhone:this.state.firstSelected == '微信号'?this.state.contactPersonWeChat:''} onChange={this.secondContactOnChange.bind(this)}  />
                    </View>
                  </View>
              }

            </View>
          </View>

        
        

      </View>
    )
  }
}
