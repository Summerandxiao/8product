<template>
  <div class="edit-charge-wrapper">
    <nav-title :title="title" :path="path"></nav-title>
    <div class="realize flex">
      <div class="realize-item">扫码识别</div>
      <div class="realize-item">图像识别</div>
    </div>
    <div class="charge-detail-wrapper">
      <div v-for="(item, index) in headList"
        :key="item.id"
        class="charge-item flex line-1px">
        <label class="item-label">
          {{item.infoName}}
          <span v-if="item.isNotEmpty === 'Y'" style="color: red">*</span>
        </label>
        <div class="item-content">
          <tree-select v-if="(showType === '01' || showType === '03') && item.dataType === '22'"
            :placeholder="'请选择'+item.infoName"
            :multiple="true"
            :default-expand-level="1"
            :options="selectList['opt_'+item.arField]"
            value-consists-of="LEAF_PRIORITY"
            :normalizer="normalizer"
            v-model="bill[item.arField]"
            @input="watchPeople(bill[item.arField], 'peopleNumber')"/>
          <!--dataType=12下拉框-->
          <select v-else-if="(showType === '01' || (showType === '03' && item.arField !== 'expenseType')) && item.dataType === '12'" v-model="bill[item.arField]" class="select flex" @change="changeAffect(item.arField)">
            <option v-for="item in selectList['opt_'+item.arField]" :key="item.id" :value="item.sourceCode">{{item.sourceName}}</option>
          </select>
          <!-- dataType=19地点 -->
          <div v-else-if="(showType === '01' || showType === '03') && item.dataType === '19'" :id="'trigger'+item.arField" class="trigger">
            <span>请选择地点</span>
          </div>
          <!-- 天数 -->
          <input v-else-if="(showType === '01' || showType === '03') && item.dataType === '05'"
            class="input" type="number"
            :placeholder="'请输入'+item.infoName"
            v-model="bill[item.arField]" @change="checkDays(bill[item.arField])">
          <date-range
            v-else-if="(showType === '01' || showType === '03') && (item.infoId === 'START_DATE' || item.infoId === 'DEPART_DATE')"
            :count="1"
            :default="startDate"
            :datestr="item.arField"
            @changeTime="changeTime"/>
          <date-range
            v-else-if="(showType === '01' || showType === '03') && (item.infoId === 'END_DATE' || item.infoId === 'ARRIVAL_DATE')"
            :count="1"
            :default="endDate"
            :datestr="item.arField"
            @changeTime="changeTime"/>
          <div id="trigger" v-else-if="showType === '02' && index === 0"><span style="color:#666">请选择费用名称</span></div>
          <!-- 平铺类型报销单，费用名称展示 -->
          <input v-else-if="showType === '03' && item.dataType === '12' && item.arField === 'expenseType'" class="input" type="text" :placeholder="'请输入'+item.infoName" v-model="bill['expenseTypeName']" readonly>
          <input v-else class="input" type="text" :placeholder="'请输入'+item.infoName" v-model="bill[item.arField]">
        </div>
      </div>
      <!--多级联动-->
    </div>
    <mt-button class="save" type="primary" @click="save">保存</mt-button>
  </div>
</template>
<script>
import navTitle from '@/components/navTitle'
import MobileSelect from 'mobile-select'
import { mapGetters, mapMutations } from 'vuex'
import TreeSelect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import dateRange from '@/components/dateRange'
import dayjs from 'dayjs'
import * as Auth from '@/utils/auth'

