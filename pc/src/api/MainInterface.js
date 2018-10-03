import BaseModule from "./BaseModule";

class MainInterface extends BaseModule {
  constructor() {
    let options = {
      baseUrl: process.env.api.commonUrl
    };
    super(options)
  }

  // 登出
  loginOut(data = {}) {
    return this.post(`/loginOut`, data)
  }

  // 获取uploadId
  createUploadId(data = {}) {
    return this.post(`/common/createUploadId`, data)
  }
}

export default new MainInterface()
