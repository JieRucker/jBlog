import axios from 'axios'
import qs from 'query-string'

class BaseModule {
  constructor() {
    this.$http = axios.create();
    this.dataMethodDefaults = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: [function (data) {
        return qs.stringify(data)
      }]
    }
  }

  get(url, config = {}) {
    return this.$http.get(url, config)
  }

  post(url, data = undefined, config = {}) {
    return this.$http.post(url, data, {...this.dataMethodDefaults, ...config})
  }

  patch(url, data = undefined, config = {}) {
    return this.$http.patch(url, data, {...this.dataMethodDefaults, ...config})
  }

  put(url, data = undefined, config = {}) {
    return this.$http.put(url, data, {...this.dataMethodDefaults, ...config})
  }

  delete(url, config = {}) {
    return this.$http.delete(url, config)
  }
}

export default BaseModule
