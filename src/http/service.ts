import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

export class Api {
  private api: AxiosInstance
  private refreshToken: boolean

  public constructor (config: AxiosRequestConfig) {
    this.refreshToken = false
    this.api = axios.create(config)
    // 发送请求前处理
    this.api.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
      config.headers.hotelcode = this.getHotelCode()
      config.headers.credential = this.getCredential()
      config.headers.language = 'zh'
      return config
    }, (error): any => {
      console.log(error)
      return Promise.reject(error)
    })
    // 接受数据处理
    this.api.interceptors.response.use((response: AxiosResponse): any => {
      if (response.data.code === 1000) {
        return response.data
      } else if (response.data.code === 1100) {
        // 跳到登陆页
        return Promise.reject(response.data)
      } else if (response.data.code > 1000 && response.data.code < 2000) {
        // 弹警告
        return Promise.reject(response.data)
      } else if (response.data.code === 9998) {
        // 刷新token
        this.refreshToken = true
        this.refreshTokenRequest()
      } else if (response.data.code === 9999) {
        return Promise.reject(response.data)
      }
    })
  }

  refreshTokenRequest () {
    axios.request({
      baseURL: process.env.BASE_API,
      url: '/api/user/token/refresh',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        hotelcode: this.getHotelCode(),
        credential: this.getCredential()
      }
    }).then(data => {
      console.log(data)
    })
  }

  getHotelCode () {
    return sessionStorage.getItem('hotelCode')
  }

  getCredential () {
    return sessionStorage.getItem('credential')
  }
}
