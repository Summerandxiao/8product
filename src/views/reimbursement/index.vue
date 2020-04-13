<template>
<div class="reimbursement-wrapper">
  <div v-if="screenVisible" class="mask" @click="changeScreenAble(1)"></div>
  <nav-title :title="title" :path="path" :ifScreen="ifScreen" @changeScreenAble="changeScreenAble"></nav-title>
  <navbar :navLabels="navLabels"></navbar>
  <search :placeholder="placeholder" @search="search"></search>
  <!--滚动列表-->
  <div :class="['page-infinite-list', selected == 2 ? 'selected2' : '']" >
    <mt-tab-container
      v-model="selected"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-immediate-check="true"
      infinite-scroll-distance="50">
      <!--未提交的报销单可以左滑删除-->
      <mt-tab-container-item id="1">
        <mt-cell-swipe
          v-for="item in reimburseList"
          :key="item.id"
          :right="[
            { content: '取消', style: cancelBtn },
            { content: '删除', style: deleteBtn, handler: () => deleteReimburseMent(item.id) }]">
            <card :type="selected" :data="item" :signStr="signImageStr"></card>
          </mt-cell-swipe>
      </mt-tab-container-item>
      <!--已提交的报销单无左滑事件-->
      <mt-tab-container-item v-if="selected==2" id="2">
        <mt-cell
          v-for="(item) in reimburseList"
          :key="item.id">
          <card :type="selected" :data="item" @showWorkflow="showWorkflow"></card>
        </mt-cell>
      </mt-tab-container-item>
    </mt-tab-container>
    <div v-if="reimburseNodata" class="noInfo">
      <img src="@/assets/images/nodata.png" alt="">
      <p>暂无可查询的单据</p>
    </div>
    <p v-show="loading" class="page-infinite-loading">
      <mt-spinner type="fading-circle"></mt-spinner>
      加载中...
    </p>
  </div>
  <!--未提交列表：新增报销单-->
  <div v-if="selected==1" class="add-reimbursement" @click="toDetail">
    <i class="iconfont icon-fangkuai"></i><span>新增报销单</span>
  </div>
  <screen :screenVisible='screenVisible' @getParams="getParams"></screen>
</div>
</template>

<script>
import dayjs from 'dayjs'
import navbar from '@/components/navbar'
import search from '@/components/search'
import navTitle from '@/components/navTitle'
import card from './components/Card.vue'
import screen from './components/Screen.vue'
import { reimbursementLabels } from '@/utils/global.js'
import { mapGetters, mapMutations } from 'vuex'
import { scrollCtl } from '@/utils/mixin.js'

