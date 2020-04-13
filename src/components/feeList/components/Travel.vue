<template>
  <div class="transportation-wrapper">
    <router-link class="transportation-card"
      v-for="(item, index) in feeList"
      :key="item.id"
      :to="{name: 'editCharge', query: {
        expenseType: query.expenseType,
        index: index,
        item: JSON.stringify(item),
        type: 'change' }}">
      <!--从列表跳转到详情，可以进行修改，或者查看，修改的情况下需要同时传入index和对应的详情item-->
      <div class="flex">
        <span v-if="item.info" class="start-city">{{item.info.DEPART_PLACE}}</span>
        <div class="circle"></div>
          <div class="direction">
            <span class="dashed-line"></span>
            <i class="iconfont iconfeiji"></i>
          </div>
        <div class="circle"></div>
        <span v-if="item.info" class="end-city">{{item.info.ARRIVAL_PLACE}}</span>
      </div>
      <div class="flex status-times" v-if="item.info && item.info.END_DATE">
        <span class="start-date">{{item.info.START_DATE}}</span>
        <div class="status">停留{{item.days}}天</div>
        <span class="end-date">{{item.info.END_DATE}}</span>
      </div>
      <div class="line"></div>
      <div class="card" v-if="item.peopleNumber">
        <span class="label">人数</span>
        <span class="content">{{item.peopleNumber}}</span>
      </div>
      <div class="card" v-if="item.people">
        <span class="label">出差人</span>
        <span class="content">{{item.people}}</span>
      </div>
      <div class="card" v-if="item.remark">
        <span class="label">备注</span>
        <span class="content">{{item.remark}}</span>
      </div>
      <div class="total">¥{{item.money}}</div>
    </router-link>
    <router-link :to="{ name: 'editCharge', query: { expenseType: query.expenseType } }" class="add-bill-info">
      <i class="iconfont icon-fangkuai"></i>新增费用明细
    </router-link>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { feeMatchItem } from '@/utils/mixin.js'

export default {
  name: 'TransportationFee',
  props: ['pageData'],
  mixins: [feeMatchItem],
  data () {
    return {
      path: 'reimbursementDetail',
      title: '城市间交通费',
      query: {},
      feeList: [],
      businessMan: []
    }
  },
  computed: {
    ...mapGetters(['reimburseTmpInfo', 'areaData'])
  }
}
</script>
<style lang="scss">
.transportation-wrapper{
  height: 100%;
  overflow-y: scroll;
  font-family: PingFangSC;
  margin-top: 132px;
  .circle {
    width:16px;
    height:16px;
    border:1px solid #4A90E2;
    border-radius: 100%;
  }
  .dashed-line{
    position: absolute;
    left: -1px;
    top: 25px;
    width: 150px;
    border: 1px dashed #4A90E2;
  }
  .direction{
    position: relative;
    width: 150px;
    height: 55px;
  }
  .iconfont{
    font-size:50px;
    color:#4A90E2;
    transform:rotate(90deg);
    position: absolute;
    left:55px;
    top:0;
  }
  .line{
    width:710px;
    height:1px;
    background: #EEE;
    margin:27px auto 0px;
  }
  .transportation-card {
    display: block;
    width: 710px;
    background: #fff;
    border-radius: 10px;
    margin: 20px auto 0;
    padding: 24px 0;
  }
  .start-city, .end-city{
    width: 240px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 36px;
    font-weight: 600;
    color: #333;
  }
  .start-city {
    margin-left: 24px;
  }
  .end-city{
    margin-right: 24px;
  }
  .card{
    text-align: left;
    padding: 0 60px;
    line-height: 45px;
    margin: 24px 0;
    font-size: 32px;
    .label {
      display: inline-block;
      color: #666;
      width: 120px;
    }
    .content {
      color: #333;
    }
  }
  .total{
    text-align: right;
    font-size: 32px;
    color:#F5A623;
    padding-right: 24px;
  }
  .status-times{
    margin:30px 35px 0;
    color:#666;
    font-size:24px;
    line-height:31px;
    .start-date{
      line-height:31px;
    }
    .start-time{
      margin-left: 20px;
    }
    .status{
      line-height:36px;
      padding:0 11px;
      background: #ECF3FC;
      color:#4A90E2;
      font-size:20px;
      margin:auto;
    }
    .end-time{
      margin-left:20px;
    }
  }
}
@supports (bottom: env(safe-area-inset-bottom)){
  .transportation-wrapper {
    margin-top: calc(88px + constant(safe-area-inset-top));
    margin-top: calc(88px + env(safe-area-inset-top));
  }
}
</style>
