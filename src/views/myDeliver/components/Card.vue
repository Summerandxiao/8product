<template>
<div class="mydeliver-card-wrapper">
  <div v-for="(item, index) in data" :key="item.billId" class="flex item-wrapper">
    <div class="card">
      <div class="flex">
        <span :class="['billType-color flex', billType[item.parentBillType]]">{{item.billTypeName}}</span>
        <span class="time">{{item.inputDate}}</span>
      </div>
      <div class="flex depart-content">
        <span>{{item.orgName}}</span>
        <span>¥{{item.billMoney | numFormat}}</span>
      </div>
    </div>
    <label class="mint-checklist-label" ref="checkList">
      <span class="mint-checkbox">
        <input type="checkbox"
          :value="index"
          v-model="checkboxModal"
          class="mint-checkbox-input"
          @click="choose(index)">
        <span class="mint-checkbox-core"/>
      </span>
    </label>
  </div>
</div>
</template>
<script>
export default {
  props: ['type', 'data'],
  data () {
    return {
      checkboxModal: [],
      billType: {
        'LOAN': 'success',
        'EXPENSE': 'success',
        'APPLY': 'warning',
        'REPAY': 'primary'
      }
    }
  },
  methods: {
    choose (index) {
      this.checkboxModal = []
      this.checkboxModal.push(index)
      this.$emit('choosedId', this.data[this.checkboxModal[0]].billId)
    }
  }
}
</script>
<style lang="scss">
.mydeliver-card-wrapper {
  .item-wrapper {
    width: 670px;
    padding: 30px 20px;
    background: #fff;
    border-radius: 10px;
    margin: 20px auto 0;
    font-family: Microsoft YaHei;
    .mint-checkbox-core {
      width: 30px;
      height: 30px;
      &::after {
        width: 10px;
        height: 20px;
        left: 10px;
        top: 2px;
      }
    }
  }
  .card {
    width: 580px;
    font-size: 28px;
    .billType-color {
      display: inline-flex;
      height: 48px;
      padding: 0 20px;
      margin-right: 16px;
    }
    .bill {
      color:#666;
    }
    .time{
      color: #ccc
    }
  }
  .depart-content {
    font-size: 32px;
    color: #333;
    margin-top: 20px;
  }
  .primary {
    color:#4A90E2;
    background-color: #ECF3FC;
  }
  .success {
    color:#7DAC4F;
    background-color: #F2FAE8;
  }
  .warning {
    color:#FF9C00;
    background-color: #FFF5E5;
  }
}
</style>
