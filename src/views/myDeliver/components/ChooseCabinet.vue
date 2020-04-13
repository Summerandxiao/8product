<template>
  <div class="choose-cabinet-wrapper">
    <nav-title :title="title" :path="path"></nav-title>
    <div class="flex current-cabinet">
      <span>当前投递柜</span>
      <div>
        <select class="selected-cabinet" v-model="selected" @change="change">
          <option v-for="item in list" :key="item.index" :value="item.id">{{item.cabinetName}}</option>
        </select>
      </div>
    </div>
    <div v-if="list.length">
      <div class="cabinet-information">投递柜信息</div>
      <div class="cabinet-card">
        <div class="flex cabinet">
          <span>投递柜编号</span>
          <span>{{list[index].cabinetNo || ''}}</span>
        </div>
        <div class="line-1px"></div>
        <div class="flex cabinet">
          <span>投递柜地址</span>
          <span>{{list[index].cabinetAddress || ''}}</span>
        </div>
      </div>
    </div>
    <div v-if="type===3||type===4">
      <card :data="list1" @choosedId="choosedId"></card>
    </div>
    <img class="cabinet-picture" src="@/assets/images/cabinet.png">
    <!--报销人员投递单据-->
    <mt-button v-if="type===1" class="btn-deliver" @click="scanToStorage()">扫码投递</mt-button>
    <!--财务人员取单据-->
    <mt-button v-if="type===2" class="btn-deliver" @click="scanToGet()">开门取件</mt-button>
    <!--财务人员退单-->
    <mt-button v-if="type===3" class="btn-deliver" @click="returnBill()">开门存件</mt-button>
    <!--报销人员取单-->
    <mt-button v-if="type===4" class="btn-deliver" @click="getReturnBill()">开门取件</mt-button>
  </div>
</template>
<script>
import navTitle from '@/components/navTitle'
import card from './Card'
export default {
  components: {
    navTitle,
    card
  },
  data () {
    return {
      index: 0,
      type: 0,
      billId: '',
      selected: '',
      title: '选择投递柜',
      path: 'myDeliver',
      list: [],
      list1: [
        {
          billMoney: 66,
          orgName: '宁波',
          billId: '11',
          inputDate: '2019-09-19',
          billTypeName: '差旅费报销单',
          parentBillType: 'LOAN'
        },
        {
          billMoney: 66,
          orgName: '宁波',
          billId: '22',
          inputDate: '2019-09-19',
          billTypeName: '差旅费报销单',
          parentBillType: 'EXPENSE'
        }
      ]
    }
  },
  created () {
    this.type = Number(this.$route.query.type)
    this.getCabinetList()
  },
  methods: {
    change () {
      this.index = this.list.findIndex((val) => {
        return val.id === this.selected
      })
      if (this.type === 3) {
        this.$store.dispatch('cabinetbyId', this.selected).then((res) => {
          if (res === 0) {
            this.$message('提示', '此柜已满，请选择其他退单柜！')
          }
        })
      }
    },
    choosedId (id) {
      this.billId = id
    },
    scanToStorage () {
      // eslint-disable-next-line
      mtl.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果
        scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
        success: (res) => {
          const result = res.resultStr // 当needResult为1时,扫码返回的结果
          alert(result)
          // 扫码开柜存入单据
          this.$store.dispatch('openStorage', this.selected, result).then((id) => {
            this.$router.push({ path: 'operation', query: { type: this.type, id, billId: result, address: this.list[this.index].cabinetAddress } })
          })
        }
      })
    },
    scanToGet () {
      // 获取密码传入下一个页面
      this.$router.push({ path: 'inputCode', query: { type: this.type, data: this.list[this.index] } })
    },
    returnBill () {
      this.$store.dispatch('backStorage', { id: this.selected, billId: this.billId }).then((id) => {
        this.$router.push({ path: 'operation', query: { type: this.type, billId: this.billId, address: this.list[this.index].cabinetAddress } })
      })
    },
    getReturnBill () {
      this.$store.dispatch('getCodeBybillId', { cabinetId: this.selected, billId: this.billId }).then((pickupCode) => {
        this.$router.push({ path: 'inputCode', query: { type: this.type, pickupCode, data: this.list[this.index] } })
      })
    },
    getCabinetList () {
      let cabinetType = ''
      if (this.type === 1 || this.type === 2) {
        cabinetType = 1
      } else {
        cabinetType = 2
      }
      const obj = {
        cabinetType: cabinetType,
        pageNo: 1,
        pageSize: 10
      }
      this.$store.dispatch('getCabinetList', obj).then((res) => {
        this.list = res.results
        this.selected = this.list[0].id
      })
    }
  }
}
</script>
<style lang="scss">
.choose-cabinet-wrapper {
  background: #F1F3F6;
  padding-top: 154px;
  padding-bottom: 50px;
  box-sizing: border-box;
  color: #333;
  .current-cabinet {
    width: 100%;
    line-height: 100px;
    background: #fff;
    padding:0 32px;
    box-sizing: border-box;
    .selected-cabinet {
      border: none;
      background: none;
      height: 50px;
      font-size: 32px;
      color: #333;
    }
  }
  .cabinet-information {
    margin: 20px 32px;
    color: #999;
    font-size: 30px;
  }
  .cabinet-card {
    width: 100%;
    height: 200px;
    background: #fff;
    .cabinet {
      margin: 0 32px;
      padding-top: 28px;
    }
  }
  .line-1px {
    width: 686px;
    margin: 26px auto 0;
  }
  .cabinet-picture {
    display: block;
    width: 400px;
    height: 400px;
    margin: 40px auto;
  }
  .btn-deliver {
    width:686px;
    height:90px;
    background:linear-gradient(90deg,rgba(88,163,252,1) 0%,rgba(83,160,253,1) 48%,rgba(114,176,249,1) 100%);
    position: fixed;
    bottom: 88px;
    border-radius:45px;
    color: #fff;
    font-size: 36px;
    margin:0 32px;
  }
}
@supports (bottom: env(safe-area-inset-bottom)){
  .choose-cabinet-wrapper {
    padding-top: calc(110px + constant(safe-area-inset-top));
    padding-top: calc(110px + env(safe-area-inset-top));
  }
  .btn-deliver {
    bottom: calc(88px + constant(safe-area-inset-bottom));
    bottom: calc(88px + env(safe-area-inset-bottom));
  }
}
</style>
