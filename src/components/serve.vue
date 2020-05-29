<template>
  <div class="app">
    <div class="head">
      <van-icon name="arrow-left" @click="back" />
      <div>服务管理</div>
      <van-icon name="bars" @click="show" />
      <transition name="el-zoom-in-top">
        <div class="menu" v-show="menuShow">
          <router-link to="/orderM"><div>订单管理</div></router-link>
          <router-link to="/uploadM"
            ><div class="menu_top">上传管理</div></router-link
          >
          <router-link to="/message"><div>留言管理</div></router-link>
        </div></transition
      >
    </div>
    <!-- 列表 -->
    <div v-for="(item, index) in list" :key="index" class="bigbox">
      <div class="list">
        <div>{{ item.name }}</div>
        <div class="right">
          <img src="../assets/img/修改.png" alt="" @click="edit_name(item)" />
          <div class="gang"></div>
          <img src="../assets/img/新增.png" alt="" @click="addtwo(item)"/>
          <van-icon
            name="arrow-down"
            :class="[item_index == item.id ? 'rotate' : 'ico']"
            @click="showleave(item)"
          />
        </div>
      </div>
      <!-- 隐藏面板 -->
      <transition name="el-zoom-in-top">
        <div class="leave" v-show="item_index == item.id">
          <div
            class="item"
            v-for="(i, index) in item.level2_list"
            :key="index + 30"
          >
            <div class="left">{{ i.name }}</div>
            <div class="right">
              <span class="edit">编辑</span>
              <span class="del">删除</span>
            </div>
          </div>
          <div class="okedit" @click="item_index = 0">
            完成修改 <van-icon name="arrow-up" />
          </div>
        </div>
      </transition>
    </div>
    <!-- 底部按钮 -->
    <div class="botbtn" @click="showone = true">新增一级服务类</div>
    <!-- 新增一级 -->
    <van-dialog v-model="showone" show-cancel-button>
      <div style="text-align:center">
        <input
          type="text"
          style=""
          class="oneinput"
          placeholder="商标代理"
          v-model="data.name"
        />
      </div>
    </van-dialog>
    <!-- 编辑二级 -->
    <van-dialog v-model="showtwo" show-cancel-button :title="firstname" @confirm='sure'>
      <div>
        <van-cell-group>
          <van-field v-model="data.name" placeholder="请在此输入" label="新增名称"/>
          <van-field v-model="data.price" placeholder="请在此输入" label="服务金额"/>
        </van-cell-group>
      </div>
    </van-dialog>
    <!-- 新增二级 -->
    <van-dialog v-model="showadd" show-cancel-button :title="firstname" @confirm='sure'>
      <div>
        <van-cell-group>
          <van-field v-model="data.name" placeholder="请在此输入" label="新增名称"/>
          <van-field v-model="data.price" placeholder="请在此输入" label="服务金额"/>
        </van-cell-group>
      </div>
    </van-dialog>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getlist();
  },
  data() {
    return {
      firstname: "",
      item_index: 0,
      data: {
        token: window.sessionStorage.getItem("token"),
        name: "",
        pid:"",
        price:""
      },
      showone: false,
      showtwo: false,
      showadd:false,
      menuShow: false,
      list: []
    };
  },
  methods: {
    // 新增二级
    addtwo(item){
      this.firstname = item.name;
      this.showadd = true;
      this.data.pid=item.pid
      this.$http.post('/audit/level_add',this.$qs.stringify(this.data)).then(res=>{
        if(res.data.code==1){
          this.$message.success(res.data.msg)
          this.getlist()
        }else{
          this.$message.fail(res.data.msg)
        }
      })
    },
    // 确定修改二级
    sure(){
      console.log(1)
    },
    // 编辑二级
    edit_name(item) {
      this.firstname = item.name;
      this.showtwo = true;
    },
    //   导航栏
    show() {
      if (this.menuShow == false) {
        this.menuShow = true;
      } else {
        this.menuShow = false;
      }
    },
    // 打开折叠面板
    showleave(item) {
      if (item.id != this.item_index) {
        this.item_index = item.id;
      } else {
        this.item_index = 0;
      }
    },
    // 返回
    back() {
      this.$router.go(-1);
    },
    // 获取列表
    getlist() {
      this.$http
        .post("/audit/level_list", this.$qs.stringify(this.data))
        .then(res => {
          this.list = res.data;
        });
    }
  }
};
</script>
<style scoped>
@media screen and (max-width: 540px) {
  .oneinput {
    width: 70%;
    height: 0.6rem;
    margin: 0.4rem auto;
    text-align: center;
    border-radius: 0.1rem;
    outline: none;
    border: 1px solid #000;
  }
  .botbtn {
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
  .bigbox {
    width: 95%;
    margin: 0.2rem auto 0;
    background-color: #fff;
    border-radius: 0.2rem;
    overflow: hidden;
  }
  .list {
    border-radius: 0.2rem;
    width: 100%;
    display: flex;
    padding: 0.2rem 0.2rem;
    box-sizing: border-box;
    font-size: 0.4rem;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 8px 5px -3px #eef6f4;
  }
  .right {
    display: flex;
    align-items: center;
  }
  .right img {
    width: 0.4rem;
    height: 0.4rem;
  }
  .gang {
    width: 0;
    height: 0.4rem;
    border-left: 1px solid #999999;
    margin: 0 0.2rem;
  }
  .ico {
    font-size: 0.4rem;
    color: #93abfe;
    margin-left: 0.3rem;
    transition: all 1s;
  }
  .rotate {
    margin-left: 0.3rem;
    font-size: 0.4rem;
    color: #93abfe;
    transform: rotateX(-180deg);
    transition: all 1s;
  }
  /* 隐藏面板 */
  .leave {
    background-color: #fff;
    width: 100%;
    margin-top: 0.2rem;
  }
  .leave .item {
    display: flex;
    justify-content: space-between;
    padding: 0.15rem 0.2rem;
    border-bottom: 1px solid #e0e0e0;
    font-size: 0.3rem;
  }
  .okedit {
    font-size: 0.4rem;
    color: #85a0fe;
    padding: 0.1rem;
    text-align: center;
    vertical-align: center;
  }
  .left {
    color: #8c8c8c;
  }
  .edit {
    color: #9eacff;
    margin-right: 0.5rem;
  }
  .del {
    color: #ff5d68;
  }
}
</style>
