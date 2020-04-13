<template>
<div class="warper">
    <div v-if='cardList.length>0'>
        <div @click="getItem(item)" :class="isCircularCard?'circularCard':'card'" class="cardWarper" v-for="(item,index) in cardList" :key="index">
            <div class="leftItem">
                <!-- 部门名称 -->
                <div v-show="labelObj.departmentName">
                    <span>{{labelObj.departmentName}}</span>
                    <span>{{item.departmentName}}</span>
                </div>
                <!-- 项目名称 -->
                <div v-show="labelObj.projectName">
                    <span>{{labelObj.projectName}}</span>
                    <span>{{item.projectName}}</span>
                </div>
                <!-- 预算金额 -->
                <div v-show="labelObj.realBgItemCur">
                    <span>{{labelObj.realBgItemCur}}</span>
                    <span>{{'￥'+item.realBgItemCur}}</span>
                </div>
                <!-- 可用金额 -->
                <div v-show="labelObj.bgItemBalanceCur">
                    <span>{{labelObj.bgItemBalanceCur}}</span>
                    <span>{{'￥'+item.bgItemBalanceCur}}</span>
                </div>
                <!-- 月份 -->
                <div v-show="labelObj.billMonth">
                    <span>{{labelObj.billMonth}}</span>
                    <span>{{item.billMonth}}</span>
                </div>
                <!-- 日期 -->
                <div v-show="labelObj.busBillDate">
                    <span>{{labelObj.busBillDate}}</span>
                    <span>{{item.busBillDate}}</span>
                </div>
                <!-- 摘要 -->
                <div v-show="labelObj.summary">
                    <span>{{labelObj.summary}}</span>
                    <span>{{item.summary}}</span>
                </div>
                <!-- 执行金额 -->
                <div v-show="labelObj.useCur">
                    <span>{{labelObj.useCur}}</span>
                    <span> {{'￥'+item.useCur}}</span>
                </div>
                <!-- 执行率 -->
                <div v-show="labelObj.usePercent">
                    <span>{{labelObj.usePercent}}</span>
                    <span>{{item.usePercent}}</span>
                </div>
                <!-- 凭证号 -->
                <div v-show="labelObj.billNo && sysId === 'AR'">
                    <span>{{labelObj.billNo}}</span>
                    <span>{{item.billNo}}</span>
                </div>
                <!-- 单据编号 -->
                <div v-show="labelObj.billNoCopy && sysId === 'GL'">
                    <span>{{labelObj.billNoCopy}}</span>
                    <span>{{item.billNo}}</span>
                </div>
                <!-- 科目 -->
                <div v-show="labelObj.accItem && sysId === 'GL'">
                    <span>{{labelObj.accItem}}</span>
                    <span>{{item.accItem}}</span>
                </div>
            </div>
            <div class="rightItem" v-if="Number(item.useCur) !== 0 && isShowAngle">
                <div class="iconWarper">
                    <i class="iconfont icon-icon-angle-right"></i>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <p class="record">暂无记录</p>
    </div>
</div>
</template>
<script>
export default {
  props: {
    cardList: {
      default: []
    },
    labelObj: {
      default: {}
    },
    isCircularCard: {
      type: Boolean,
      default: false
    },
    // 是否显示科目
    sysId: {
      type: String
    },
    // 最后一层不显示箭头
    isShowAngle: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    getItem (item) {
      if (Number(item.useCur) !== 0) {
        this.$emit('getItemInfo', item)
      } else {
        return false
        // alert('执行金额为0')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.circularCard {
    margin: 0 auto;
    width: 670px;
    border-radius: 20px;
    span:first-child {
        float: left;
    }
}

.card {
    span:first-child {
        float: left;
    }
}

.record {
    text-align: center;
    font-size: 32px;
    margin-top: 320px;
}

.cardWarper {
    display: flex;
    position: relative;
    margin-bottom: 20px;
    background: #fff;
    padding: 20px 23px 20px 23px;
    font-family: MicrosoftYaHei;
    text-align: right;
    font-size: 32px;
    color: #333;
    i {
        font-size: 32px;
    }
}

.leftItem {
    flex: 1;
    >div {
        clear: both;
        overflow: hidden;
        margin-bottom: 10px;
    }
}

.rightItem {
    position: relative;
    width: 40px;
    >div {
        clear: both;
        overflow: hidden;
        margin-bottom: 10px;
    }
}

.rightItem .iconWarper {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
}
</style>
