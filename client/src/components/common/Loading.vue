<template>
  <div class="loading ">
    <slot name="text"></slot>
    <ul>
      <!-- <li></li>
            <li></li>
            <li></li> -->
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  .loading {
    z-index: 55;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: nowrap;
    .text {
      display: block;
      margin-bottom: 20px;
    }
    ul {
      display: flex;
      position: relative;
      li {
        background-color: #3f86b5;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin: 2px;
      }
      li:nth-child(1) {
        animation: loading 800ms ease -700ms infinite;
      }
      li:nth-child(2) {
        animation: loading 800ms ease -600ms infinite;
      }
      li:nth-child(3) {
        animation: loading 800ms ease -500ms infinite;
      }
      li:nth-child(4) {
        animation: loading 800ms ease -400ms infinite;
      }
      li:nth-child(5) {
        animation: loading 800ms ease -300ms infinite;
      }
      li:nth-child(6) {
        animation: loading 800ms ease -200ms infinite;
      }
      li:nth-child(7) {
        animation: loading 800ms ease -100ms infinite;
      }
      li:nth-child(8) {
        animation: loading 800ms ease 0ms infinite;
      }
    }
  }

  @keyframes loading {
    0% {
      transform: scale(1);

    }
    100% {
      transform: scale(.3);
      opacity: 0.1;
    }
  }

  @media screen and (max-width: 500px) {
    .wrap ul li {
      width: 0.3rem;
      height: 0.3rem;
    }
  }
</style>
