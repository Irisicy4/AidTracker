import Taro, { Component } from '@tarojs/taro'
import { View, Text, Picker } from '@tarojs/components'
import './index.scss'
import region from './region'

export default class RegionPicker extends Component {
  state = {
    region: '请选择省市区',
    // H5、微信小程序、百度小程序、字节跳动小程序
    range: [],
    value: [0, 0, 0],
    // 支付宝小程序
    list: []
  }

  componentWillMount() {
    // 省市区选择器初始化
    // H5、微信小程序、百度小程序、字节跳动小程序
    const range = this.state.range
    let temp = []
    for (let i = 0; i < region.length; i++) {
      temp.push(region[i].name)
    }
    range.push(temp)
    temp = []
    for (let i = 0; i < region[0].city.length; i++) {
      temp.push(region[0].city[i].name)
    }
    range.push(temp)
    temp = []
    for (let i = 0; i < region[0].city[0].districtAndCounty.length; i++) {
      temp.push(region[0].city[0].districtAndCounty[i])
    }
    range.push(temp)
    this.setState({
      range: range
    })

    // 支付宝小程序
    const list = this.state.list
    for (let i = 0; i < region.length; i++) {
      const proviceTemp = Object.create(null)
      proviceTemp.name = region[i].name
      proviceTemp.subList = []
      for (let j = 0; j < region[i].city.length; j++) {
        const cityTemp = Object.create(null)
        cityTemp.name = region[i].city[j].name
        cityTemp.subList = []
        for (let k = 0; k < region[i].city[j].districtAndCounty.length; k++) {
          const districtAndCountyTemp = Object.create(null)
          districtAndCountyTemp.name = region[i].city[j].districtAndCounty[k]
          cityTemp.subList.push(districtAndCountyTemp)
        }
        proviceTemp.subList.push(cityTemp)
      }
      list.push(proviceTemp)
    }
    this.setState({
      list: list
    })
  }

  // H5、微信小程序、百度小程序、字节跳动小程序
  onChange = e => {
    let regionTemp = this.state.region
    const rangeTemp = this.state.range
    let valueTemp = this.state.value

    valueTemp = e.detail.value
    regionTemp =
      rangeTemp[0][valueTemp[0]] +
      ' - ' +
      rangeTemp[1][valueTemp[1]] +
      ' - ' +
      rangeTemp[2][valueTemp[2]]
    this.setState(
      {
        region: regionTemp,
        range: rangeTemp,
        value: valueTemp
      },
      () => {
        this.props.onGetRegion(this.state.region)
      }
    )
  }
  onColumnChange = e => {
    const rangeTemp = this.state.range
    const valueTemp = this.state.value

    const column = e.detail.column
    const row = e.detail.value

    valueTemp[column] = row

    switch (column) {
      case 0:
        const cityTemp = []
        const districtAndCountyTemp = []
        for (let i = 0; i < region[row].city.length; i++) {
          cityTemp.push(region[row].city[i].name)
        }
        for (let i = 0; i < region[row].city[0].districtAndCounty.length; i++) {
          districtAndCountyTemp.push(region[row].city[0].districtAndCounty[i])
        }
        valueTemp[1] = 0
        valueTemp[2] = 0
        rangeTemp[1] = cityTemp
        rangeTemp[2] = districtAndCountyTemp
        break
      case 1:
        const districtAndCountyTemp2 = []
        for (
          let i = 0;
          i < region[valueTemp[0]].city[row].districtAndCounty.length;
          i++
        ) {
          districtAndCountyTemp2.push(
            region[valueTemp[0]].city[row].districtAndCounty[i]
          )
        }
        valueTemp[2] = 0
        rangeTemp[2] = districtAndCountyTemp2
        break
      case 2:
        break
    }

    this.setState({
      range: rangeTemp,
      value: valueTemp
    })
  }

  render() {
    return (
      <View>
        <View
          className={
            this.state.region === '请选择省市区'
              ? 'taro-region-picker taro-region-picker-gray'
              : 'taro-region-picker taro-region-picker-black'
          }
        >
          <Picker
            mode='multiSelector'
            onChange={this.onChange}
            onColumnChange={this.onColumnChange}
            range={this.state.range}
            value={this.state.value}
          >
            <View>
              <Text>{this.state.region}</Text>
            </View>
          </Picker>
        </View>
      </View>
    )
  }
}
