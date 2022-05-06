<!--
 * @Author: your name
 * @Date: 2022-04-05 15:13:15
 * @LastEditTime: 2022-04-08 19:41:29
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \twice_html\bookshop\src\views\Money_history.vue
-->
<template>
  <div>
    <van-nav-bar
      title="充值记录"
      :left-arrow="true"
      :border="true"
      @click-left="onClickLeft"
      :fixed='true'
    />
    <div class="box">
        <ul>
            <li v-for="(item,index) in history" :key=index >
                <div class="left">
                    <div class="top">充值获得书币: <span> {{item.real_money}}</span></div>
                <div class="bottom">充值获得赠币: <span>{{item.false_money}}</span> </div>
                </div>
                <div class="right">
                <span>{{item.real_money}}</span>
                </div>
                <div class="time">{{item.time}}</div>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "moneyHistory",
  created() {
    if (localStorage.getItem("moneyHistory")) {
      this.history = JSON.parse(localStorage.getItem("moneyHistory"));
    } else {
      this.history = [];
    }
    // console.log(this.history);
  },
  data() {
    return {
      history: [],
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
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
.box{
    width: 375px;
    height: 667px;
    margin-top: 50px;
    // background: #999;
    ul{
        li{
            position: relative;
            padding: 15px;
            width: 350px;
            height: 100px;
            margin:  0 auto;
            box-sizing: border-box;
            margin-bottom: 10px;
            background: linear-gradient(72deg, #ff7a8925, #fe3c5366);
            
            border-radius: 50px;
            display: flex;
            justify-content: space-evenly;
            .left{
                width: 55%;
                // background: blue;
                .top{
                    height: 34px;
                    width: 100%;
                    line-height: 34px;
                     color: rgba(153, 153, 153, 0.951);
                     border-bottom:1px dashed #999 ;
                    span{
                        font-size: 20px;
                         color: #ff7a89;
                    }
                    
                }
                .bottom{
                    height: 34px;
                    width: 100%;
                    line-height: 34px;
                    color: rgba(153, 153, 153, 0.951);
                    span{
                        font-size: 20px;
                        color: #ff7a89;
                    }

                }
            }
            .right{
                width: 35%;
                position: relative;
                // background: #999;
                font-size: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                span{
                    font-size: 40px;
                    color: #ff7a89;
                }
                &::before{
                    content:'￥';
                    position: absolute;
                    top: 0px ;
                    left: -5px;
                  color: #ff7a89;
                }
            }
            .time{
                position: absolute;
                bottom: 0px;
                color: rgba(153, 153, 153, 0.536);
                font-weight: bold;
            }
        }
    }
}
</style>