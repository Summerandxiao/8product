<template>
  <div class="workflow-wrapper">
    <nav-title title="流程跟踪" :path="path"></nav-title>
    <div v-if="visible">
      <workflow-trace-full direction="vertical" :options="optOfWorkflow" />
    </div>
  </div>
</template>
<script>
import navTitle from '@/components/navTitle'
export default {
  name: 'Workflow',
  components: {
    navTitle
  },
  data () {
    return {
      path: '', // 返回路径
      visible: false,
      optOfWorkflow: {},
      locale: {
        cancel: '已撤销',
        back: '已退回'
      }
    }
  },
  created () {
    this.$store.dispatch('getVariables', this.$route.query.id).then((res) => {
      this.optOfWorkflow['locale'] = this.locale
      this.optOfWorkflow['variables'] = res
      Object.assign(this.optOfWorkflow, JSON.parse(this.$route.query.workFlow))
      this.visible = true
      this.path = this.$route.query.path
    })
  }
}
</script>
<style lang="scss">
  .workflow-wrapper {
    background: #fff;
    .workflow-trace-full.vertical {
      margin-top: 132px;
    }
    @supports (bottom: env(safe-area-inset-bottom)){
      .workflow-trace-full.vertical {
        margin-top: calc(88px + env(safe-area-inset-top));
        margin-top: calc(88px + constant(safe-area-inset-top));
      }
    }
  }
</style>
