/* eslint-disable import/no-commonjs */
const Mock = require('mockjs')

const Random = Mock.Random

const Beneficiaries = Random.shuffle([
  '武汉方航医院',
  '温州医院',
  '合肥医院',
  '北京第七人民医院'
])

const Organizations = Random.shuffle([
  '武汉红十字会',
  '杭州红十字会',
  '温州红十字会',
  '啦啦啦居委会'
])

const ResourceTypes = Random.shuffle([
  '医用口罩',
  '医用外科口罩',
  '防护服',
  '防护眼睛',
  '酒精',
  '测试超长文本测试超长文本'
])

const Status = Random.shuffle(['satisfied', 'demanding'])

const data = Mock.mock({
  'lists|20-30': [
    {
      id: '@increment',
      'beneficiary|+1': Beneficiaries,
      createTime: '@date',
      location: '@province',
      'organization|+1': Organizations,
      'resourceType|+1': ResourceTypes,
      'status|+1': Status,
      totalNum: '@integer(5000, 10000)',
      unit: '枚',
      vacancyNum: '@integer(1000, 5000)'
    }
  ]
})

module.exports = {
  data
}
