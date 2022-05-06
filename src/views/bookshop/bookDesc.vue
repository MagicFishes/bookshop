<!--
 * @Author: your name
 * @Date: 2022-03-23 21:27:43
 * @LastEditTime: 2022-04-08 22:14:25
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \twice_html\bookshop\src\views\bookshop\bookDesc.vue
-->
<template>
  <div class="box">
    <!-- <back></back> -->
    <van-nav-bar
      title="书籍详情"
      left-text=""
      right-text=""
      left-arrow
      :fixed="true"
      @click-left="onClickLeft"
    />
     <!-- <div v-show="null_if"></div> -->
    <!-- <div class="allBox" v-if="desc && bookList"> -->
    <div class="allBox" v-if="desc && bookList">
     
      <div class="book">
        <div class="left">
          <img :src="pic" alt="" />
        </div>
        <div class="right">
          <h3>{{ desc.title }}</h3>
          <div class="text">
            <p>{{ desc.author.name }}</p>
            <p>
              <span>未完结</span>·<span>{{ num_type }}</span>
            </p>
            <!-- <p>评分:{{ desc["pris:book"].wprice }}</p> -->
            <div class="type_box">
              <span
                class="keyname"
                v-for="(item, index) in keyname"
                :key="index"
                >{{ item }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="box_desc">
        <ul>
          <li>
            <h3>{{ desc["pris:book"].words }}</h3>
            <p>字数</p>
          </li>
          <li>
            <h3>{{ desc["pris:subscribe"].clicksCount }}</h3>
            <p>阅读人数</p>
          </li>
          <li>
            <h3>{{ desc["pris:subscribe"].times }}</h3>
            <p>点赞数</p>
          </li>
        </ul>
        <div class="desc">
          {{ desc.summary }}
        </div>
        <div class="list" @click="bookchange">
          <div class="left"><h3>目录</h3></div>
          <div class="right">
            <span>{{ bookList.ncx.version }}</span
            >·<span>更新至</span>&nbsp;&nbsp;&nbsp;<span>{{ newtitle }}</span>
          </div>
        </div>
      </div>
      <div class="talk">
        <myHead left="书评" right=""></myHead>
        <div class="box" v-for="(item, index) in talkArr[id]" :key="index">
          <div class="left">
            <div class="circle">
              <img :src="item.src" alt="" />
            </div>
          </div>
          <div class="right">
            <myHead :left="item.kidName" right=""></myHead>
            <div class="content">
              {{ item.desc }}
            </div>
          </div>
        </div>

        <div class="fixed_btn" @click="talk_btn" ref="fixed_btn">
          <!-- <button></button> -->
        </div>

        <div class="post_talk" ref="post_talk">
          <!-- <input type="text" /> -->
          <textarea v-model="talkArrDesc"></textarea>
          <div class="btn">
            <button @click="post_talk(id)">发送评论</button>
            <button @click="cancle_post">取消评论</button>
          </div>
        </div>
      </div>
      <div class="change">
        <van-goods-action>
          <van-goods-action-button
            color="#ff7a89"
            type="warning"
            :text="open ? '已加入书架' : '加入书架'"
            @click="onClickButtonLeft(id)"
          />
          <van-goods-action-button
            color="#fe3c53"
            type="danger"
            text="立即阅读"
            @click="bookchange"
          />
        </van-goods-action>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  created() {
    let params = this.$route.params.id;
    // console.log(params);
    //获取图片
    this.id = params;
    //获取id
    if (localStorage.getItem("id")) {
      this.arr = JSON.parse(localStorage.getItem("id"));
      for (let i = 0; i < this.arr.length; i++) {
        if (this.id == this.arr[i]) {
          this.open = true;
        }
      }
    } else {
      this.arr = [];
      this.open = false;
    }

    if(localStorage.getItem("message")){
      this.message_name=JSON.parse(localStorage.getItem("message")).userName
      this.message_src=JSON.parse((localStorage.getItem("message"))).fileList[0].content
    }

  // if(this.message_src==''){
  //     this.message_src='../../assets/Snipaste/笑脸.jpg'
  // }
    if (localStorage.getItem("talk")) {
        this.talkArr = JSON.parse(localStorage.getItem("talk"));
        // console.log("已经拥有", this.talkArr);
        //过滤
      } else {
        (this.talkArr = {}),
         (this.talkArr[this.id] = []);
      }

      if (!this.talkArr[this.id]) {
        this.talkArr[this.id] = [];
      }
    //获取信息

    //获取评论
    this.getPic(params);
    this.getDeSC(params);
    this.getBookList(params);
    this.getTalk(params);
  },
  data() {
    return {
      num_type: 1,
      null_if:null,
      id: null,
      desc: null,
      pic: "",
      bookList: null,
      //   author:"",
      keyname: null,
      newtitle: "",
      talkList: null,
      arr: [],
      open: false,
      title: "",
      talkArr: {},
      talkArrDesc: null,
      kidName:null,
      talk_src:null,
      message_name:null,
      message_src:null,
    };
  },
  methods: {
    post_talk(id) {
      // console.log(id);
      if(!localStorage.getItem("message")){
        this.$router.push({name:'Login'})
       
      }else{
          if (localStorage.getItem("talk")) {
        this.talkArr = JSON.parse(localStorage.getItem("talk"));
        // console.log("已经拥有", this.talkArr);
        //过滤
      } else {
        (this.talkArr = {}), (this.talkArr[id] = []);
      }

      if (!this.talkArr[id]) {
        this.talkArr[id] = [];
      }
      this.talkArr[id].push({
        desc: this.talkArrDesc,
        kidName: this.message_name,
        src:this.message_src
      });
      // console.log(this.talkArr);
      localStorage.setItem("talk", JSON.stringify(this.talkArr));
      }
    this.talkArrDesc=null
    this.$toast('发送成功')
    },
    cancle_post() {
      this.$refs.fixed_btn.style.display = "block";

      // this.$refs.post_talk.style.display = "none";
      this.$refs.post_talk.style.left = "375px";
    },
    talk_btn() {
      this.$refs.fixed_btn.style.display = "none";

      // this.$refs.post_talk.style.display = "block";
      this.$refs.post_talk.style.left = "0px";
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    //传递一个id，储存到local里面
    onClickButtonLeft(id) {
      if (this.open == false) {
        this.open = true;
         this.$toast('加入书架成功');
        // console.log("yijiaru");
        if (localStorage.getItem("id")) {
          this.arr = JSON.parse(localStorage.getItem("id"));
        } else {
          this.arr = [];
        }

        this.arr.push(id);
        this.arr = [...new Set(this.arr)];

        this.arr = JSON.stringify(this.arr);

        localStorage.setItem("id", this.arr);
      } else {
        this.open = false;
        this.$toast('已移出书架');

        // console.log("1234856");

        //删除
        if (localStorage.getItem("id")) {
          this.arr = JSON.parse(localStorage.getItem("id"));
        } else {
          this.arr = [];
        }
        for (let i = 0; i < this.arr.length; i++) {
          if (this.id == this.arr[i]) {
            this.arr.splice(i, 1);
          }
        }
        this.arr = JSON.stringify(this.arr);

        localStorage.setItem("id", this.arr);
      }
    
    },

    getPic(id) {
      this.axios({
        method: "get",
        url:
          //图片
          "https://apis.netstart.cn/yunyuedu/book/info.json?sourceUuid=" + id,
        //  标题 作者
        // "https://apis.netstart.cn/yunyuedu/book/getsub.json?id="+id+"&title="
        // 评论
        // "https://apis.netstart.cn/yunyuedu/comment/getComments.json?bookId="+id
        // "https://apis.netstart.cn/yunyuedu/comment/getReplys.json?bookId=654ebfbcccd64b3ea0a51934953f300e_4&cid=6181404648694406472"
      })
        .then((result) => {
          // console.log("result ==> ", result);
          this.pic = result.data.data.book.cover;
          //   console.log(this.desc);
        })
        .catch((err) => {
          this.pic = "";
          // console.log("err ==> ", err);
        });
    },
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
          // console.log("result ==> ", result);
          this.desc = result.data.feed.entry;
          if (result.data.feed.entry["pris:book"].keyname) {
            this.keyname =
              result.data.feed.entry["pris:book"].keyname.split(",");
          } else {
            this.keyname = ["无标签"];
          }
          // console.log("desc", this.desc);
          if (this.desc["pris:book"].words / 10000 > 1) {
            // console.log("words", this.desc["pris:book"].words / 10000);

            this.num_type =
              parseInt(this.desc["pris:book"].words / 10000) + "万字";
          } else {
            this.num_type = this.desc["pris:book"].words + "字";
          }
        })
        .catch((err) => {
          // this.pic=""
          // console.log("err ==> ", err);
        });
    },
    getBookList(id) {
      this.axios({
        method: "get",
        url:
          //图片
          //   "https://apis.netstart.cn/yunyuedu/book/info.json?sourceUuid=" + id,
          //  标题 作者
          // "https://apis.netstart.cn/yunyuedu/book/getsub.json?id="+id+"&title="
          //目录
          //卷一卷二，时间
          // "https://apis.netstart.cn/yunyuedu/book/catalog.json?tocId="+id
          "https://apis.netstart.cn/yunyuedu/book/catalog.json?tocId=654ebfbcccd64b3ea0a51934953f300e_4",
        // 评论
        // "https://apis.netstart.cn/yunyuedu/comment/getComments.json?bookId="+id
        // "https://apis.netstart.cn/yunyuedu/comment/getReplys.json?bookId=654ebfbcccd64b3ea0a51934953f300e_4&cid=6181404648694406472"
      })
        .then((result) => {
          //   console.log("result ==> ", result);
          this.bookList = result.data;
          //   console.log(this.bookList);
          this.newtitle =
            this.bookList.ncx.navMap.navPoint[
              this.bookList.ncx.navMap.navPoint.length - 1
            ].navPoint[
              this.bookList.ncx.navMap.navPoint[
                this.bookList.ncx.navMap.navPoint.length - 1
              ].navPoint.length - 1
            ].navLabel.split(",")[1];
          // console.log(this.newtitle);
          //   console.log("this.bookList"+this.bookList);
        })
        .catch((err) => {
          // console.log("err ==> ", err);
        });
    },
    getTalk(id) {
      this.axios({
        method: "get",
        url: "https://apis.netstart.cn/yunyuedu/comment/getReplys.json?bookId=654ebfbcccd64b3ea0a51934953f300e_4&cid=6181404648694406472",
      })
        .then((result) => {
          //   console.log("result ==> ", result);
          this.talkList = result.data.all.list;
          // console.log(this.talkList);
        })
        .catch((err) => {
          // console.log("err ==> ", err);
        });
    },
    bookchange() {
      this.$router.push({ name: "BookList", params: { id: this.id } });
    },
  },
};
</script>

