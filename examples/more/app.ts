import axios from '../../src'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'

// document.cookie = 'a=b'

// axios.get('/more/get').then(res => {
//   console.log(res)
// })

// axios.post('http://127.0.0.1:8088/more/server2', {}, {
//   withCredentials: true
// }).then(res => {
//   console.log(res)
// })

// const instance = axios.create({
//   xsrfCookieName: 'XSRF-TOKEN-D',
//   xsrfHeaderName: 'X-XSRF-TOKEN-D'
// })

// instance.get('/more/get').then(res => {
//   console.log(res)
// })

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

axios.post(
  '/more/post',
  {
    a: 1
  },
  {
    auth: {
      username: 'abc',
      password: '123456'
    }
  }
)
