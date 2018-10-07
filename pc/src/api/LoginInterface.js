import BaseModule from './BaseModule';

class LoginInterface extends BaseModule {
  constructor() {
    let options = {
      baseUrl: process.env.api.authUrl
    };
    super(options)
  }

  /*获取验证码*/
  getCheckcode() {
    return this.get("/api/setting/checkcode")
  }

  /*登陆*/
  login(data = {}) {
    return this.post('/api/admin/login', data);
  }

  /*注册*/
  register(data = {}) {
    return this.post(`/api/admin/register`, data)
  }

  // 修改密码
  resetPassword(data = {}) {
    return this.patch(`/api/admin/master`, data)
  }

  // 用户是否注册
  isRegisted(data = {}) {
    return this.post(`/login/isRegisted`, data)
  }
}

export default new LoginInterface()
