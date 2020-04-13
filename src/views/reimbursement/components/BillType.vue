<template>
  <div class="billTpe-wrapper">
    <div class="billType-header">
      <span class="bill-type">单据类型</span>
      <router-link class="billType-close" to="main"><i class="iconfont icon-guanbi"/></router-link>
    </div>
    <div class="billType-content">
      <div class="item" v-for="(item, index) in billTypeData" :key="index" @click="itemClick(item)">
        <div class="billType-items flex">
          <div class="flex" v-if="item.billName">
            <div class="select-type">{{item.billName[0]}}</div>
            <span>{{item.billName}}</span>
          </div>
          <i class="iconfont icon-icon-angle-right"></i>
        </div>
        <div class="line"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      billTypeData: []
    }
  },
  computed: {
    ...mapGetters(['reimburseTypeList'])
  },
  created () {
    this.billTypeData = this.reimburseTypeList
    this.billTypeData.shift()
  },
  methods: {
    itemClick (item) {
      this.$router.push({ name: 'reimburseDetail', query: { billType: item.billType } })
    }
  }
}
</script>

<style lang="scss" scoped>
  .billTpe-wrapper {
    background: #fff;
    padding-top: 44px;
    .billType-header {
      .bill-type {
        display: inline-block;
        font-size: 40px;
        font-weight: 700;
        color: #333;
        margin-top: 25px;
        margin-left: 48px;
      }
      .billType-close {
        float: right;
        margin-top: 25px;
        margin-right: 32px;
        .icon-guanbi {
          font-size: 45px;
          color: #ccc;
        }
      }
    }
    .billType-content {
      margin: 48px 48px 0;
      .billType-items {
        font-size: 32px;
        margin:28px 0;
        color: #333;
      }
      .line {
        border: none;
        border-bottom: 1px solid #eee;
      }
      .select-type {
        width: 80px;
        height: 80px;
        line-height: 80px;
        text-align: center;
        border-radius: 100%;
        margin-right:20px;
      }
      .item:nth-child(3n+1) .select-type {
        background:rgba(255,153,0,0.1);
        color: #FF9C00;
      }
      .item:nth-child(3n+2) .select-type {
        background:rgba(153,204,0,0.1);
        color: #7DAC4F;
      }
      .item:nth-child(3n) .select-type {
        background:rgba(0,153,255,0.1);
        color: #4A90E2;
      }
    }
    .iconfont {
      color:#ccc;
      font-size: 24px;
    }
    @supports (bottom: env(safe-area-inset-bottom)){
      .billTpe-wrapper {
        height: constant(safe-area-inset-bottom);
        height: env(safe-area-inset-bottom);
      }
    }
  }
</style>
