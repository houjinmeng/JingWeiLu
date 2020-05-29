<template>
  <div class="app">
    <div class="head">
      <van-icon name="arrow-left" @click="back" />
      <div>订单管理</div>
      <van-icon name="bars" @click="show" />
      <transition name="el-zoom-in-top">
        <div class="menu" v-show="menuShow">
          <router-link to="/uploadM"><div>上传管理</div></router-link>
          <router-link to="/serve"
            ><div class="menu_top">服务管理</div></router-link
          >
          <router-link to="/message"><div>留言管理</div></router-link>
        </div></transition
      >
    </div>
    <!-- 统计 -->
    <div class="shownum">
      <div class="top">
        <div class="title">总订单金额(元)</div>
        <div class="count">79899.00</div>
      </div>
      <div class="bot">
        <div class="left">
          <div class="title">用户数</div>
          <div class="count">666</div>
        </div>
        <div class="right">
          <div class="title">订单数</div>
          <div class="count">999</div>
        </div>
      </div>
    </div>
    <!-- 订单列表 -->
    <div class="list">
      <div class="list_top">
        <div class="top_title">软件著作权 - 美术作品</div>
        <div>作用区域 : <span>全国</span></div>
        <div>支付金额 : <span>1056</span></div>
        <div>支付时间 : <span>2020/4/17 15:14</span></div>
        <div>联系人 : <span>张三</span></div>
        <div>收货地址 : <span>北京市朝阳区望京港旅大厦</span></div>
      </div>
      <div class="botbtn">填写单号 >></div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getlist();
  },
  data() {
    return {
      data: {
        token: window.sessionStorage.getItem("token")
      },
      list: [],
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
    },
    // 获取订单列表
    getlist() {
      this.$http
        .post("/audit/order_list", this.$qs.stringify(this.data))
        .then(res => {
          this.list = res.data;
        });
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
  /* 数据统计 */
  .shownum {
    width: 96%;
    margin: 0.16rem auto;
    border-radius: 0.2rem;
    overflow: hidden;
    color: #fff;
  }
  .top {
    background-color: #6b93ff;
    border-bottom: 1px solid #b9cdff;
    padding: 0.25rem;
  }
  .top .title {
    font-size: 0.4rem;
  }
  .top .count {
    font-size: 0.6rem;
    text-align: center;
  }
  .bot {
    width: 100%;
    display: flex;
    background-color: #8baaff;
  }
  .left {
    flex: 1;
    border-right: 1px solid #ccc;
    padding: 0.2rem 0.25rem;
  }
  .right {
    flex: 1;
    padding: 0.2rem 0.25rem;
  }
  .title {
    font-size: 0.3rem;
  }
  .count {
    font-size: 0.5rem;
    text-align: center;
  }
  /* 订单列表 */
  .list {
    width: 96%;
    margin: 0.2rem auto;
  }
  .list_top{
    padding: 0.25rem;
    border-radius: 0.2rem 0.2rem 0 0;
    background-color: #fff;
  }
  .top_title {
    font-size: 0.4rem !important;
    color: #fb5d66;
  }
  .list_top div {
    font-size: 0.3rem;
  }
  .list_top span{
    font-size: 0.35rem;
  }
  .botbtn{
    background-color: #fff;
    text-align: center;
    color: #557eff;
    font-size: 0.4rem;
    border-top: 1px solid #cccccc;
    padding: 0.1rem;
    border-radius: 0 0 0.2rem 0.2rem;
  }
}
</style>
