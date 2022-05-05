<!--
 * @Author: your name
 * @Date: 2022-03-22 16:50:59
 * @LastEditTime: 2022-04-08 19:41:35
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \twice_html\bookshop\src\views\My.vue
-->
<template>
  <div class="My">
    <div class="top">
      <div class="top_bar">
        <div class="left">
          <img :src="now_src" alt="" />
        </div>
        <div class="center">
          <h3>{{ old_name }}</h3>
          <p>{{ old_desc }}</p>
        </div>
        <div class="right">
          <button @click="showPopup">设置</button>
          <button @click="showMoney">充值</button>
        </div>
      </div>
      <div class="bottom_bar">
        <div class="left">
          <h3>{{ real_money }}</h3>
          <p>书币余额</p>
        </div>
        <div class="right">
          <h3>{{ false_money }}</h3>
          <p>赠币余额</p>
        </div>
      </div>
    </div>
    <div class="bottom">
      <ul>
        <li v-for="(item, index) in pro" :key="index" @click="change(item.id)">
          <div class="left">
            <div class="img">
              <img :src="item.src" alt="" />
            </div>
          </div>

          <span class="headtitle">{{ item.title }}</span>
          <div class="right">
            <van-icon name="arrow" color="#999" />
          </div>
        </li>
      </ul>
    </div>
    <div class="btnDelete">
      <button @click="removeLocal">退出登录</button>
    </div>
    <div class="set">
      <van-popup v-model="show" position="bottom" :style="{ height: '60%' }">
        <ul>
          <li>
            <span>昵称<br />(8字符)</span
            ><input type="text" v-model="now_name" />
          </li>
          <li>
            <span>个人信息</span> <input type="text" v-model="now_desc" />
          </li>
          <li>
            <span>设置头像</span>
            <van-uploader v-model="fileList" multiple :max-count="1" />
          </li>
        </ul>

        <div class="btn">
          <button @click="btn">设置</button>
          <button @click="btn_false">取消</button>
        </div>
      </van-popup>
    </div>
    <div class="money">
      <div class="over">
        <van-popup v-model="money" position="bottom" :style="{ height: '80%' }">
          <h2>充值金额</h2>
          <ul>
            <li
              :class="active == index ? 'active' : ''"
              v-for="(item, index) in moneyList"
              :key="index"
              @click="changeActive(index)"
            >
              <h2>&yen;{{ item.real_money }}</h2>
              <p>立即获赠{{ item.false_money }}书币</p>
            </li>
          </ul>
          <div class="btn">
            <button class="sale" @click="sale(active)">立即充值</button>
            <button @click="false_sale">取消充值</button>
          </div>
          <div class="overText">
            <h2>温馨提示:</h2>

            <p>1.充值阅读权限仅限本书城使用;</p>
            <p>2.使用非短信方式进行充值，1元兑换100书币;</p>
            <p>3.充值兑换比例1元=100贝币，元宝等同贝币，1元宝=1贝币;</p>
            <p>4.消费时会优先扣除充值赠送的元宝;</p>
            <p>5.使用短信方式进行充值，1元兑换50书币;</p>
            <p>
              6.充值获赠代金券有效期为15天，您可至[个人中心] - [我的 .余额]查看;
            </p>
            <p>7.若充值后，账户余额长时间没有变化，请记录好你的用户名，</p>
            <p>并致电400-123456寻求客服帮助。</p>
          </div>
        </van-popup>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "My",
  created() {
    if (localStorage.getItem("sale")) {
      this.real_money = JSON.parse(localStorage.getItem("sale")).real_money;
      this.false_money = JSON.parse(localStorage.getItem("sale")).false_money;
    } else {
      this.real_money = 0;
      this.false_money = 0;
    }
    if (localStorage.getItem("message")) {
      let head = JSON.parse(localStorage.getItem("message"));
      // console.log(head);
      this.now_name = head.userName;
      this.old_name = head.userName;
      this.now_desc = head.desc;
      this.old_desc = head.desc;
      // this.fileList.push({url:head.fileList[0].content})  ;
      this.now_src = head.fileList[0].content;
      this.old_src = head.fileList[0].content;
      this.fileList = head.fileList;

      // console.log(this.now_src);
    }
  },
  data() {
    return {
      active: 0,
      real_money: 0,
      false_money: 0,

      moneyList: [
        {
          real_money: 5,
          false_money: 50,
        },
        {
          real_money: 10,
          false_money: 100,
        },
        {
          real_money: 50,
          false_money: 500,
        },
        {
          real_money: 100,
          false_money: 1000,
        },
        {
          real_money: 300,
          false_money: 3000,
        },
        {
          real_money: 500,
          false_money: 5000,
        },
      ],
      money: false,
      now_name: "",
      now_src: "",
      now_desc: "",
      moneyHistory: [],
      old_name: "昵称123",
      old_src: "../assets/Snipaste/充值@2x.png",
      old_desc: "请开始你的自我介绍",
      show: false,
      desc: null,
      userName: null,
      fileList: [
        // { url: "https://img01.yzcdn.cn/vant/leaf.jpg" },
        // { url: "" },
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        // { url: "https://cloud-image", isImage: true },
      ],
      pro: [
        {
          src: require("../assets/bottom/书active.png"),
          title: "我的书架",
          id: "BookShelf",
        },
        {
          // src: "",
          title: "阅读记录",
          id: "Record",
          src: require("../assets/Snipaste/历史记录@2x.png"),
        },
        {
          src: require("../assets/Snipaste/充值@2x.png"),
          title: "充值记录",
          id: "MoneyHistory",
        },
        {
          src: require("../assets/Snipaste/链接@2x.png"),
          title: "消费记录",
          id: "SaleHistory",
        },
        
        {
          src: require("../assets/Snipaste/奖品@2x.png"),
          title: "我的奖品",
          id: "MyPrize",
        },
      ],
    };
  },
  methods: {
    removeLocal(){
      localStorage.removeItem("token")
      this.$router.push({name:"Bookshop"})
    },
    false_sale() {
      this.money = false;
    },
    sale(active) {
      // console.log(active);
      if (localStorage.getItem("sale")) {
        this.real_money = JSON.parse(localStorage.getItem("sale")).real_money;
        this.false_money = JSON.parse(localStorage.getItem("sale")).false_money;
      } else {
        this.real_money = 0;
        this.false_money = 0;
      }
      this.real_money += this.moneyList[active].real_money;
      this.false_money += this.moneyList[active].false_money;
      // console.log(this.real_money);
      localStorage.setItem(
        "sale",
        JSON.stringify({
          real_money: this.real_money,
          false_money: this.false_money,
        })
      );

      //充值历史记录
      if (localStorage.getItem("moneyHistory")) {
        this.moneyHistory = JSON.parse(localStorage.getItem("moneyHistory"));
      } else {
        this.moneyHistory = [];
      }

      let time=new Date().toLocaleString()
      this.moneyHistory.unshift({
        real_money: this.moneyList[active].real_money,
        false_money: this.moneyList[active].false_money,
        time:time
      });
      localStorage.setItem("moneyHistory", JSON.stringify(this.moneyHistory));
      this.money = false;
      this.$toast('充值成功')
    },
    changeActive(index) {
      this.active = index;
    },
    showMoney() {
      this.money = true;
    },
    btn() {
      // if(!this.fileList[0]){
      //     this.fileList.push({url:this.old_src})
      // }
      let message = {
        desc: this.now_name ? this.now_desc : this.old_desc,
        userName: this.now_name ? this.now_name.slice(0, 8) : this.old_name,
        fileList: this.fileList,
      };
      localStorage.setItem("message", JSON.stringify(message));
      this.show = false;
       this.$toast('修改成功')
      setTimeout(function () {
        // console.log("Sss");
        location.reload();
      }, 1000);
    },
    showPopup() {
      this.show = true;
    },
    change(id) {
      this.$router.push({ name: id });
    },
    btn_false() {
      this.show = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.My {
  width: 100%;
  height: 617px;
  margin: 0 auto;
  box-sizing: border-box;
  background: rgba(211, 211, 211, 0.233);
  background: liner-gradient(red, black);
  // background:  liner-gradient(to right,rgb(243, 14, 14),green);
  padding: 10px;
  .top {
    //   background: #999;
    width: 100%;
    // height: 300px;
    .top_bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        width: 70px;
        // background: #999;
        border: 1px solid rgba(153, 153, 153, 0.301);
        height: 70px;
        border-radius: 100%;
        overflow: hidden;
        display: flex;
        // justify-content: space-between;
        justify-content: center;
        align-items: center;
        img {
          width: 70px;
          height: 70px;
        }
      }
      .center {
        width: 50%;
        // overflow: hidden;
        // overflow-y: auto;
        h3 {
          margin: 0px;
          height: 25px;
          // width
          width: 177px;
          overflow-y: auto;
        }
        p {
          margin: 0px;
          margin-top: 5px;
          height: 40px;
          overflow-y: auto;
        }
      }
      .right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        // height: 100%;
        width: 20%;
        button {
          width: 100%;
          height: 25px;
          border: none;
          border-radius: 50px;
          color: white;
          margin-bottom: 5px;

          background: rgb(248, 130, 130);
          background: linear-gradient(120deg, #ff7a8983, #fe3c539d);
        }
      }
    }
    .bottom_bar {
      display: flex;
      justify-content: space-evenly;
      text-align: center;
      margin-top: 20px;
      h3 {
        margin: 0px;
        font-size: 20px;
      }
    }
  }
  .bottom {
    width: 100%;
    // height: ;
    // padding: 10px;
    ul {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      background: rgb(255, 255, 255);
      padding: 10px;
      box-sizing: border-box;
      li {
        margin-top: 5px;
        margin-bottom: 5px;
        height: 50px;
        width: 100%;
        //   background: #999;
        font-size: 16px;
        line-height: 50px;
        display: flex;
        justify-content: space-between;
        .left {
          .img {
            width: 50px;
            height: 50px;
            //   background: rgba(172, 30, 30, 0.533);
            display: flex;
            justify-content: center;
            //   align-content: center;
            align-items: center;
            img {
              width: 30px;
              height: 30px;
              //   background: blue;
            }
          }
        }

        span {
          width: 70%;
          display: inline-block;
          // background: red;
          // font-weight: bold;
          // font-weight: 550;
          font-family: "黑体";
        }
        .right {
          width: 20px;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }

  .btnDelete{
    width: 100px;
    margin: 0 auto;
    margin-top: 20px;
    button{
      border: 0px;
      width: 100px;
      height: 50px;
      border-radius: 50px;
      background:   linear-gradient(120deg, #ff7a8983, #fe3c539d);;
    }
    
  }


  ::v-deep .van-uploader {
    margin-left: 20px;
  }

  ::v-deep .van-popup--bottom {
    padding: 10px;
    box-sizing: border-box;
    // overflow: hidden;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
  .set {
    // width: 100%;
    // height: 100px;
    // background: #999;
    ul {
      li {
        margin-top: 5px;
        border-bottom: 1px solid #ff7a8944;
        display: flex;
        justify-content: start;
        align-items: center;
        font-size: 0px;
        span {
          display: inline-block;
          width: 60px;
          min-height: 30px;
          text-align: center;
          line-height: 30px;
          vertical-align: middle;
          white-space: pre-line;
          font-size: 12px;
        }
        input {
          min-height: 30px;
          width: 300px;
          vertical-align: middle;
          font-size: 12px;
          border: none;
        }
        min-height: 50px;
      }
    }
    .btn {
      // margin-top: 100px;
      width: 80%;
      height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin: 0px auto;
      margin-top: 20px;
      button {
        width: 100%;
        height: 45px;
        border-radius: 50px;
        border: 0px;
        background: linear-gradient(120deg, #ff7a8983, #fe3c539d);
      }
    }
  }
  .money {
    // padding: 10px;
    position: relative;
    .over {
      overflow: hidden;
      .btn {
        width: 80%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        button {
          width: 47%;
          height: 50px;
          border: 0px solid #999;
          border-radius: 50px;
          background: linear-gradient(120deg, #ff7a8983, #fe3c539d);
          font-size: 14px;
          color: white;
        }
      }
      .overText {
        p {
          color: #999;
        }
      }
      ul {
        width: 100%;
        // height: 300px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        // align-items: start;
        align-items: flex-start;
        .active {
          // border: 1px solid rgb(247, 165, 165);
          background: rgba(247, 165, 165, 0.082);
          position: relative;
          overflow: hidden;
          width: 48%;
          height: 75px;
          // box-sizing: border-box;
          box-shadow: 0px 0px 0px 1px rgb(241, 153, 153) inset;
          &::before {
            content: "";
            position: absolute;
            right: -27px;
            top: -27px;
            width: 50px;
            height: 50px;
            border-radius: 50px;
            // background:#fe3c53;
            background: linear-gradient(15deg, #ff7a89, #fe3c53);
          }
          &::after {
            content: "√";
            color: white;
            position: absolute;
            top: 3px;
            right: 7px;
            transform: rotate(31deg);
          }
        }
        li {
          width: 48%;
          height: 75px;
          padding: 10px;
          // padding:0px;
          margin-bottom: 10px;
          box-sizing: border-box;
          // background: rgba(153, 153, 153, 0.178);
          box-shadow: 0px 0px 0px 1px rgb(216, 208, 208) inset;
          border-radius: 5px;
          h2 {
            margin: 0px;
          }
          p {
            // color: rgba(155, 155, 155, 0.973);
            color: #fa9aa6;
          }
          // border: 1px solid rgb(207, 207, 207);
        }
        // background: #999;
      }
    }
  }
}
</style>