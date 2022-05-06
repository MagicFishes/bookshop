<!--
 * @Author: your name
 * @Date: 2022-03-23 16:02:35
 * @LastEditTime: 2022-04-05 17:03:04
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \twice_html\bookshop\src\components\book_desc_cow.vue
-->
<template>
  <div
    class="box_cow"
    :src="src"
    :title="title"
    :author="author"
    :type="type"
    :end_type="end_type"
    :num="num"
    :desc="desc"
  >
    <div class="left">
      <img :src="src" alt="" />
    </div>
    <div class="right">
      <h3 class="h3">{{ title }}</h3>
      <p>
        <span>{{ author }}</span
        ><span v-if="type">· </span> <span>{{ type }}</span>
        <span v-if="end_type">·</span> <span>{{ end_type }}</span>
        <span v-if="num">·</span> <span>{{ num }}</span>
        <span></span>
      </p>
      <div class="desc" v-html="desc"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "book_desc_cow",
  props: {
    src: {
      type: String,
      default: () => {
        return "";
      },
    },
    title: {
      type: String,
      default: () => {
        return "";
      },
    },
    author: {
      type: String,
      default: () => {
        return "";
      },
    },
    type: {
      type: String,
      default: () => {
        return "";
      },
    },
    end_type: {
      type: String,
      default: () => {
        return "";
      },
    },
    num: {
      type: String,
      default: () => {
        return "";
      },
    },
    desc: {
      type: String,
      default: () => {
        return "";
      },
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
.box_cow {
  width: 100%;
  height: 120px;
  margin-top: 5px;
  //   background: blue;
  display: flex;

  justify-content: space-evenly;
  .left {
    width: 25%;
    background: white;
    display: flex;
    align-items: center;
    img {
      // width: 100%;
      height: 120px;
      width: 85px;
      
    }
  }
  .right {
    width: 65%;
    height: 100%;
    // overflow-x: auto;
    // background: rgb(245, 245, 245);
    box-sizing: border-box;
    h3 {
      padding: 0px;
      margin: 5px 0px;
      overflow: hidden;
      font-size: 14px;
      font-family: "黑体";
      // width: 250px;
      //      text-overflow: ellipsis;
      //         white-space: nowrap; /*强制不换行*/
      // word-wrap: break-word;
    }
    p {
      padding: 0px;
      margin: 5px 0px;
      height: 16px;
      display: block;
      width: 231px;
      color: rgb(175, 175, 175);
      // overflow: hidden;
      overflow-x: auto;
      //       text-overflow: ellipsis; /*文字隐藏后添加省略号*/
      //   white-space: nowrap; /*强制不换行*/
      // word-wrap: break-word;
    }
    .desc {
      // width: 220px;
      width: 100%;
      height: calc(100% - 55px);
      // background: #999;
      padding: 0px 5px;
      font-size: 12px;
      color: rgb(175, 175, 175);
      overflow: hidden; /*自动隐藏文字*/
      box-sizing: border-box;
      overflow-y: auto;

      //   text-overflow: ellipsis; /*文字隐藏后添加省略号*/
      //   white-space: nowrap; /*强制不换行*/
      // word-wrap: break-word;
    }
  }
}
</style>
