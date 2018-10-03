import BaseModule from './BaseModule';

class LoginInterface extends BaseModule {
  constructor() {
    let options = {
      baseUrl: process.env.api.authUrl
    };
    super(options)
  }

  // 发送验证码
  sendVerifyCode(data = {}) {
    return this.post(`/login/sendVerifyCode`, data)
  }

  // 修改密码
  reSetPassword(data = {}) {
    return this.post(`/login/reSetPassword`, data)
  }

  // 密码重置(不需要验证码)
  reSetPasswordNotVerifyCode(data = {}) {
    return this.post(`/login/reSetPasswordNotVerifyCode`, data)
  }

  // 用户是否注册
  isRegisted(data = {}) {
    return this.post(`/login/isRegisted`, data)
  }

  // 注册
  register(data = {}) {
    return this.post(`/login/register`, data)
  }

  // 登录
  loginIn(data = {}) {
    return this.post(`/login/loginIn`, data)
  }

  // RSA密码
  sendPublickey(data = {}) {
    return this.post(`/login/sendPublickey`, data)
  }
}

export default new LoginInterface()
