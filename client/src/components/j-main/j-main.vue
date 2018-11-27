<style lang="scss" scoped>
  .main {
    padding-bottom: 150px;
  }
</style>

<template>
  <main id="main" class="main">
    <div v-html="compiledMarkdown" class="article-content"
         style="width: 700px;background-color: #fff;padding: 15px;margin: 0 auto;"></div>
    <router-view></router-view>
  </main>
</template>

<script>
  let marked = require('marked');
  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
  });

  export default {
    name: "j-main",
    data() {
      return {
        markdown: '<h1><a id="asdfadsas_0"></a>asdfadsas</h1><p><a href="dfsdfsdfsd" target="_blank">sadfas</a></p><blockquote><p>sdfsdf</p></blockquote><ul><li>a</li></ul><table><thead><tr><th>f</th><th>f</th><th>f</th></tr></thead><tbody><tr><td>f</td><td>f</td><td>f</td></tr></tbody></table>'
      }
    },
    computed: {
      compiledMarkdown() {
        return marked(this.markdown);
        // return marked(this.markdown, {sanitize: true})
      }
    }
  }
</script>
