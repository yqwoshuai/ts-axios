import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from '../src/index'
import { getAjaxRequest } from './helpers'

describe('instance', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })
  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  test('make a http request without verb helper', () => {
    const instance = axios.create()
    instance('/foo')
    return getAjaxRequest().then(request => {
      expect(request.url).toBe('/foo')
    })
  })

  test('make a http request', () => {
    const instance = axios.create()
    instance.get('/foo')
    return getAjaxRequest().then(request => {
      expect(request.url).toBe('/foo')
      expect(request.method).toBe('GET')
    })
  })

  test('make a post request', () => {
    const instance = axios.create()
    instance.post('/foo')
    return getAjaxRequest().then(request => {
      expect(request.method).toBe('POST')
    })
  })

  test('make a put request', () => {
    const instance = axios.create()
    instance.put('/foo')
    return getAjaxRequest().then(request => {
      expect(request.method).toBe('PUT')
    })
  })

  test('make a patch request', () => {
    const instance = axios.create()
    instance.patch('/foo')
    return getAjaxRequest().then(request => {
      expect(request.method).toBe('PATCH')
    })
  })

  test('make a options request', () => {
    const instance = axios.create()
    instance.options('/foo')
    return getAjaxRequest().then(request => {
      expect(request.method).toBe('OPTIONS')
    })
  })

  test('make a delete request', () => {
    const instance = axios.create()
    instance.delete('/foo')
    return getAjaxRequest().then(request => {
      expect(request.method).toBe('DELETE')
    })
  })

  test('make a head request', () => {
    const instance = axios.create()
    instance.head('/foo')
    return getAjaxRequest().then(request => {
      expect(request.method).toBe('HEAD')
    })
  })

  test('use instance options', () => {
    const instance = axios.create({ timeout: 1000 })
    instance.get('/foo')
    return getAjaxRequest().then(request => {
      expect(request.timeout).toBe(1000)
    })
  })

  test('have default headers', () => {
    const instance = axios.create({ baseURL: 'https://api.example.com' })
    expect(typeof instance.defaults.headers).toBe('object')
    expect(typeof instance.defaults.headers.common).toBe('object')
  })

  test('have interceptors', done => {
    axios.interceptors.request.use(config => {
      config.timeout = 2000
      return config
    })
    const instance = axios.create()
    instance.interceptors.request.use(config => {
      config.withCredentials = true
      return config
    })
    let response: AxiosResponse
    instance.get('/foo').then(res => {
      response = res
    })
    getAjaxRequest().then(request => {
      request.respondWith({
        status: 200
      })
      setTimeout(() => {
        expect(response.config.timeout).toBe(0)
        expect(response.config.withCredentials).toBeTruthy()
        done()
      }, 100)
    })
  })

  test('get the computed uri', () => {
    const fakeConfig: AxiosRequestConfig = {
      baseURL: 'https://www.baidu.com',
      url: '/user/12345',
      params: {
        idClient: 1,
        idTest: 2,
        testString: 'thisIsATest'
      }
    }
    expect(axios.getUri(fakeConfig)).toBe(
      'https://www.baidu.com/user/12345?idClient=1&idTest=2&testString=thisIsATest'
    )
  })
})
