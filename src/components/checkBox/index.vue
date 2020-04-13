<template>
  <div class="checkbox-wrapper">
    <div class="title">{{title}}</div>
    <div v-for="(item, key) in list" :key="item"
      :id="key"
      :class="['invoice-type', className]"
      @click="changeCheck(key)">
      {{item}}
      <div class="arrow"></div>
      <i class="iconfont icon-guanbi"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: 'checkBox',
  props: ['list', 'title', 'className'],
  methods: {
    changeCheck (key) {
      const item = document.querySelector(`.${this.className}[id="${key}"]`)
      item.classList.toggle('checked')
    }
  }
}
</script>
<style lang="scss">
  .checkbox-wrapper {
    .title {
      margin-bottom: 32px;
      font-size: 28px;
      color: #888;
    }
    .invoice-type {
      margin-bottom: 24px;
      background: #f4f4f4;
      border-radius: 10px;
      font-size: 24px;
      text-align: center;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      position: relative;
      .arrow {
        width: 0;
        height: 0;
        border-left: 21.5px solid #4A90E2;
        border-right: 21.5px solid transparent;
        border-top: 21.5px solid transparent;
        border-bottom: 21.5px solid transparent;
        transform: rotate(45deg);
        position: absolute;
        right: -21.5px;
        bottom: -21.5px;
        display: none
      }
      .iconfont {
        font-size: 12px;
        color: #fff;
        position: absolute;
        right: 2px;
        bottom: 0px;
        display: none;
      }
    }
    .checked {
      background: #ECF3FC;
      color: #4A90E2;
      .arrow, .iconfont {
        display: block
      }
    }
  }
</style>
