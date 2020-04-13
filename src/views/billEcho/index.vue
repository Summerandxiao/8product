<template>
    <div class="echo-wrapper">
      <nav-title :title="title" :path="path"></nav-title>
      <div class="details-wrapper">
        <div v-for="item in areLeft" :key="item.areaCode">
          <echo-info
            v-if="item.areaType!=='FACARD' &&item.areaType!=='MAINTENANCE' &&item.areaType!=='CONTRACT' &&item.areaType!=='PURCHASE'&&item.isUsed === 'Y'"
            :areType="item.areaType"
            :key="item.areaType"
            :title="item.aliasName"
            :type="item.areaType"
            :thisAreData="areData.areaInfo[item.areaCode]"
            :translateData="translateData"></echo-info>
        </div>
        <div class="btn-opinion">
          <mt-button class="process-tracking" @click="toProcessTracking()">流程跟踪</mt-button>
          <mt-button v-if="path === 'backlog' && status === '1'" type="default" plain class="btn-reject" @click="reject">驳回</mt-button>
          <mt-button v-if="path === 'backlog' && status === '1'" type="primary" plain class="btn-agree" @click="approve">同意</mt-button>
        </div>
      </div>
      <div v-if="show">
        <workflow-trace-full direction="vertical" :options="options" />
      </div>
    </div>
</template>

<script>
import workflow from '@/workflow/es'
import navTitle from '@/components/navTitle'
import echoInfo from './components/echoInfo'
import * as Auth from '@/utils/auth'
import { mapGetters } from 'vuex'
export default {
  name: 'BillEcho',
  components: {
    navTitle,
    echoInfo
  },
  data () {
    return {
      show: false,
      status: '',
      data: '',
      path: '',
      title: '',
      typeString: '',
      rejectOption: {},
      approveOption: {},
      options: {},
      commonData: {},
      translateData: {},
      areLeft: [],
      posiList: [],
      relationAreData: []
    }
  },
  computed: {
    ...mapGetters(['areData', 'userInfo'])
  },
  created () {
    this.commonData = JSON.parse(Auth.getStorage('userInfo'))
    this.init()
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'backlog' || to.name === 'reimbursement') {
      Auth.removeItem('billType')
      Auth.removeItem('billId')
      Auth.removeItem('workflow')
      Auth.removeItem('path')
      Auth.removeItem('status')
      this.areLeft = []
      this.translateData = []
    }
    next()
  },
  methods: {
    init () {
      let that = this
      if (this.$route.query && this.$route.query.data) {
        this.data = JSON.parse(this.$route.query.data)
        Auth.setStorage('path', this.$route.query.path)
        Auth.setStorage('status', this.$route.query.status)
        Auth.setStorage('billType', this.data.billType)
        Auth.setStorage('billId', this.data.id)
        Auth.setStorage('workflow', JSON.stringify(this.data.workFlow))
      }
      const billType = this.data.billType || Auth.getStorage('billType')
      const billId = this.data.id || Auth.getStorage('billId')
      this.path = this.$route.query.path || Auth.getStorage('path')
      this.status = this.$route.query.status || Auth.getStorage('status')
      this.$store.dispatch('getPosiList', { billType: billType, positionCode: this.commonData.roleCode, coCode: this.commonData.coCode }).then((res) => {
        let dataParam = res
        that.posiList = res
        that.typeString = dataParam.templetCode
        that.initBillData(billId, dataParam, billType)
      })
    },
    initBillData (_id, arTempletObj, thisBillType) {
      if (arTempletObj !== undefined && thisBillType !== null) {
        let param = thisBillType + '/' + arTempletObj.templetCode + '/' + arTempletObj.coCode + '/' + arTempletObj.positionCode
        this.$store.dispatch('getTplInfoMation', param).then(res => {
          let paramOther = _id + '/' + arTempletObj.templetCode
          this.title = res.data.arBillType.billName || ''
          let index = -1
          this.areLeft = this.areData.areaLeft
          this.areLeft.forEach((element, eleindex) => {
            if (element.areaType === 'RELATION') {
              this.relationAreData = element.sonList
              index = eleindex
            }
          })
          if (index !== -1) this.areLeft.splice(index, 1)
          this.relationAreData.forEach((item, Rindex) => {
            this.areLeft.splice(index, 0, item)
            index += 1
          })
          this.$store.dispatch('translateBill', paramOther).then(resData => {
            this.translateData = resData.data
          })
        })
      }
    },
    toProcessTracking () {
      if (!this.data.workFlow && !Auth.getStorage('workflow')) {
        this.$message('提示', '当前单据没有流程定义')
        return
      }
      this.$router.push({ path: 'processTracking', query: { id: Auth.getStorage('billId'), workFlow: Auth.getStorage('workflow'), path: 'billEcho' } })
    },
    reject () {
      this.rejectOption['onComplete'] = this.rejectComplete
      this.rejectOption['title'] = '驳回'
      Object.assign(this.rejectOption, JSON.parse(Auth.getStorage('workflow')))
      workflow.back(this.rejectOption)
    },
    rejectComplete (data) {
      if (data.error === 0) {
        this.$store.dispatch('back', Auth.getStorage('billId')).then(() => {
          this.$message('成功', '报销单已驳回')
          this.$router.push({ path: this.path, query: { fresh: true } })
        })
      } else {
        this.$message('error', data.message)
      }
    },
    approve () {
      this.$store.dispatch('getVariables', Auth.getStorage('billId')).then((res) => {
        this.variables = res
        this.approveOption['variables'] = this.variables
        this.approveOption['onComplete'] = this.approveComplete
        this.approveOption['signType'] = 'ca'
        this.approveOption['signRequired'] = true
        Object.assign(this.approveOption, JSON.parse(Auth.getStorage('workflow')))
        this.approveOption['title'] = '审核'
        workflow.approve(this.approveOption)
      })
    },
    approveComplete (data) {
      if (data.error === 0) {
        // 工作流程走完之后将状态改为已审批
        this.$store.dispatch('doneRecord', Auth.getStorage('billId')).then(() => {
          new Promise((resolve, reject) => {
            this.$message('成功', '您已同意审批')
            resolve()
          }).then(() => {
            this.$router.push({ path: this.path, query: { fresh: true } })
          })
        })
      } else {
        this.$message('error', data.message)
      }
    }
  }
}
</script>
<style lang="scss">
.echo-wrapper {
  height: 100%;
  overflow-y: scroll;
  .details-wrapper {
    margin: 159px 0 90px;
  }
  .btn-opinion {
    position: fixed;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 154px;
    background: #fff;
    text-align: center;
    box-sizing: border-box;
    padding-top: 10px;
  }
  @supports (bottom: env(safe-area-inset-bottom)){
    .details-wrapper {
      margin-top: calc(115px + constant(safe-area-inset-top));
      margin-top: calc(115px + env(safe-area-inset-top));
    }
    .btn-opinion {
      height: calc(110px + constant(safe-area-inset-bottom));
      height: calc(110px + env(safe-area-inset-bottom));
    }
  }
  .btn-reject {
    width: 200px;
    height: 63px;
    font-size: 32px;
    border-radius: 32px;
    margin: 17px 24px 0 30px;
  }
  .btn-agree {
    width: 200px;
    height: 63px;
    font-size: 32px;
    border-radius: 32px;
  }
  .process-tracking{
    width: 200px;
    height: 63px;
    font-size: 32px;
    border-radius: 32px;
    margin-right: 32px;
  }
}
</style>
