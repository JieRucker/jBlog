<style lang="scss">
  @import "login.scss";
</style>

<template>
  <div class="auth-login" @keydown.enter="handleSubmit" :style="loginStyle">
    <div class="auth-login__content">
      <Card :bordered="false">
        <p slot="title">
          <Icon type="log-in"></Icon>
          登录
        </p>
        <div class="auth-login__content--form">
          <Form ref="loginForm" :model="form" :rules="rules">
            <FormItem prop="phoneNum">
              <Input v-model="form.phoneNum" placeholder="请输入用户名">
              <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="form.password" placeholder="必须包含英文、数字且8-16位">
              <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
              </Input>
            </FormItem>
            <FormItem prop="vericode">
              <Input v-model="form.vericode" placeholder="请输入验证码">
              <span slot="append">
                 <img id="getCode" @click="getCode" :src="checkCodeImg"
                      style="width: 50px;height: 28px;vertical-align: middle;" alt="验证码"/>
                                </span>
              </Input>
            </FormItem>

            <FormItem>
              <Button @click="handleSubmit" type="primary" long>登录</Button>
            </FormItem>
          </Form>
          <div class="auth-login__content--footer">
            <a href="javascript:;" class="register-tip" @click="handleRegister">注册</a>
            <!--<a href="javascript:;" class="reset-tip" @click="handleResetPassword">重置密码</a>-->
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          phoneNum: '',
          password: '',
          vericode: ''
        },
        rules: {
          phoneNum: [
            {required: true, message: '用户名不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ],
          vericode: [
            {required: true, message: '验证码不能为空', trigger: 'blur'}
          ]
        },
        checkCodeToken: '',
        checkCodeImg: ''
      };
    },
    computed: {
      loginStyle() {
        return {
          backgroundImage: `url(${process.env.api.static_url}static/images/login/login-bg.jpg)`,
        }
      }
    },
    async created() {
      this.getCode();
    },
    methods: {
      /**
       * 获取图片验证码
       */
      async getCode() {
        await this.$api.loginInterface.getCheckcode()
          .then(res => {
            res = res.data;
            if (res.code === 200) {
              this.checkCodeToken = res.data.token;
              this.checkCodeImg = res.data.img;
            }
          }).catch(err => console.error(err))
      },
      handleSubmit() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.$api.loginInterface.login({
              admin_id: this.form.phoneNum,
              admin_pwd: this.form.password,
              code: this.form.vericode,
              token: this.checkCodeToken
            }).then(res => {
              res = res.data;
              if (res.code === 200) {
                this.$Message.info('登录成功！');
                this.$store.commit("saveAdminInfo", {
                  admin_id: res.data.admin_id || '',
                  admin_name: res.data.admin_name || '',
                  token: res.data.token || ''
                });
                let redirectUrl = decodeURIComponent(this.$route.query.redirect || '/article/article-list');
                //跳转到指定的路由
                this.$router.push({
                  path: redirectUrl
                });
              } else {
                this.$Message.info(res.msg);
              }
            }).catch(err => console.error(err))

          }
        });
      },
      handleRegister() {
        this.$router.push({
          name: 'register'
        });
      },
      handleResetPassword() {
        this.$router.push({
          name: 'resetPassword'
        })
      }
    }
  };
</script>
