<style lang="scss">
  @import "login.scss";

  #indexLizi {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    overflow: hidden;
  }
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

    <div id="indexLizi">
    </div>
  </div>
</template>

<script>
  import THREE from "@/libs/three/three";

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
          // backgroundImage: `url(${process.env.api.staticUrl}static/images/login/login_bg.jpg)`,
          backgroundImage: `url(static/images/login/bg.png)`,
        }
      }
    },
    async created() {
      this.getCode();
    },
    mounted() {
      this.liziInit()
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
      },
      liziInit() {
        var SCREEN_WIDTH = window.innerWidth;
        var SCREEN_HEIGHT = window.innerHeight;
        var SEPARATION = 90;
        var AMOUNTX = 50;
        var AMOUNTY = 50;
        var container;
        var particles, particle;
        var count;
        var camera;
        var scene;
        var renderer;
        var mouseX = 0;
        var mouseY = 0;
        var windowHalfX = window.innerWidth / 2;
        var windowHalfY = window.innerHeight / 2;
        init();
        this.interval = setInterval(loop, 1000 / 40);

        function init() {
          container = document.createElement("div");
          container.style.position = "relative";
          container.style.top = "200px";
          document.getElementById("indexLizi").appendChild(container);
          camera = new THREE.Camera(75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000);
          camera.position.z = 1000;
          scene = new THREE.Scene();
          renderer = new THREE.CanvasRenderer();
          renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
          particles = new Array();
          var i = 0;
          var material = new THREE.ParticleCircleMaterial(0x097bdb, 1);
          for (var ix = 0; ix < AMOUNTX; ix++) {
            for (var iy = 0; iy < AMOUNTY; iy++) {
              particle = particles[i++] = new THREE.Particle(material);
              particle.position.x = ix * SEPARATION - AMOUNTX * SEPARATION / 2;
              particle.position.z = iy * SEPARATION - AMOUNTY * SEPARATION / 2;
              scene.add(particle);
            }
          }
          count = 0;
          container.appendChild(renderer.domElement);
          document.addEventListener("mousemove", onDocumentMouseMove, false);
          document.addEventListener("touchmove", onDocumentTouchMove, false);
        }

        var mousemovetimer = null;

        function onMouseMove(event) {
          window.clearTimeout(mousemovetimer);
          mouseX = event.clientX - windowHalfX;
          mouseY = event.clientY - windowHalfY;
          mousemovetimer = null;
        }

        function onDocumentMouseMove(event) {
          if (!mousemovetimer)
            mousemovetimer = window.setTimeout(onMouseMove, 50, event);
        }

        function onDocumentTouchMove(event) {
          if (event.touches.length == 1) {
            event.preventDefault();
            mouseX = event.touches[0].pageX - windowHalfX;
            mouseY = event.touches[0].pageY - windowHalfY;
          }
        }

        function loop() {
          camera.position.x += (mouseX - camera.position.x) * 0.05;
          // camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
          camera.position.y = 364;
          var i = 0;
          for (var ix = 0; ix < AMOUNTX; ix++) {
            for (var iy = 0; iy < AMOUNTY; iy++) {
              particle = particles[i++];
              particle.position.y =
                Math.sin((ix + count) * 0.3) * 50 +
                Math.sin((iy + count) * 0.5) * 50;
              particle.scale.x = particle.scale.y =
                (Math.sin((ix + count) * 0.3) + 1) * 2 +
                (Math.sin((iy + count) * 0.5) + 1) * 2;
            }
          }
          renderer.render(scene, camera);
          count += 0.1;
        }
      },
    }
  };
</script>
