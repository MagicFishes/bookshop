<!--
 * @Author: your name
 * @Date: 2022-03-26 22:08:22
 * @LastEditTime: 2022-04-08 19:42:38
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \twice_html\bookshop\src\views\Record.vue
-->
<template>
  <div>
    <van-nav-bar
      title="搜索历史"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="box" v-if="newArr">
      <div class="book" v-for="(item,index) in newArr" :key="index" @click="change(item.id)">
        <div class="left">
          <img :src="item.pic" alt="" />
        </div>
        <div class="right">
          <h3>{{ item.title }}</h3>
          <div class="text">
            <p>{{ item.author }}</p>
            <p class="desc">
              <span>{{ item.desc }}...</span
              >·<span></span>
            </p>
            <!-- <p>评分:{{ desc["pris:book"].wprice }}</p> -->
            <div class="type_box">
              <span
                class="keyname"
                v-for="(item, index) in item.keyname"
                :key="index"
                >{{ item }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import resolve from '../../../vue-devtools-dev/packages/app-frontend/src/views/vuex/resolve';
export default {
  name: "Record",

  created() {
    if (localStorage.getItem("record")) {
      // console.log("sss");
      this.arr = JSON.parse(localStorage.getItem("record"));
      //   console.log( this.arr);
      for (let i = 0; i < this.arr.length; i++) {
        //    console.log( this.arr);
        // this.getPic(this.arr[i])
        this.getDeSC(this.arr[i]);
      }
    }
  },
  data() {
    return {
      pro: [],
      arr: [],
      newArr: [],
      desc: [],
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    change(id){
      this.$router.push({name:"BookDesc",params:{
          id:id
      }})  
    },
    //根据商品的pid商品详情信息
    getDeSC(id) {
      this.axios({
        method: "get",
        url:
          //图片
          //   "https://apis.netstart.cn/yunyuedu/book/info.json?sourceUuid=" + id,
          //  标题 作者
          "https://apis.netstart.cn/yunyuedu/book/getsub.json?id=" +
          id +
          "&title=",
        // 评论
        // "https://apis.netstart.cn/yunyuedu/comment/getComments.json?bookId="+id
        // "https://apis.netstart.cn/yunyuedu/comment/getReplys.json?bookId=654ebfbcccd64b3ea0a51934953f300e_4&cid=6181404648694406472"
      })
        .then((result) => {
          //   console.log("result ==> ", result);
        //   this.desc = result.data.feed.entry;
          let keyname;
          if (result.data.feed.entry["pris:book"].keyname) {
            keyname = result.data.feed.entry["pris:book"].keyname.split(",");
          } else {
            keyname = ["无标签"];
          }
        //   console.log(result);
          let obj = {
            keyname: keyname,
            author:result.data.feed.entry.author.name,
            title:result.data.feed.entry.title,
            desc:result.data.feed.entry.summary,
            id:result.data.feed.entry.id,
            
          };
          return obj
        }).then((obj)=>{
           this.getPic(obj)
       
        return obj
        }).then((obj)=>{
        //   console.log(obj);
        })
        .catch((err) => {
          // this.pic=""
          // console.log("err ==> ", err);
        });
    },
    getPic(id) {
      this.axios({
        method: "get",
        url:
          //图片
          "https://apis.netstart.cn/yunyuedu/book/info.json?sourceUuid=" + id.id,
        //  标题 作者
        // "https://apis.netstart.cn/yunyuedu/book/getsub.json?id="+id+"&title="
        // 评论
        // "https://apis.netstart.cn/yunyuedu/comment/getComments.json?bookId="+id
        // "https://apis.netstart.cn/yunyuedu/comment/getReplys.json?bookId=654ebfbcccd64b3ea0a51934953f300e_4&cid=6181404648694406472"
      })
        .then((result) => {
            // console.log("result ==> ", result);
            // resolve (result)
        // return result.data.data.book.cover;
        id.pic=result.data.data.book.cover
        //   console.log(this.desc);
        return id
        }).then((obj)=>{
            // console.log(obj);
            this.newArr.push(obj)
            // console.log(this.newArr);
        })
        .catch((err) => {
          this.pic = "";
          console.log("err ==> ", err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .van-nav-bar ,.van-hairline--bottom{
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

 ::v-deep .van-icon ,.van-icon-arrow-left ,.van-nav-bar__arrow{
    color: white;
  }
.box {
  //   margin-top: 20px;
  overflow-y: auto;
  width: 100%;
  height: 621px;
  background: rgb(255, 255, 255);
   .book {
    margin-top: 20px;
    width: 100%;
    height: 170px;
    // background: rgb(240, 240, 240);
    display: flex;
    justify-content: space-between;
    overflow: hidden;

    .left {
      width: 35%;
      //   background: rgb(97, 205, 255);
      display: flex;
      //   align-items:top;
      justify-content: space-evenly;
      img {
        //   width: 100%;
        width: 120px;
        height: 150px;
      }
    }
    .right {
      width: 65%;
      //   background: rgb(97, 205, 255);
      h3 {
        padding: 0px;
        margin: 5px 0px;
      }
      .text {
        p {
          margin: 9px 0px;
          color: rgba(68, 68, 68, 0.568);
          font-size: 14px;
          margin-left: 5px;
        }
        .desc{
            display: block;
            width: 100%;
            height: 50px;
            // overflow: hidden;
            overflow-y: auto;
        }
        .type_box {
          display: flex;
          justify-content: start;
          width: 100%;
          height: 30px;
          overflow-x: auto;
          overflow-y: auto;
          flex-wrap: wrap;
          .keyname {
            display: block;
            width: auto;
            margin-bottom: 5px;
            height: 18px;
            text-align: center;
            line-height: 20px;
            padding: 3px;
             background: linear-gradient(120deg,#ff7a8923,#fe3c5338);
             color: rgb(37, 37, 37);
            border-radius: 20px;
            margin-left: 10px;
          }
        }
      }
    }
  }
}
</style>