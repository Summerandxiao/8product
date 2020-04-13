<template>
  <mt-popup class="change-role-wrapper"
  v-model="popupVisible"
  popup-transition="popup-fade"
  data-disable-auto-close="false"
  :closeOnClickModal="false">
    <div  class="change-role">全局设置</div>
    <div class="item">
      <label class="label">日期: </label>
      <date-range :count="1" :default="date" datestr="svTransDate" @changeTime="changeTime"/>
    </div>
    <div class="item">
      <label class="label">角色: </label>
      <select class="role" v-model="info['roleId']" @change="changeRole()">
        <option v-for="(item, index) in dataListRole" :key="index" :value="item.guid">{{item.name}}</option>
      </select>
    </div>
    <div class="item">
      <label class="label">岗位: </label>
      <select class="role" v-model="info['agency_code']">
        <option v-for="(item, index) in dataListAgency" :key="index" :value="item.CHR_CODE">{{item.CHR_NAME}}</option>
      </select>
    </div>
    <div class="btn-role flex">
      <!-- <mt-button class="role-save" type="primary" @click="saveInfo(1)">设为默认并应用</mt-button> -->
      <div style="width: 100%">
        <mt-button class="role-save" type="primary" @click="saveInfo(2)">应用</mt-button>
        <mt-button class="role-close" type="primary" @click="toClose()">取消</mt-button>
      </div>
    </div>
  </mt-popup>
</template>
<script>
import * as Auth from '@/utils/auth'
import dateRange from '@/components/dateRange'
import dayjs from 'dayjs'
export default {
  name: 'ChangeRole',
  props: ['isShow'],
  components: {
    dateRange
  },
  data () {
    return {
      date: '',
      popupVisible: false,
      saveParams: {},
      dataListRole: [],
      dataListAgency: [],
      info: {},
      objRole: {},
      objAgency: {}
    }
  },
  watch: {
    isShow () {
      if (this.isShow) {
        this.info = JSON.parse(Auth.getStorage('userInfo'))
        this.popupVisible = this.isShow
        this.date = dayjs().format('YYYY-MM-DD')
        Object.assign(this.saveParams, {
          svTransDate: this.date,
          svRoleCode: this.info.roleCode,
          svRoleId: this.info.roleId,
          svRoleName: this.info.role_name
        })

        this.$store.dispatch('getRoleList').then(res => {
          this.dataListRole = res
        })
        this.getAgencyList({ roleId: this.info.roleId })
      } else {
        this.saveParams = {}
      }
    }
  },
  methods: {
    changeTime (obj) {
      Object.assign(this.saveParams, obj)
    },
    toClose () {
      this.popupVisible = false
      this.$emit('hideScan')
    },
    // 修改角色，重新获取岗位
    changeRole (type) {
      const arr = this.dataListRole.filter(item => {
        return item.guid === this.info.roleId
      })
      Object.assign(this.saveParams, {
        svRoleId: this.info.roleId,
        svRoleCode: arr[0].code,
        svRoleName: arr[0].name
      })
      Object.assign(this.objAgency, { roleId: this.info.roleId })
      this.getAgencyList(this.objAgency)
    },
    getAgencyList (obj) {
      this.$store.dispatch('getAgencyList', obj).then(res => {
        this.dataListAgency = res
        this.info.svAgencyCode = this.dataListAgency[0].CHR_CODE
      })
    },
    saveInfo (type) {
      const arr = this.dataListAgency.filter(item => item.CHR_CODE === this.info.agency_code)
      Object.assign(this.saveParams, {
        svAgencyCode: this.info.agency_code,
        svAgencyName: arr[0].CHR_NAME
      })
      if (type === 1) {
        this.$store.dispatch('saveDefaultSetting', this.saveParams).then(() => {
          this.popupVisible = false
          this.$emit('hideScan')
        })
      } else {
        this.$store.dispatch('saveBaseDataToSession', this.saveParams).then(() => {
          this.popupVisible = false
          this.$emit('hideScan')
        })
      }
    }
  }
}
</script>
<style lang="scss">
.change-role-wrapper {
  width: 550px;
  border-radius: 5px;
  padding: 32px;
  .item {
    width: 450px;
    margin: 30px auto;
    .label {
      margin-right: 20px;
    }
    .svTransDate {
      width: 300px;
      height: 50px;
      font-size: 32px;
      border: 1px solid #666;
      border-radius: 10px;
      padding: 0 20px
    }
    .role {
      width: 340px;
      padding: 0 16px;
      overflow: hidden;
    }
  }
  .change-role {
    height: 60px;
    font-size: 32px;
    border-bottom: 0.5px solid #ccc;
  }
  .btn-role {
    margin-top: 40px;
    text-align: right;
  }
  .role-save {
    height: 50px;
    font-size: 28px;
    margin-right: 20px;
  }
  .role-close {
    width: 130px;
    height: 50px;
    font-size: 28px;
  }
  .role {
    height: 50px;
    font-size:32px;
    border-radius: 10px;
    background: #fff;
  }
}
</style>
