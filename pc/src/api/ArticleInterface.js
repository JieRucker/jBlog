import BaseModule from "./BaseModule";

class ArticleInterface extends BaseModule {
  constructor() {
    let options = {
      baseUrl: process.env.api.commonUrl
    };
    super(options)
  }

  // 获取文章列表
  getArticle(data = {}) {
    return this.get(`/api/article?current_page=${data.current_page}&page_size=${data.page_size}&keyword=${data.keyword}&tag=${data.tag}&state=${data.state}`);
  }

  // 获取标签列表
  getTags() {
    return this.get("/api/tags");
  }

}

export default new ArticleInterface()
