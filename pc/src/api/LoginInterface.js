import BaseModule from './BaseModule';

class LoginInterface extends BaseModule {
  constructor() {
    super();
    this.baseUrl = process.env.api.common_url
  }

  /*获取验证码*/
  getCheckcode() {
    return this.get(`${this.baseUrl}/api/setting/checkcode`)
  }

  /*登陆*/
  login(data = {}) {
    return this.post(`${this.baseUrl}/api/admin/login`, data);
  }

  /*注册*/
  register(data = {}) {
    return this.post(`${this.baseUrl}/api/admin/register`, data)
  }

  // 修改密码
  resetPassword(data = {}) {
    return this.patch(`${this.baseUrl}/api/admin/master`, data)
  }

  // 用户是否注册
  isRegisted(data = {}) {
    return this.post(`${this.baseUrl}/login/isRegisted`, data)
  }

  // 获取公钥
  getPublicKey() {
    return this.get(`${this.baseUrl}/api/admin/key`)
  }
}

export default new LoginInterface()
