<template>
  <div class="target-info-wrapper">
    <nav-title :title="title" :path="path"></nav-title>
    <div
      v-for="(item) in head" :key="item.label"
      class="target-item flex line-1px">
        <label class="item-label"> {{ item.label }} </label>
        <div class="item-content">
          <!--单据编码-->
          <input class="input" type="text" v-model="data[item.key]">
        </div>
    </div>
    <mt-button class="save" type="primary" @click="save">保存</mt-button>
  </div>
</template>
<script>
import navTitle from '@/components/navTitle'
import { mapMutations } from 'vuex'

export default {
  name: 'targetInfo',
  components: {
    navTitle
  },
  data () {
    return {
      index: 0,
      path: 'reimburseDetail',
      title: '修改预算指标',
      query: {},
      data: {},
      head: [{
        label: '项目',
        key: 'projectCode'
      }, {
        label: '指标编码',
        key: 'bgItemCode'
      }, {
        label: '指标总额',
        key: 'bgItemCur'
      }, {
        label: '可用金额',
        key: 'bgItemBalanceCur'
      }, {
        label: '本次申请金额',
        key: 'usedMoney'
      }]
    }
  },
  created () {
    this.data = JSON.parse(this.$route.query.data)
    this.index = this.$route.query.index
  },
  methods: {
    ...mapMutations(['CHANGEBILLINFO']),
    save () {
      if (!this.data.usedMoney) this.$message('提示', '请输入本次使用金额')
      this.CHANGEBILLINFO({ info: 'balance', data: this.data, index: this.index })
      this.$router.push({ path: this.path })
    }
  }
}
</script>
<style lang="scss">
  .target-info-wrapper {
    padding-top: 132px;
    background: #fff;
    .line-1px::before {
      border: none;
      border-bottom: 1px solid #eee;
    }
    .target-item {
      width: 686px;
      padding: 18px 0;
      background: #fff;
      margin: 0 auto;
      .item-label {
        width: 210px;
        margin-right: 20px;
        font-weight: 400;
        color: #666;
        font-size: 32px;
      }
      .item-content {
        position: relative;
        .input {
          display: inline-block;
          width: 456px;
          height: 48px;
          text-align: right;
          background: #fff;
          outline: none;
          border: none;
          color: #333;
          font-size: 32px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          z-index: 100;
        }
      }
    }
    .save {
      position: absolute;
      left: 32px;
      bottom: 88px;
      width: 686px;
      height: 90px;
      border-radius: 45px;
      font-size: 36px;
    }
  }
</style>
