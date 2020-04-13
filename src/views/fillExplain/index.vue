<template>
  <div style="height: 100%">
    <nav-title :title="title" path="main"></nav-title>
    <div class="fe-wrapper">
      <div class="fe-content">
        <div class="fe-left">
          <ul>
            <li v-for="(item, index) in leftList" :key="index" :class="{active:num==index}" @click="activeBtn(index)">{{item}}</li>
          </ul>
        </div>
        <div class="fe-right">
          <div class="fe-right-item1" v-show="num == 0">
            <span>关于报销单的填报说明填报说明填报说明</span>
            <p style="color: #333;">1、第一条填报说明，不限制字数 换行自动</p>
            <p style="color: #333;">1、第一条填报说明，不限制字数 换行自动</p>
            <p style="color: #333;">1、第一条填报说明，不限制字数 换行自动</p>
            <p style="color: #333;">1、第一条填报说明，不限制字数 换行自动</p>
            <p style="color: #333;">1、第一条填报说明，不限制字数 换行自动</p>
            <p style="color: #333;">1、第一条填报说明，不限制字数 换行自动</p>
            <p style="color: #333;">1、第一条填报说明，不限制字数 换行自动</p>
            <p style="color: #333;">1、第一条填报说明，不限制字数 换行自动</p>
            <p style="color: #333;">1、第一条填报说明，不限制字数 换行自动</p>
            <p style="color: #333;">1、第一条填报说明，不限制字数 换行自动</p>
            <p style="color: #333;">1、第一条填报说明，不限制字数 换行自动</p>
            <p style="color: #333;">1、第一条填报说明，不限制字数 换行自动</p>
            <p style="color: #333;">1、第一条填报说明，不限制字数 换行自动</p>
            <p style="color: #333;">1、第一条填报说明，不限制字数 换行自动</p>
          </div>
          <div class="fe-right-item2" v-show="num == 1">2</div>
          <div class="fe-right-item3" v-show="num == 2">3</div>
          <div class="fe-right-item4" v-show="num == 3">4</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import navTitle from '@/components/navTitle'
export default {
  data () {
    return {
      num: 0,
      title: '填报说明',
      leftList: ['全部', '请款信息', '借款信息', '不超过5个字']
    }
  },
  components: {
    navTitle
  },
  methods: {
    activeBtn (index) {
      this.num = index
    }
  }
}
</script>

<style lang="scss" scoped>
  .fe-wrapper {
    padding-top: 88px;
    background-color: #fff;
    height: 100%;
    box-sizing: border-box;
    .fe-content {
      display: flex;
      flex-direction: row;
      height: 100%;
      .fe-left {
        width: 220px;
        height: 100%;
        background-color: #F1F3F6;
        ul {
          padding-left: 0;
          margin: 0;
          li {
            list-style-type:none;
            width: 100%;
            height: 110px;
            line-height: 110px;
            color: #333;
            text-align: center;
            font-size: 32px;
            box-sizing: border-box;
            display: block;
          }
          .active {
            border-left: 8px solid #0099FF;
            color: #0099FF;
            background-color: #fff;
          }
        }
      }
      .fe-right {
        flex: 1;
        overflow-y: auto; //滚动条
        background-color: #fff;
        padding: 32px;
        .fe-right-item1 {
          span {
            font-size:36px;
            font-family:PingFangSC-Medium,PingFangSC;
            font-weight:500;
            color:rgba(51,51,51,1);
            display: block;
            margin-bottom: 30px;
          }
          p {
            margin: 24px 0;
          }
        }
      }
    }
  }
</style>
