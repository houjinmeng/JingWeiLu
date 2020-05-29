<template>
  <div class="box">
    <router-link to="/login"
      ><i class="el-icon-arrow-left ico"></i
    ></router-link>
    <div class="put put1">
      <input
        type="number"
        placeholder="请输入手机号码"
        v-model="data.mobile"
        @blur="phonetest(data.mobile)"
        oninput="if(value.length>11)value=value.slice(0,11)"
      />
      <div v-show="phoneShow" class="phonetest">
        请填写正确格式的手机号
      </div>
      <img src="../assets/img/群蜂账号管理.png" alt="" />
    </div>
    <div class="put">
      <input
        type="text"
        placeholder="请输入短信验证码"
        v-model="data.captcha"
      />
      <img src="../assets/img/验证码.png" alt="" />
      <div class="getword" v-show="btnshow" @click="getcode">获取验证码</div>
      <div v-show="numshow" class="getword">{{ count }}s</div>
    </div>
    <div class="put">
      <input type="text" placeholder="请输入新密码" v-model="data.newpassword" />
      <img src="../assets/img/密码.png" alt="" />
    </div>
    <div class="tishi">*密码6-20个字符, 区分大小写。</div>
    <div class="login" @click="ok">确 认</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: "",
      btnshow: true,
      numshow: false,
      data: {
        newpassword: "",
        mobile: "",
        captcha:'',
        event:'changepwd'
      },
      phoneShow: false
    };
  },
  methods: {
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
    // 获取验证码
    getcode() {
      if (this.data.mobile == "") {
        this.$message.error("请输入手机号");
        return false
      } else if (this.phoneShow == true) {
        this.$message.error("请输入正确格式的手机号");
        return false
      } else {
        this.count = 60;
        this.btnshow = false;
        this.numshow = true;
        let timeInt = setInterval(() => {
          this.count--;
          if (this.count <= 0) {
            this.btnshow = true;
            this.numshow = false;
            window.clearInterval(timeInt);
          }
        }, 1000);
        this.$http
          .post("/sms/send", this.$qs.stringify(this.data))
          .then(res => {});
      }
    },
    // 确定
    ok() {
      if (this.data.mobile == "") {
        this.$message.error("请输入手机号");
        return false;
      } else if (this.phoneShow == true) {
        this.$message.error("请输入正确格式的手机号");
        return false;
      } else if (this.data.captcha == "") {
        this.$message.error("请输入验证码");
        return false;
      } else if (this.data.newpassword == "") {
        this.$message.error("请输入新密码");
        return false;
      } else {
        this.$http
          .post("/sms/check", this.$qs.stringify(this.data))
          .then(res => {
            if (res.data.code == 1) {
              this.$http
                .post("/user/cp", this.$qs.stringify(this.data))
                .then(res => {
                  if (res.data.code == 1) {
                    this.$message.success("修改成功");
                    this.$router.push('/login')
                  }
                });
            } else {
              this.$message.error("验证码不正确");
            }
          });
      }
    }
  }
};
</script>
<style scoped>
@media screen and (max-width: 540px) {
  .phonetest {
    color: red;
    font-size: 0.2rem;
    line-height: 0;
    position: absolute;
    bottom: -0.16rem;
    left: 1.8rem;
  }
  .tishi {
    width: 5.23rem;
    padding-left: 0.8rem;
    font-size: 0.3rem;
    color: #65d6fe;
    margin: 0 auto;
    box-sizing: border-box;
  }
  .getword {
    color: #fff652;
    position: absolute;
    right: 1.2rem;
    top: 0.14rem;
  }
  .box {
    width: 100%;
    height: 100%;
    background: url("../assets/img/背景-修改密码.png") left top no-repeat;
    background-size: cover;
    position: relative;
    overflow: hidden;
  }
  .ico {
    color: #ffffff;
    font-size: 0.5rem;
    position: absolute;
    top: 0.2rem;
    left: 0.3rem;
  }
  .put1 {
    margin-top: 5.02rem !important;
  }
  .put {
    text-align: center;
    margin-top: 0.2rem;
    position: relative;
    font-size: 0.3rem;
  }
  .put img {
    width: 0.54rem;
    height: 0.54rem;
    position: absolute;
    left: 1.3rem;
    top: 0.1rem;
  }
  input {
    border: none;
    border-bottom: 1px #fff solid;
    width: 5.23rem;
    height: 0.7rem;
    color: #65d6fe;
    outline: none;
    background-color: transparent;
    padding-left: 0.8rem;
    box-sizing: border-box;
    font-size: 0.3rem;
  }
  input::-webkit-input-placeholder {
    color: #65d6fe;
  }
  .login {
    width: 5.2rem;
    height: 0.56rem;
    text-align: center;
    line-height: 0.56rem;
    color: #fff;
    border: 1px solid #fff;
    border-radius: 0.4rem;
    font-size: 0.3rem;
    margin: 0 auto;
    margin-top: 0.92rem;
    background: linear-gradient(top, #69d8fe, #2090f9);
  }
}
</style>
