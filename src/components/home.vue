<template>
  <div>
    <div class="top">
      <div class="head">
        <div class="same">
          <span class="zi">经纬路</span>
          <span class="ezi">JINGWEILU</span>
        </div>
        <div class="same" @click="login">
          <!-- <span>个人中心</span> -->
          <img src="../assets/img/user.png" alt="" class="user" />
        </div>
      </div>
      <div class="banner">
        <img src="../assets/img/banner.png" alt="" />
      </div>
      <div class="put">
        <input
          type="text"
          placeholder="请输入您的姓名或公司名称"
          v-model="data.name"
        />
      </div>
      <div class="put">
        <input
          type="number"
          placeholder="请输入您的手机号码"
          v-model="data.mobile"
          @blur="phonetest(data.mobile)"
          oninput="if(value.length>11)value=value.slice(0,11)"
        />
        <div
          v-show="phoneShow"
          class="phonetest"
          style="color:red;font-size:0.25rem"
        >
          请填写正确格式的手机号
        </div>
      </div>
      <div class="btn">
        <img src="../assets/img/申报.png" alt="" @click="ok" />
      </div>
    </div>
    <div class="foot"></div>
  </div>
</template>

<script>
export default {
  created() {},
  data() {
    return {
      phoneShow: false,
      data: {
        name: "",
        mobile: ""
      }
    };
  },
  methods: {
    ok() {
      if (this.data.name == "") {
        this.$message.error("请输入您的姓名或公司名称");
      } else if (this.data.mobile == "") {
        this.$message.error("请输入手机号");
      } else if (this.phoneShow == true) {
        this.$message.error("请输入正确的手机号");
      } else {
        this.$http
          .post("/client/leava_post", this.$qs.stringify(this.data))
          .then(res => {
            if(res.data.code==1){
              this.$message.success('申报成功')
            }
          });
      }
    },
    // 手机号验证格式
    phonetest(value) {
      document.body.addEventListener("focusout", function() {
        window.scrollTo(0, 100);
      });
      let reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
      if (value == "") {
        this.phoneShow = false;
      } else if (!reg.test(value)) {
        this.phoneShow = true;
        return false;
      } else {
        this.phoneShow = false;
      }
      return true;
    },
    // 个人中心
    login() {
      this.$router.push("/login");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media screen and (max-width: 540px) {
  .ezi {
    font-size: 0.3rem;
  }
  .foot {
    width: 100%;
    height: 32.61rem;
    background: url("../assets/img/下方长图.jpg") no-repeat;
    background-size: cover;
  }
  .user {
    width: 0.43rem;
    height: 0.52rem;
    vertical-align: bottom;
    margin-left: 0.1rem;
  }
  .zi {
    font-size: 0.4rem;
    margin-right: 0.1rem;
  }
  .top {
    width: 100%;
    height: 7.8rem;
    background: url("../assets/img/top.png") no-repeat;
    background-size: cover;
    overflow: hidden;
  }
  .head {
    display: flex;
    justify-content: space-between;
    color: #fff;
    width: 7.02rem;
    margin: 0 auto;
    align-items: flex-start;
    margin-top: 0.1rem;
  }
  .same {
    /* display: flex; */
    align-items: bottom;
  }
  .banner {
    text-align: center;
  }
  .banner img {
    width: 7.34rem;
    height: 3.83rem;
  }
  .put {
    text-align: center;
    margin-top: 0.2rem;
    position: relative;
  }
  input {
    border: 1px #fff solid;
    width: 6.48rem;
    height: 0.56rem;
    border-radius: 0.1rem;
    color: #fff;
    outline: none;
    background-color: transparent;
    text-align: center;
  }
  input::-webkit-input-placeholder {
    color: #fff;
  }
  .btn {
    text-align: center;
    margin-top: 0.2rem;
  }
  .btn img {
    width: 2.78rem;
    height: 1.28rem;
  }
}
@media screen and (min-width: 990px) {
}
</style>
