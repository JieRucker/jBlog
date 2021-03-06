import BaseModule from "./BaseModule";

class UploadInterface extends BaseModule {
  constructor() {
    super();
    this.baseUrl = process.env.api.common_url
  }

  /*获取上传列表*/
  getUploadList() {
    return this.get(`${this.baseUrl}/api/upload/list`);
  }

  /*通过上传id来删除*/
  deleteUploadById(data) {
    return this.delete(`${this.baseUrl}/api/upload/list/${data._id}`);
  }
}

export default new UploadInterface()
