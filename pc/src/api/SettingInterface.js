import BaseModule from "./BaseModule";

class SettingInterface extends BaseModule {
  constructor() {
    super();
    this.baseUrl = process.env.api.common_url
  }

  /*获取七牛云上传图片token*/
  getQiniuToken() {
    return this.get(`${this.baseUrl}/api/setting/token`);
  }

  /*获取全局设置*/
  getSetting() {
    return this.get(`${this.baseUrl}/api/setting`);
  }

  /*修改全局设置*/
  alterSetting(data) {
    return this.patch(`${this.baseUrl}/api/setting`, data);
  }

  /*腾讯云上传*/
  pic(data) {
    return this.post(`${this.baseUrl}/api/upload/pic`, data);
  }
}

export default new SettingInterface()
