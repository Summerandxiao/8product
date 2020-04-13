<template>
  <div class="tag-wrapper flex" @click="operateTag">
    <div>
      <span>发票标签</span>
      <span class="tag-name">{{tagName}}</span>
    </div>
    <i class="iconfont icon-icon-angle-right"></i>
  </div>
</template>
<script>
export default {
  name: 'tag',
  props: ['tagName', 'fromPath', 'ifChange'],
  data () {
    return {
    }
  },
  methods: {
    operateTag () {
      if (this.ifChange) {
        this.$router.push({ path: 'chooseTag', query: { fromPath: this.fromPath } })
      }
    }
  }
}
</script>
<style lang="scss">
.tag-wrapper {
  width: 622px;
  height: 100px;
  padding: 0 32px;
  background: #fff;
  border-radius: 6px;
  margin: 32px auto 20px;
  color: #333;
  .tag-name {
    margin-left: 64px;
  }
  .iconfont {
    font-size: 32px;
  }
}
</style>
