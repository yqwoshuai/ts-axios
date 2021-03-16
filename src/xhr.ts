import { AxiosRequestConfig } from './types'

// 发起请求
export default function xhr(config: AxiosRequestConfig) {
  const { data = null, url, method = 'get' } = config

  const request = new XMLHttpRequest()

  // 异步请求
  request.open(method.toUpperCase(), url, true)

  request.send(data)
}
