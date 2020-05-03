import Taro, { Component } from '@tarojs/taro'
import { RadioGroup, Radio } from '@tarojs/components'
import './index.scss'

export default class CustomRadioGroup extends Component {
  static defaultProps = {
    list: [],
    onChange: e => {
      console.log(e)
    }
  }

  render() {
    const { list, onChange } = this.props
    return (
      <RadioGroup className='radio-list' onChange={onChange}>
        {list.map((item, i) => {
          return (
            <Radio
              key={'radio_' + i}
              className='radio-list-item'
              value={item.value}
              checked={item.checked}
            >
              {item.text}
            </Radio>
          )
        })}
      </RadioGroup>
    )
  }
}
