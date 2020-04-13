<template>
  <mt-popup class="meeting-wrapper" v-model="popupVisible" position="right"
    popup-transition="popup-fade">
    <div class="meeting-title flex">
      <span class="meeting-plan-value">{{ infoId === 'MEETING_PLAN' ? '会议计划': '培训计划' }}</span>
      <i class="iconfont icon-guanbi" @click="toClose()"></i>
    </div>
    <div v-for="(item,index) in meetingPlanList" :key="index" class="meeting-plan flex">
      <label ref="checkList">
        <span class="mint-checkbox">
          <input type="radio"
            :value="item.meetingPlan"
            v-model="selected"
            class="mint-checkbox-input"
            @click="toChoose(item.meetingPlan, index)">
          <span class="mint-checkbox-core"/>
        </span>
      </label>
      <div class="meeting-card">
        <div class="flex">
          <div class="flex">
            <div v-if="item.meetingTypeName" class="meetingTypeName">{{item.meetingTypeName}}</div>
            <div v-if="item.cultivateTypeName" class="meetingTypeName">{{item.cultivateTypeName}}</div>
            <span v-if="item.meetingPlan">{{item.meetingPlan}}</span>
            <span v-if="item.cultivatePlan">{{item.cultivatePlan}}</span>
          </div>
          <span>{{item.startDate | datetime}}</span>
        </div>
        <div class="meeting-first">
          <span v-if="item.meetingName" class="meetingName">{{item.meetingName}}</span>
          <span v-if="item.cultivateName" class="meetingName">{{item.cultivateName}}</span>
          <span v-if="item.meetAdr">{{item.meetAdr}}</span>
        </div>
        <div v-if="item.budgetmoney" class="budgetProject">预算经费: {{item.budgetmoney}}</div>
      </div>
    </div>
    <div class="noInfo" v-if="!meetingPlanList.length">
      <img src="@/assets/images/nodata.png" alt="">
      <p>暂无可选择的会议计划</p>
    </div>
  </mt-popup>
</template>
<script>
export default {
  props: ['isShow', 'infoId', 'meetingPlanList'],
  data () {
    return {
      popupVisible: false,
      selected: '',
      meetingPlan: ''
    }
  },
  watch: {
    isShow () {
      this.popupVisible = this.isShow
    }
  },
  filters: {
    datetime (value) {
      return value.substr(0, 10)
    }
  },
  methods: {
    toClose () {
      this.popupVisible = false
      this.$emit('hideScan')
    },
    toChoose (selected, index) {
      this.meetingPlan = selected
      this.popupVisible = false
      // 将选中的会议计划传递给基本信息组件，渲染其他计划相关的数据
      this.$emit('hideScan', this.meetingPlanList[index])
    }
  }
}
</script>
<style lang="scss">
  .meeting-wrapper {
    width:100%;
    height:100%;
    background: #F1F3F6;
    .meeting-plan {
      margin:32px 15px 32px 10px;
      .mint-checkbox-core {
        width: 30px;
        height: 30px;
        margin-right: 10px;
      }
      .mint-checkbox-input:checked + .mint-checkbox-core::after {
        width: 18px;
        height: 10px;
        left: 5px;
        top: 5px;
        transform: rotate(-45deg) scale(-1, 1)
      }
      .meeting-card {
        background: #fff;
        padding: 32px;
        width: 85%;
        font-size:28px;
        .meetingTypeName {
          color: #7ED321;
          background: rgba(125,172,79,0.1);
          padding: 6px 20px;
          margin-right: 20px;
        }
        .meeting-first, .budgetProject {
          margin-top: 20px;
          font-size: 32px;
          .meetingName {
            margin-right: 20px;
          }
        }
      }
    }
    .meeting-title {
      margin: 48px;
      .meeting-plan-value {
        font-size: 42px;
        font-weight: 600;
      }
    }
    .icon-guanbi:before {
      font-size: 42px;
    }
    .noInfo {
      text-align: center;
      margin-top: 200px;
      img {
        width: 314px;
        height: 242px;
      }
    }
  }
</style>
