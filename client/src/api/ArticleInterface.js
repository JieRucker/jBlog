import BaseModule from "./BaseModule";

class ArticleInterface extends BaseModule {
  constructor() {
    super();
    this.baseUrl = process.env.api.commonUrl
  }

  /*获取文章列表*/
  getArticles(data = {}) {
    return this.get(`${this.baseUrl}/api/articles`, data);
  }

  /*获取文章*/
  getArticle(data) {
    console.log(data);
    return this.get(`${this.baseUrl}/api/article?aid=${data.params.payload.aid}`);
  }

  /*修改文章*/
  alterArticle(data) {
    return this.post(`${this.baseUrl}/api/admin/alter`, data);
  }

  articleToDraft(data) {
    return this.post(`${this.baseUrl}/api/admin/articleToDraft`, data);
  }

  getAllTags() {
    return this.get(`${this.baseUrl}/api/tags`);
  }

  removeArtical(data) {
    return this.post(`${this.baseUrl}/api/admin/remove`, data);
  }

  saveArticle(data) {
    return this.post(`${this.baseUrl}/api/admin/addArticle`, data);
  }

  alterUser(data) {
    return this.post(`${this.baseUrl}/api/admin/alterUser`, data);
  }

  searchArticles(data) {
    return this.get(`${this.baseUrl}/api/searchArticles`, data);
  }

  getDrafts(data) {
    return this.get(`${this.baseUrl}/api/admin/getDrafts`, data);
  }

  getDraft(data) {
    return this.get(`${this.baseUrl}/api/admin/draft`, data);
  }

  alterDraft(data) {
    return this.patch(`${this.baseUrl}/api/admin/draft`, data);
  }

  dropDraft(data) {
    return this.delete(`${this.baseUrl}/api/admin/removeDraft/${data}`);
  }

  postDraft(data) {
    return this.post(`${this.baseUrl}/api/admin/postDraft`, data);
  }

  saveDraft(data) {
    return this.post(`${this.baseUrl}/api/admin/saveDraft`, data);
  }

  submitComment(data) {
    return this.put(`${this.baseUrl}/api/comment`, data);
  }

  getComments(data) {
    return this.get(`${this.baseUrl}/api/comment/${data}`);
  }

  subAgree(data) {
    return this.post(`${this.baseUrl}/api/agree`, data);
  }

  contact(data) {
    return this.post(`${this.baseUrl}/api/contact`, data);
  }
}

export default new ArticleInterface()
