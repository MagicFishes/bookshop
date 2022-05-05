<!--
 * @Author: your name
 * @Date: 2022-03-23 02:55:30
 * @LastEditTime: 2022-04-05 15:09:59
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \twice_html\bookshop\src\components\book_desc_row.vue
-->
<template>
  <div class="tab" :src="src" :title="title" :author="author">
    <div class="img">
      <img :src="src" alt="" />
    </div>
    <span class="box">{{ title }}</span>
    <span class="author">{{ author }}</span>
  </div>
</template>

<script>
export default {
  name: "bookDescRow",
  props: {
    src: {
      type: String,
      default: () => {
        return "背景路径";
      },
    },
    title: {
      type: String,
      default: () => {
        return "书名";
      },
    },
    author: {
      type: String,
      default: () => {
        return "未知作者";
      },
    },
  },

  //     created(){
  //         console.log("sss");
  //         this.get();
  //     },
  //     methods:{
  //         get(){
  //             this.axios({
  //     method: "get",
  //     url:
  //      "https://apis.netstart.cn/yunyuedu/category/original/data.json?id=8&gender=female&sort=2&pay=0&state=0&page=1",
  //     params: {

  //     },
  //   })
  //     .then((result) => {
  //       console.log("result ==> ", result);
  //       this.proDetailData = result.data.words.w;
  //       console.log(this.proDetailData);
  //     })
  //     .catch((err) => {
  //       console.log("err ==> ", err);
  //     });
  //         }
  //     }
};
</script>

<style lang="scss" scoped>
.tab {
  width: 100px;
  height: 160px;
  font-family: "黑体";

  // background: violet;
  .img {
    height: 125px;
    overflow: hidden;
    width: 90px;
    // display: flex;
        // justify-content: center;
        // align-items: center;

    img {
      height: 120px;
      // width: ;
      width: 90px;
      box-shadow: 
                    0px 0px 0px 0px #999,
                    0px 0px 0px 0px #999,
                    0px 0px 0px 0px #999,
                    0px -2px 20px 0px rgb(185, 164, 164),

    }
  }

  .box {
    width: 100px;
    height: 14px;
    margin-top: 10px;
    // background: blue;
    display: block;
    font-size: 12px;
    font-weight: bold;
    overflow-y: auto;
  }
  .author {
    color: #999;
    font-size: 12px;
  }
}
</style>