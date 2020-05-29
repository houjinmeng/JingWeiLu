<template>
  <div class="box">
    <router-link to="/"><i class="el-icon-arrow-left ico"></i></router-link>
    <div class="put put1">
      <input
        type="number"
        placeholder="请输入手机号码"
        v-model="data.mobile"
        @blur="phonetest(data.mobile)"
        oninput="if(value.length>11)value=value.slice(0,11)"
      />
      <div v-show="phoneShow" style="color:red;font-size:0.25rem">
        请填写正确格式的手机号
      </div>
      <img src="../assets/img/群蜂账号管理.png" alt="" />
    </div>
    <div class="put">
      <input type="text" placeholder="请输入密码" v-model="data.password" />
      <img src="../assets/img/密码.png" alt="" />
    </div>
    <div class="checkin">
      <span @click="zhuce">我要注册</span>
      <span class="gang">|</span>
      <span @click="xiugai">忘记密码</span>
    </div>
    <div class="login" @click="ok">登 录</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        password: "",
        mobile: ""
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
    // 注册
    zhuce(){
      this.$router.push('/zhuce')
    },
    // 忘记密码
    xiugai(){
      this.$router.push('/xiugai')
    },
// 登录
ok(){
  if(this.data.mobile==''){
    this.$message.error('请输入手机号')
    return false
  }else if(this.phoneShow==true){
    this.$message.error('请输入正确格式的手机号')
    return false
  }else if(this.data.password==''){
    this.$message.error('请输入密码')
    return false
  }else{
    this.$http.post('/user/login',this.$qs.stringify(this.data)).then(res=>{
      if(res.data.code==1&&res.data.data.userinfo.group_id==0){
        this.$message.success(res.data.msg)
        this.$router.push('/create_order')
        window.sessionStorage.setItem('token',res.data.data.userinfo.token)
      }else if(res.data.code==1&&res.data.data.userinfo.group_id==1){
        this.$message.success(res.data.msg)
        this.$router.push('/serve')
        window.sessionStorage.setItem('token',res.data.data.userinfo.token)
      }else{
        this.$message.error(res.data.msg)
      }
    })
  }
}
  }
};
</script>
<style scoped>
@media screen and (max-width: 540px) {
  .checkin {
    color: #fff;
    justify-content: center;
    font-size: 0.3rem;
    display: flex;
    align-items: center;
    margin-top: 0.3rem;
  }
  .gang {
    font-size: 0.2rem;
    margin: 0 0.3rem;
  }
  .box {
    width: 100%;
    height: 100%;
    background: url("../assets/img/背景.png") top left no-repeat;
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
  }
  .put img {
    width: 0.54rem;
    height: 0.54rem;
    position: absolute;
    left: 1.3rem;
    top: 0.1rem;
  }
  input {
    border: 1px #fff solid;
    width: 5.23rem;
    height: 0.7rem;
    border-radius: 0.1rem;
    color: #65d6fe;
    outline: none;
    background-color: transparent;
    text-align: center;
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
