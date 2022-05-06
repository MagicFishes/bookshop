<!--
 * @Author: your name
 * @Date: 2022-03-22 16:52:12
 * @LastEditTime: 2022-04-08 19:39:46
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \twice_html\bookshop\src\views\bookshop.vue
-->
<template>
  <div class="search">
    <!-- //遮罩层 -->

    <form action="../views/bookshop/search.vue" class="form">
      <!-- <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      /> -->
      <van-search
        v-model="value"
        shape="round"
        background="#fe3c53"
      
        placeholder="请输入搜索关键词"
         @search="onSearch"
        @cancel="onCancel"
      />
    </form>

    <div>
      <!-- //轮播图 -->
      <div class="banner">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item
            ><img src="../assets/swiper/轮播图1.jpg" alt=""
          /></van-swipe-item>
          <van-swipe-item
            ><img src="../assets/swiper/轮播图2.jpg" alt=""
          /></van-swipe-item>
          <van-swipe-item
            ><img src="../assets/swiper/轮播图3.jpg" alt=""
          /></van-swipe-item>
          <van-swipe-item
            ><img src="../assets/swiper/轮播图4.jpg" alt=""
          /></van-swipe-item>
        </van-swipe>
      </div>

      <!-- //选框 -->
      <div class="change">
        <van-tabbar v-model="active" inactive-color="#999" active-color="#999">
          <van-tabbar-item
            v-for="(item, index) in change"
            :key="index"
            @click="turn(index)"
          >
            <span class="text">{{ item.title }}</span>
            <template #icon="props">
              <!-- <img :src="item.activeIcon" /> -->
              <img :src="props.active ? item.activeIcon : item.activeIcon" />
            </template>
          </van-tabbar-item>
        </van-tabbar>
      </div>

      <!-- //通知栏 -->
      <div class="label_swiper">
        <van-notice-bar
          left-icon="volume-o"
          :scrollable="false"
          color="#fe3c53"
        >
          <van-swipe
            vertical
            class="notice-swipe"
            :autoplay="3000"
            :show-indicators="false"
          >
            <van-swipe-item>书城新年重置钜惠，充100送50！</van-swipe-item>
            <van-swipe-item>新用户免费赠送10元体验卷</van-swipe-item>
            <van-swipe-item>邀请新用户送读书卷</van-swipe-item>
          </van-swipe>
        </van-notice-bar>
      </div>

      <!-- //hot_book -->
      <div class="hot_book">
        <myHead left="热书推荐" right="更多热书"></myHead>

        <ul>
          <template v-for="(item, index) in hotBook">
            <li
              :key="index"
              v-if="index"
              @click="turn_click(item.sourceUrl.split('/')[2])"
            >
              <bookDescRow
                :src="item.iconUrl"
                :title="item.title"
                :author='item.author'
              ></bookDescRow>
            </li>
          </template>
        </ul>
      </div>

      <!-- //type_book -->
      <div class="type_book">
        <myHead left="古代言情" right="更多"></myHead>
        <div class="type_book_list">
          <template v-for="(item, index) in hotBook">
            <div
              class="type"
              :key="index"
              @click="turn_click(item.sourceUrl.split('/')[2])"
            >
              <bookDescCow
                :src="item.iconUrl"
                :title="item.title"
                :author="item.author"
                :num="item.readCount"
                :desc="item.description"
              ></bookDescCow>
            </div>
          </template>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  created() {
    this.getHotBook();
    // this.change_open();
  },
  data() {
    return {
      show: false,
      // open: true,
      value: "",
      active: 0,
  recordArr:[],
      hotBook: [],
      change: [
        {
          title: "排行榜",
          routeName: "HotBar",
          activeIcon: require("../assets/Snipaste/书架1@2x.png"),
          // inactiveIcon: require('../assets/选框/home_active.png'),
        },
        {
          title: "原创专区",
          routeName: "Original",
          activeIcon: require("../assets/Snipaste/图层 5@2x.png"),
          // inactiveIcon: require('../assets/选框//menu.png')
        },
        {
          title: "出版书籍",
          routeName: "Publish",
          activeIcon: require("../assets/Snipaste/图层 3@2x.png"),
          // inactiveIcon: require('../assets/选框//shopbag.png')
        },
        {
          title: "书架",
          routeName: "BookShelf",
          activeIcon: require("../assets/bottom/书架active.png"),
          // inactiveIcon: require('../assets/选框//my.png')
        },
      ],
    };
  },
  methods: {
    turn_click(id) {
           if (localStorage.getItem("record")) {
        this.recordArr = JSON.parse(localStorage.getItem("record"));
      } else {
        this.recordArr = [];
      }
      this.recordArr.push(id);
      this.recordArr = [...new Set(this.recordArr)];
      localStorage.setItem("record", JSON.stringify(this.recordArr));
      this.$router.push({
        name: "BookDesc",
        params: {
          id: id,
        },
      });
    },
    turn(index) {
    
      this.$router.push({ name: this.change[index].routeName });
    },
    onSearch(val) {
      //   Toast(val);
      // this.open = false;
      this.$router.push({ name: "Search", params: { id: val } });

      // console.log(val);
    },
    onCancel() {
      //   Toast("取消");
      // console.log("cancel");
    },
    getHotBook() {
      this.axios({
        method: "get",
        url: "https://apis.netstart.cn/yunyuedu/category/original/data.json?id=8&gender=female&sort=2&pay=0&state=0&page=1",
        params: {},
      })
        .then((result) => {
          // console.log("result ==> ", result);
          this.hotBook = result.data.data.books;
          // console.log(this.hotBook);
          // console.log(this.hotBook[0].sourceUrl.split("/")[2]);
        })
        .catch((err) => {
          // console.log("err ==> ", err);
        });
    },
    // change_open() {
    //   this.open = true;
    // },
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
.search {
  width: 100%;
  margin: 0 auto;
  margin-bottom: 50px;
}
::v-deep .van-search,
.van-search--show-action {
  padding: 10px 0px;
}


//遮罩层
.hidden {
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 120px;
    height: 120px;
    background-color: #fff;
  }
}

