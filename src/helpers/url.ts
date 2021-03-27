import { isDate, isPlainObject } from './util'

interface URLOrigin {
  protocol: string
  host: string
}

// 处理encode后的特殊字符
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/, '@')
    .replace(/%3A/, ':')
    .replace(/%24/, '$')
    .replace(/%2C/, ',')
    .replace(/%20/, '+')
    .replace(/%5B/, '[')
    .replace(/%5D/, ']')
}

// 格式化get请求的url，将params参数拼接到链接后
export function buildURL(url: string, params?: any): string {
  if (!params) {
    return url
  }

  const parts: string[] = []
  // 处理传入的参数
  Object.keys(params).forEach(key => {
    const val = params[key]
    if (val === null || typeof val === 'undefined') {
      return
    }
    // 将所有参数统一成数组的形式，统一处理
    let values = []
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })
  // 将所有参数拼接为字符串
  let serializedParams = parts.join('&')

  // 处理过后的参数字符串存在
  if (serializedParams) {
    // 忽略链接后面的hash
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }

    // 将参数拼接到url后
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}

// 利用a标签的dom解析 protocol 和 host
const urlParsingNode = document.createElement('a')
const currentOrigin = resolveURL(window.location.href)
function resolveURL(url: string): URLOrigin {
  urlParsingNode.setAttribute('href', url)
  const { protocol, host } = urlParsingNode
  return {
    protocol,
    host
  }
}

// 判断请求url是否同源
export function isUrlSameOrigin(requestUrl: string): boolean {
  const parsedOrigin = resolveURL(requestUrl)
  return (
    parsedOrigin.protocol === currentOrigin.protocol && parsedOrigin.host === currentOrigin.host
  )
}
