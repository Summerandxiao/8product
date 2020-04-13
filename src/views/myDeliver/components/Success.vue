<template>
  <div class="success-wrapper">
    <nav-title :title="title" :path="path" :query="query"></nav-title>
    <div class="tips">
      <div class="iconfont icon-icon-check-circle"></div>
      <div class="para">恭喜您，{{ action[type - 1] }}成功</div>
      <div v-if="type === 1" class="tip">报销单{{billId}}的实物资料于{{time}}成功投入{{address}}投递柜内。</div>
      <div v-if="type === 2" class="tip">报销单{{billId}}的实物资料于{{time}}成功从{{address}}投递柜内取出。</div>
      <div v-if="type === 3" class="tip">报销单{{billId}}的实物资料于{{time}}成功投入{{address}}退单柜内。</div>
      <div v-if="type === 4" class="tip">报销单{{billId}}的实物资料于{{time}}成功从{{address}}退单柜内取出。</div>
    </div>
    <router-link v-if="type==='1'" :to="{ name: 'chooseCabinet', query: { type } }" class="btn sure flex">{{ action1[type - 1] }}</router-link>
    <router-link to="main" class="btn cancel flex">返回首页</router-link>
  </div>
</template>
<script>
import navTitle from '@/components/navTitle'
import dayjs from 'dayjs'

export default {
  name: 'successDeliver',
  components: {
    navTitle
  },
  data () {
    return {
      billId: '',
      time: '',
      address: '',
      type: '',
      query: {},
      action: ['投递', '取单', '退单', '取退单'],
      action1: ['继续投递', '继续取件', '继续退单', '继续取退单'],
      title: '选择快递柜',
      path: 'chooseCabinet'
    }
  },
  created () {
    this.type = Number(this.$route.query.type)
    this.query.type = Number(this.$route.query.type)
    this.address = this.$route.query.address
    this.billId = this.$route.query.billId
    this.time = dayjs().format('YYYY-MM-DD HH:mm:ss')
  }
}
</script>
<style lang="scss" scoped>
  .success-wrapper {
    padding-top: 132px;
    font-family: PingFangSC;
    font-weight: 400;
    .tips {
      padding: 60px 0;
      background: #fff;
      text-align: center;
      margin-bottom: 60px;
      .iconfont {
        font-size: 120px;
        color: #0099FF;
      }
      .para {
        color: #333;
        font-size: 40px;
        margin: 30px auto 20px;
      }
      .tip {
        width: 614px;
        margin: 0 auto;
        font-size: 32px;
        color: rgba(153,153,153,1);
        line-height: 45px;
      }
    }
    .btn {
      width: 686px;
      height: 90px;
      border-radius: 90px;
      margin: 0 auto 30px;
      font-size: 36px;
      justify-content: center;
    }
    .sure {
      color: #fff;
      background:linear-gradient(90deg,rgba(88,163,252,1) 0%,rgba(83,160,253,1) 48%,rgba(114,176,249,1) 100%);
    }
    .cancel {
      color: #333;
      background: #fff;
    }
  }
  @supports (bottom: env(safe-area-inset-bottom)){
    .success-wrapper {
      padding-top: calc(88px + constant(safe-area-inset-top));
      padding-top: calc(88px + env(safe-area-inset-top));
    }
  }
</style>
