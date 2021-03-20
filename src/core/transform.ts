import { AxiosTransfromer } from '../types'

// 定义处理响应配置方法
export default function transform(
  data: any,
  headers: any,
  fns?: AxiosTransfromer | AxiosTransfromer[]
): any {
  if (!fns) {
    return data
  }
  if (!Array.isArray(fns)) {
    fns = [fns]
  }
  fns.forEach(fn => {
    data = fn(data, headers)
  })
  return data
}
