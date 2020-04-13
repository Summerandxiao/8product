<template>
  <div class="operation-wrapper">
    <nav-title :title="title" :path="path" :query="query"></nav-title>
    <div class="tips">
      <div class="iconfont icon-icon-warning"></div>
      <div class="para">柜门已打开</div>
      <div v-if="type === 1" class="tip">请尽快将当前报销单的实物资料投入柜子内！</div>
      <div v-if="type === 2" class="tip">请尽快将当前柜子中的报销单的实物资料取走！</div>
      <div v-if="type === 3" class="tip">请尽快将当前报销单的实物资料存入退单柜！</div>
      <div v-if="type === 4" class="tip">请尽快将当前柜子中的报销单的实物资料取走！</div>
    </div>
    <div class="btn sure flex" @click="sure">{{ sureMessage[type-1] }}</div>
    <div class="btn cancel flex" @click="cancel">{{ cancelMessage[type-1] }}</div>
  </div>
</template>
<script>
import navTitle from '@/components/navTitle'
export default {
  components: {
    navTitle
  },
  data () {
    return {
      type: '',
      title: '选择快递柜',
      path: 'chooseCabinet',
      query: {},
      messages: [
        '取消投递前请先确保单据实物未放入到投递柜内，确认取消本次投递吗？',
        '取消取件前请先确保单据实物未被取出，确认取消本次取件吗？',
        '取消退单前请先确保单据实物未放入到退单柜内，确认取消本次退单吗？',
        '取消取单前请先确保单据实物未被取出，确认取消本次取单吗？'
      ],
      sureMessage: ['投递结束', '取件结束', '退单结束', '取退单结束'],
      cancelMessage: ['取消投递', '取消取件', '取消退单', '取消取退单']
    }
  },
  created () {
    this.type = Number(this.$route.query.type)
    this.query.type = Number(this.$route.query.type)
  },
  methods: {
    sure () {
      const id = this.$route.query.id
      const billId = this.$route.query.billId
      const address = this.$route.query.address
      this.$store.dispatch('endAction', id).then(() => {
        this.$router.push({ path: 'successDeliver', query: { billId, address, type: this.type } })
      })
    },
    cancel () {
      this.$message.confirm(this.messages[this.type - 1], '').then(action => {
        this.$router.push({ path: 'chooseCabinet', query: { type: this.type } })
      }).catch(() => {})
    }
  }
}
</script>
<style lang="scss" scoped>
  .mint-msgbox-message {
    line-height: inherit;
    padding: 0 32px;
    font-size: 32px;
    line-height: 60px;
    color: #333;
  }
  .operation-wrapper {
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
        color: #FF9900;
      }
      .para {
        color: #333;
        font-size: 40px;
        margin: 30px auto 20px;
      }
      .tip {
        width: 555px;
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
    .operation-wrapper {
      padding-top: calc(88px + constant(safe-area-inset-top));
      padding-top: calc(88px + env(safe-area-inset-top));
    }
  }
</style>
