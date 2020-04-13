<template>
  <div class="invoice-outer-wrapper">
    <div v-if="screenVisible" class="mask" @click="changeScreenAble(1)"></div>
    <nav-title :title="title" :path="path" :ifScreen="ifScreen" @changeScreenAble="changeScreenAble"></nav-title>
    <navbar :navLabels="navLabels"></navbar>
    <mt-tabbar v-if="selected==1">
      <div class="tab-wrapper flex" v-if="isBatch">
          <label class="mint-checklist-label">
            <span class="mint-checkbox">
              <input type="checkbox"
                :value="value"
                v-model="isChoosed"
                class="mint-checkbox-input">
              <span class="mint-checkbox-core"/>
            </span>
            <span class="mint-checkbox-label">已选{{count}}</span>
          </label>
          <div>
            <mt-button type="default" class="btn btn-cancel" @click="cancel">取消</mt-button>
            <mt-button type="default" class="btn btn-confirm" @click="changeConfirm(0)">确认</mt-button>
        </div>
      </div>
      <div class="tab-wrapper" v-else>
        <mt-tab-item v-for="(item, index) in tabBar" :key="item.icon" @click.native="action(index)">
          <i :class="['iconfont', item.icon]"></i>{{item.text}}
        </mt-tab-item>
      </div>
    </mt-tabbar>
    <pop-up :isShow="isShow" @hideScan="hideScan"></pop-up>
    <screening :screenVisible='screenVisible' @getParams="getParams"></screening>
    <infinite-scroll
      :isBatch="isBatch"
      :isChoosed="isChoosed"
      :isClear='isClear'
      :confirm='confirm'
      :loading='loading'
      @changeConfirm="changeConfirm"
      @countNum="countNum"
      @checkAll="checkAll"
      @changeSelected='changeSelected'
      @loadMore='loadMore'></infinite-scroll>
  </div>
</template>

<script>
import popUp from './components/PopUp'
import screening from './components/Screen'
import infiniteScroll from './components/InfiniteScroll'
import navbar from '@/components/navbar'
import { mapGetters, mapMutations } from 'vuex'
import navTitle from '@/components/navTitle'
import { invoiceLabels } from '@/utils/global.js'

export default {
  name: 'invoice',
  components: {
    navTitle,
    navbar,
    popUp,
    screening,
    infiniteScroll
  },
  data () {
    return {
      title: '我的发票',
      path: 'main',
      selected: 1,
      getData: 'success', // 获取数据是否成功
      loading: false, // 滚动加载状态，初始化可以加载
      isBatch: false, // 批量是否全选
      isChoosed: false, // tabbar是否选中
      isClear: true, // 是否清除批量选择
      confirm: false, // 确认批量操作
      isShow: false, // 添加发票弹窗
      screenVisible: false, // 筛选弹窗
      ifScreen: true,
      count: 0, // 批量操作时，选中的数量
      value: [],
      navLabels: invoiceLabels,
      params: {
        pageNo: 1,
        pageSize: 10,
        isApply: 'N'
      },
      options: [{
        label: '已选',
        value: 0
      }],
      tabBar: [
        {
          text: '添加发票',
          icon: 'icon-fangkuai'
        },
        {
          text: '批量报销',
          icon: 'icon-zichanguanli'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['over', 'invoiceList'])
  },
  watch: {
    over () {
      if (this.over) {
        this.loading = true
      }
    }
  },
  mounted () {
    this.CLEARINVOICELIST()
    this.loadMore()
  },
  methods: {
    ...mapMutations(['CLEARINVOICELIST']),
    init () {
      this.isBatch = !this.isBatch
      this.isChoosed = false
      this.isClear = true
    },
    initParams () {
      this.params.pageNo = 1
    },
    action (index) {
      if (index === 1) { // 批量报销
        this.isBatch = !this.isBatch
      } else { // 添加发票
        this.isShow = true
      }
    },
    changeScreenAble (status) {
      this.screenVisible = !status
    },
    getParams (params) {
      this.CLEARINVOICELIST()
      this.params = Object.assign(this.params, params)
      this.initParams()
      this.loadMore()
      this.screenVisible = false
    },
    getList () {
      this.$store.dispatch('getInvoiceList', this.params).then(value => {
        this.params.pageNo++
        this.getData = value
        this.loading = false
      })
    },
    loadMore (isFresh) {
      if (isFresh) this.initParams()
      if (this.getData === 'error') return // 获取数据失败，不再加载
      if (this.over === true) return // 数据获取完毕不再加载
      this.loading = true
      setTimeout(() => {
        this.getList()
      }, 170)
    },
    hideScan () {
      this.isShow = false
    },
    cancel () {
      this.init()
    },
    changeConfirm (arr) {
      this.confirm = !this.confirm
      if (!this.confirm) {
        this.init()
        this.$store.dispatch('batchInvoice', arr).then(() => {
          this.initParams()
          this.CLEARINVOICELIST()
          this.getList()
        })
      }
    },
    countNum (obj) {
      this.count = obj.length
      this.isChoosed = obj.isAll
      this.isClear = obj.isAll
    },
    checkAll (bool) {
      this.isChoosed = bool
      this.isClear = true
    },
    changeSelected (selected) {
      this.selected = selected
      this.initParams()
      if (this.selected === '2') {
        this.isChoosed = false
        this.isClear = true
        this.isBatch = false
        this.params.isApply = 'Y'
      } else {
        this.params.isApply = 'N'
      }
      this.loadMore()
    }
  }
}
</script>

<style lang="scss">
.invoice-outer-wrapper {
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
    top: 170px;
    z-index: 100;
  }
  .tab-wrapper {
    display: flex;
    position: absolute;
    padding-right: 32px;
    left: 0;
    right: 0;
    .mint-checklist-label {
      padding: 0;
    }
    .mint-checkbox-label {
      color: #666;
    }
    .mint-checkbox-core {
      width: 44px;
      height: 44px;
      margin-left: 32px;
    }
    .mint-checkbox-input:checked + .mint-checkbox-core::after {
      width: 18px;
      height: 10px;
      left: 10px;
      top: 16px;
      transform: rotate(-45deg) scale(-1, 1)
    }
    .mint-button {
      width: 200px;
      height: 63px;
      border-radius: 63px;
      font-size: 32px;
      background: #fff;
      box-shadow: none;
      &.btn-cancel {
        border: 1px solid #999;
        color: #999;
        margin-right: 24px;
      }
      &.btn-confirm {
        border: 1px solid #3596FA;
        color: #3596FA;
      }
    }
  }
  .mint-cell-wrapper {
    background: none;
    border: none;
  }
  .mint-tabbar {
    height: 100px;
    padding-top: 27px ;
    color: #3596FA;
    background: #fff;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 100;
    box-shadow: 1px -2px 10px 0px rgba(0,0,0,0.2);
    .iconfont {
      font-size: 30px;
      margin-right: 10px;
    }
    & > .mint-tab-item.is-selected {
      background: #fff;
    }
    .mint-tab-item {
      -webkit-tap-highlight-color: transparent;
      &-label {
        font-size: 32px;
      }
      &:nth-child(2) .mint-tab-item-label {
        border-left: 2px solid #c7c7c7;
      }
    }
  }
  @supports (bottom: env(safe-area-inset-bottom)){
    .mint-tabbar {
      height: calc(100px + constant(safe-area-inset-bottom));
      height: calc(100px + env(safe-area-inset-bottom));
    }
  }
}
</style>
