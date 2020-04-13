<template>
  <div :class="['page-infinite-wrapper', selected == 2 ? 'selected2' : '']" ref="wrapper">
    <mt-tab-container
      v-model="selected"
      :swipeable="true"
      class="page-infinite-list"
      v-infinite-scroll="loadMore2"
      infinite-scroll-disabled="loading"
      infinite-scroll-immediate-check="true"
      infinite-scroll-distance="50">
      <mt-tab-container-item id="1">
        <mt-cell-swipe class="flex" v-for="(item, index) in invoiceList" :key="item.id"
        :right="[
          { content: '取消', style: cancelBtn },
          { content: '删除', style: deleteBtn, handler: () => deleteInvoice(item.id, index) }]">
          <label :class="{'mint-checklist-label': true, 'hide': !isBatch}" ref="checkList">
            <span class="mint-checkbox">
              <input type="checkbox"
                :value="index"
                v-model="checkboxModal"
                class="mint-checkbox-input"
                @click="choose(index)">
              <span class="mint-checkbox-core"/>
            </span>
          </label>
          <card :data="item"></card>
        </mt-cell-swipe>
      </mt-tab-container-item>
      <mt-tab-container-item v-if="selected==2" id="2">
        <mt-cell-swipe v-for="(item, index) in invoiceList" :key="item.id"
        :right="[
          { content: '取消', style: cancelBtn },
          { content: '删除', style: deleteBtn, handler: () => deleteInvoice(item.id, index) }]">
          <card :data="item"></card>
        </mt-cell-swipe>
      </mt-tab-container-item>
    </mt-tab-container>
    <div v-if="haveNodata" class="noInfo">
      <img src="@/assets/images/nodata.png" alt="">
      <p>暂无可查询的发票</p>
      <p>赶快点击左下角按钮新增发票去哦</p>
    </div>
    <p v-show="loading" class="page-infinite-loading">
      <mt-spinner type="fading-circle"></mt-spinner>
      加载中...
    </p>
  </div>
</template>

<script>
import card from './Card'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'infiniteScroll',
  props: ['isChoosed', 'isBatch', 'isClear', 'confirm', 'loading'],
  components: {
    card
  },
  data () {
    return {
      checkboxModal: [],
      selected: '1',
      wrapperHeight: 0,
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
        color: '#fff'
      }
    }
  },
  computed: {
    ...mapGetters(['invoiceList', 'haveNodata'])
  },
  watch: {
    isBatch () {
      this.changeBatch(this.isBatch)
    },
    selected () {
      this.CLEARINVOICELIST()
      this.$emit('changeSelected', this.selected)
    },
    confirm () {
      if (this.confirm) {
        this.postData()
      }
    },
    isClear () {
      if (this.isClear && !this.isChoosed) {
        this.checkboxModal = []
        this.$emit('countNum', { length: 0, isAll: false })
      }
    },
    isChoosed () {
      if (this.isChoosed) {
        this.checkboxModal = []
        this.checkboxModal = Array.from({ length: this.invoiceList.length }, (v, k) => k)
        this.$emit('countNum', { length: this.invoiceList.length, isAll: true })
      } else {
        if (this.isClear) {
          this.checkboxModal = []
          this.$emit('countNum', { length: 0, isAll: false })
        }
      }
    }
  },
  mounted () {
    this.CLEARINVOICELIST()
    this.$root.Bus.$on('changeSelected', value => {
      this.selected = value
    })
  },
  beforeDestroy () {
    this.$root.Bus.$off('changeSelected')
  },
  methods: {
    ...mapMutations(['CLEARINVOICELIST']),
    loadMore2 () {
      this.$emit('loadMore')
    },
    postData () {
      if (this.checkboxModal.length === 0) {
        this.$message('提示', '请选择要报销的单据')
        return
      }
      /* 提交请求 */
      this.$emit('checkAll', true)
      const arr = []
      this.checkboxModal.forEach((item) => {
        arr.push({ id: this.invoiceList[item].id })
      })
      this.$emit('changeConfirm', arr) // 报销之后页面刷新
    },
    choose (index) {
      // 将勾选的下标存储下来，并记录
      if (!this.checkboxModal.includes(index)) {
        this.checkboxModal.push(index)
      } else {
        this.checkboxModal.splice(this.checkboxModal.findIndex(v => v === index), 1)
      }
      if (this.checkboxModal.length === this.invoiceList.length) {
        this.$emit('checkAll', true)
      } else {
        this.$emit('countNum', { length: this.checkboxModal.length, isAll: false })
      }
    },
    changeBatch (bool) {
      // 去掉button-group，重设宽度
      const width = bool ? '107.3333vw' : '97.3333vw'
      const classNm = bool ? 'mint-cell-swipe-buttongroup hide' : 'mint-cell-swipe-buttongroup'
      const nodeList = document.querySelectorAll('.mint-cell-swipe-buttongroup')
      const wrapperList = document.querySelectorAll('.mint-tab-container-item .mint-cell-wrapper')
      nodeList.forEach((item) => {
        item.setAttribute('class', classNm)
      })
      wrapperList.forEach((item) => {
        item.style.width = width
      })
    },
    deleteInvoice (id, index) {
      this.$message('提示', '您确定要删除本条发票吗?').then(() => {
        this.$store.dispatch('deleteInvoice', id).then(() => {
          this.$message('提示', '删除成功')
          this.CLEARINVOICELIST()
          this.$emit('loadMore', 'fresh')
        })
      })
    }
  }
}
</script>

<style lang="scss">
.page-infinite-wrapper {
  padding: 0;
  height: calc(100vh - 136px - 180px - 44px);
  margin-top: 234px;
  background: #F1F3F6;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  z-index: 10;
  .hide {
    display: none;
  }
  .noInfo {
    text-align: center;
    margin-top: 50px;
    img {
      width: 314px;
      height: 242px;
    }
  }
  .mint-cell-wrapper {
    border-radius: 10px;
  }
  .mint-tab-container {
    .mint-cell {
      background: none;
      &-value {
        padding: 0;
      }
    }
    &-item {
      width: 730px;
      margin-right: 20px;
      .mint-cell-wrapper {
        width: 730px;
        padding: 0;
        background: none;
        border: none;
        border-radius: 10px;
        overflow: initial;
        .mint-checklist-label {
          padding: 0;
        }
        .mint-checkbox-core {
          width: 44px;
          height: 44px;
          margin: 0 20px 0 32px;
        }
        .mint-checkbox-input:checked + .mint-checkbox-core::after {
          width: 18px;
          height: 10px;
          left: 10px;
          top: 16px;
          transform: rotate(-45deg) scale(-1, 1)
        }
      }
      .mint-cell-swipe {
        margin: 0 auto 20px;
        .mint-cell-swipe-button {
          border-radius: 0 10px 10px 0;
        }
      }
    }
  }
  .mint-cell:last-child {
    background: none;
  }
}
@supports (bottom: env(safe-area-inset-bottom)){
  .page-infinite-wrapper {
    height: calc(100vh - 316px - constant(safe-area-inset-bottom) - constant(safe-area-inset-top));
    height: calc(100vh - 316px - env(safe-area-inset-bottom) - env(safe-area-inset-top));
    margin-top: calc(190px + constant(safe-area-inset-top));
    margin-top: calc(190px + env(safe-area-inset-top));
  }
}
.selected2 {
  height: calc(100vh - 180px - 44px);
}
</style>
