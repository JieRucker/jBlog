import BaseModule from "./BaseModule";

class ArticleInterface extends BaseModule {
  constructor() {
    let options = {
      baseUrl: process.env.api.commonUrl
    };
    super(options)
  }

  /*获取文章列表*/
  getArticleList(data = {}) {
    return this.get(`/api/article?current_page=${data.current_page}&page_size=${data.page_size}&keyword=${data.keyword}&tag=${data.tag}&state=${data.state}`);
  }

  /*获取标签列表*/
  getTags() {
    return this.get(`/api/tags`);
  }

  /*添加文章*/
  addArticle(data) {
    return this.post("/api/article", data);
  }

  /*修改文章*/
  alterArticle(data) {
    return this.patch(`/api/article/${data._id}`, data);
  }

  /*通过文章id来获取文章*/
  getArticleById(data) {
    return this.get(`/api/article/${data.id}`, data);
  }
}

export default new ArticleInterface()
