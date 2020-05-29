<template>
  <div style="height:100%;">
    <div class="head">
      <van-icon name="arrow-left" @click="back" />
      <div>我的订单</div>
      <van-icon name="bars" @click="show" />
      <transition name="el-zoom-in-top">
        <div class="menu" v-show="menuShow">
          <router-link to="/create_order"
            ><div class="menu_top">创建订单</div></router-link
          >
          <router-link to="/upload"><div>上传文件</div></router-link>
        </div></transition
      >
    </div>
    <div class="content">
      <div style="position: relative;">
        <div class="box">
          <div>受理中</div>
          <div>作用域 : <span>全国</span></div>
          <div>支付金额 : <span>¥1099</span></div>
          <div>支付时间 : <span>2020/06/06 06:06:06</span></div>
        </div>
        <div class="bottom">快递查询 >></div>
        <div :class="[{ s: one }, 'small']">
          <div>软件著作权</div>
          <span class="bot">美术作品</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getlist()
  },
  data() {
    return {
      one: true,
      menuShow: false,
      data:{
        token:window.sessionStorage.getItem('token')
      },
      list:[]
    };
  },
  methods: {
    // 获取订单列表
    getlist(){
      this.$http.post('/client/order_list',this.$qs.stringify(this.data)).then(res=>{
        this.list=res.data
      })
    },
    //   菜单
    show() {
      if (this.menuShow == false) {
        this.menuShow = true;
      } else {
        this.menuShow = false;
      }
    },
    // 返回
    back(){
        this.$router.go(-1)
    }
  }
};
</script>
<style scoped>
@media screen and (max-width: 540px) {
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
  }
  .menu_top {
    border-bottom: 1px solid #cccccc;
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
    height: 0.74rem;
    text-align: center;
    border-top: 1px solid #ccc;
    line-height: 0.74rem;
    font-size: 0.35rem;
    background-color: #fff;
    border-radius: 0 0 0.2rem 0.2rem;
  }
  .small {
    position: absolute;
    right: 0.3rem;
    top: -0.3rem;
    background-color: #fd7177;
    border-radius: 0.1rem;
    font-size: 0.35rem;
    color: #fff;
    text-align: center;
    padding: 0.1rem 0.25rem;
  }
  .s {
    background-color: #7096fe;
  }
  .bot {
    border-top: 1px solid #ffffff;
  }
}
</style>
