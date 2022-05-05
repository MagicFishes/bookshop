<!--
 * @Author: your name
 * @Date: 2022-03-24 20:06:32
 * @LastEditTime: 2022-04-08 19:37:46
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \twice_html\bookshop\src\views\bookshop\bookList.vue
-->
<template>
  <div>
    <van-nav-bar
      :title="title"
      left-text=""
      :fixed="true"
      :placeholder="true"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <!-- <ul class="box">
      <div>
        <li v-for="(item, index) in list" :key="index">
          {{ item.navLabel.slice(1) }}
        </li>
      </div> -->

    <!-- //没有进一层 -->
   
    <!-- </ul> -->
    <div v-show="null_if">
      <van-empty image="error" description="暂无此内容" />
    </div>
    <ul class="box">
      <van-collapse v-model="activeNames" v-if="open1">
        <div v-for="(item1, index1) in list" :key="index1">
          <van-collapse-item :title="item1.navLabel.slice(1)" :name="index1">
            <li v-for="(item2, index2) in item1.navPoint" :key="index2" @click="change(id,item2.index,arr)">
              {{ item2.navLabel.slice(1) }}
            </li>
          </van-collapse-item>
        </div>
      </van-collapse>


       <div v-if="open2">
           
        <li v-for="(item, index) in list" :key="index" @click="change(id,item.index,arr)">
          {{ item.navLabel.slice(1,)}}
        </li>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  name: "bookList",
  created() {
    let params = this.$route.params.id;
    this.getbookList(params);
    this.id=params
  },
  data() {
    return {
      null_if:false,
        open2:false,
        open1:false,
      activeNames: ["1"],
        id:null,
      list: null,
      title: '目录',
      arr:[],
    };
  },
  methods: {
    // 请求目录
    getbookList(id) {
      this.axios({
        method: "get",
        url: "https://apis.netstart.cn/yunyuedu/book/catalog.json?tocId=" + id,
        params: {},
      })
        .then((result) => {
          // console.log("result==>", result);

          if (result.data.ncx.docTitle.charAt(0) === ",") {
            this.title = (result.data.ncx.docTitle || "").slice(1);
          }


          
          this.list = result.data.ncx.navMap.navPoint;
          // console.log(this.list);
          // console.log(result.data.ncx.navMap.navPoint[0].navPoint);
            if(this.list[0].navPoint!=undefined){
              this.open1="true";
              for(let i=0;i<this.list.length;i++){
                for(let m=0;m<this.list[i].navPoint.length;m++){
                  this.arr.push(this.list[i].navPoint[m].id)
                }
              }
              // console.log(this.arr);
            }
            else{
                this.open2="true";
                for(let i=0;i<this.list.length;i++){
                    this.arr.push(this.list[i].id)
                }
                    // console.log(this.arr);
                
            }
            // console.log(this.open1,this.open2);
          // console.log("this.list==>", this.list);
          if(!result){
            this.null_if=true
          }
        })
        .catch((err) => {
          // console.log("err", err);
          this.null_if=true
        });
    },
    onClickLeft() {
      //   Toast('返回');
      this.$router.go(-1);
    },
    onClickRight() {
      //   Toast('按钮');
    },
    // 跳转
  
    change(id,index,arr){
      // console.log("index=>",this.list[1].index);
        this.$router.push({name:"BookContent",params:{
            id:id,
           
            index:index,
            arrId:arr,
        }})
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
  width: 100%;
  height: auto;
  // margin-top: 50px;
  // padding-bottom:5px ;
  ::v-deep .van-collapse-item__content {
    padding: 0px;
    
  }
  li {
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    border-bottom: 1px solid #999;
    padding-left: 20px;
    line-height: 50px;
    font-size: 16px;
    overflow: hidden; /*自动隐藏文字*/

    text-overflow: ellipsis; /*文字隐藏后添加省略号*/

    white-space: nowrap; /*强制不换行*/
  }
}
</style>