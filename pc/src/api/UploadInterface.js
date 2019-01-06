import BaseModule from "./BaseModule";

class UploadInterface extends BaseModule {
  constructor() {
    super();
    this.baseUrl = process.env.api.common_url
  }

  /*获取上传列表*/
  getUploadList(data) {
    return this.get(`${this.baseUrl}/api/upload/list?current_page=${data.current_page}&page_size=${data.page_size}&id=${data.id}`);
  }

  /*通过上传id来删除*/
  deleteUploadById(data) {
    return this.delete(`${this.baseUrl}/api/upload/list/${data._id}`, data);
  }

  /*修改列表*/
  alterUpload(data) {
    return this.patch(`${this.baseUrl}/api/upload/${data._id}`, data);
  }

  /*获取目录*/
  getFold() {
    return this.get(`${this.baseUrl}/api/fold`);
  }

  /*添加目录*/
  addFold(data) {
    return this.post(`${this.baseUrl}/api/fold`, data);
  }

  /*删除目录*/
  deleteFold(data) {
    return this.delete(`${this.baseUrl}/api/fold/${data._id}`);
  }

  /*修改目录*/
  alterFold(data) {
    return this.patch(`${this.baseUrl}/api/fold/${data._id}`, data);
  }

  moveFold(data) {
    return this.post(`${this.baseUrl}/api/fold/move`, data);
  }

}

export default new UploadInterface()
