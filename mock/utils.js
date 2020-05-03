const Query = (options, dataSource) => {
  // eslint-disable-next-line prefer-const
  let { pageNum, size, ...other } = options
  pageNum = pageNum || 0
  size = size || 10
  for (const key in other) {
    if ({}.hasOwnProperty.call(other, key)) {
      dataSource = dataSource.filter(item => {
        if ({}.hasOwnProperty.call(item, key)) {
          return (
            String(item[key])
              .trim()
              .indexOf(decodeURI(other[key]).trim()) > -1
          )
        }
        return true
      })
    }
  }
  return { pageNum, size, dataSource }
}

const Pack = value => {
  return {
    code: 200,
    status: 'success',
    message: '',
    data: {
      ...value
    }
  }
}

const PageInfo = (index, size, data) => {
  const pageSize = parseInt(size)
  const pageIndex = parseInt(index)

  return {
    pageable: {
      sort: {
        sorted: false,
        unsorted: true,
        empty: true
      },
      pageSize: pageSize,
      pageNumber: pageIndex,
      unpaged: false,
      paged: true
    },
    last: data.length <= pageSize * pageIndex + pageSize,
    totalPages: Math.ceil(data.length / pageSize),
    totalElements: data.length,
    size: pageSize,
    number: pageIndex,
    sort: {
      sorted: false,
      unsorted: true,
      empty: true
    },
    numberOfElements: 0,
    first: true,
    empty: true
  }
}

// eslint-disable-next-line import/no-commonjs
module.exports = {
  Query,
  Pack,
  PageInfo
}
