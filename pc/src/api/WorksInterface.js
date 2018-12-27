import BaseModule from "./BaseModule";

class WorksInterface extends BaseModule {
  constructor() {
    super();
    this.baseUrl = process.env.api.common_url
  }

  /*获取作品列表*/
  getWorksList() {
    return this.get(`${this.baseUrl}/api/work`);
  }

  /*添加作品*/
  addWorks(data) {
    return this.post(`${this.baseUrl}/api/work`, data);
  }

  /*修改作品*/
  alterWorks(data) {
    return this.patch(`${this.baseUrl}/api/work/${data._id}`, data);
  }

  /*通过作品id来删除*/
  deleteWorksById(data) {
    return this.delete(`${this.baseUrl}/api/work/${data._id}`);
  }
}

export default new WorksInterface()
