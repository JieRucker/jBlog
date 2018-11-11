<template>
  <div class="wrap posts animated fadeIn">

    <div class="base-info">
      <!-- <img src="../../assets/img/qtc_avatar.png" class="avatar"> -->
      <ul>
        <li><span>专业</span><span>软件工程</span></li>
        <li><span>学校</span><span>中南民族大学</span></li>
        <li><span>Email</span><span>1770147149@qq.com</span></li>

      </ul>
    </div>
    <!-- <contact-me class="contact"></contact-me> -->
  </div>
</template>

<script>
  import {mapActions, mapState, mapGetters, mapMutations} from 'vuex'
  import ContactMe from '@/components/common/ContactMe.vue'

  export default {
    components: {
      ContactMe
    },
    created() {
      this.set_headLine({text: 'About', animate: 'show4'})
    },
    methods: {
      ...mapMutations(['set_headLine']),
    }
  }

</script>

<style lang="scss" scoped>
  .wrap {
    width: 50%;
    position: relative;
    margin: 60px auto;
  }

  .title {
    align-self: center;
    font-size: 25px;
    margin-bottom: 15px;
    position: relative;
  }

  .base-info {
    display: block;
    margin: 0px auto 50px;
    position: relative;
    border-radius: 4px;
    transition: 1s;

    ul {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      padding: 20px;
      li {
        position: relative;
        display: flex;
        width: 100%;
        justify-content: flex-start;
        margin: 20px auto;
        color: #4C555C;
        font-weight: bold;
        font-size: 16px;
        text-align: left;
        span:nth-child(1) {
          width: 50px;
          flex-shrink: 0;
          margin-right: 1.2rem;
          white-space: nowrap;
        }
      }
    }

  }

  .contact {
    width: 100%;
  }

  @media screen and (max-width: 900px) {
    li span:nth-child(1) {
      margin-right: 0.8rem !important;
    }
  }

  @media screen and (max-width: 650px) {

    li span:nth-child(1) {
      margin-right: 0.3rem !important;
    }
  }

  @media screen and (max-width: 450px) {
    .about_me {
      width: 85%;
      .base-info ul li {
        flex-direction: column;
        span:nth-child(1) {
          margin-bottom: 5px;
        }
      }
    }
  }
</style>
