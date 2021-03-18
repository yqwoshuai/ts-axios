import { buildURL } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import { processHeaders } from '../helpers/headers'
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import xhr from './xhr'

// 发起请求
export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

// 处理参数
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  // 处理 headers 要在 处理 data之前，因为处理data会把data转为json字符串
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

// 处理参数中的url
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url!, params)
}

// 处理参数中的data
function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

// 处理参数中的headers
function transformHeaders(config: AxiosRequestConfig): any {
  // headers 默认值为 {} 保证 headers 存在
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

// 处理返回响应中的data
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}
