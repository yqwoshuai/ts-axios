import { ResolvedFn, RejectedFn } from '../types'

// 定义每个拦截器的类型
interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn<T>
}

// 定义拦截器类
export default class InterceptorManager<T> {
  private interceptors: Array<Interceptor<T> | null>

  constructor() {
    this.interceptors = []
  }

  // 添加拦截器
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn<T>): number {
    this.interceptors.push({
      resolved,
      rejected
    })
    return this.interceptors.length - 1
  }

  // 删除拦截器
  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }

  // 遍历拦截器方法，内部使用
  // 拦截器内部使用，定义拦截器类型时不用定义
  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        fn(interceptor)
      }
    })
  }
}
