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
              <Input v-model="form.phoneNum" placeholder="请输入手机号">
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
            <FormItem prop="vericode" v-if="action.showVericode">
              <Input v-model="form.vericode" placeholder="请输入验证码">
              <span slot="append">
                 <img id="getCode" @click="getImgCode" src="/captcha-image"
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
            <a href="javascript:;" class="reset-tip" @click="handleResetPassword">重置密码</a>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
  import Cookies from 'js-cookie';
  import MD5 from '@/libs/md5/md5.js';

  export default {
    data() {
      return {
        form: {
          phoneNum: '',
          password: '',
          vericode: ''
        },
        action: {
          showVericode: false
        },
        rules: {
          phoneNum: [
            {required: true, message: '手机号不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ],
          vericode: [
            {required: true, message: '验证码不能为空', trigger: 'blur'}
          ]
        },
        publicKey: ''
      };
    },
    computed: {
      loginStyle() {
        return {
          // backgroundImage: `url(${process.env.api.staticUrl}static/images/login/login_bg.jpg)`,
          backgroundImage: `url(static/images/login/login_bg.jpg)`,
        }
      }
    },
    methods: {
      listPublicKey(cb) {
        this.$api.loginInterface.sendPublickey()
          .then(res => {
            if (res.data.success) {
              this.publicKey = res.data.data;
              cb && cb();
            }
          }).catch(err => console.error(err))
      },
      getRSApassword(publicKey, password) {
        let encrypt = new this.$JSEncrypt.JSEncrypt();
        encrypt.setPublicKey(publicKey);
        return encrypt.encrypt(password);
      },
      handleSubmit() {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.listPublicKey(() => {
              this.$api.loginInterface.loginIn({
                loginName: this.form.phoneNum,
                password: this.getRSApassword(this.publicKey, this.form.password),
                vericode: this.form.vericode,
                appType: 2
              }).then(res => {
                res = res.data;
                this.action.showVericode = res.data && res.data.hasShowVericode;
                if (res.success) {
                  this.$Message.info('登录成功！');
                  window.location.href = `${process.env.api.commonUrl}/qrcode/manager`;
                } else {
                  this.$Message.info(res.retMsg);
                }
              }).catch(err => console.error(err))
            });
          }
        });
      },
      /**
       * 获取图片验证码
       */
      getImgCode() {
        let getImgCode = document.getElementById("getCode");
        getImgCode.src = "/captcha-image?sid=" + Math.random();
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
