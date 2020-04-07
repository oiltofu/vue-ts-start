import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosPromise } from 'axios'

interface ReqParams {
  [keyName: string]: string | number | object;
}

export class Api {
  private api: AxiosInstance
  private refreshToken: boolean
  private hotelcode: string | null
  private credential: string | null
  private waitApi: Function[]
  private baseURL: string
  private timeout: number

  public constructor (config?: AxiosRequestConfig) {
    this.refreshToken = false
    this.hotelcode = sessionStorage.getItem('hotelcode')
    // this.credential = 'eyJhbGciOiJIUzI1NiIsInppcCI6IkRFRiJ9.eNo0zF0KgCAQBOC7zLPBumqUt5FcKOiPrAiiu2dCTwMzzHfjSLLB3yXnMAk8egeFftll7Jb4FZqYSJNpct9tEmXehzB-g2tqZjbsbK1bIjwKQ0rFqDJ4ZlshHPFX5Vrhy8swafu8AAAA__8.FvzWitiwqc3aUsTsl5e9aufgAvW3r6c0iaRDCSdLNWI'
    this.credential = sessionStorage.getItem('credential')
    this.baseURL = process.env.VUE_APP_BASE_URL
    this.timeout = 3000
    this.waitApi = []
    this.api = axios.create(config)
    // 发送请求前处理
    this.api.interceptors.request.use((config: AxiosRequestConfig) => {
      config.baseURL = this.baseURL
      config.timeout = this.timeout
      config.headers.hotelcode = this.hotelcode
      config.headers.credential = this.credential
      config.headers.language = 'zh'
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 接受数据处理
    this.api.interceptors.response.use((response: AxiosResponse) => {
      const { data } = response
      if (data.code === 1000) {
        return data
      } else if (data.code === 1100) {
        // 跳到登陆页
        return Promise.reject(data)
      } else if (data.code > 1000 && data.code < 2000) {
        // 弹警告
        return Promise.reject(data)
      } else if (data.code === 9998) {
        // 刷新token
        debugger
        if (!this.refreshToken) this.refreshTokenRequest()
        this.refreshToken = true
        // 挂起api
        this.addSubscriber(this.api(response.config))
      } else if (data.code === 9999) {
        // 报错处理
        return Promise.reject(data)
      }
    }, error => {
      return Promise.reject(error)
    })
  }

  public request<T, R = AxiosResponse<T>> (config: AxiosRequestConfig): Promise<R> {
    return this.api.request(config)
  }

  public get<T, R = AxiosResponse<T>> (url: string, params?: ReqParams): Promise<R> {
    const config: AxiosRequestConfig = {}
    config.params = params
    return this.api.get(url, config)
  }

  public post<T, R = AxiosResponse<T>> (url: string, data?: object): Promise<R> {
    return this.api.post(url, data)
  }

  public refreshTokenRequest () {
    this.api.post('/user/token/refresh').then(res => {
      this.refreshToken = false
      this.credential = res.data.credential
      sessionStorage.setItem('credential', res.data.credential)
      this.waitApi.forEach((api) => {
        api()
      })
      this.waitApi = []
    })
  }

  public addSubscriber (api: AxiosPromise) {
    this.waitApi.push(function () {
      return api
    })
  }
}
