<template>
  <div class="reimbursement-card-wrapper" @click="toDetail">
    <div class="flex">
      <div>
        <span :class="['bill-type', billType[data.parentBillType]]">{{data.billTypeName}}</span>
        <span class="billNo">{{ data.billNo }}</span>
      </div>
      <span class="date">{{ data.inputDate }}</span>
    </div>
    <div class="bill-status">{{ data.billStatusName }}</div>
    <div class="flex content">
      <span>{{ data.reason }}</span>
      <span>¥{{ data.billMoney | numFormat }}</span>
    </div>
    <div class="btn-group">
      <!--草稿状态的报销单不可以提交-->
      <mt-button v-if="type==1 && data.billStatus !== '0'" class="btn btn-primary" :light="true" :inline="true" @click.stop="submit">提交</mt-button>
      <mt-button v-if="type==2" class="btn btn-default" @click.stop="cancel">撤回</mt-button>
      <mt-button v-if="type==2" class="btn btn-primary" @click.stop="processTrack">流程</mt-button>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line
import workflow from '@/workflow/es'
// eslint-disable-next-line
import { startWorkflow } from '@/workflow/es'
import * as Auth from '@/utils/auth'
export default {
  props: ['type', 'data', 'signStr'],
  name: 'ReimbursementCard',
  data () {
    return {
      userInfo: {},
      optOfCancel: {},
      billType: {
        'LOAN': 'success',
        'EXPENSE': 'success',
        'REPAY': 'primary',
        'APPLY': 'warning'
      }
    }
  },
  created () {
    this.userInfo = JSON.parse(Auth.getStorage('userInfo'))
  },
  methods: {
    submit () {
      this.$store.dispatch('getVariables', this.data.id).then((res) => {
        let variables = res
        if (this.data.workFlow) {
          this.reSubmit(variables)
        } else {
          this.firstSubmit(variables)
        }
      })
    },
    firstSubmit (variables) {
      // 没有流程信息的入参（首次提交的情况）
      let formData = {
        // 单据类型code
        bizTypeCode: this.data.billType,
        // 区划codexw
        rgCode: this.userInfo.rg_code,
        variables: variables,
        // 单位code
        unitCode: this.userInfo.agency_code,
        businessKey: this.data.id,
        signType: 'ca',
        signRequired: true,
        userCode: this.userInfo.userCode,
        onComplete: (res) => {
          if (res.error !== 0) {
            this.$message('提示', res.message)
          } else {
            this.$message('提示', '提交成功')
            this.$root.Bus.$emit('ifReloadreimList')
          }
        }
      }
      startWorkflow(formData)
    },
    reSubmit (variables) {
      let approveOption = {}
      approveOption['variables'] = variables
      approveOption['onComplete'] = this.complete
      approveOption['businessKey'] = this.data.id
      approveOption['signType'] = 'ca'
      approveOption['signRequired'] = true
      approveOption['signImage'] = this.signStr
      approveOption['title'] = '提交'
      Object.assign(approveOption, this.data.workFlow)
      workflow.approve(approveOption)
    },
    complete (data) {
      let msg = '提交成功'
      if (data.error === 0) {
        // 提交成功之后，更改单据状态
        this.$store.dispatch('changeStatus', this.data.id).then((res) => {
          this.$store.dispatch('reSubmit', this.data.id).then(() => {
            this.$message('提示', msg)
            this.$root.Bus.$emit('ifReloadreimList')
          })
        })
      } else {
        this.$message('error', data.message)
      }
    },
    processTrack () {
      if (!this.data.workFlow) {
        this.$message('提示', '当前单据没有流程定义')
        return
      }
      this.$router.push({ path: 'processTracking', query: { id: this.data.id, workFlow: JSON.stringify(this.data.workFlow), path: 'reimbursement' } })
    },
    cancel () {
      let param = this.data.workFlow
      param['title'] = '收回'
      workflow.validator.canTaskCancel(param).then(res => {
        if (res) {
          let params = {
            taskId: param.taskId,
            nodeId: param.nodeId,
            procDefId: param.procDefId,
            procInstId: param.procInstId || '',
            onComplete: (ret) => {
              if (ret.error !== 0) {
                this.$message('提示', res.message)
              } else {
                this.$store.dispatch('changeStatus', this.data.id).then((res) => {
                  this.$store.dispatch('cancel', this.data.id).then(() => {
                    this.$message('收回', '收回成功')
                    this.$root.Bus.$emit('ifReloadreimList')
                  })
                })
              }
            }
          }
          workflow.cancel(params)
        } else {
          this.$message('收回', '此单据不可收回')
        }
      })
    },
    toDetail () {
      // this.$router.push({ path: 'billEcho', query: { data: JSON.stringify(this.data), path: 'reimbursement' } })
      this.$router.push({ path: 'reimburseDetail', query: { id: this.data.id, billType: this.data.billType } })
    }
  }
}
</script>

<style lang="scss">
.reimbursement-card-wrapper {
  width: 670px;
  background: #fff;
  padding: 20px 23px;
  border-radius: 20px;
  font-family: MicrosoftYaHei;
  color: #333;
  &:first-child {
    margin-top: 0;
  }
  .btn-group {
    text-align: right;
    .btn {
      width: 200px;
      height: 64px;
      background: #fff;
      border-radius: 64px;
      font-size: 32px;
    }
    .btn-primary {
      color: #3596FA;
      border: .5px solid #3596FA;
    }
    .btn-default {
      color: #999;
      border: .5px solid #999;
      margin-right: 20px;
    }
  }
  .flex {
    margin-bottom: 30px;
    align-items: center;
    .bill-type {
      display: inline-block;
      max-width: 180px;
      height: 37px;
      padding: 5px 20px;
      font-size: 28px;
      line-height: 37px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      vertical-align: middle;
    }
    .primary {
      color: #4A90E2;
      background: rgba(74,144,226, .1);
    }
    .warning {
      color: #FF9C00;
      background:rgba(255,156,0,.1);
    }
    .success {
      color: #7DAC4F;
      background:rgba(126,211,33,.1);
    }
    .date, .billNo {
      color: #666;
      margin-left: 20px;
      font-size: 28px;
    }
    .billNo {
      display: inline-block;
      width: 220px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      vertical-align: middle;
    }
  }
  .bill-status {
    font-size: 28px;
    margin-bottom: 30px;
    text-align: right;
  }
  .content {
    font-size: 32px;
  }
}
</style>
