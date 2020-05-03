import Taro, { Component } from '@tarojs/taro'
import CustomScrollView from '@components/custom-scroll-view'
import Card from '@components/card'
import CardContent from '@components/card/card-content'
import CardProgress from '@components/card/card-progress'
import CardTitle from '@components/card/card-title'
import CardStatus from '@components/card/card-status'
import './index.scss'

export default class Preparation extends Component {
  state = {
    list: [
      {
        id: '123',
        title: '急需1万个口罩',
        publishTime: '2020/03/05',
        applicationTime: '2020/03/06',
        demandSupplies: 'N95口罩',
        totalDemand: 10000,
        planToDonate: 5000,
        sponsor: '武汉某某医院',
        position: '湖北省武汉市',
        totalCount: 10000,
        finishCount: 3000
      },
      {
        id: '123',
        title: '急需1万个口罩',
        publishTime: '2020/03/05',
        applicationTime: '2020/03/06',
        demandSupplies: 'N95口罩',
        totalDemand: 10000,
        planToDonate: 5000,
        sponsor: '武汉某某医院',
        position: '湖北省武汉市',
        totalCount: 10000,
        finishCount: 3000
      },
      {
        id: '12',
        title: '急需1万个口罩',
        publishTime: '2020/03/05',
        applicationTime: '2020/03/06',
        demandSupplies: 'N95口罩',
        totalDemand: 10000,
        planToDonate: 5000,
        sponsor: '武汉某某医院',
        position: '湖北省武汉市',
        totalCount: 10000,
        finishCount: 3000
      }
    ],
    isOpenRefresh: true,
    loadingMore: false,
    loadingButton: false,
    hasMore: true,
    cursor: '',
    value: ''
  }

  initStatus = async () => {
    return await this.customSetState({
      isOpenRefresh: true,
      loadingMore: false,
      loadingButton: false,
      hasMore: true,
      cursor: ''
    })
  }

  // promise setState
  customSetState(obj) {
    return new Promise(resolve => {
      this.setState(obj, () => {
        resolve(this.state)
      })
    })
  }

  loadRecommend = async () => {
    const { hasMore, loadingMore } = this.state

    if (!hasMore || loadingMore) {
      return
    }

    await this.customSetState({
      loadingMore: true
    })

    setTimeout(() => {
      this.setState({
        loadingMore: false,
        hasMore: false
      })
    }, 1000)
  }

  handleRefresh = async () => {
    await this.initStatus()

    const { isOpenRefresh } = this.state

    if (!isOpenRefresh) {
      return
    }

    try {
    } catch (error) {}

    setTimeout(() => {
      this.setState({
        isOpenRefresh: false
      })
    }, 1000)
  }

  handleCardClick = () => {
    Taro.navigateTo({
      url: '/pages/detail/donator/detail-doing/index'
    })
  }

  render() {
    const { list, isOpenRefresh, loadingMore, hasMore } = this.state
    // const { type } = this.props
    return (
      <CustomScrollView
        height='46'
        loading={loadingMore}
        hasMore={hasMore}
        isOpenRefresh={isOpenRefresh}
        onScrollToLower={this.loadRecommend}
        onPullDownRefresh={this.handleRefresh}
      >
        {list.map(item => (
          <Card key={item.id} onClick={this.handleCardClick}>
            <CardTitle title={item.title}></CardTitle>
            <CardStatus status='对接中'></CardStatus>
            <CardProgress
              totalCount={item.totalCount}
              finishCount={item.finishCount}
            ></CardProgress>
            <CardContent
              publishTime={item.publishTime}
              applicationTime={item.applicationTime}
              demandSupplies={item.demandSupplies}
              totalDemand={item.totalDemand}
              planToDonate={item.planToDonate}
              sponsor={item.sponsor}
              position={item.position}
            ></CardContent>
          </Card>
        ))}
      </CustomScrollView>
    )
  }
}
