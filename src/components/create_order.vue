<template>
  <div>
    <div class="phone">
      <img src="../assets/img/咨询电话.png" alt="" />
    </div>
    <div class="samebox">
      <div class="left">
        <img src="../assets/img/选择服务.png" alt="" />
        <span>服务</span>
      </div>
      <div class="right">
        <div
          :class="[onlyid == item.id ? 'active' : 'common']"
          @click="tab1(item)"
          v-for="(item, index) in list"
          :key="index"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="samebox">
      <div class="left">
        <img src="../assets/img/选择类型.png" alt="" />
        <span>类型</span>
      </div>
      <el-select v-model="data.level_id" placeholder="请选择" size="small">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </div>
    <div class="samebox">
      <div class="left">
        <img src="../assets/img/选择区域.png" alt="" />
        <span>类型</span>
      </div>
      <div class="quyu">中 国</div>
    </div>
    <button @click="buy">立即购买</button>
    <div id="qrcode" ref="qrcode"></div>
    <img src="../assets/img/长图.png" alt="" class="botimg" />
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
  components:{QRCode},
  mounted() {
    this.getlist();
  },
  data() {
    return {
      data: {
        token: window.sessionStorage.getItem("token"),
        level_id: "",
        pm: "al"
      },
      onlyid: "",
      list: [],
      options: [],
      address: ""
    };
  },
  methods: {
    qrcode() {
      let qrcode = new QRCode("qrcode", {
        width: 200, // 二维码宽度，单位像素
        height: 200, // 二维码高度，单位像素
        text: this.address // 生成二维码的链接
      });
    },
    //   获取服务列表
    getlist() {
      this.$http
        .post("/audit/level_list", this.$qs.stringify(this.data))
        .then(res => {
          this.list = res.data;
        });
    },
    // 选择服务
    tab1(item) {
      this.onlyid = item.id;
      this.options = item.level2_list;
    },
    // 立即购买
    buy() {
      this.$http
        .post("/client/pay", this.$qs.stringify(this.data))
        .then(res => {
          this.address = res.data.msg;
          this.$nextTick(function() {
            this.qrcode();
          });
        });
    }
  }
};
</script>
<style scoped>
@media screen and (max-width: 540px) {
  .botimg {
    width: 100%;
  }
  .el-select {
    width: 5.24rem !important;
  }
  .el-input {
    text-align: center !important;
  }
  .phone {
    width: 100%;
    height: 1.26rem;
    background-color: #fff;
    text-align: center;
    margin-top: 1px;
    margin-bottom: 0.1rem;
  }
  .phone img {
    width: 6.56;
    height: 0.9rem;
    margin-top: 0.18rem;
  }
  .samebox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem 0.3rem;
    font-size: 0.3rem;
    background-color: #fff;
    margin-top: 1px;
  }
  .left img {
    width: 0.4rem;
    height: 0.4rem;
    vertical-align: bottom;
  }
  .right {
    display: flex;
    width: 5.24rem;
    border-radius: 0.1rem;
    overflow: hidden;
  }
  .quyu {
    width: 5.24rem;
    border-radius: 0.1rem;
    border: 1px solid #3da4fe;
    text-align: center;
    color: #3da4fe;
    padding: 0.1rem 0;
  }
  .common {
    padding: 0.1rem 0;
    flex: 1;
    text-align: center;
    background-color: #91dafe;
    color: #fff;
    border-right: 1px solid #ffffff;
  }
  .active {
    padding: 0.1rem 0;
    flex: 1;
    text-align: center;
    background-color: #3da4fe;
    color: #fff;
    border-right: 1px solid #ffffff;
  }
  .right div:last-child {
    border: none;
  }
}
</style>
