import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'
import { isUrlSameOrigin } from '../helpers/url'
import cookie from '../helpers/cookie'
import { isFormData } from '../helpers/util'

// 发起请求
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = 'get',
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress
    } = config

    const request = new XMLHttpRequest()

    // 开启请求，异步
    request.open(method.toUpperCase(), url!, true)

    // 处理参数
    configureRequest()
    // 处理事件
    addEvents()
    // 处理headers
    processHeaders()
    // 处理取消
    progressCancel()
    // 发送请求
    request.send(data)

    function configureRequest(): void {
      // 设置响应返回data的解析方式
      if (responseType) {
        request.responseType = responseType
      }

      // 跨域携带cookie
      if (withCredentials) {
        request.withCredentials = withCredentials
      }

      // 设置请求超时
      if (timeout) {
        request.timeout = timeout
      }
    }

    function addEvents(): void {
      // 监听请求，成功时返回响应内容
      request.onreadystatechange = function handleLoad() {
        if (request.readyState !== 4) {
          return
        }
        // 监听状态码
        // 网络错误
        if (request.status === 0) {
          return
        }

        const responseHeaders = parseHeaders(request.getAllResponseHeaders())
        const responseData = responseType !== 'text' ? request.response : request.responseText
        const response: AxiosResponse = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config: config,
          request: request
        }
        handleResponse(response)
      }

      // 监听错误处理
      request.onerror = function handleError() {
        reject(createError('Network Error', config, null, request))
      }

      // 监听请求超时
      request.ontimeout = function handleTimeout() {
        reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
      }

      // 请求进度
      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress
      }

      // 上传进度
      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress
      }
    }

    function processHeaders(): void {
      // 上传文件时删除Content-Type，交给浏览器自己去设置
      if (isFormData(data)) {
        delete headers['Content-Type']
      }

      // xsrf读取cookie
      if ((withCredentials || isUrlSameOrigin(url!)) && xsrfCookieName) {
        const xsrfValue = cookie.read(xsrfCookieName)
        if (xsrfValue && xsrfHeaderName) {
          headers[xsrfHeaderName] = xsrfValue
        }
      }

      // 设置请求头的信息
      Object.keys(headers).forEach(name => {
        // data 不存在时 Content-Type 属性无意义，直接删除
        if (data === null && name.toLowerCase() === 'content-type') {
          delete headers[name]
        } else {
          request.setRequestHeader(name, headers[name])
        }
      })
    }

    function progressCancel(): void {
      // 取消请求
      if (cancelToken) {
        cancelToken.promise.then(reason => {
          request.abort()
          reject(reason)
        })
      }
    }

    // 处理状态码
    function handleResponse(response: AxiosResponse) {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
