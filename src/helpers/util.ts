const toString = Object.prototype.toString

// 判断是否为date类型
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

// 判断是否为object类型
// export function isObject(val: any): val is Object {
//   return val !== null && typeof val === 'object'
// }

// 判断是否为一个普通的对象
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

// 判断上传数据类型
export function isFormData(val: any): val is FormData {
  return typeof val !== 'undefined' && val instanceof FormData
}

// 混合类型继承
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

// 深拷贝（简洁版）
export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)

  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })

  return result
}
