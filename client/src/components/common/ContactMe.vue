<template>
  <div class="write" id="write">
    <p class="declar">电子邮件地址不会被公开。 必填项已用*标注</p>
    <label for="comment">
      <span>内容</span> <textarea id="comment" v-model="content"></textarea> </label>
    <label for="name">
      <span>称呼*</span> <input type="text" name="" id="name" v-model="name"> </label>
    <label for="email">
      <span>电子邮件*</span> <input type="text" name="" id="email" v-model="email"> </label>
    <button @click="submit({content, name, email})">与我联系</button>
  </div>
  </div>
</template>

<script>
  import {mapActions, mapState, mapMutations} from 'vuex'

  export default {
    data() {
      return {
        content: '',
        name: '',
        email: ''
      }
    },
    methods: {
      ...mapActions(['contact']),
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
          this.contact(payload)
            .then(() => {
              this.set_dialog({
                show: true, tip: '邮件发送成功，hilda会尽快回复您哟☺，', resolved() {
                  this.show = false
                }
              });
              this.content = '';
              this.name = '';
              this.email = ''
            })
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .wrap {
    width: 100%;
  }

  .write {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    text-align: left;
    color: #4C555C;
    .title {
      align-self: center;
      font-size: 25px;
      margin-bottom: 15px;
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
      }
      #comment {
        height: 160px;
        flex-grow: 1;
        border: 1px solid rgb(169, 169, 169);
      }
    }
    button {
      padding: 5px 16px;
      background-color: #acc0d7;
      font-size: 15px;
      cursor: pointer;
      position: relative;
      border-radius: 10px;
      margin-top: 10px;
      opacity: 0.8;
      color: #fff;
      font-weight: bold;
      // align-self: flex-end;
    }
    button::after {
      content: '';
      width: 0px;
      height: 0px;
      position: absolute;
      right: -6px;
      bottom: 0px;
      border-bottom: 14px solid #acc0d7;
      border-right: 14px solid transparent;
    }

  }

  @media screen and (max-width: 550px) {
    label {
      flex-direction: column;
      margin: 5px 0 !important;

      input, textarea {
        width: 100%;
        margin-top: 2px;
      }
    }
  }

</style>
