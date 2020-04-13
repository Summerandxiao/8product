<template>
  <div class="m-input-wrapper">
    <label class="label">{{label}}</label>
    <mt-field v-model="valueOfInput" :type="type" :placeholder="placeholder" @input="input(label)"></mt-field>
  </div>
</template>

<script>
export default {
  name: 'm-input',
  props: {
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      placeholder: '请输入内容',
      eye: {
        open: true,
        reverse: false
      }
    }
  },
  created () {
    this.valueOfInput = this.value
  },
  methods: {
    input (label) {
      this.$emit('input', { label: label, value: this.valueOfInput })
    }
  }
}
</script>

<style lang="scss">
  .m-input-wrapper {
    .label {
      display: block;
      margin-top: 71px;
      font-size: 28px;
      font-weight: 400;
      color: #333;
    }
    .mint-cell-wrapper {
      background: none;
      padding: 0 0;
      border-bottom: 2px solid #ccc;
    }
    .mint-cell-value {
      padding: 29px 0;
      font-size: 30px;
      color: #666;
      font-weight: 400;
      border: none;
    }
  }
</style>
