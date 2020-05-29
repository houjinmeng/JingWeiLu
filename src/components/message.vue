<template>
  <div class="app">
    <div class="head">
      <van-icon name="arrow-left" @click="back" />
      <div>留言管理</div>
      <van-icon name="bars" @click="show" />
      <transition name="el-zoom-in-top">
        <div class="menu" v-show="menuShow">
          <router-link to="/orderM"><div>订单管理</div></router-link>
          <router-link to="/serve"
            ><div class="menu_top">服务管理</div></router-link
          >
          <router-link to="/uploadM"><div>上传管理</div></router-link>
        </div></transition
      >
    </div>
    <div class="content">
      <div
        style="position: relative;"
        v-for="(item, index) in list"
        :key="index"
      >
        <div class="box">
          <div class="yes" v-show="item.status == 1">已回访</div>
          <div class="no" v-show="item.status == 0">未回访</div>
          <div>
            联系人 : <span>{{ item.name }}</span>
          </div>
          <div>
            联系电话 : <span>{{ item.mobile }}</span>
          </div>
          <div>
            留言时间 : <span>{{ (item.create_time * 1000) | formatDate }}</span>
          </div>
        </div>
        <div :class="[item.status == 0 ? 'bottom' : 'abot']" @click="edit=true">操作 >></div>
      </div>
    </div>
    <van-dialog v-model="edit" show-cancel-button>
      <div class="sele">
        <el-select v-model="value" placeholder="请选择" size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { formatDate } from "@/assets/js/date.js";
export default {
  // 时间戳过滤器
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy/MM/dd hh:mm:ss"); // 年月日 格式自己定义   'yyyy : MM : dd'  例 2018年12月5日的格式
    },
    formatDateTwo(time) {
      var date = new Date(time);
      return formatDate(date, "hh点"); // 时间点 例 21点12分12秒的格式
    }
  },
  mounted() {
    this.getlist();
  },
  data() {
    return {
      edit:false,
      menuShow: false,
      data: {
        token: window.sessionStorage.getItem("token")
      },
      list: [],
      options: [
        {
          value: "0",
          label: "未回访"
        },
        {
          value: "1",
          label: "已回访"
        }
      ],
      value: ""
    };
  },
  methods: {
    // 获取留言列表
    getlist() {
      this.$http
        .post("/audit/leava_list", this.$qs.stringify(this.data))
        .then(res => {
          this.list = res.data;
        });
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
    back() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
@media screen and (max-width: 540px) {
  .sele{
    text-align: center;
    margin: 0.4rem 0;
  }
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
  /* 列表 */
  .content {
    height: 93%;
    overflow: auto;
    padding: 0.2rem 0.3rem;
    box-sizing: border-box;
  }
  .box {
    width: 100%;
    background-color: #fff;
    border-radius: 0.2rem 0.2rem 0 0;
    padding: 0.2rem 0.3rem;
    box-sizing: border-box;
    font-size: 0.28rem;
    position: relative;
    margin-top: 0.2rem;
  }
  .yes {
    position: absolute;
    color: #658bfe;
    top: 0.3rem;
    right: 0.4rem;
  }
  .no {
    border: 1px solid #ff5d68;
    position: absolute;
    color: #ff5d68;
    top: 0.3rem;
    right: 0.4rem;
    border-radius: 0.1rem;
    font-size: 0.2rem;
    padding: 0.05rem;
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
    color: #ff5d68;
  }
  .abot {
    height: 0.74rem;
    text-align: center;
    border-top: 1px solid #ccc;
    line-height: 0.74rem;
    font-size: 0.35rem;
    background-color: #fff;
    border-radius: 0 0 0.2rem 0.2rem;
    color: #658bfe;
  }
}
</style>
