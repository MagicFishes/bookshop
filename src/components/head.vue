<!--
 * @Author: your name
 * @Date: 2022-03-23 01:25:07
 * @LastEditTime: 2022-03-31 20:06:04
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \twice_html\bookshop\src\components\head.vue
-->
<template>
    <div>
        <div class="head" :left='left' :right='right'>
            <span class="left">{{left}}</span>
            <span class="right">{{right}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name:"myHead",
        props:{
            left:{
                type:String,
                default:()=>{
                    return "我的组件"
                }
            },
            right:{
                type:String,
                default:()=>{
                    return "更多>"
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .head{
        height: 40px;
        display: flex;
        justify-content: space-between;
        width: 100%;
        line-height: 40px;
        font-family: "黑体";
        
        .left{
            // width: ;
            font-weight: bold;
            font-size: 16px;
            padding-left: 10px;
        }
        .right{
            font-size: 12px;
            line-height: 50px;
            color: #999;
            width: 100px;
            text-align: right;
            margin-right: 10px;
        }
    }
</style>