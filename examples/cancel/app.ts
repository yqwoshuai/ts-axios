import axios, { Canceler } from '../../src/index'

const CancelToken = axios.CancelToken
const source = CancelToken.source()

axios
  .get('/cancel/get', {
    cancelToken: source.token
  })
  .catch(function(e) {
    if (axios.isCancel(e)) {
      console.log('reason123: ', e.message)
    }
  })

setTimeout(() => {
  source.cancel('取消请求1')
  axios
    .post(
      '/cancel/post',
      { a: 1 },
      {
        cancelToken: source.token
      }
    )
    .catch(function(e) {
      if (axios.isCancel(e)) {
        console.log(e.message)
      }
    })
}, 1000)

// let cancel: Canceler

// axios
//   .get('/cancel/get', {
//     cancelToken: new CancelToken(c => {
//       cancel = c
//     })
//   })
//   .catch(function(e) {
//     if (axios.isCancel(e)) {
//       console.log('取消请求2')
//     }
//   })

// setTimeout(() => {
//   cancel()
// }, 700)
