import Taro, { useState, useEffect } from '@tarojs/taro'
import eventBus from '@utils/event'
import { INDEX_REFRESH_FLAG } from '@constants/event'

function useRequestMore(request) {
  const [list, setList] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [isOpenRefresh, setIsOpenRefresh] = useState(true)
  const [page, setPage] = useState({ index: 0, size: 5 })

  useEffect(() => {
    console.log(page)
    const getList = async () => {
      setLoadingMore(true)
      const res = await request(page)
      setList(l => l.concat(res.data.content))
      setHasMore(!res.data.last)
      setIsOpenRefresh(false)
      setLoadingMore(false)
    }
    getList()
  }, [page, request])

  useEffect(() => {
    eventBus.on(INDEX_REFRESH_FLAG, () => {
      refresh()
    })
    return () => {
      eventBus.off(INDEX_REFRESH_FLAG)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getMoreData = () => {
    setPage({
      ...page,
      index: page.index + 1
    })
  }

  const refresh = () => {
    setIsOpenRefresh(true)
    setList([])
    setPage({ ...page, index: 0 })
    setHasMore(true)
    setLoadingMore(false)
  }

  return [list, hasMore, loadingMore, isOpenRefresh, refresh, getMoreData]
}

export default useRequestMore