<style lang="scss" scoped>
::-webkit-scrollbar-track-piece {
  //滚动条凹槽的颜色，还可以设置边框属性
  background-color: #f8f8f8;
}
::-webkit-scrollbar {
  //滚动条的宽度
  width: 0px;
  height: 0px;
}
::-webkit-scrollbar-thumb {
  //滚动条的设置
  background-color: #dddddd;
  background-clip: padding-box;
  min-height: 28px;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #bbb;
}
//头部
.van-nav-bar,
.van-hairline--bottom {
  //  background: linear-gradient(180deg, #fe3c53da, #ff7a8977);
background: #eb4659;
z-index: 100;
}
::v-deep .van-nav-bar__title,
.van-ellipsis {
  color: white;
  font-size: 16px;
}
::v-deep.van-nav-bar__text {
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.356);
  padding: 5px;
  border-radius: 10px;
}

::v-deep .van-icon,
.van-icon-arrow-left,
.van-nav-bar__arrow {
  color: white;
}

.box {
  .allBox {
    margin-top: 46px;
    padding: 10px;
  }
  width: 100%;
  //   background: #999;
  margin: 0 auto;
  height: 100%;
  .book {
    margin-top: 10px;
    width: 100%;
    height: 170px;
    // background: rgb(240, 240, 240);
    display: flex;
    justify-content: space-between;

    .left {
      width: 35%;
      //   background: rgb(97, 205, 255);
      display: flex;
      //   align-items:top;
      justify-content: space-evenly;
      img {
        //   width: 100%;
        // width: 120px;
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
            height: 20px;
            text-align: center;
            line-height: 20px;
            padding: 3px;
            background: rgba(177, 177, 177, 0.404);
            background: linear-gradient(120deg, #ff7a8923, #fe3c5338);
            border-radius: 20px;
            margin-left: 10px;
          }
        }
      }
    }
  }
  .box_desc {
    margin-top: -10px;
    width: 100%;
    //   height: 200px;
    z-index: 50;
    position: relative;
    //   background: rgb(236, 236, 236);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    ul {
      display: flex;
      padding: 0px 0px 10px 0px;
      justify-content: space-evenly;
      border-bottom: 1px solid rgba(153, 153, 153, 0.151);
      li {
        text-align: center;
        h3 {
          padding: 0px;
          margin: 10px 0px;
        }
        p {
          padding: 0px;
          margin: 0px;
        }
      }
    }
    .desc {
      text-indent: 40px;
      font-size: 16px;
      max-height: 100px;
      overflow-y: auto;
      padding: 0px 0px 10px 0px;
      border-bottom: 1px solid rgba(153, 153, 153, 0.151);
    }
    .list {
      box-sizing: border-box;
      padding: 0px 10px;

      width: 100%;
      height: 50px;
      // background: #999;
      display: flex;
      line-height: 50px;
      justify-content: space-between;
      h3 {
        padding: 0px;
        margin: 0px;
      }
    }
  }
  .talk {
    width: 95%;
    height: auto;
    //   background: #999;
    margin-top: 10px;
    margin-bottom: 50px;
    padding: 5px;
    //出现评论按钮
    .fixed_btn {
      width: 50px;
      height: 50px;
      // background: #999;
      background-image: url('../../assets/Snipaste/评论.png');
      background-size: 50px;
      
      // display: fixed;
      position: fixed;
      top: 500px;
      right: 0px;
    }

    .post_talk {
      // display: none;
      position: fixed;
      // right: 50px;
      left: 375px;
      bottom: 50px;
      transition: left 0.3s linear;
      width: 100%;
      height: 120px;
      // background: red;
      .btn {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;
        height: 30%;
        button {
          display: block;
          width: 40%;
          height: 100%;
          background: rgb(255, 122, 137);
          border: 0px;
          margin: 0 auto;
          border-radius: 50px;
          color: white;
        }
      }
      textarea {
        display: inline-block;
        height: 60%;

        width: 100%;
      }
    }
    .box {
      margin-bottom: 10px;
      width: 100%;
      //   height: 50px;
      display: flex;
      justify-content: space-evenly;
      .left {
        width: 10%;
        // background: red;

        .circle {
          height: 35px;
          width: 100%;
          margin-top: 5px;
          border-radius: 20px;
          // background-color: blue;
          overflow: hidden;
          padding: 0px;
          // font-size: 0px;
          img {
            // height: 36px;
            width: 36px;
            height: 36px;
            // width: 100%;
          }
        }
      }
      .right {
        width: 80%;
        ::v-deep .head {
          .left {
            font-size: 16px;
            font-weight: normal;
          }
          .right {
            line-height: 40px;
          }
        }
      }
    }
  }
  .change {
    // width: 90%;
    // margin: 0 auto;
    // height: 50px;
    .van-goods-action {
      width: 100%;
      // margin: 0 auto;
    }
  }
}
</style>