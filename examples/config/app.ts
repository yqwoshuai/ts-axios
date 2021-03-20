import axios, { AxiosTransfromer } from '../../src/index'
import qs from 'qs'

// axios.defaults.headers.common['test2'] = 123

// axios({
//   method: 'post',
//   url: '/config/post',
//   data: qs.stringify({
//     a: 1
//   }),
//   headers: {
//     test: '321'
//   }
// }).then(res => {
//   console.log(res.data)
// })

// axios({
//   transformRequest: [
//     function(data) {
//       return qs.stringify(data)
//       // return data
//     },
//     ...(axios.defaults.transformRequest as AxiosTransfromer[])
//   ],
//   transformResponse: [
//     ...(axios.defaults.transformResponse as AxiosTransfromer[]),
//     function(data) {
//       if (typeof data === 'object') {
//         data.b = 2
//       }
//       return data
//     }
//   ],
//   url: '/config/post',
//   method: 'post',
//   data: {
//     a: 1
//   }
// }).then(res => {
//   console.log(res)
// })

const instance = axios.create({
  transformRequest: [
    function(data) {
      return qs.stringify(data)
      // return data
    },
    ...(axios.defaults.transformRequest as AxiosTransfromer[])
  ],
  transformResponse: [
    ...(axios.defaults.transformResponse as AxiosTransfromer[]),
    function(data) {
      if (typeof data === 'object') {
        data.b = 2
      }
      return data
    }
  ]
})

instance({
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  }
}).then(res => {
  console.log(res)
})
