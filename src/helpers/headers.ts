import { Method } from '../types'
import { deepMerge, isPlainObject } from './util'

// 格式化headers的key名称
function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

// 处理headers
export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')
  // 当data是普通对象时改变headers中Content-Type的值，让后端能正确解析
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json; charset=utf-8'
    }
  }
  return headers
}

// 将返回的headers字符串格式化
export function parseHeaders(headers: string): any {
  // 创建 __proto__ null 的纯净对象
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }
  // 按回车和换行符分割字符串
  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    if (val) {
      val = val.trim()
    }
    parsed[key] = val
  })
  return parsed
}

// 将 headers中 common属性，和对应请求的属性提到headers中，并删除其他属性
export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) {
    return headers
  }

  // 提取属性 此处有属性优先级 直接定义在 headers上面的优先级最高，headers[method]上的其次，最后是common的公共属性
  headers = deepMerge(headers.common, headers[method], headers)

  // 需要被删除的字段，删除多余属性
  const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']
  methodsToDelete.forEach(method => {
    delete headers[method]
  })

  return headers
}
