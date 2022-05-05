<!--
 * @Author: your name
 * @Date: 2022-03-22 16:51:54
 * @LastEditTime: 2022-04-08 19:39:13
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \twice_html\bookshop\src\views\bookshelf.vue
-->
<template>
  <div class="bigbox">
    <van-nav-bar
      title="我的书架"
      
      right-text="删除"
      :left-arrow='false'
       :border='true'
      @click-right="onClickRight"
    />
   

    <ul class="box">
      <div class="top" v-for="(item, index) in newarr" :key="index">
        <div class="delete" v-show="checked" @click="Dialog(index)">
          <van-icon name="cross" />
        </div>
        <li @click="enterDesc(item.id)">
          <bookDescRow :src="item.cover" :title="item.title"  :author='item.author'></bookDescRow>
        </li>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  created() {
    if (localStorage.getItem("id")) {
      this.arr = JSON.parse(localStorage.getItem("id"));
      // console.log(this.arr);
      // this.getPic(this.arr[0])
      for (let i = 0; i < this.arr.length; i++) {
        this.getPic(this.arr[i]);
      }
    }
    // console.log(this.arr);
  },
  data() {
    return {
      arr: [],
      newarr: [],
      checked: false,
      recordArr:[],
    };
  },
  methods: {
    onClickRight(){
      this.checked=!this.checked
    },
    Dialog(index) {
      this.$dialog
        .confirm({
          // Dialog.confirm({
          title: "标题",
          message: "是否删除",
        })
        .then(() => {
          // on confirm
          // console.log(index);
          let textArr = [];
          for (let i = 0; i < this.newarr.length; i++) {
            if (i !== index) {
              textArr.push(this.newarr[i].id);
              // console.log(this.newarr);
            }
          }
          // console.log(textArr);

          localStorage.setItem("id", JSON.stringify(textArr));
          this.$toast('删除成功')
          this.$router.go(0);
        })
        .catch(() => {
          // on cancel
          // console.log("取消");
        });
    },
    enterDesc(id) {
      if (this.checked == false) {
               if (localStorage.getItem("record")) {
        this.recordArr = JSON.parse(localStorage.getItem("record"));
      } else {
        this.recordArr = [];
      }
      this.recordArr.push(id);
      this.recordArr = [...new Set(this.recordArr)];
      localStorage.setItem("record", JSON.stringify(this.recordArr));
        this.$router.push({ name: "BookDesc", params: { id: id } });
      }
    },
    getPic(id) {
      this.axios({
        method: "get",
        url:
          //图片
          "https://apis.netstart.cn/yunyuedu/book/info.json?sourceUuid=" + id,
      })
        .then((result) => {
          // console.log("result ==> ", result);
          //  result.data.data.book.cover;
          // console.log(this.desc);
          this.newarr.push({
            id: id,
            bookId: result.data.data.book.bookId,
            cover: result.data.data.book.cover,
            title: result.data.data.book.title,
            author:result.data.data.book.author
          });
        })
        .then((result) => {
          // console.log(this.newarr);
        })
        .catch((err) => {
          this.pic = "";
          // console.log("err ==> ", err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.bigbox {
  .van-nav-bar ,.van-hairline--bottom{
    //  background: linear-gradient(180deg, #fe3c53da, #ff7a8977);
    background: #eb4659;
z-index: 100;
  }
  ::v-deep .van-nav-bar__title, .van-ellipsis{
    color: white;
    font-size: 16px;
  }
  ::v-deep.van-nav-bar__text{
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.356);
    padding:5px;
    border-radius: 10px;
  }
  
  width: 375px;
  height: 667px;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h2 {
      text-indent: 10px;
    }
    .delete_btn {
      span {
        font-size: 16px;
        vertical-align: middle;
      }

      .van-switch {
        vertical-align: middle;
      }
    }
  }
}
.box {
  // width: 375px;
  // width: 100%;
  // padding: 5px;
  // text-align: center;
  // display: flex;
  // justify-content: space-between;
  // flex-wrap: wrap;
  .top {
    position: relative;
    margin-top: 8px;
    .delete {
      width: 20px;
      height: 20px;
      background: #999;
      text-align: center;
      line-height: 20px;
      border-radius: 20px;
      background: linear-gradient(12deg, #fe3c53, #ff7a89);
      color: white;
      position: absolute;
      left: -10px;
      top: -5px;
    }
  }
  .top {
    //   width: 100px;
    // position: relative;
    height: 163px;
    float: left;
    margin-left: 22px;
    // overflow: hidden;
    margin-bottom: 10px;

    .tab {
      margin: 0 auto;
    }
  }
}
</style>