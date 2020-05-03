import Taro from '@tarojs/taro'
import fetch from '@services/api'

export async function getList(page) {
  const res = await fetch.get('/supplier/demand-page', {
    pageNum: page.index,
    size: page.size
  })
  console.log(res)

  return res.data
}
