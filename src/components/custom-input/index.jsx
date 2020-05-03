import Taro, { Component } from '@tarojs/taro'
import { View, Input } from '@tarojs/components'
import './index.scss'

export default class CustomInput extends Component {
  static defaultProps = {
    label: '',
    type: 'text',
    value: '',
    placeholder: '',
    customStyle: {},
    onInput: () => {},
    onClick: () => {}
  }
  config = {}

  render() {
    const {
      label,
      type,
      placeholder,
      value,
      onInput,
      onClick,
      customStyle
    } = this.props

    const rootStyle = Object.assign({ padding: '5px 0' }, customStyle)
    return (
      <View style={rootStyle}>
        {label && <View className='label'>{label + ':'}</View>}
        <Input
          className='input'
          type={type}
          value={value}
          placeholder={placeholder}
          onInput={onInput}
          onClick={onClick}
        ></Input>
      </View>
    )
  }
}
