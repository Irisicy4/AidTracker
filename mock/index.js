/* eslint-disable import/no-commonjs */
const delay = require('mocker-api/utils/delay') // 延时 模拟请求异步问题
const mockjs = require('mockjs')
const BookData = require('./book')
const NeedData = require('./need')
const _ = require('./utils')

const data = {
  'POST /api-user-auth': {
    code: 200,
    data: {
      id: 1,
      nickname: 'chong',
      role: 'supplier'
    }
  },
  'POST /api-user-fill': {
    id: 1,
    nickname: 'chong',
    role: 'supplier'
  },
  //可以直接使用mockjs生成mock数据
  'GET /api/mock': mockjs.mock({
    'list|10-100': 1
  }),

  'GET /api/book/list': (req, res) => {
    const { query } = req
    const { pageNum, size, dataSource } = _.Query(query, BookData.data.lists)

    console.log(dataSource)
    console.log(dataSource.slice(pageNum * size, pageNum * size + Number(size)))
    const packData = _.Pack({
      lists: dataSource.slice(
        pageNum * size,
        Number(pageNum * size) + Number(size)
      ),
      ..._.PageInfo(pageNum, size, dataSource)
    })
    res.status('200').json(packData)
  },

  'GET /supplier/demand-page': (req, res) => {
    const { query } = req
    const { pageNum, size, dataSource } = _.Query(query, NeedData.data.lists)
    const packData = _.Pack({
      content: dataSource.slice(pageNum * size, pageNum * size + Number(size)),
      ..._.PageInfo(pageNum, size, dataSource)
    })

    res.status('200').json(packData)
  }
}
module.exports = delay(data, 1000)