export default {
  name: 'Reimbursement',
  mixins: [scrollCtl],
  components: {
    search,
    navbar,
    navTitle,
    card,
    screen
  },
  data () {
    return {
      selected: '1',
      title: '我的报销',
      path: 'main',
      signImageStr: '',
      getData: 'success',
      ifScreen: true,
      loading: false, // 滚动加载状态，初始化可以加载
      screenVisible: false,
      navLabels: reimbursementLabels,
      placeholder: '请输入单据编号、报销人、报销事由',
      params: {
        pageNo: 1,
        pageSize: 10,
        posi: '10',
        startDate: dayjs(dayjs().subtract(30, 'day')).valueOf(),
        endDate: dayjs(dayjs()).valueOf(),
        workFlowStatus: 'todo'
      },
      cancelBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        background: '#CBCBCB',
        borderRadius: '0',
        color: '#fff'
      },
      deleteBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        background: '#FF594F',
        color: '#fff',
        borderRadius: '0 10px 10px 0'
      }
    }
  },
  computed: {
    ...mapGetters(['reimburseOver', 'reimburseList', 'reimburseNodata'])
  },
  watch: {
    selected () {
      this.params.workFlowStatus = Number(this.selected) === 1 ? 'todo' : 'done'
      this.initParams()
      this.getList()
    }
  },
  activated () {
    // 列表也缓存，未提交状态重新请求
    if (Number(this.selected) === 1) {
      this.CLEARREIMBURSELIST()
      this.params.pageNo = 1
      this.getList()
    }
    this.scrollAuto()
    this.$root.Bus.$on('changeSelected', value => {
      this.selected = value
    })
    this.$root.Bus.$on('ifReloadreimList', () => {
      this.initParams()
      this.getList()
    })
  },
  created () {
    this.$store.dispatch('getWorkflowConfig')
    this.$store.dispatch('getRemburseTypeList', ['EXPENSE', 'REPAY', 'LOAN'])
    this.getList()
    this.getSignConfig()
  },
  mounted () {
    this.CLEARREIMBURSELIST()
    this.$root.Bus.$on('changeSelected', value => {
      this.selected = value
    })
    this.$root.Bus.$on('ifReloadreimList', () => {
      this.initParams()
      this.getList()
    })
  },
  beforeRouteLeave (to, from, next) {
    if (to.name !== 'billEcho') {
      from.meta.keepAlive = false
      this.CLEARREIMBURSELIST()
    }
    this.$root.Bus.$off('changeSelected')
    this.$root.Bus.$off('ifReloadreimList')
    next()
  },
  methods: {
    ...mapMutations(['CLEARREIMBURSELIST', 'CLEARBILLINFO']),
    initParams () {
      this.CLEARREIMBURSELIST()
      this.params.startDate = dayjs(dayjs().subtract(30, 'day')).valueOf()
      this.params.endDate = dayjs(dayjs()).valueOf()
      this.params.pageNo = 1
    },
    getSignConfig () {
      this.$store.dispatch('getSignConfig').then((res) => {
        if (res && res.data) this.signImageStr = res.data
      })
    },
    getList () {
      this.loading = true
      this.$store.dispatch('getReimburseList', this.params).then(value => {
        this.params.pageNo++
        this.getData = value
        this.loading = false
      })
    },
    getParams (params) {
      this.params = Object.assign(this.params, params)
      this.initParams()
      this.getList()
      this.screenVisible = false
    },
    search (value) {
      this.params.searchKeyWord = value
      this.initParams()
      this.getList()
    },
    loadMore () {
      if (this.getData === 'error') return // 获取数据失败，不再加载
      if (this.reimburseOver === true) return // 数据获取完毕不再加载
      this.loading = true
      setTimeout(() => {
        this.getList()
      }, 2500)
    },
    changeScreenAble (status) {
      this.screenVisible = !status
    },
    deleteReimburseMent (id) {
      this.$message('提示', '您确定要删除本条报销单吗?').then(() => {
        this.$store.dispatch('deleteReimburseMent', id).then(() => {
          this.$message('提示', '删除成功')
          this.initParams()
          this.getList()
        })
      })
    },
    toDetail () {
      this.CLEARBILLINFO()
      this.$router.push({ path: 'billType' })
    },
    showWorkflow (opts) {
      this.show = true
      this.optOfWorkflow = opts
    }
  }
}
</script>
<style lang="scss">
.reimbursement-wrapper {
  .mask{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0,0,0,0.3);
    z-index: 1000;
  }
  .search-wrapper {
    background: #F1F3F6;
    position: fixed;
    left: 0;
    top: 214px;
    z-index: 100;
  }
  .noInfo {
    text-align: center;
    margin-top: 50px;
    img {
      width: 314px;
      height: 242px;
    }
  }
  .page-infinite-list {
    height: calc(100vh - 434px);
    background: #F1F3F6;
    margin-top: 334px;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .mint-tab-container {
    .mint-cell {
      background: none;
      margin: 20px auto;
      &:first-child {
        margin-top: 0;
      }
    }
    .mint-tab-container-item {
      width: 710px;
      margin: 0 20px;
    }
    .mint-cell-wrapper, .mint-cell-value {
      padding: 0;
      background: none;
      border: none;
    }
  }
  .add-reimbursement {
    width: 100%;
    height: 100px;
    padding-top: 27px;
    font-size: 32px;
    color: #3596FA;
    background: #fff;
    text-align: center;
    position: fixed;
    left: 0;
    bottom: 0;
    box-shadow: 1px -2px 10px 0px rgba(0,0,0,0.2);
    .iconfont {
      font-size: 30px;
      margin-right: 10px;
    }
  }
  .selected2 {
    height: calc(100vh - 334px);
  }
  @supports (bottom: env(safe-area-inset-bottom)){
    .search-wrapper {
      top: calc(170px + env(safe-area-inset-top));
      top: calc(170px + constant(safe-area-inset-top));
    }
    .page-infinite-list {
      height: calc(100vh - 434px - env(safe-area-inset-bottom) - env(safe-area-inset-top));
      height: calc(100vh - 434px - constant(safe-area-inset-bottom) - constant(safe-area-inset-top));
      margin-top: calc(290px + env(safe-area-inset-top));
      margin-top: calc(290px + constant(safe-area-inset-top));
    }
    .selected2 {
      height: calc(100vh - 334px - env(safe-area-inset-bottom) - env(safe-area-inset-top));
      height: calc(100vh - 334px - constant(safe-area-inset-bottom) - constant(safe-area-inset-top));
    }
    .add-reimbursement {
      height: calc(100px + constant(safe-area-inset-bottom));
      height: calc(100px + env(safe-area-inset-bottom));
    }
  }
}

</style>
