<template>
<mt-datetime-picker
  class="time-picker"
  type="time"
  ref="timePicker"
  v-model="time"
  @confirm="handleConfirm()"
  @visible-change="handleVisibleChange"
></mt-datetime-picker>
</template>
<script>
export default {
  name: 'timePicker',
  props: ['isShow', 'dateTimeStr'],
  data () {
    return {
      time: '',
      modal: false
    }
  },
  watch: {
    isShow () {
      if (this.isShow) {
        this.$refs.timePicker.open()
      }
    }
  },
  methods: {
    handleConfirm () {
      const obj = {}
      obj[this.dateTimeStr] = this.time
      this.$emit('change', obj)
    },
    handleVisibleChange (isVisible) {
      if (!isVisible) {
        this.$emit('change')
      }
    }
  }
}
</script>
<style lang="scss">
.time-picker{
  .picker-toolbar{
    height:60px;
  }
  .mint-datetime-action{
    font-size:32px;
    padding:7px 0;
  }
  .picker-slot{
    font-size:32px;
  }
}
</style>
