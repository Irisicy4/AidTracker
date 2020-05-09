import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Input, Icon, Picker } from '@tarojs/components'
import { AtButton, AtInput, AtSwitch, AtTextarea, AtMessage  } from 'taro-ui'
import CustomInput from '@components/custom-input'
import classNames from 'classnames'
import request from '@services/api'
import eventEmitter from '@utils/event'
import './index.scss'
import { getGlobalData, setGlobalData } from '../../utils/global-data'

export default class Index extends Component {
  state = {
    projectTitle:'',//需求描述-标题
    projectTarget:'',//援助受众

    materialName:'',  //所需物资-物资种类
    materialType:'', //物资型号/规格
    countNumber:'', //数量
    unit:'',  //单位
    add:'', //详细收货地址
    post:'',  //邮编
    selfServeRange:'', //可自提范围

    contactPersonName:'', //联系人姓名
    contactPersonPhone:'', //联系人手机号
    contactPersonWechat:'', //联系人微信
    firstSelected:'请选择', //第一个选择的

    notes:'', //备注

    selectValue: '',
    orgName: '',
    orgType: '',
    supplierLocation: ''
  }
  config = {
    navigationBarTitleText: '新建项目'
  }

  async componentWillMount() {

    this.setState({unit:'枚',reciverSAdd:'河南省焦作市山阳区馨园小区',reciverSPost:'454002'})
  }


  handleSubmit = async () => {
    // const res = await request.post('/api-user-fill', {
    //   id: this.getId(),
    //   role: getGlobalData('role'),
    //   orgName: this.state.orgName,
    //   orgType: this.state.orgType,
    //   supplierLocation: this.state.supplierLocation
    // })
  
    // setGlobalData('userInfo', res.data.data)
    // setGlobalData('role', res.data.data.role)
    // eventEmitter.emit('refresh')
    // Taro.switchTab({
    //   url: '/pages/index/index'
    // })
  }
  //***需求描述***//
  //标题
  projectTitleOnChange = (e) =>{
    this.setState({projectTitle:e},()=>{console.log(this.state.projectTitle)})
  }
  //援助受众
  projectTargetOnChange = (e) =>{
    this.setState({projectTarget:e},()=>{console.log(this.state.projectTarget)})
  }

