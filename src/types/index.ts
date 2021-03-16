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

// 定义请求方法类型
export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
}
