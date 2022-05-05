<template>
  <div class="login">
    <van-nav-bar class="header">
      <template #left>
        <span class="back" @click="back">首页</span>
      </template>
      <template #right>
        <!-- <div class="home-text" @click="viewMenu"></div> -->
        <div class="left-box">
          <div class="logo">
            <img class="auto-img" src="../assets/bottom/书active.png" alt="" />
          </div>
          <div class="logo-text">书城</div>
        </div>
      </template>
    </van-nav-bar>
    <div class="login-box">
      <div class="welcome-title"></div>
      <div class="welcome-subtitle"></div>

      <div class="form-box">
        <van-form @submit="login">
          <van-field
            v-model="loginUserInfo.phone"
            name="手机号"
            label="手机号"
            placeholder="手机号"
            autocomplete="off"
          />
          <van-field
            v-model="loginUserInfo.password"
            :type="!isOpenLogin ? 'password' : 'text'"
            name="密码"
            label="密码"
            placeholder="密码"
            :right-icon="!isOpenLogin ? 'closed-eye' : 'eye-o'"
            autocomplete="off"
            @click-right-icon="toggleLoginPasssword"
          />
          <div class="forgot">
            <div class="forgot-pwd">忘记密码？</div>
          </div>
          <div class="login-btn" @click="once_login">
            <van-button round block color="#fe3c53" native-type="submit"
              >登录</van-button
            >
          </div>
        </van-form>
        <div class="login-btn">
          <van-button round block type="default" @click="showPopup"
            >注册</van-button
          >
        </div>
      </div>
    </div>

    <!-- 注册 -->
    <van-popup v-model="show" position="bottom" closeable>
      <div class="register-box">
        <div class="register-title">注册</div>
        <van-form @submit="register">
          <van-field
            v-model="registerUserInfo.phone"
            name="手机号"
            label="手机号"
            placeholder="手机号"
            autocomplete="off"
          />
          <van-field
            v-model="registerUserInfo.password"
            :type="!isOpenRegister ? 'password' : 'text'"
            name="密码"
            label="密码"
            placeholder="密码"
            :right-icon="!isOpenRegister ? 'closed-eye' : 'eye-o'"
            autocomplete="off"
            @click-right-icon="toggleResgiterPasssword"
          />
          <van-field
            v-model="registerUserInfo.nickName"
            type="text"
            name="昵称"
            label="昵称"
            placeholder="昵称"
            autocomplete="off"
          />

          <div class="login-btn">
            <van-button
              round
              block
              color="#fe3c53"
              native-type="submit"
              @click="login_message(registerUserInfo.nickName)"
              >注册</van-button
            >
          </div>
        </van-form>
      </div>
      <span ref="boxdd"></span>
    </van-popup>
 
  </div>
</template>

