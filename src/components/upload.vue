<template>
  <div class="app">
    <div class="head">
      <van-icon name="arrow-left" @click="back" />
      <div>上传文件</div>
      <van-icon name="bars" @click="show" />
      <transition name="el-zoom-in-top">
        <div class="menu" v-show="menuShow">
          <router-link to="/create_order"
            ><div class="menu_top">创建订单</div></router-link
          >
          <router-link to="/myorder"><div>我的订单</div></router-link>
        </div></transition
      >
    </div>
    <div class="top_line"></div>
    <!-- 输入框 -->
    <div class="top_name">
      姓名
      <input type="text" placeholder="请在此输入" v-model="data.name" />
    </div>
    <!-- 资质类型 -->
    <div class="leixing">
      <div>所传资质类型</div>
      <div class="level1">
        <div
          :class="[onlyid == item.id ? 'active' : 'common']"
          @click="tab1(item)"
          v-for="(item, index) in list"
          :key="index"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="midline"></div>
      <div class="midsel">
        <el-select
          v-model="data.level_id"
          placeholder="请选择"
          size="small"
          style="width:90%"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <!-- 上传 -->
    <div class="upload">
      <div class="top">
        <div>添加文件</div>
        <div style="color:#fec283">*压缩包不大于10M</div>
      </div>
      <div class="upimg">
        <van-uploader v-model="fileList" accept="*" :before-read="beforeRead">
          <img src="../assets/img/上传压缩文件.png" alt="" />
        </van-uploader>
      </div>
    </div>
    <!-- 确认上传 -->
    <div class="okup" @click="okupload">确认上传</div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getlist();
  },
  data() {
    return {
      fileList: [],
      menuShow: false,
      data: {
        token: window.sessionStorage.getItem("token"),
        name: "",
        level_id: ""
      },
      options: [],
      list: [],
      onlyid: "",
      app: null
    };
  },
  methods: {
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
    // 上传之前校验;
    beforeRead(file) {
      let fileName = file.name.lastIndexOf(".");
      let fileNameLength = file.name.length;
      let a = file.name.substring(fileName + 1, fileNameLength);
      if (file.size / (1024 * 1024) > 10) {
        this.$message.warning("文件大小不可超过10M");
        return false;
      } else if (a != "zip") {
        this.$message.warning("上传文件必须为zip格式");
        return false
      } else {
        this.$message.success("上传成功");
        this.app = file;
      }
    },
    // 确认上传
    okupload() {
      if (this.data.name == "") {
        this.$message.warning("请输入姓名");
        return false;
      } else if (this.data.level_id == "") {
        this.$message.warning("请选择资质类型");
        return false;
      } else if (this.app == null) {
        this.$message.warning("请上传文件");
        return false;
      } else {
        let formData = new FormData();
        formData.append("file", this.app);
        formData.append("token", this.data.token);
        formData.append("level_id", this.data.level_id);
        formData.append("name", this.data.name);
        this.$http({
          method: "post", // 指定请求方式
          url: "/client/upload_file", // 请求接口
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;"
          },
          data: formData
        })
          .then(res => {
            if (res.data.code == 1) {
              this.$toast.success("提交成功");
            } else {
              //否则 Toast 提示
              this.$toast.fail(res.data.msg);
            }
          })
          .catch(err => {
            this.$toast.fail("系统异常");
            reject(err);
          });
      }
    }
  }
};
</script>
<style scoped>
@media screen and (max-width: 540px) {
  .app {
    height: 100%;
    background-color: #fff;
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
  /* 输入框 */
  .top_line {
    width: 100%;
    height: 0.1rem;
    background-color: #f0f2f5;
  }
  .top_name {
    margin-top: 0.3rem;
    border-bottom: 1px solid #f0f2f5;
    padding: 0.1rem 0.4rem;
    font-size: 0.3rem;
  }
  .top_name input {
    border: none;
    margin-left: 0.5rem;
  }
  /* 资质类型 */
  .leixing {
    padding: 0.1rem 0.4rem;
    font-size: 0.3rem;
  }
  .level1 {
    display: flex;
    width: 90%;
    margin: 0.2rem auto;
    border-radius: 0.1rem;
    overflow: hidden;
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
  .level1 div:last-child {
    border: none;
  }
  .midline {
    width: 90%;
    height: 1px;
    background-color: #f0f2f5;
    margin: 0.1rem auto;
    padding: 0 0.4rem;
    box-sizing: border-box;
  }
  .leixing >>> .el-input__inner {
    text-align: center;
  }
  .midsel {
    text-align: center;
    margin-top: 0.2rem;
  }
  /* 上传 */
  .upload {
    border-top: 1px solid #ccc;
    padding: 0.2rem 0.4rem;
    margin-top: 0.1rem;
    font-size: 0.3rem;
  }
  .upload .top {
    display: flex;
    justify-content: space-between;
  }
  .upimg {
    text-align: center;
    margin-top: 1rem;
  }
  .upimg img {
    width: 1.76rem;
    height: 1.23rem;
  }
  /* 确认上传 */
  .okup {
    width: 100%;
    height: 0.96rem;
    line-height: 0.96rem;
    text-align: center;
    font-size: 0.4rem;
    color: #fff;
    background-color: #3da4fe;
    position: fixed;
    bottom: 0;
  }
}
</style>
