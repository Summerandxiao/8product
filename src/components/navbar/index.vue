<template>
  <div class="nav-container-wrapper">
    <mt-navbar class="nav-bar-container" v-model="selected" :selected.sync="selected">
      <mt-tab-item v-for="item in labels" :key="item.id" :id="item.id" >{{item.label}}</mt-tab-item>
    </mt-navbar>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  props: ['navLabels'],
  data () {
    return {
      selected: '1',
      labels: []
    }
  },
  watch: {
    selected () {
      this.$root.Bus.$emit('changeSelected', this.selected)
    }
  },
  created () {
    this.labels = this.navLabels
  }
}
</script>

<style lang="scss">
.nav-container-wrapper {
  position: fixed;
  left: 0;
  top: 132px;
  width: 100%;
  height: 85px;
  z-index: 100;
  .nav-bar-container {
    display: flex;
    align-items: center;
    background: #fff;
    height: 85px;
    padding: 0 32px;
    .mint-tab-item {
      -webkit-tap-highlight-color: transparent;
    }
    .mint-tab-item.is-selected {
      border-bottom: none;
      .mint-tab-item-label {
        font-size: 32px;
        width: 160px;
        position: relative;
        &:after {
          display: block;
          content: '';
          width: 160px;
          height: 8px;
          background: #3596FA;
          border-radius: 8px;
          position: absolute;
          left: 0;
          bottom: -26px;
        }
      }
    }
    .mint-tab-item {
      display: flex;
      flex: 1;
      justify-content: center;
      &-label {
        font-size: 32px;
        width: 160px;
      }
    }
  }
}
  @supports (bottom: env(safe-area-inset-bottom)){
    .nav-container-wrapper {
      top: calc(88px + constant(safe-area-inset-top));
      top: calc(88px + env(safe-area-inset-top));
    }
  }
</style>
