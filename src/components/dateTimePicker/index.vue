<template>
  <mt-datetime-picker
    class="date-time-wrapper"
    ref="picker"
    v-model="date"
    type="date"
    year-format="{value} 年"
    month-format="{value} 月"
    date-format="{value} 日"
    @visible-change="handleVisibleChange"
    @confirm="handleConfirm">
  </mt-datetime-picker>
</template>

<script>
import { validateTime } from '@/utils/index.js'
export default {
  name: 'dateTimePicker',
  props: ['show', 'dateStr'],
  watch: {
    show () {
      if (this.show) {
        this.$refs.picker.open()
      } else {
        this.$refs.picker.close()
      }
    }
  },
  data () {
    return {
      modal: false,
      date: new Date()
    }
  },
  methods: {
    handleConfirm (time) {
      const obj = {}
      obj[this.dateStr] = validateTime(time, 'date')
      this.$emit('changeTime', obj)
    },
    handleVisibleChange (isVisible) {
      if (!isVisible) this.$emit('changeTime')
    }
  }
}
</script>

<style lang="scss">
.date-time-wrapper {
  .picker-toolbar {
    height: 60px;
    .mint-datetime-action {
      line-height: 60px;
      font-size: 28px;
    }
  }
  .picker-item {
    font-size: 28px;
  }
}
</style>
