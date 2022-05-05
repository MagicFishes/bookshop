<!--
 * @Author: your name
 * @Date: 2022-03-25 00:06:22
 * @LastEditTime: 2022-04-08 19:35:15
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \twice_html\bookshop\src\views\bookshop\bookContent.vue
-->
<template >
  <div>
    <div v-if="type_open">
        <van-nav-bar
      title="目录"
      left-text=""
      right-text=""
      left-arrow
      @click-left="onClickLeft"
      :fixed="false"
    />
    <van-empty image="network" description="没有本章节" />
    </div>
    <van-cell is-link @click="showPopup">
      <div
        class="box"
        @scroll="scroll"
        v-if="content"
        :style="{ fontSize: fontSize, backgroundColor: color }"
      >
        <!-- <div ref="list" v-for="(item, index) in newarr" :key="index" v-html="item" ></div> -->
        <van-swipe
          class="my-swipe"
          :autoplay="0"
          indicator-color="white"
          :loop="false"
          :height="667"
        >
        <div v-for="(item,index) in real_arr" :key='index' class="list">
          <van-swipe-item>
            <div class="content_list" v-for='(item1,index1) in item.myData' :key='index1'>{{item1}}<br></div>
          </van-swipe-item>

        </div>
       
        </van-swipe>
      </div>
    </van-cell>

    <van-popup
      v-model="show"
      style="width: 100%"
      :style="{ height: '7%' }"
      position="top"
    >
      <van-nav-bar left-text="" left-arrow @click-left="onClickLeft" />
    </van-popup>
    <van-popup
      :overlay="false"
      v-model="show"
      style="width: 100%"
      :style="{ height: '20%' }"
      position="bottom"
    >
      <div class="btn_change">
        <van-button type="default" @click="pre(index)">上一章</van-button>
        <van-button type="default" @click="next(index)">下一章</van-button>
      </div>
      <div class="btn_changeSize">
        <van-button type="default" @click="fontSizeReduce">A-</van-button>
        <span>{{ fontSize }}</span>
        <van-button type="default" @click="fontSizeAdd">A+</van-button>
      </div>
      <div class="btn_changeColor">
        <ul>
          <li
            :class="active == index ? 'active' : ''"
            v-for="(item, index) in backGround"
            :key="index"
            :style="{ backgroundColor: item.back }"
            @click="changeColor(item.back, index)"
          ></li>
        </ul>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "bookContent",
  created() {
    let params = this.$route.params;
    // console.log(params);
    this.params = params;
    this.index = params.index - 1;
    this.getbookList(params.id);
  },
  data() {
    return {
      type_open:false,
      active: 0,
      list: null,
      arr: [],
      value: 50,
      show: false,
      color: null,
      params: null,
      content: null,
      open: true,
      // id:null,
      // BookIndex:null,
      //   content: null,
      newarr: [],
      index: null,
      indexarr: {},
      real_arr:[],

      fontSize: "14px",
      //页数
      type_index: null,
      backGround: [
        { back: "#d0dcf5" },
        { back: "#595955" },

        { back: "#fbfcff" },
        { back: "#beecbe" },
        { back: "#d9e0a1" },
        { back: "#a1e0c9" },
        { back: "#a1bae0" },
        { back: "#a2e0cf" },
        { back: "#e0bfa1" },
        { back: "#a1d3e0" },
        { back: "#c2e5bd" },
        { back: "#c5d172" },
        { back: "#f7fac9" },
        { back: "#f2beb2" },
      ],
    };
  },
  methods: {
    scroll() {
      // console.log("我在滚动");
    },
    toTop() {
      window.scrollTo(0, 0);
    },
    toBottom() {
      // 滚动内容的坐标位置0,50000：
      window.scrollTo(0, 50000);
    },
    changeColor(color, index) {
      this.color = color;
      this.active = index;
    },
    fontSizeReduce() {
      if (parseInt(this.fontSize) - 1 == 0) {
        return;
      }
      this.fontSize = parseInt(this.fontSize) - 1 + "px";
    },
    fontSizeAdd() {
      this.fontSize = parseInt(this.fontSize) + 1 + "px";
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    showPopup() {
      this.show = true;
      //   console.log(this.show);
    },
    onChange(value) {
      // console.log(this.value);
    },
    getContent(id, index, arrId, type) {
      this.axios({
        method: "get",
        url:
          "https://apis.netstart.cn/yunyuedu/reader/book/content.json?source_uuid=" +
          id +
          "&content_uuid=" +
          arrId[index],
        params: {},
      })
        .then((result) => {
           this.real_arr=[]
          //   console.log(result);
          this.content = result.data.data.content;
          // console.log(this.solveContent(this.content));
          this.content = this.solveContent(this.content);
          // if (this.open == true) {
            let arrLength= this.content.myData.length
            // console.log(arrLength);
            this.type_index=parseInt(arrLength/10) 
            if(arrLength%10>0){
               this.type_index+=1
            }

            // console.log(  this.type_index);
            // console.log(this.type_index);
          this.newarr={
            myData: this.content.myData,
            title: this.content.title,
          };
          this.newarr.myData.unshift(this.newarr.title)
          for(let i=0;i<this.type_index;i++){
            this.real_arr.push({
              myData:this.newarr.myData.slice(i*10,(i+1)*10)
            })
          }
          // console.log(" this.real_arr", this.real_arr);
          // this.open = false;
          // console.log(this.newarr);
          // this.indexarr[this.index] = true;
          // }

          // console.log(this.newarr);
        })
        .then((result) => {
          if (type == "pre") {
            //  console.log( this.content);

            // this.newarr.unshift(this.content);
            // console.log(this.newarr);
          }
          if (type == "next") {
            //  console.log( this.content);

            // this.newarr.push(this.content);
            // console.log(this.newarr);
          }
        })
        .catch((err) => {
          // console.log("err=>", err);
          this.type_open=true
        });
    },
    solveContent(content) {
      // console.log(content);
      //提取标题
      let titleReg = /<h1><span>(.*)<\/span><\/h1>/;
      // console.log(titleReg);
      let title;
      if (titleReg.test(content)) {
        title = RegExp.$1;
        // console.log(title);
      }

      //处理内容
      let myData = content.replace(titleReg, "");
      // console.log(myData);
      myData = myData.replace(/<\/p>/g, "@");
      // console.log(myData);

      let reg = /<.*?>/g;
      myData = myData.replace(reg, "");

      myData = myData.replace(/\n|\t/g, "");

      myData = myData.split(/@/);
      // console.log(myData);
      return { myData: myData, title: title };
    },
    getbookList(id) {
      this.axios({
        method: "get",
        url: "https://apis.netstart.cn/yunyuedu/book/catalog.json?tocId=" + id,
        params: {},
      })
        .then((result) => {
          this.list = result.data.ncx.navMap.navPoint;
          if (this.list[0].navPoint != undefined) {
            //    this.index =this.index-1
            for (let i = 0; i < this.list.length; i++) {
              this.arr.push("");
              for (let m = 0; m < this.list[i].navPoint.length; m++) {
                this.arr.push(this.list[i].navPoint[m].id);
              }
            }
            // console.log(this.arr);
          } else {
            for (let i = 0; i < this.list.length; i++) {
              this.arr.push(this.list[i].id);
            }
            // console.log(this.arr);
          }
        })
        .then((result) => {
          this.getContent(this.params.id, this.index, this.arr);
        })
        .catch((err) => {
          // console.log("err", err);
        });
    },
    pre(index) {
      // console.log("pre");
      // this.toTop();
      if (this.index - 1 >= 0) {
        //使用下标
        this.index = index - 1;
        // console.log(this.index);
        // if (this.indexarr[this.index] == undefined) {
          // this.indexarr[this.index] = true;
          this.getContent(this.params.id, this.index, this.arr, "pre");
        // }
      }
    },
    next(index) {
      // console.log(this.$ref);
      // console.log("next");
      // this.toBottom();
      this.index = index + 1;
      // console.log(this.index);

      // if (this.indexarr[this.index] == undefined) {
        // this.indexarr[this.index] = true;
        this.getContent(this.params.id, this.index, this.arr, "next");
      // }
    },
  },
};
</script>