  //***所需物资***//
  //物资种类
  materialNameOnChange = (e) =>{
    this.setState({materialName:e},()=>{console.log(this.state.materialName)})
  }
  //物资规格
  materialTypeOnChange = (e) =>{
    this.setState({materialType:e},()=>{console.log(this.state.materialType)})
  }
  //物资数量和单位
  countNumberOnChange=(e)=>{
    this.setState({countNumber:e},()=>{console.log(this.state.countNumber)})
  }
  unitOnChange=(e)=>{
    this.setState({unit:e},()=>{console.log(this.state.unit)})
  }
  //***收货方式***//
  //联系人
  contactPersonNameOnChange=(e)=>{
    this.setState({contactPersonName:e},()=>{console.log(this.state.contactPersonName)})
  }
  //联系方式
  firstSelectedOnChange=(e)=>{
    console.log(e);
    let contactType = '';
    if(e.detail.value == '0'){
      contactType = '电话'
    } else if(e.detail.value == '1'){
      contactType = '微信'
    }
    this.setState({firstSelected:contactType,contactPersonPhone:'',contactPersonWeChat:''},()=>{console.log(this.state.firstSelected)})
  }
  firstContactOnChange=(e)=>{
    if(this.state.firstSelected == '电话'){
      this.setState({contactPersonPhone:e},()=>{console.log('contactPersonPhone',this.state.contactPersonPhone)})
    } else if(this.state.firstSelected == '微信'){
      this.setState({contactPersonWechat:e},()=>{console.log('contactPersonWechat',this.state.contactPersonWechat)})
    }
  }
  //收货详细地址
  addHandleChange=(e)=>{
    console.log(e);
    this.setState({add:e.target.value})
  }
  //邮政编码
  postHandleChange=(e)=>{
    this.setState({post:e},()=>{console.log(this.state.post)});
  }
  //可自提范围
  selfServeRangeOnChange=(e)=>{
    this.setState({selfServeRange:e.target.value},()=>{console.log(this.state.selfServeRange)});
  }
  //****备注****//
  notesOnChange=(e)=>{
    this.setState({notes:e.target.value},()=>{console.log(this.state.notes)});
  }
  render() {
    // const { orgType, orgName, supplierLocation } = this.state
    const popularMaterialNames = ['口罩','防护服','消毒液']
    const contactType = ['电话','微信']

    const popularMaterials = popularMaterialNames.map((name) => {
      return <AtButton onClick={()=>this.setState({materialName:name})} value={name} className='tag' key={name} type='primary' size='small' circle={true}>{name}</AtButton>
    })
    
    return (
      <View>
        <AtMessage />

        <View className='area'>
          <View className='title'>需求描述</View>
          <View className='subTitle'>标题：</View>
          <View ><AtInput className='input' type='text' placeholder="用几个字简要概括您的需求" value={this.state.projectTitle} onChange={this.projectTitleOnChange.bind(this)}  /> </View>
          <View className='subTitle'>援助受众：</View>
          <View><AtInput className='input' type='text' placeholder="填入具体的物资使用者，如家人，医务人员" value={this.state.projectTarget} onChange={this.projectTargetOnChange.bind(this)}  /> </View>      
        </View>

        <View className='area'>
          <View className='title'>所需物资</View>
          <View className='subTitle'>物资种类：</View>
          <View>
            {popularMaterials}
          </View>
          <View ><AtInput className='input' type='text' placeholder="其他物资种类，请描述" value={this.state.materialName} onChange={this.materialNameOnChange.bind(this)}  /> </View>

          <View className='subTitle'>物资型号/品种要求：</View>
          <View><AtInput className='input' type='text' placeholder="填入物资规格，比如，N95，一次性医用" value={this.state.materialType} onChange={this.materialTypeOnChange.bind(this)}  /> </View>

          <View className='subTitle'>所需数量：</View>
          <View className='flex'>
            <View className='flex-2-3'>
              <View className='subTitle'>数量：</View>
              <View><AtInput className='input' type='text' placeholder="填入数字" value={this.state.countNumber} onChange={this.countNumberOnChange.bind(this)}  /> </View>
            </View>
            <View className="flex-1-3">
              <View className='subTitle'>单位：</View>
              <View><AtInput className='input' type='text' placeholder="枚" value={this.state.unit} onChange={this.unitOnChange.bind(this)}  /> </View> 
            </View>
               
          </View>
        </View>

        <View className='area'>
          <View className='title'>收货方式</View>
          <View className='subTitle'>联系人</View>
          <View><AtInput className='input' placeholder='请填入联系人姓名' value={this.state.contactPersonName} onChange={this.contactPersonNameOnChange.bind(this)}/></View>

          <View className='subTitle'>联系方式</View>
          <View className='flex' >
            <View className='picker flex-1-3'>
              <Picker mode='selector' range={contactType} onChange={this.firstSelectedOnChange.bind(this)}>
                <View>
                  {this.state.firstSelected}
                </View>
              </Picker>
            </View>
            <View className='flex-2-3'>
              <AtInput className='input' type='text' placeholder='填入联系方式' value={this.state.firstSelected == contactType[0]?this.state.contactPersonPhone:this.state.firstSelected == contactType[1]?this.state.contactPersonWeChat:''} onChange={this.firstContactOnChange.bind(this)}  />
            </View>
          </View>

          <View className='subTitle'>详细收货地址：</View>
          <View ><AtTextarea className='input' type='text' placeholder="填入您的详细收货地址" value={this.state.add} onChange={this.addHandleChange.bind(this)}  /> </View>

          <View className='subTitle'>邮政编码：</View>
          <View ><AtInput className='input' type='text' placeholder="填入邮政编码" value={this.state.post} onChange={this.postHandleChange.bind(this)}  /> </View>

          <View className='subTitle'>可自提范围：</View>
          <View ><AtTextarea className='input' type='text' placeholder="填入可自提区域描述" value={this.state.selfServeRange} onChange={this.selfServeRangeOnChange.bind(this)}  /> </View>

        </View>

        

        <View className='area'>
          <View className='title'>备注</View>
          <View ><AtTextarea className='input' type='text' placeholder="可在此填入自己对提交物资需求量的使用计划，解释清楚且对应需求量更容易被信任从而收到物资" value={this.state.notes} onChange={this.notesOnChange.bind(this)} autoHeight /> </View>    
        </View>
        
        <AtButton className="primary-button" type='primary' onClick={this.handleSubmit}>提交需求</AtButton>
        

      </View>
    )
  }
}