//banner
.banner {
  margin-bottom: 10px;
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #e3ecf1;
    height: 150px;
    img {
      width: 375px;
      height: 150px;
    }
  }
  ::v-deep .van-swipe__indicators {
    width: 16%;
    height: 10px;
    padding: 2px;
    border-radius: 10px;
    background: rgba(27, 27, 27, 0.349);
    .van-swipe__indicator {
      width: 20%;
      height: 10px;
      background: white;
    }
  }
}

//选框
.change .van-tabbar--fixed {
  margin-bottom: 10px;
  position: static;
  // border: 1px solid #999;
  img {
    width: 25px;
    height: 25px;
  }
  .text {
    color: #474243c7;
    font-family: "黑体";
  }
}

//通知
.label_swiper {
  // width: 100%;
  // height: 40px;
  // line-height: 30px;
  // background: #39a9ed;
  margin-bottom: 10px;

  border-top: 1px solid rgba(153, 153, 153, 0.432);
  border-bottom: 1px solid rgba(153, 153, 153, 0.432);
  .van-notice-bar {
    background: #fff;
  }
  .notice-swipe {
    height: 40px;
    line-height: 40px;
    // background: white;
  }
}

//热书推荐
.hot_book {
  // width: 100%;
  height: 220px;
  overflow: hidden;
  // background: #999;

  ul {
    // width: 100%;
    height: 165px;
    display: flex;
    overflow-y: hidden;
    flex-wrap: nowrap;
    // justify-content: space-between;
    li {
      // overflow: hidden;
      width: 100px;
      height: 165px;
      // float: left;
      margin-left: 10px;
    }
  }
  .type_book {
    .type_book_list {
      .type {
        margin-top: 13px;
      }
    }
  }
}
</style>