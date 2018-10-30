import BaseModule from "./BaseModule";

class MainInterface extends BaseModule {
  constructor() {
    super();
    this.baseUrl = process.env.api.commonUrl
  }

  // 登出
  loginOut(data = {}) {
    return this.post(`${this.baseUrl}/loginOut`, data)
  }
}

export default new MainInterface()
