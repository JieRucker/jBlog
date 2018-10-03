import axios from 'axios'
import qs from 'query-string'

class BaseModule {
  constructor(options) {
    this.baseUrl = typeof options.baseUrl !== 'undefined' ? options.baseUrl : process.env.api.commonUrl;
    this.$http = axios.create({
      baseUrl: this.baseUrl
    });
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

  put(url, data = undefined, config = {}) {
    return this.$http.put(url, data, {...this.dataMethodDefaults, ...config})
  }

  delete(url, config = {}) {
    return this.$http.delete(url, config)
  }
}

export default BaseModule
