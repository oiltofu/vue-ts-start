import axios from 'axios'

interface AxiosReqConfig {
  url: string;
  method: string;
  baseURL: string;
  headers: object;
  timeout: number;
  params?: object;
  data?: object;
}

export default class Service {
  service: object
  config: object
  constructor (config: AxiosReqConfig) {
    this.config = config
    this.service = axios.create(this.config)
    console.dir(axios)
  }

  getService () {
    return this.service
  }

  initInterceptors () {
    // this.service.interceptors.request.use()
  }
}
