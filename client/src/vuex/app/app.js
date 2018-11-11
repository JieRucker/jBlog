/**
 * @Author: jrucker
 * @Description
 * @Date: 2018/11/11 下午10:25
 * @Last Modified by: jrucker
 * @Last Modified time: 2018/11/11 下午10:25
 */
import marked from 'marked';
import util from '@/libs/util.js';
import $api from '@/api/server';
/*marked.setOptions({
  highlight: function (code) {
    return hljs.highlightAuto(code).value
  },
  sanitize: true
});*/
/*const renderer = new marked.Renderer();
renderer.heading = function (text, level) {
  // return "<h" + level + " id=" + text + level + ">" +text+ "</h"+level+">";
  return `<h${level} id="anchor_${text}_${level}">${text}</h${level}>`
};*/


import {router} from '@/router/index';

const renderer = new marked.Renderer();
renderer.heading = function (text, level) {
  // 给该标题生成唯一id
  let uniqId = '' + new Date().getTime() + util.random(1, 10000);
  return `<h${level} id="anchor_${uniqId}_${level}">${text}</h${level}>`;
};
marked.setOptions({
  renderer: renderer,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});

const app = {
  state: {
    headLine: {
      text: '',
      animate: ''
    },
    showSearch: false,
    articles: [],
    allTags: [],
    article: {},
    markedArticle: '',
    comments: [],
    drafts: [],
    draft: {},
    user: {
      username: '',
      status: false
    },
    isLoading: false,
    dialog_box: {
      show: false,
      tip: '',
      hasTwobtn: false,
      resolved() {
        this.show = false
      },
      reject() {
        this.show = false
      }
    },
    alert: {
      show: false,
      text: ''
    }
  },
  getters: {
    getShortArticles: (state) => {
      const shortArticles = state.articles.map((article) => {
        let newArticle = {...article};
        newArticle.content = newArticle.content.slice(0, 200) + '......';
        return newArticle
      });
      return shortArticles
    },
    getArticleNav(state) {
      let result = [];
      const article = state.markedArticle,
        reg = /<h(\d) id=\"(.+)\">(.+)<\/h\1>/g;
      article.replace(reg, function (match, level, id, content, offset, string) {
        result.push({level, id, content})
      });
      return result;
    },
  },
  mutations: {
    set_articles(state, articles) {
      articles.map(article => {
        article.date = util.formatDate(article.date, '-');
        return article
      })
      state.articles = articles;
    },

    set_marked_article(state, content) {
      state.markedArticle = marked(content, {renderer, renderer})
    },

    set_add_articles(state, articles) {
      if (articles.length !== 0) {
        articles.map(article => {
          article.date = util.formatDate(article.date, '-');
          return article
        })
        state.articles = state.articles.concat(articles);
      }
    },

    set_all_tags(state, allTags) {
      state.allTags = allTags
    },

    set_article(state, article) {
      article.date = util.formatDate(article.date, '-');
      state.article = article
    },

    set_user(state, user) {
      localStorage.setItem('user', user.username)
      state.user = user
    },

    set_dialog(state, dialog_box) {
      state.dialog_box = {
        ...dialog_box
      }
    },

    set_drafts(state, drafts) {
      drafts.map(draft => {
        draft.date = util.formatDate(draft.date, '-');
        return draft
      })
      state.drafts = drafts
    },

    set_draft(state, draft) {
      draft.date = util.formatDate(draft.date, '-');
      state.draft = draft
    },

    set_comments(state, comments) {
      comments.map(comment => {
        comment.date = util.formatDate(comment.date, '.');
        return comment
      })
      state.comments = comments;
    },

    set_loading(state, isLoading) {
      state.isLoading = isLoading
    },

    set_headLine(state, headLine) {
      state.headLine = headLine;
    },

    set_search(state, isShow) {
      if (isShow !== undefined) {
        state.showSearch = isShow;
        return;
      }
      state.showSearch = !state.showSearch;
    },

    set_alert(state, payload) {
      state.alert = payload;
      setTimeout(() => {
        state.alert.show = false;
      }, payload.delay || 2000)
    },

    set_logout(state) {
      state.user = void 0;
      delete localStorage.user;
      router.push({name: 'login'});
    }
  },
  actions: {
    getArticles({commit, state}, payload) {
      if (typeof payload.isAdd === 'undefined') {
        commit('set_loading', true);
        return $api.articleInterface.getArticles({params: {payload}})
          .then((res) => {
            commit('set_articles', res.data);
            commit('set_loading', false);
            return res.data;
          })
          .catch((err) => {
            console.log(err)
          })
      }
      else {
        return $api.articleInterface.getArticles({params: {payload}})
          .then((res) => {
            commit('set_add_articles', res.data);
            return res.data
          })
          .catch((err) => {
            console.log(err)
          })
      }

    },

    getArticle({commit, state}, payload) {
      commit('set_loading', true);
      return $api.articleInterface.getArticle({params: {payload}})
        .then((res) => {
          commit('set_article', res.data);
          commit('set_marked_article', res.data.content);
          commit('set_loading', false);
        })
        .catch((err) => {
          console.log(err)
        })
    },

    alterArticle({commit}, payload) {
      return $api.articleInterface.alterArticle(payload)
        .then(() => {
          console.log("发送请求成功")
        })
        .catch((err) => {
          console.log(err)
        })
    },

    articleToDraft({}, payload) {
      return $api.articleInterface.articleToDraft(payload)
    },

    getAllTags({commit, state}) {
      return $api.articleInterface.getAllTags()
        .then((res) => {
          res.data.unshift('全部')
          commit('set_all_tags', res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },

    removeArtical({}, payload) {
      return $api.articleInterface.removeArtical(payload)
    },

    saveArticle({commit}, payload) {
      return $api.articleInterface.saveArticle(payload)
    },

    alterUser({commit, state}, payload) {
      return $api.articleInterface.alterUser(payload)
        .then(() => {
          commit('set_user', payload)
        })
    },

    searchArticles({commit, state}, payload) {
      return $api.articleInterface.searchArticles({params: payload})
        .then((res) => {
          commit('set_articles', res.data);
        })
    },

    getDrafts({commit, state}, payload) {
      return $api.articleInterface.getDrafts({params: {payload}})
        .then((drafts) => {
          commit('set_drafts', drafts.body)
        })
        .catch((err) => {
          console.log(err)
        })
    },

    getDraft({commit, state}, payload) {
      return $api.articleInterface.getDraft({params: {payload}})
        .then((res) => {
          commit('set_draft', res.data)
        })
        .catch((err) => {
        })
    },

    alterDraft({}, payload) {
      return $api.articleInterface.alterDraft(payload)
    },

    dropDraft({}, _id) {
      return $api.articleInterface.dropDraft(_id)
    },

    postDraft({}, payload) {
      return $api.articleInterface.postDraft(payload)
    },

    saveDraft({}, payload) {
      return $api.articleInterface.saveDraft(payload)
    },

    submitComment({dispatch, commit}, payload) {
      return $api.articleInterface.submitComment(payload)
        .then(() => dispatch('getComments', {aid: payload.aid}))
        .catch(err => console.log(err))
    },

    getComments({commit}, payload) {
      return $api.articleInterface.getComments(payload.aid)
        .then(res => {
          console.log(res)
          commit('set_comments', res.data);
        })
        .catch(err => console.log(err))
    },

    subAgree({}, payload) {
      return $api.articleInterface.subAgree(payload)
        .catch(err => console(err))
    },

    contact({}, payload) {
      return $api.articleInterface.contact(payload)
        .catch(err => console.log(err))
    }
  }
};

export default app;
