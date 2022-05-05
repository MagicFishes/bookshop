<!--
 * @Author: your name
 * @Date: 2022-03-29 14:39:52
 * @LastEditTime: 2022-04-08 19:38:38
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \twice_html\bookshop\src\views\bookshop\SracksType.vue
-->
<template>
  <div>
        <van-nav-bar
  :title=title
  left-text=""
  :fixed="true"
  right-text=""
  left-arrow
  @click-left="onClickLeft"

/>
    <ul class="bigBox">
      <li class="box">
        <div class="span">收费类型:</div>
        <ul>
          <li :class="money_type == index ? 'active' : ''" v-for="(item,index) in money" :key="index" @click="changeMoney_type(item.value)">{{item.name}}</li>
       
        </ul>
      </li>
      <li class="box">
        <div class="span">完结/完本:</div>
        <ul>
          <li :class="type_type == index ? 'active' : ''" v-for="(item,index) in type" :key="index" @click="changeType_type(item.value)">{{item.name}}</li>
       
        </ul>
      </li>
      <li class="box">
        <div class="span">字数限制:</div>
        <ul>
          <li :class="num_type == index ? 'active' : ''" v-for="(item,index) in num" :key="index" @click="changeNum_type(item.value)">{{item.name}}</li>
       
        </ul>
      </li>
      <li class="box">
        <div class="span">畅销度:</div>
        <ul>
          <li :class="people_type == index ? 'active' : ''" v-for="(item,index) in type" :key="index" @click="changePeople_type(item.value)">{{item.name}}</li>
        </ul>
      </li>
      <button class="submit" @click="submit_post">确认筛选</button>
    </ul>
    <ul class="ulBox">
      <li v-for="(item,index) in result_list" :key="index" @click="turn(item.id)">
        <bookDescCow  :src="item.src" :title="item.title" :author="item.author" :desc="item.desc"></bookDescCow>
      </li>
    </ul>
  </div>
</template>

<script>


export default{
 
  name: "StacksType",
  created() {
    let params = this.$route.params;
    // console.log(params);
    this.type_first(params.id);
    this.id=params.id
    this.result_type(this.id,this.num_type,this.money_type,this.type_type,this.people_type)
  },
  data() {
    return {
      id:8,
      type_arr: [],
      money_type: 0,
      money: [],
      type_type: 0,
      type: [],
      num_type: 0,
      num: [],
      people_type: 0,
      people: [],
      result_list:[],
      title:"书库详情"
    };
  },
  methods: {
      onClickLeft(){
          this.$router.go(-1)
      },
    turn(index){
      this.$router.push({name:"BookDesc",params:{id:index}})
    },
    result_type(id,num,money,type,people){
        this.axios({
          url:"https://apis.netstart.cn/yunyuedu/source/v2/searchBook.json?catId="+id+"&wordCount="+num+"&pay="+money+"&bookStatus="+type+"&sort="+people+"",
          method:"get",
          params:{},

        }).then((result)=>{
          this.result_list=[]
          // console.log(result);
          let a=result.data.list
          for(let i=0;i<a.length;i++){
             this.result_list.push({
               id:a[i].id,
               author:a[i].author,
               src:a[i].cover,
               title:a[i].title,
               desc:a[i].content
             })
          }
          // console.log(this.result_list);
        }).catch((err)=>{
          // console.log("err==>",err);
        })
    },
    submit_post(){
      // console.log("sss");
      this.result_type(this.id,this.num_type,this.money_type,this.type_type,this.people_type)
    },
    changeMoney_type(index) {
      this.money_type=index
      // console.log(this.money_type);
    },
    changeType_type(index) {
      this.type_type=index
      // console.log(this.type_type);
    },
    changeNum_type(index) {
      this.num_type=index
      // console.log(this.num_type);
    },
    changePeople_type(index) {
      this.people_type=index
      // console.log(  this.people_type);
    },
    type_first(id) {
      // this.$router.push({ name: "StacksType", params: { id: id } });
      this.axios({
        method: "get",
        url: "https://apis.netstart.cn/yunyuedu/source/v2/cat.json?catId=" + id,
        params: {},
      })
        .then((result) => {
          // console.log(result);
          let a = result.data.categories;
          for (let i = 0; i < a.length; i++) {
            if (a[i].type == "pay") {
              this.money = a[i].catArray;
            }
            if (a[i].type == "bookStatus") {
              this.type = a[i].catArray;
            }
            if (a[i].type == "wordCount") {
              this.num = a[i].catArray;
            }
            if (a[i].type == "sort") {
              this.people = a[i].catArray;
            }
          }
        })

        .catch((err) => {
          // console.log("err ==> ", err);
        });
    },
  },
}
</script>

<style lang="scss" scoped>
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

 ::v-deep .van-icon ,.van-icon-arrow-left ,.van-nav-bar__arrow{
    color: white;
  }
.bigBox {
  width: 100%;
  height: auto;
  margin-top: 55px;
  .box {
    // background: #999;
    border-bottom: 1px solid rgba(153, 153, 153, 0.137);
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
    margin-bottom: 2px;
    .span {
      width: 20%;
      // background: blue;
      line-height: 25px;
      text-align: center;
    }
    ul {
      width: 80%;
      // background: red;
      li {
        float: left;
        width: auto;
        // background: rgba(153, 153, 153, 0.226);
        padding: 0px 10px;

        margin-left: 20px;
        height: 25px;
        text-align: center;
        line-height: 25px;
        margin-bottom: 10px;
        border-radius: 10px;
        &.active {
          background: #ff7a89;
          color: white;
          // box-shadow: 0px 0px 0px 1px #eb4659f6;
        }
      }
    }
  }
  .ulBox{
    width:95%;
    // margin: 0 auto;
    padding: 5px;
    box-sizing: border-box;
  }
  .submit{
    display: block;
    width: 150px;
    height: 30px;
    background: #ff7a89;
    color: white;
    border: 0px;
    border-radius: 15px;
    margin: 0 auto;

  }
}
</style>