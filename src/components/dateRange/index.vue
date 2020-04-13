<template>
  <div class="time-range-wrapper">
    <calendar :show.sync="calendarShow" :defaultDate="defaultDate" :mode="mode" @change="change"/>
    <div v-if="title" class="title">{{title}}</div>
     <div v-if="count==1">
      <input
        v-model="date"
        :class="datestr"
        type="text"
        placeholder="请选择日期"
        @focus="focus(datestr)"/>
    </div>
    <div class="time-range" v-else>
      <input
        v-model="params.startDate"
        placeholder="起始日期"
        class="startDate"
        type="text"
        @focus="focus('startDate')"/>
      <span class="gap">—</span>
      <input
        v-model="params.endDate"
        placeholder="结束日期"
        class="endDate"
        type="text"
        @focus="focus('endDate')"/>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs'

export default {
  name: 'timeRange',
  /**
   * 当count=1时，需要传入datestr作为时间的key值，同时datestr的值也是输入框的类名
   */
  props: ['reset', 'title', 'count', 'default', 'readonly', 'datestr'],
  data () {
    return {
      mode: 'single',
      calendarShow: false,
      date: dayjs().format('YYYY-MM-DD'),
      defaultDate: dayjs().subtract(30, 'day').format('YYYY-MM-DD'),
      params: {
        startDate: dayjs().subtract(30, 'day').format('YYYY-MM-DD'),
        endDate: dayjs().format('YYYY-MM-DD')
      }
    }
  },
  watch: {
    default () { // 新增费用明细模块需要根据填入的日期自动带入
      this.date = dayjs(this.default).format('YYYY-MM-DD')
    },
    reset () {
      if (this.reset === true) {
        this.params = {
          startDate: dayjs().subtract(30, 'day').format('YYYY-MM-DD'),
          endDate: dayjs().format('YYYY-MM-DD')
        }
        this.$emit('changeTime', this.params)
      }
    }
  },
  created () {
    // 是否设置默认日期，如果count=1时default='',表示输入框不需要填入默认值
    if (this.default) {
      this.date = dayjs(this.default).format('YYYY-MM-DD')
      this.defaultDate = dayjs(this.default).format('YYYY-MM-DD')
    } else {
      this.date = ''
    }
  },
  methods: {
    focus (dateStr) {
      document.activeElement.blur()
      if (this.readonly) return
      this.calendarShow = true
      this.dateStr = dateStr
    },
    change (date) {
      this.calendarShow = false
      if (this.count === 1) {
        this.date = date.format('YYYY-MM-DD')
        const obj = {}
        obj[this.dateStr] = this.date
        this.$emit('changeTime', obj)
      } else {
        this.params[this.dateStr] = date.format('YYYY-MM-DD')
        this.$emit('changeTime', this.params)
      }
    }
  }
}
</script>
<style lang="scss">
  .time-range-wrapper {
    display: inline-block;
    .startDate, .endDate {
      display: inline-flex;
      width: 160px;
      height: 60px;
      background: #f4f4f4;
      border: none;
      align-items: center;
      padding-left: 20px;
      color: #333;
      font-size: 24px;
      appearance: none;
    }
    .gap {
      margin: 0 40px;
    }
  }
</style>
