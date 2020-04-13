<template>
<div>
  <nav-title :path="path" :title="title"></nav-title>
  <div class="transportation-wrapper">
    <div class="transportation-card" v-for="item in traffic" :key="item.id">
      <div class="flex">
        <span class="start-city">{{item.startcity}}</span>
        <div class="circle"></div>
          <div class="direction">
            <span class="dashed-line"></span>
            <i class="iconfont iconfeiji"></i>
          </div>
        <div class="circle"></div>
        <span class="end-city">{{item.endcity}}</span>
      </div>
      <div class="flex status-times">
        <span class="start-date">{{item.startdate}}</span>
        <span class="start-time">{{item.starttime}}</span>
        <div class="status">{{item.status}}</div>
        <span class="end-date">{{item.enddate}}</span>
        <span class="end-time">{{item.endtime}}</span>
      </div>
      <div class="line"></div>
      <div class="card flex" v-for="ele in item.list" :key="ele.event">
        <div class="label">{{ele.event}}</div>
        <div class="content">{{ele.number}}</div>
      </div>
      <div class="total">¥{{item.total | numFormat}}</div>
    </div>
  </div>
  </div>
</template>
<script>
import navTitle from '@/components/navTitle'
import { mapGetters } from 'vuex'
export default {
  name: 'tranLateTravel',
  data () {
    return {
      path: 'billEchoMain',
      title: '城市间交通费',
      traffic: [],
      list: []
    }
  },
  computed: {
    ...mapGetters(['translateData', 'areData'])
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      let expenseList = this.translateData.expenseList
      let travelExpTypeInfo = this.areData.expTypeInfo['TRAVEL']
      if (expenseList) {
        expenseList.forEach(element => {
          if (element.expenseType === 'TRAVEL') {
            let param = {
              startcity: '',
              endcity: '',
              total: '',
              startdate: '',
              status: '',
              enddate: '',
              list: []
            }
            travelExpTypeInfo.forEach(item => {
              switch (item.infoId) {
                case 'DEPART_PLACE':
                  param.startcity = element[item.arField]
                  break
                case 'ARRIVAL_PLACE':
                  param.endcity = element[item.arField]
                  break
                case 'MONEY':
                  param.total = element[item.arField]
                  break
                case 'START_DATE':
                  param.startdate = element[item.arField]
                  break
                case 'END_DATE':
                  param.enddate = element[item.arField]
                  break
                case 'DAYS':
                  param.status = element[item.arField] + '天'
                  break
                case 'BUSINESS_MAN':
                  let param2 = {
                    event: '',
                    number: ''
                  }
                  param2.event = item.infoName
                  param2.number = element[item.arField]
                  param.list.push(param2)
                  break
                case 'PEOPLE_NUMBER':
                  let param3 = {
                    event: '',
                    number: ''
                  }
                  param3.event = item.infoName
                  param3.number = element[item.arField]
                  param.list.push(param3)
                  break
                case 'REMARK':
                  let param4 = {
                    event: '',
                    number: ''
                  }
                  param4.event = item.infoName
                  param4.number = element[item.arField]
                  param.list.push(param4)
                  break
                default:
                  break
              }
            })
            this.traffic.push(param)
          }
        })
      }
    }
  },
  components: {
    navTitle
  }
}
</script>
<style lang="scss">
.transportation-wrapper{
  height: 100%;
  overflow-y: scroll;
  font-family: PingFangSC;
  margin-top: 132px;
  .circle{
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
    height:55px;
    width:150px;
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
  .transportation-card{
    width:710px;
    height:460px;
    background: #fff;
    margin:20px auto 0;
    padding-top:40px;
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
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .content {
      width: 420px;
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