<script>
export default {
  name: "Login",
  created() {
   this.drawBase64Image();
  },
  mouted(){

  },
  data() {
    return {
      //是否显示注册弹窗
      show: false,
      abc: "woshiabc",
      loginUserInfo: {
        phone: "",
        password: "",
      },
      registerUserInfo: {
        phone: "",
        password: "",
        nickName: "",
      },

      //查看注册密码
      isOpenRegister: false,

      //查看登录密码
      isOpenLogin: false,
    };
  },

  methods: {
    logpic(){
      // console.log("abc",this.abc);
    },
    back() {
      this.$router.push({ name: "Bookshop" });
    },
   
    drawBase64Image() {
      var Img = new Image();
      let that=this
      // console.log("that:",that);

      // var dataURL = "";
         Img.src=require('../assets/Snipaste/笑脸.png')
        var canvas = document.createElement("canvas");
    Img.onload = function () {
        canvas.width = Img.width;
        canvas.height = Img.height;
        var ctx = canvas.getContext("2d");

        ctx.drawImage(Img, 0, 0, Img.width, Img.height);
         that.abc = canvas.toDataURL("image/png/jpeg");
      //  console.log(dataURL);
      // that.abc=dataUrl
    //  console.log(that);

      };
      


    },
    once_login() {
      // this.getBase64Image("http://wwww.test/test.png", "coopCachetImg");
      //第一个参数是图片的URL地址，第二个是转换成base64地址后要赋值给的img标签

      if (!localStorage.getItem("message")) {
        let message = {
          desc: "",
          userName: "雨季",
          fileList: [
            {
              content: this.abc
            },
          ],
        };
        localStorage.setItem("message", JSON.stringify(message));
      }
    },
    login_message(name) {
      let message = {
        desc: "",
        userName: name,
        fileList: [
          {
            content: this.abc,
          },
        ],
      };
      localStorage.setItem("message", JSON.stringify(message));
    },
    showPopup() {
      this.show = !this.show;
    },

    //查看菜单
    viewMenu() {
      this.$router.push({ name: "Menu" });
    },

    //切换注册密码可见状态
    toggleResgiterPasssword() {
      this.isOpenRegister = !this.isOpenRegister;
    },

    //切换登录密码可见状态
    toggleLoginPasssword() {
      this.isOpenLogin = !this.isOpenLogin;
    },

    //注册
    register() {
      // console.log("register");
      let dataParams = "";
      for (let key in this.registerUserInfo) {
        dataParams += `${key}=${this.registerUserInfo[key]}&`;
      }
      dataParams += `appkey=U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=`;
      this.axios({
        method: "post",
        url: "http://www.kangliuyong.com:10002/register",
        data: dataParams,
      })
        .then((result) => {
          // console.log("result ==> ", result);

          this.$toast(result.data.msg);

          if (result.data.code === 100) {
            this.show = false;
            //清除用户注册信息
            for (let key in this.registerUserInfo) {
              this.registerUserInfo[key] = "";
            }
          }
        })
        .catch((err) => {
          // console.log("err ==> ", err);
        });
    },

    //登录
    login() {
      // console.log("login");

      let dataParams = "";
      for (let key in this.loginUserInfo) {
        dataParams += `${key}=${this.loginUserInfo[key]}&`;
      }
      dataParams += `appkey=U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=`;
      // console.log("dataParams", dataParams);
      this.axios({
        method: "post",
        url: "http://www.kangliuyong.com:10002/login",
        data: dataParams,
      })
        .then((result) => {
          // console.log("result ==> ", result);

          this.$toast(result.data.msg);

          if (result.data.code === 200) {
            //讲token保存到localStorage
            localStorage.setItem("token", result.data.token);

            setTimeout(() => {
              this.$router.go(-1);
            }, 1000);
          }
        })
        .catch((err) => {
          // console.log("err ==> ", err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.back {
  display: inline-block;
  width: 50px;
  height: 40px;
  // background: blue;
  line-height: 40px;
  box-sizing: border-box;
  border-radius: 15px;
  color: white;
  border: 1px solid white;
}
.header {
  background: #fe3c53;
}
.login {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #fff;
  .register-title {
    font-size: 24px;
    margin-bottom: 20px;
  }
  .register-box {
    padding: 10px;
  }
  .forgot {
    margin-top: 20px;
    display: flex;
  }
  .forgot-pwd {
    margin-left: auto;
    font-size: 14px;
    color: #666;
  }
  .login-btn {
    margin-top: 50px;
  }
  .form-box {
    margin-top: 50px;
  }
  .welcome-title {
    font-size: 30px;
  }
  .welcome-subtitle {
    font-size: 18px;
    margin-top: 20px;
    color: #999;
  }
  .login-box {
    margin-top: 80px;
    padding: 10px;
  }
  .home-text {
    // color: #fe3c53;
    font-weight: bold;
    font-size: 14px;
  }
  .left-box {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: hidden;
    background: white;
    img {
      width: 30px;
      height: 30px;
      margin-top: 3px;
    }
  }
  .logo-text {
    margin-left: 10px;
    font-weight: bold;
    font-size: 14px;
    color: white;
  }
}
</style>