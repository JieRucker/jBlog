<style lang="scss" scoped>
  @include b(register) {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    position: relative;
    @include b(content) {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 305px;
      z-index: 100;
      @include b(form) {
        padding: 10px 0 0;
      }
    }

    @include b(footer) {
      text-align: right;
      display: inherit;
      .tip {
        font-size: 10px;
        color: #c3c3c3;
        margin-right: 10px;
      }
    }
  }

  #indexLizi {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    overflow: hidden;
  }

  .register /deep/ {
    .ivu-input-group-append {
      padding: 0;
    }
  }
</style>

<template>
  <div class="register" @keydown.enter="handleSubmit" :style="loginStyle">
    <div class="content">
      <Card :bordered="false">
        <p slot="title">
          <Icon type="log-in"></Icon>
          注册
        </p>
        <div class="form">
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
          <div class="footer">
            <a href="javascript:;" class="tip" @click="handleLogin">登录</a>
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
  // import Cookies from 'js-cookie';
  // import MD5 from '@/libs/md5/md5.js';

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
          backgroundImage: `url(static/images/login/login-bg.jpg)`,
          // backgroundImage: `url(${process.env.api.staticUrl}static/images/login/login_bg.jpg)`,
          // backgroundImage: `url(static/images/login/bg.png)`,
        }
      }
    },
    mounted() {
      // this.liziInit()
    },
    methods: {
      handleSubmit() {
        this.$refs.registerForm.validate(async valid => {
          if (valid) {
            let params = {
              admin_name: this.form.phoneNum,
              admin_id: this.form.phoneNum,
              admin_pwd: this.form.passwdCheck,
            };

            let res = await this.$api.loginInterface.register(params);
            let {code, data, msg} = res.data;
            if (code === 200) {
              this.$Message.info('注册成功！');
              this.$router.push({
                name: 'login'
              });
              return false;
            }

            this.$Message.info(msg);
          }
        });
      },
      handleLogin() {
        this.$router.push({
          name: 'login'
        });
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