<style lang="scss" scoped>

 .van-nav-bar,
  .van-hairline--bottom {
    //  background: linear-gradient(180deg, #fe3c53da, #ff7a8977);
    // background: #eb4659;
    z-index: 100;
  }
  ::v-deep .van-nav-bar__title,
  .van-ellipsis {
    color: white;
    font-size: 16px;
  }
  ::v-deep.van-nav-bar__text {
    color: rgb(92, 92, 92);
    border: 1px solid rgba(255, 255, 255, 0.356);
    padding: 5px;
    border-radius: 10px;
  }

  ::v-deep .van-icon,
  .van-icon-arrow-left,
  .van-nav-bar__arrow {
    color: rgb(127, 127, 127);
  }




::v-deep h1 {
  margin: 0px;
  padding: 0px;
  span {
    display: block;
    height: 60px;
    line-height: 60px;
    overflow: hidden; /*自动隐藏文字*/

    text-overflow: ellipsis; /*文字隐藏后添加省略号*/

    white-space: nowrap; /*强制不换行*/
  }
}
::v-deep .van-cell,
.van-cell--clickable {
  padding: 0px;
}
::v-deep .van-icon van-icon-arrow,
.van-cell__right-icon {
  display: none;
}

.van-swipe-item{
  display: flex;
    justify-content: space-between;
    flex-flow:column;
    
}

 ::v-deep .van-swipe__indicators{
  display: none;
}
.list{
  &:nth-child(1){
     &:nth-child(1){
     .content_list{
       &:nth-child(1){
      font-size: 20px;

       }  

     }
    
    }
  }
}

  .content_list{
    // display: flex;
    // justify-content: space-between;
    // flex-flow:column;
    // justify-content: space-evenly;
    // justify-items: center;

    // align-items: center;
    text-indent: 20px;
   
    
  }



.box {
  background: #d0dcf5;
  // padding: 20px;
  // padding: 10px;
  font-size: 16px;
}
.btn_change {
  display: flex;
  justify-content: space-between;
  width: 100%;

  button {
    width: 30%;
  }
}
.btn_changeSize {
  span {
    display: inline-block;
    width: 40%;
    background: white;
    text-align: center;
    //   height:100%
    line-height: 44px;
    font-size: 16px;
    vertical-align: middle;
  }
  button {
    width: 30%;
    // line-height: 44px;
    vertical-align: middle;
  }
}
.btn_changeColor {
  width: 100%;
  height: 45px;
  background: #999;
  ul {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    overflow-x: auto;
    flex-wrap: nowrap;
    // flex-grow: nogrow;
    .active {
      border: 1px solid rgba(255, 0, 0, 0.603);
    }
    li {
      width: 40px;
      height: 40px;
      border-radius: 50px;
      background: rgb(194, 48, 48);
      margin-left: 5px;
      flex-grow: 0;
      flex-shrink: 0;
    }
  }

}
</style>