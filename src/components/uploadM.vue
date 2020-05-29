<template>
  <div class="app">
    <div class="head">
      <van-icon name="arrow-left" @click="back" />
      <div>上传管理</div>
      <van-icon name="bars" @click="show" />
      <transition name="el-zoom-in-top">
        <div class="menu" v-show="menuShow">
          <router-link to="/orderM"><div>订单管理</div></router-link>
          <router-link to="/serve"
            ><div class="menu_top">服务管理</div></router-link
          >
          <router-link to="/message"><div>留言管理</div></router-link>
        </div></transition
      >
    </div>
    <div class="content">
      <div style="position: relative;">
        <div class="box">
          <div>区域 : <span>全国</span></div>
          <div>联系人 : <span>张三</span></div>
          <div>联系电话 : <span>15895646142</span></div>
          <div>上传时间 : <span>2020/06/06 06:06:06</span></div>
        </div>
        <div class="bottom">
          <div class="left">删除</div>
          <div class="right">下载</div>
        </div>
        <div class='small'>
          <div>软件著作权</div>
          <span class="bot">美术作品</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuShow: false
    };
  },
  methods: {
    //   菜单
    show() {
      if (this.menuShow == false) {
        this.menuShow = true;
      } else {
        this.menuShow = false;
      }
    },
    // 返回
    back() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
@media screen and (max-width: 540px) {
  /* 头部 */
  .app {
    height: 100%;
  }
  .menu {
    position: absolute;
    right: 0;
    top: 0.8rem;
    background-color: #fff;
    z-index: 10000;
  }
  .menu div {
    font-size: 0.28rem;
    font-size: 0.28rem;
    padding: 0.15rem 0.4rem;
    border-top: 1px solid #cccccc;
  }
  .head {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    font-size: 0.4rem;
    height: 7%;
    padding: 0 0.3rem;
    box-sizing: border-box;
  }
  .content {
    height: 93%;
    overflow: auto;
    padding: 0.5rem 0.3rem;
    box-sizing: border-box;
  }
  .box {
    width: 100%;
    background-color: #fff;
    border-radius: 0.2rem 0.2rem 0 0;
    padding: 0.2rem 0.3rem;
    box-sizing: border-box;
    font-size: 0.28rem;
  }
  .box span {
    font-size: 0.35rem;
  }
  .bottom {
    display: flex;
    height: 0.74rem;
    text-align: center;
    border-top: 1px solid #ccc;
    line-height: 0.74rem;
    font-size: 0.35rem;
    background-color: #fff;
    border-radius: 0 0 0.2rem 0.2rem;
  }
  .left{
      flex: 1;
      text-align: center;
      color: #fe7264;
      border-right: 1px solid #ccc;
  }
  .right{
      flex: 1;
      text-align: center;
      color: #658bff;
  }
   .small {
    position: absolute;
    right: 0.3rem;
    top: -0.3rem;
    background-color: #7096fe;
    border-radius: 0.1rem;
    font-size: 0.35rem;
    color: #fff;
    text-align: center;
    padding: 0.1rem 0.25rem;
  }
  .bot {
    border-top: 1px solid #ffffff;
  }
}
</style>
