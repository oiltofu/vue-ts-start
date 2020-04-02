import Service from './service'

export default class HttpService {
  axiosInstance: object
  constructor () {
    this.axiosInstance = new Service({
      url: '/',
      method: 'get',
      baseURL: './',
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 3000
    }).getService()
  }

  init () {
    console.log('init')
  }
}
