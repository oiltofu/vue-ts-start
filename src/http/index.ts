import { Api } from './service'

export default class HttpService {
  axiosInstance: object
  constructor () {
    this.axiosInstance = new Api({
      url: '/',
      method: 'get',
      baseURL: './',
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 3000
    })
  }

  init () {
    console.log('init')
  }
}
