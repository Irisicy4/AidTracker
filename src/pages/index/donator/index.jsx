import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import CustomScrollView from '@components/custom-scroll-view'
import Card from '@components/card'
import CardContent from '@components/card/card-content'
import CardProgress from '@components/card/card-progress'
import CardTitle from '@components/card/card-title'
import CardStatus from '@components/card/card-status'
import useRequestMore from '@hooks/useRequestMore'
import { getList } from './service'
import './index.scss'

export default function Donator() {
  const [value, setValue] = useState('')
  const [
    list,
    hasMore,
    loadingMore,
    isOpenRefresh,
    refresh,
    getMoreData
  ] = useRequestMore(getList)

  const handleCardClick = id => {
    console.log(id)
    Taro.navigateTo({
      url: '/pages/detail/donator/detail-preparation/index?id=1'
    })
  }

  const handleScrollToLower = () => {
    if (!hasMore || loadingMore) {
      return
    }
    getMoreData()
  }

  const handlePullDownRefresh = () => {
    refresh()
  }
  return (
    <View className='donator'>
      <AtSearchBar
        value={value}
        onChange={e => {
          setValue(e)
        }}
      />
      <CustomScrollView
        loading={loadingMore}
        hasMore={hasMore}
        isOpenRefresh={isOpenRefresh}
        onScrollToLower={handleScrollToLower}
        onPullDownRefresh={handlePullDownRefresh}
      >
        {list.map(item => {
          return (
            <Card key={item.id} onClick={handleCardClick.bind(this, item.id)}>
              <CardTitle
                title={item.beneficiary + '需要' + item.resourceType}
              ></CardTitle>
              <CardStatus status={item.status}></CardStatus>
              <CardProgress
                totalCount={item.totalNum}
                finishCount={item.vacancyNum}
              ></CardProgress>
              <CardContent
                publishTime={item.createTime}
                demandSupplies={item.resourceType}
                totalDemand={item.totalNum}
                sponsor={item.organization}
                position={item.location}
              ></CardContent>
            </Card>
          )
        })}
      </CustomScrollView>
    </View>
  )
}
