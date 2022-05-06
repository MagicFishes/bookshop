<!--
 * @Author: your name
 * @Date: 2022-03-30 10:56:15
 * @LastEditTime: 2022-04-08 19:40:11
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \twice_html\bookshop\src\views\HotBar_list.vue
-->
<template>
  <div>
    <van-nav-bar
      :title="title"
      left-text=""
      :fixed="true"
      right-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <ul>
      <li v-for="(item, index) in arrList" :key="index" @click="turn(item.id)">
        <book-desc-cow
          :src="item.cover"
          :title="item.title"
          :desc="item.content"
          :author="item.author"
        ></book-desc-cow>
      </li>
    </ul>
  </div>
</template>

<script>
import book_desc_row from "../components/book_desc_row.vue";
export default {
  components: { book_desc_row },
  name: "HotBarList",

  created() {
    let a = this.$route.params;
    // console.log(a);
    this.rankType = a.rankType;
    this.uuid = a.uuid;
    this.title = a.title;
    this.enter_first(this.rankType, this.uuid);
  },
  data() {
    return {
      rankType: null,
      uuid: null,
      arrList: null,
      title: null,
      recordArr:[],
    };
  },
  methods: {
    turn(id) {
      // console.log(id);
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
    onClickLeft() {
      this.$router.go(-1);
    },
    enter_first(rankType, uuid) {
      this.axios({
        url:
          "https://apis.netstart.cn/yunyuedu/store/rankList.json?rankType=" +
          rankType +
          "&uuid=" +
          uuid +
          "&all=0",
        method: "get",
        params: {},
      })
        .then((result) => {
          // console.log(result);
          this.arrList = result.data.list;
        })
        .catch((err) => {
          // console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .van-nav-bar,
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
ul {
  padding: 5px;
  margin-top: 46px;
  li {
    margin-top: 20px;
  }
}
</style>