export default {
  name: 'EditCharge',
  components: {
    navTitle,
    TreeSelect,
    dateRange
  },
  data () {
    return {
      title: '新增费用明细',
      path: 'reimburseDetail',
      type: '', // type = change（修改）
      showType: '',
      startDate: '',
      endDate: '',
      daysName: '',
      dateObj: {}, // 遍历键值的时候记录日期对应的arField
      area: [],
      headList: [],
      affectItems: [],
      queryObj: {}, // 获取地址栏数据
      bill: {},
      selectList: {},
      relateWays: {} // 天数和金额的数据关联方式
    }
  },
  computed: {
    ...mapGetters(['reimburseTmpInfo', 'reimburseBillInfo', 'areaData', 'standTypeOf03'])
  },
  watch: {
    headList () {
      this.fillData()
    },
    bill: {
      handler (newVal, oldVal) {
        if (this.showType === '03' && newVal.standard && newVal.peopleNumber && newVal.days) {
          newVal.money = newVal.standard * newVal.peopleNumber * newVal.days
        }
      },
      deep: true
    }
  },
  created () {
    this.type = this.$route.query.type
    // 修改明细
    if (this.$route.query.type === 'change') {
      const obj = JSON.parse(this.$route.query.item)
      this.bill = obj
    }
    this.area = this.changeData(this.areaData)
    this.queryObj = {
      expenseType: this.$route.query.expenseType,
      templetCode: Auth.getStorage('templetCode')
    }
    // 获取数据条目之间的关联关系
    this.$store.dispatch('getFunc', this.queryObj).then((data) => {
      this.relateWays = data
    })
    // 渲染明细的数据项
    switch (this.reimburseTmpInfo.showType) {
      case '01': case '03': // 分组模式/平铺模式
        this.getItemList(this.reimburseTmpInfo.expTypeInfo[this.queryObj.expenseType])
        setTimeout(() => {
          this.headList = this.reimburseTmpInfo.expTypeInfo[this.queryObj.expenseType]
        }, 340)
        break
      case '02': // 下拉模式
        this.headList = this.reimburseTmpInfo.expTypeInfo[Object.keys(this.reimburseTmpInfo.expTypeInfo)]
        break
    }
    this.showType = this.reimburseTmpInfo.showType
  },
  methods: {
    ...mapMutations(['SETBILLINFO', 'CHANGEBILLINFO']),
    fillData () {
      const tmpInfo = this.reimburseTmpInfo
      switch (this.showType) {
        case '01': // 分组模式 ：根据id渲染地点数据
          this.headList.forEach(item => {
            if (item.dataType === '19') {
              // eslint-disable-next-line
              this.selectList['opt_' + item.arField] = new MobileSelect({
                trigger: '#trigger' + item.arField,
                wheels: [{ data: this.area }],
                keyMap: { id: 'id', value: 'title', childs: 'childs' },
                callback: (indexArr, data) => {
                  this.initObj(item.arField, data)
                  if (item.isStandardAffect === 'Y') {
                    this.changeAffect(item.arField)
                  }
                }
              })
              if (this.bill[item.arField] && item.infoId === 'DEPART_PLACE') {
                document.getElementById(`trigger${item.arField}`).innerHTML = this.bill.info['DEPART_PLACE']
              } else if (this.bill[item.arField] && item.infoId === 'ARRIVAL_PLACE') {
                document.getElementById(`trigger${item.arField}`).innerHTML = this.bill.info['ARRIVAL_PLACE']
              }
            }
          })
          delete this.bill.info
          delete this.bill.people
          break
        case '02': // 下拉模式
          const test = this.getTree(tmpInfo.expType)
          // eslint-disable-next-line
          const mobileSelect = new MobileSelect({
            trigger: '#trigger',
            title: '选择费用名称',
            wheels: [{ data: test }],
            keyMap: { id: 'id', value: 'expenseTypeName', childs: 'childs' },
            callback: (indexArr, data) => {
              document.getElementById('trigger').innerHTML = test[indexArr[0]].childs[indexArr[1]].childs[indexArr[2]].expenseTypeName
              Object.assign(this.bill, data.pop())
              this.bill.expenseType = test[indexArr[0]].childs[indexArr[1]].childs[indexArr[2]].expenseType
            }
          })
          break
        case '03':
          // 平铺 培训费、会议费
          const item = JSON.parse(this.$route.query.item)
          this.bill.expenseTypeName = item.expenseTypeName
          this.bill.expenseType = item.expenseType
          Object.assign(this.bill, this.standTypeOf03)
          this.bill.standard = this.standTypeOf03[item.expenseType] || 0
          if (this.bill.standard && this.bill.peopleNumber && this.bill.days) {
            this.bill.money = this.bill.standard * this.bill.peopleNumber * this.bill.days || 0
          }
          delete this.bill[item.expenseType]
          break
        case '04':
        //   // 行程归集 差旅费
        //   break
      }
    },
    changeData (data) { // 整合符合mobileselect的地区数据并展示
      data.forEach(item => {
        let obj = item
        for (let key in obj) {
          if (key === 'children') {
            obj['childs'] = obj[key]
            delete obj['children']
            if (obj['childs'] && obj['childs'].length) {
              this.changeData(obj['childs'])
            } else {
              delete obj['childs']
            }
          } else if (key === 'value') {
            obj['id'] = obj[key]
            delete obj['value']
          } else if (key === 'label') {
            obj['title'] = obj[key]
            delete obj['label']
          }
        }
      })
      return data
    },
    // 递归修改修改数据格式：将sonList改为childs
    getTree (data) {
      data.forEach(item => {
        let obj = item
        for (let key in obj) {
          if (key === 'sonList') {
            obj['childs'] = obj[key]
            delete obj['sonList']
            if (obj['childs'] && obj['childs'].length) {
              this.getTree(obj['childs'])
            } else {
              delete obj['childs']
            }
          }
        }
      })
      return data
    },
    // 根据费用明细条目查询出差人列表、交通工具、席别、职级
    getItemList (data) {
      if (!data) return
      data.forEach(item => {
        // 判断明细条目是否属于影响因素
        if (item.isStandardAffect === 'Y') {
          this.affectItems.push(item.arField)
        }
        if (item.dataType === '08') { // 日期格式
          this.dateObj[item.infoId] = item.arField
          // 已有日期修改默认值
          if (item.infoId === 'START_DATE' && this.bill[item.arField]) this.startDate = this.bill[item.arField]
          else if (item.infoId === 'END_DATE' && this.bill[item.arField]) this.endDate = this.bill[item.arField]
        } else if (item.dataType === '05') {
          this.daysName = item.arField
        } else if (item.dataType === '12' || item.dataType === '22') { // 存在下拉选项
          this.$store.dispatch('getCostItemList', item.infoId).then((data) => {
            switch (item.dataType) {
              case '22': // 19地点，22多选出差人
                this.selectList['opt_' + item.arField] = []
                this.selectList['opt_' + item.arField] = data
                break
              case '12': // 下拉框
                // data.unshift({ sourceCode: '', sourceName: '请选择' })
                this.selectList['opt_' + item.arField] = []
                this.selectList['opt_' + item.arField] = data
                break
            }
          })
        }
      })
    },
    initObj (str, data) {
      this.bill[str] = []
      data.forEach(item => {
        this.bill[str].push(item.id)
      })
    },
    changeTime (obj) {
      Object.assign(this.bill, obj)
      if (Object.keys(this.dateObj).length !== 2) return
      if (!(this.bill[this.dateObj['START_DATE']] && this.bill[this.dateObj['END_DATE']])) {
        this.startDate = obj[Object.keys(obj)[0]] // 日期只选了一个时，另一个直接带入
        this.endDate = obj[Object.keys(obj)[0]] // 日期只选了一个时，另一个直接带入
        if (Object.keys(obj)[0] === this.dateObj['START_DATE']) {
          this.bill[this.dateObj['END_DATE']] = this.startDate
        } else {
          this.bill[this.dateObj['START_DATE']] = this.startDate
        }
      }
      // 判断天数是否自动带入
      if (this.relateWays.day && this.relateWays.day.isAuto === 'Y') {
        const dayNo = this.relateWays.day.dayNo
        const diffDays = dayjs(this.bill[this.dateObj['END_DATE']]).diff(dayjs(this.bill[this.dateObj['START_DATE']]), 'day') + Number(dayNo) // 日期差
        this.$set(this.bill, this.daysName, diffDays)
      }
    },
    normalizer (node) {
      // 去掉sonList=[]的sonList属性映射进treeselect数组
      if (node.sonList && !node.sonList.length) {
        delete node.sonList
      }
      return {
        id: node.id,
        label: node.sourceName,
        children: node.sonList
      }
    },
    watchPeople (item, type) {
      this.bill[type] = item.length
    },
    checkDays (data) {
      // 天数的最小单位是0.5
      if (data.includes('.')) this.$set(this.bill, this.daysName, Number(data.split('.')[0] + '.5'))
    },
    // 修改影响因素
    changeAffect (key) {
      let flag = true
      let params = {}
      // 遍历影响因素，如果所有影响因素都被选择，则触发调用查询标准接口
      this.affectItems.forEach(item => {
        params[item] = this.bill[item]
        if (!this.bill[item]) flag = false
      })
      if (flag) {
        Object.assign(params, this.queryObj)
        this.$store.dispatch('queryTravelStandard', params).then((data) => {
          // 如果有data的话直接渲染standard，没有不渲染
          if (data && this.showType === '03') {
            delete this.bill.standard
            this.$set(this.bill, 'standard', data)
            return
          }
          if (!this.bill.standard) return // 没有标准不渲染金额
          // 如果标准=1，必须有天数
          const standard = this.relateWays.money.standard
          if (standard === '1' && !this.bill['days']) return
          // 如果标准等于2，必须有人数
          if (standard === '2' && !this.bill['peopleNumber']) return
          // 如果标准等于4，必须有汇率
          if (standard === '4' && !this.bill['peopleNumber']) return
          let money = 0
          switch (standard) {
            case '1':
              money = Number(this.bill['days'] * this.bill.standard)
              break
            case '2':
              money = Number(this.bill['peopleNumber'] * this.bill.standard)
              break
            case '3':
              money = Number(this.bill['days'] * this.bill['peopleNumber'] * this.bill.standard)
              break
            case '4':
              money = Number(this.bill['days'] * this.bill['peopleNumber'] * this.bill['exchangeRate'] * this.bill.standard)
              break
          }
          this.bill.money = money
        })
      }
    },
    save () {
      let flag = true
      this.headList.forEach(item => {
        if (item.isNotEmpty === 'Y' && !this.bill[item.arField]) {
          this.$message('提示', `请输入${item.infoName}`)
          flag = false
        }
      })
      if (flag) {
        this.bill.expenseType = this.$route.query.expenseType
        if (this.type === 'change') {
          this.CHANGEBILLINFO({
            data: this.bill,
            type: this.queryObj.expenseType,
            info: 'expenseList',
            index: this.$route.query.index })
        } else {
          this.SETBILLINFO({ data: this.bill, type: 'expenseList', info: 'expenseList' })
        }
        this.$router.push({ path: 'reimburseDetail' })
      }
    }
  }
}
</script>
<style lang="scss">
  .edit-charge-wrapper {
    padding-top: 132px;
    font-size: 32px;
    .realize {
      width: 710px;
      margin: 30px auto;
      &-item {
        width: 345px;
        height: 160px;
        border-radius: 10px;
        background: #fff;
        text-align: center;
        box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1);
      }
    }
    .charge-detail-wrapper {
      width: 710px;
      height: calc(100vh - 550px);
      overflow-y: scroll;
      padding: 20px 20px 0;
      background: #fff;
      .line-1px::before {
        border: none;
        border-bottom: 1px solid #eee;
      }
      .charge-item {
        width: 686px;
        padding: 18px 0;
        background: #fff;
        margin: 0 auto;
        .item-label {
          width: 210px;
          margin-right: 20px;
          font-weight: 400;
          color: #666;
          font-size: 32px;
        }
        .item-content {
          position: relative;
          .input, .trigger, .time-range-wrapper input, .select {
            display: inline-block;
            width: 456px;
            height: 48px;
            text-align: right;
            background: #fff;
            outline: none;
            border: none;
            color: #333;
            font-size: 32px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            z-index: 100;
          }
          .select {
            direction: rtl;
          }
        }
      }
    }
    .save {
      position: fixed;
      left: 32px;
      bottom: 88px;
      width: 686px;
      height: 90px;
      border-radius: 45px;
      font-size: 36px;
    }
  }
  .mobileSelect {
    .content .panel .selectLine {
      height: 50px;
      top: 95px;
    }
    .content .btnBar {
      .cancel, .ensure, title {
        font-size: 30px;
        width: 80px;
      }
    }
    .content .panel .wheel .selectContainer li {
      font-size: 28px;
      height: 50px;
      line-height: 50px;
    }
  }
  @supports (bottom: env(safe-area-inset-bottom)){
    .edit-charge-wrapper {
      padding-top: calc(88px + constant(safe-area-inset-top));
      padding-top: calc(88px + env(safe-area-inset-top));
    }
  }
</style>
