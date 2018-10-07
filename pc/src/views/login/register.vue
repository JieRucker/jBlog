<style lang="scss">
  @import "login.scss";
</style>

<template>
  <div class="auth-login auth-register" @keydown.enter="handleSubmit" :style="loginStyle">
    <div class="auth-login__content">
      <Card :bordered="false">
        <p slot="title">
          <Icon type="log-in"></Icon>
          注册
        </p>
        <div class="auth-login__content--form">
          <Form ref="registerForm" :model="form" :rules="rules">
            <FormItem prop="phoneNum">
              <Input v-model="form.phoneNum" placeholder="请输入用户名">
              <span slot="prepend">
                <Icon :size="16" type="person"></Icon>
              </span>
              </Input>
            </FormItem>
            <FormItem prop="passwd">
              <Input type="password" v-model="form.passwd" placeholder="必须包含英文、数字且8-16位">
              <span slot="prepend">
                <Icon :size="14" type="locked"></Icon>
              </span>
              </Input>
            </FormItem>
            <FormItem prop="passwdCheck">
              <Input type="password" v-model="form.passwdCheck" placeholder="确认密码">
              <span slot="prepend">
                <Icon :size="14" type="locked"></Icon>
              </span>
              </Input>
            </FormItem>
            <FormItem>
              <Button @click="handleSubmit" type="primary" long>确定注册</Button>
            </FormItem>
          </Form>
          <div class="auth-login__content--footer">
            <a href="javascript:;" class="register-tip" @click="handleLogin">登录</a>
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
    name: 'register',
    data() {
      let passReg = new RegExp(/^(?![0-9]+$)(?![a-zA-Z!@#$%^&*()_+~,.|{}?><\-\]\\[\/]+$)[0-9A-Za-z!@#$%^&*()_+~,.|{}?><\-\]\\[\/]{8,16}$/);

      const validatePass = (rule, value, callback) => {
        if (this.$Global.isBlank(value)) {
          callback(new Error('请输入密码'));
        } else if (!passReg.test(value)) {
          callback(new Error('必须包含英文、数字且8-16位'));
        } else {
          if (!this.$Global.isBlank(this.form.passwdCheck)) {
            // 对第二个密码框单独验证
            this.$refs.registerForm.validateField('passwdCheck');
          }
          callback();
        }
      };
      const validatePassCheck = (rule, value, callback) => {
        if (this.$Global.isBlank(value)) {
          callback(new Error('请再一次输入密码'));
        } else if (value.length < 8) {
          callback(new Error('密码需要8-16位'));
        } else if (value !== this.form.passwd) {
          callback(new Error('两次密码输入不一致'));
        } else {
          callback();
        }
      };

      return {
        form: {
          phoneNum: '',
          passwd: '',
          passwdCheck: ''
        },
        rules: {
          phoneNum: [
            {required: true, message: '用户名不能为空', trigger: 'blur'}
          ],
          passwd: [
            {validator: validatePass, trigger: 'blur'}
          ],
          passwdCheck: [
            {validator: validatePassCheck, trigger: 'blur'}
          ]
        }
      };
    },
    computed: {
      loginStyle() {
        return {
          // backgroundImage: `url(${process.env.api.staticUrl}static/images/login/login_bg.jpg)`,
          backgroundImage: `url(static/images/login/login-bg.jpg)`,
        }
      }
    },
    methods: {
      handleSubmit() {
        this.$refs.registerForm.validate(valid => {
          if (valid) {
            this.$api.loginInterface.register({
              admin_name: this.form.phoneNum,
              admin_id: this.form.phoneNum,
              admin_pwd:this.form.passwdCheck,
            }).then(res => {
              res = res.data;
              if (res.code === 200) {
                this.$Message.info('注册成功！');
                this.$router.push({
                  name: 'login'
                });
              } else {
                this.$Message.info(res.msg);
              }
            }).catch(err => {
              console.error(err)
            });
          }
        });
      },
      handleLogin() {
        this.$router.push({
          name: 'login'
        });
      }
    }
  };
</script>
