// 项目公共类型目录

// 定义请求方法类型
export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

// 定义请求参数类型
export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  transformRequest?: AxiosTransfromer | AxiosTransfromer[]
  transformResponse?: AxiosTransfromer | AxiosTransfromer[]
  cancelToken?: CancelToken

  [propName: string]: any
}

// 定义响应类型
export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

// 定义请求返回类型 从 Promise 类型扩展 指定resolve类型为 AxiosResponse
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

// 定义错误类型 从 Error 类型扩展
export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
}

// 定义axios类扩展接口
export interface Axios {
  defaults: AxiosRequestConfig
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response?: AxiosInterceptorManager<AxiosResponse>
  }

  request<T = any>(config?: AxiosRequestConfig): AxiosPromise<T>

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

// 定义axios混合类型接口 继承自Axios接口，AxiosInstance本身是一个方法，但又具有Axios上的属性方法
// 两个方法类型，实现函数重载
export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>
  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

// 定义静态，让axios可以通关create方法生成新的实例
export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance

  CancelToken: CancelTokenStatic
  Cancel: CancelStatic
  isCancel: (value: any) => boolean
}

// 定义拦截器类型
export interface AxiosInterceptorManager<T> {
  // 设置拦截器
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn<T>): number
  // 取消拦截器
  eject(id: number): void
}

// 请求拦截器 类型
export interface ResolvedFn<T> {
  (val: T): T | Promise<T>
}
// 错误拦截器 类型
export interface RejectedFn<T> {
  (error: any): any
}

export interface AxiosTransfromer {
  (data: any, headers?: any): any
}

// 定义取消请求实例类型
export interface CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  throwIfRequested(): void
}
// 定义取消请求方法类型
export interface Canceler {
  (message?: string): void
}
export interface CancelTokenSource {
  token: CancelToken
  cancel: Canceler
}

// 定义取消请求方法参数类型
export interface CancelExecutor {
  (cancel: Canceler): void
}

// 定义取消请求类的类型
export interface CancelTokenStatic {
  new (executor: CancelExecutor): CancelToken
  source(): CancelTokenSource
}

// 定义取消请求判断类型
export interface Cancel {
  message?: string
}
// 定义取消请求判断类的类型
export interface CancelStatic {
  new (message?: string): Cancel
}
