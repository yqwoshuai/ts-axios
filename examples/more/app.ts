import axios, { AxiosError } from '../../src'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import qs from 'qs'

// withCredentials功能，跨域携带cookie
// document.cookie = 'a=b'

// axios.get('/more/get').then(res => {
//   console.log(res)
// })

// axios.post('http://127.0.0.1:8088/more/server2', {}, {
//   withCredentials: true
// }).then(res => {
//   console.log(res)
// })

// xsrf验证功能
// const instance = axios.create({
//   xsrfCookieName: 'XSRF-TOKEN-D',
//   xsrfHeaderName: 'X-XSRF-TOKEN-D'
// })

// instance.get('/more/get').then(res => {
//   console.log(res)
// })

// 请求进度功能
// const instance = axios.create()

// function calculatePrecentage(loaded: number, total: number) {
//   return Math.floor(loaded * 1.0) / total
// }

// // 利用拦截器注入NProgress
// function loadProgressBar() {
//   const setupStartProgress = () => {
//     instance.interceptors.request.use(config => {
//       NProgress.start()
//       return config
//     })
//   }

//   const setupUpdataProgress = () => {
//     const update = (e: ProgressEvent) => {
//       console.log(e)
//       NProgress.set(calculatePrecentage(e.loaded, e.total))
//     }
//     instance.defaults.onDownloadProgress = update
//     instance.defaults.onUploadProgress = update
//   }

//   const setupStopProgress = () => {
//     instance.interceptors.response.use(
//       response => {
//         NProgress.done()
//         return response
//       },
//       error => {
//         return Promise.reject(error)
//       }
//     )
//   }

//   setupStartProgress()
//   setupUpdataProgress()
//   setupStopProgress()
// }
// loadProgressBar()

// const downloadEl = document.getElementById('download')

// downloadEl!.addEventListener('click', e => {
//   instance.get('https://img4.mukewang.com/604587df000158fd17920764.jpg')
// })

// const uploadEl = document.getElementById('upload')

// uploadEl!.addEventListener('click', e => {
//   const data = new FormData()
//   const fileEl = document.getElementById('file') as HTMLInputElement
//   if (fileEl.files) {
//     data.append('file', fileEl.files[0])
//     instance.post('/more/upload', data)
//   }
// })

// http授权，auth认证功能
// axios.post(
//   '/more/post',
//   {
//     a: 1
//   },
//   {
//     auth: {
//       username: 'abc',
//       password: '123456'
//     }
//   }
// )

// 自定义合法状态码功能
// axios
//   .get('/more/304')
//   .then(res => {
//     console.log(res)
//   })
//   .catch((e: AxiosError) => {
//     console.log(e.message)
//   })

// axios
//   .get('/more/304', {
//     validataStatus(status) {
//       return status >= 200 && status < 400
//     }
//   })
//   .then(res => {
//     console.log(res)
//   })
//   .catch((e: AxiosError) => {
//     console.log(e.message)
//   })

// 自定义格式化url功能
// axios.get('/more/get', { params: new URLSearchParams('a=b&c=d') }).then(res => {
//   console.log(res)
// })

// axios
//   .get('/more/get', {
//     params: {
//       a: 1,
//       b: 2,
//       c: ['a', 'b', 'c']
//     }
//   })
//   .then(res => {
//     console.log(res)
//   })

// const instance = axios.create({
//   paramsSerializer(params) {
//     return qs.stringify(params, { arrayFormat: 'brackets' })
//   }
// })

// instance
//   .get('/more/get', {
//     params: {
//       a: 1,
//       b: 2,
//       c: ['a', 'b', 'c']
//     }
//   })
//   .then(res => {
//     console.log(res)
//   })

// baseURL功能
// const instance = axios.create({
//   baseURL: 'https://img4.mukewang.com/'
// })

// instance.get('60595b950001d3cd17920764.jpg')

// instance.get('https://img1.mukewang.com/605d74580001b39b17920764.jpg')

// all 和 spread 方法，getUri功能 Axios类功能
function getA() {
  return axios.get('/more/A')
}
function getB() {
  return axios.get('/more/B')
}

axios.all([getA(), getB()]).then(
  axios.spread(function(resA, resB) {
    console.log(resA.data)
    console.log(resB.data)
  })
)

axios.all([getA(), getB()]).then(([resA, resB]) => {
  console.log(resA.data)
  console.log(resB.data)
})

const fakeConfig = {
  baseURL: 'https://www.baidu.com/',
  url: 'user/12345',
  params: {
    idClient: 1,
    idTest: 2,
    testString: 'thisIsATest'
  }
}
console.log(axios.getUri(fakeConfig))
