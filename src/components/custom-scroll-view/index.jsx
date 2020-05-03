import Taro, { Component } from '@tarojs/taro'
import { ScrollView, View, Text } from '@tarojs/components'
import { AtActivityIndicator } from 'taro-ui'
import classNames from 'classnames'
import './index.scss'

export default class CustomScrollView extends Component {
  static defaultProps = {
    loading: false,
    hasMore: true,
    isOpenRefresh: true,
    isNothing: false,
    height: 42,
    handleRefresh: () => {},
    loadRecommend: () => {}
  }

  handleRefresherRestore = () => {}

  render() {
    const { windowHeight } = Taro.getSystemInfoSync()
    const {
      children,
      loading,
      hasMore,
      isOpenRefresh,
      isNothing,
      onPullDownRefresh,
      height,
      onScrollToLower
    } = this.props

    return (
      <ScrollView
        scrollY
        style={{ height: windowHeight - height + 'px' }}
        refresherEnabled
        refresherTriggered={isOpenRefresh}
        onRefresherRefresh={onPullDownRefresh}
        onScrollToLower={onScrollToLower}
      >
        {children}
        {loading && (
          <View className='loading'>
            <AtActivityIndicator content='加载中...'></AtActivityIndicator>
          </View>
        )}
        {isNothing && (
          <View className='loading nothing'>
            <Text className='loading-txt'>
              现在还没有分享，快来创建一条吧！
            </Text>
          </View>
        )}
        {!hasMore && (
          <View className={classNames({ loading: true })}>
            <Text className='loading-txt'>没有更多了</Text>
          </View>
        )}
      </ScrollView>
    )
  }
}
