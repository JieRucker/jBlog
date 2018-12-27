import axios from 'axios'
import qs from 'query-string'
import store from '@/modules/app/vuex';
import {router} from '@/modules/app/router';

class BaseModule {
  constructor() {
    this.instance = axios.create();
    this.dataMethodDefaults = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: [function (data) {
        return qs.stringify(data)
      }]
    };

    axios.interceptors.request.use = this.instance.interceptors.request.use;

    // request拦截器
    this.instance.interceptors.request.use(config => {
        // 每次发送请求，检查 vuex 中是否有token,如果有放在headers中
        if (store.state.user.adminInfo.token) {
          config.headers.Authorization = `${store.state.user.adminInfo.token}`;
        }

        return config;
      }, err => {
        return Promise.reject(err);
      }
    );

    // respone拦截器
    this.instance.interceptors.response.use(response => {
        return response;
      }, err => {
        let {response} = err;
        if (response.status == 401) {
          store.commit("logout");  // token过期,清除
          router.replace({ //跳转到登录页面
            path: '/login'
          });
          return Promise.reject(err.response);
        }
      }
    )

  }

  get(url, config = {}) {
    return this.instance.get(url, config)
  }

  post(url, data = undefined, config = {}) {
    return this.instance.post(url, data, {...this.dataMethodDefaults, ...config})
  }

  patch(url, data = undefined, config = {}) {
    return this.instance.patch(url, data, {...this.dataMethodDefaults, ...config})
  }

  put(url, data = undefined, config = {}) {
    return this.instance.put(url, data, {...this.dataMethodDefaults, ...config})
  }

  delete(url, config = {}) {
    return this.instance.delete(url, config)
  }
}

export default BaseModule
