<template>
  <div class="wrap">
    <div class="total">
      <p v-if="!comments.length">哎呀，没人理我😺</p>
      <p v-if="comments.length">欢迎留下您宝贵的意见或建议哟~ 评论总数共{{comments.length}}条😺</p>
    </div>
    <div class="comment" :class="{isManager: item.isManager}" v-for="item in comments">
      <div class="avatar"></div>
      <div class="box">
        <span class="name">{{item.name}}说:</span>
        <p class="content">{{item.content}}</p>
        <time>{{item.date}}</time>
        <div class="action">
          <div class="reply"><img @click="reply(item.name)" src='../assets/images/icon/reply.png'/><a
            @click="reply(item.name)">回复</a></div>
          <div class="agree"
               :class="{agreed: localStorage.getItem(item._id) == 'agreed'}"
               @click='agree(item)'>{{item.agree}}
          </div>
        </div>
      </div>
    </div>
    <div class="write" id="write">
      <!-- <p class="title">说点儿啥呗~</p> -->
      <p class="declar">电子邮件地址不会被公开。 必填项已用*标注</p>
      <label for="comment"> <span>评论</span> <textarea id="comment" v-model="content"></textarea> </label>
      <label for="name"> <span>称呼*</span> <input type="text" name="" id="name" v-model="name"> </label>
      <label for="email"> <span>电子邮件*</span> <input type="text" name="" id="email" v-model="email"> </label>
      <button @click="submit({content, name, email, aid, isManager})">发表评论</button>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapState, mapMutations} from 'vuex'
  import SmoothScroll from 'smooth-scroll'
  import util from '@/libs/util.js'

  export default {
    data() {
      return {
        content: '',
        name: '',
        email: '',
        isManager: typeof(localStorage.user) !== 'undefined',
        localStorage: localStorage
      }
    },
    computed: {
      ...mapState({
        comments: state => state.app.comments
      })
    },
    props: ['aid'], /*通过prop拿到父组件的aid*/
    watch: {
      aid(to, from) {
        this.getComments({aid: to})
      }
    },
    created() {
      this.getComments({aid: this.aid})

    },
    methods: {
      ...mapActions(['submitComment', 'getComments', 'subAgree']),
      ...mapMutations(['set_dialog']),
      submit(payload) {
        let {name, email, content} = payload;
        if (content.length < 5 || content.length > 200) {
          this.set_dialog({
            show: true, tip: '内容长度请在5-200之间噢ᓫ(°⌑°)ǃ~', resolved() {
              this.show = false
            }
          })
        }
        else if (name.length === 0) {
          this.set_dialog({
            show: true, tip: '姓名不能为空噢~', resolved() {
              this.show = false
            }
          })
        }
        else if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email)) {
          this.set_dialog({
            show: true, tip: '请输入合法的邮箱地址噢ᓫ(°⌑°)ǃ~', resolved() {
              this.show = false
            }
          })
        }
        else {
          this.submitComment(payload)
            .then(() => {
              this.set_dialog({
                show: true, tip: '评论成功☺', resolved() {
                  this.show = false
                }
              });
              this.content = '';
              this.name = '';
              this.email = ''
            })
        }
      },
      reply(to) {
        let scroll = new SmoothScroll(), anchor = document.querySelector('#write');
        scroll.animateScroll(anchor);
        this.content = `@${to}: `;
        this.name = '';
        this.email = '';
      },
      agree(item) {
        if (localStorage.getItem(item._id) !== 'agreed') {
          item.agree++;
          localStorage.setItem(item._id, "agreed");
          this.subAgree(item)
        } else {
          item.agree--;
          localStorage.setItem(item._id, "cancel");
          this.subAgree(item)
        }

      },
    },
  }
</script>
<style lang="scss" scoped>
  .wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .total p {
    background-color: #fcfcfc;
    width: 100%;
    text-align: center;
  }

  .comment {
    width: 100%;
    margin: 5px 0px;
    padding: 20px 0;
    display: flex;
    border-top: 1px solid #eee;
    .avatar {
      order: 1;
      width: 0.6rem;
      height: 0.6rem;
      flex-shrink: 0;
      max-width: 80px;
      max-height: 80px;
      border-radius: 50%;
      margin-right: 10px;
      background-image: url('../assets/images/icon/default_avatar.png');
      background-size: 100%;
    }
    .box {
      order: 2;
      height: 100px;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      color: #4c555c;
      padding: 10px;
      position: relative;
      word-break: break-all;
      text-align: left;
      // background-color: red;
      .name {
        font-size: 120%;
        color: #3f86b5;
      }
      time {
        position: absolute;
        bottom: 0px;
        font-size: 14px;
        margin: 6px 0;
        color: #dedede;
      }
      .action {
        width: 100%;
        display: flex;
        position: absolute;
        bottom: 0px;
        justify-content: flex-end;
        font-size: 90%;
        color: #777;
        .reply {
          display: flex;
          justify-content: space-around;
          align-items: center;
          img {
            width: 18px;
            height: 15px;
            margin-right: 5px;
          }
        }
        .agree {
          margin: auto 35px;
          position: relative;
          &::before {
            content: '';
            display: inline-block;
            width: 9px;
            height: 14px;
            background-color: #c0c1c3;
            position: absolute;
            left: -20px;
            transform: rotate(-45deg);
            border-top-right-radius: 50%;
            border-top-left-radius: 50%;
          }
          &::after {
            content: '';
            position: absolute;
            left: -15px;
            display: inline-block;
            width: 9px;
            height: 14px;
            background-color: #c0c1c3;
            transform: rotate(45deg);
            border-top-right-radius: 50%;
            border-top-left-radius: 50%;
          }
        }
        .agreed::before, .agreed::after {
          background-color: #f35186;
        }

      }
    }
  }

  .isManager {
    justify-content: flex-end;
    .avatar {
      order: 3;
      margin: auto 0px auto 10px;
      background-image: url('../assets/images/icon/qtc_avatar.png');
    }
    .box {
      width: 60%;
    }
    .box::before {
      display: none;
    }
  }

  .write {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    text-align: left;
    color: #4C555C;
    .title {
      font-size: 16px;
      font-weight: bold;
    }
    .declar {
      color: #838383;
      font-size: 14px;
      margin-top: 15px;
    }
    label {
      display: flex;
      justify-content: flex-start;
      width: 100%;
      margin: 10px 0;
      span {
        width: 80px;
        text-align: left;
        display: inline-block;
        flex-shrink: 0;
      }

      input[type = "text"] {
        border: 1px solid rgb(169, 169, 169);
        flex-grow: 1;
        flex-shrink: 1;
        max-width: 200px;
        height: 20px;
      }
      #comment {
        height: 160px;
        flex-grow: 1;
        border: 1px solid rgb(169, 169, 169);
      }
    }
    button {
      padding: 5px 13px;
      background-color: #acc0d7;
      font-size: 15px;
      cursor: pointer;
      position: relative;
      border-radius: 10px;
      margin-top: 10px;
      opacity: 0.8;
      color: #fff;
    }
    button::after {
      content: '';
      width: 0px;
      height: 0px;
      position: absolute;
      right: -5px;
      bottom: 0px;
      border-bottom: 14px solid #acc0d7;
      border-right: 14px solid transparent;
    }

  }

  @media screen and (max-width: 450px) {
    label {
      flex-direction: column;
      margin: 5px 0 !important;
      input, textarea {
        width: 100% !important;
        max-width: 100% !important;
      }
    }
  }
</style>
