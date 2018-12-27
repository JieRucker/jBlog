import BaseModule from "./BaseModule";

class TagsInterface extends BaseModule {
  constructor() {
    super();
    this.baseUrl = process.env.api.common_url
  }

  /*获取标签列表*/
  getTagsList() {
    return this.get(`${this.baseUrl}/api/tags`);
  }

  /*添加标签*/
  addTags(data) {
    return this.post(`${this.baseUrl}/api/tags`, data);
  }

  /*修改标签*/
  alterTags(data) {
    return this.patch(`${this.baseUrl}/api/tags/${data._id}`, data);
  }

  /*通过标签id来删除*/
  deleteTagsById(data) {
    return this.delete(`${this.baseUrl}/api/tags/${data._id}`, data);
  }
}

export default new TagsInterface()
