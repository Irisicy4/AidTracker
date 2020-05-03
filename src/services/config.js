const devURL = 'http://localhost:8889' // 开发环境，需要开启mock server（执行：npm run mock）
// const devURL = 'http://localhost:3721' // 开发环境，easy-mock，真机调试时切换
const prodURL = 'https://6b202a15.ngrok.io' // 生产环境，线上服务器

const BASE_URL = process.env.NODE_ENV === 'development' ? devURL : prodURL

export default BASE_URL
