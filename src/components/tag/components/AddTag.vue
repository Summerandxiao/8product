<template>
  <div class="add-tag-wrapper">
    <nav-title :title="title" :path="path" :query="query"></nav-title>
    <div class="add-tag-outer">
      <div class="add-tag-label flex">
        <span>标签名称</span>
      </div>
      <div class="tag-name-container flex">
        <input type="text"
          placeholder="请输入标签名称，最多不超过10个字"
          v-model="tagName"
          class="add-tag-name">
          <div v-if="tagId" class="add-tag flex" style="background: #999">保存</div>
          <div v-else class="add-tag flex" @click="saveTag">保存</div>
      </div>
      <div class="add-tag-label invoice-title flex">
        <span>发票列表{{invoiceIds.length}}</span>
      </div>
      <div class="add-invoice flex">
        <div @click="checkIfSave"><i class="iconfont icon-icon-plus"></i>添加发票</div>
        <div @click="matchIDwithTagId">确定</div>
      </div>
      <ul v-if="addInvoiceAlready" class="fill-wrapper">
        <li v-for="item in invoiceNames" :key="item" class="file-item flex">{{ item }}</li>
      </ul>
    </div>
    <ul
      v-if="!addInvoiceAlready"
      class="infinite-wrapper"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-immediate-check="true"
      infinite-scroll-distance="50">
      <div v-for="(item, index) in invoiceList" :key="item.id" class="unpay-item flex">
        <label class="mint-checklist-label" ref="checkList">
          <span class="mint-checkbox">
            <input type="checkbox"
              :value="index"
              v-model="item.checked"
              class="mint-checkbox-input"
              @click="choose(item.id, item.invoiceGoodName)">
            <span class="mint-checkbox-core"/>
          </span>
        </label>
        <card :data="item"></card>
      </div>
    </ul>
    <div v-if="!addInvoiceAlready&&haveNodata" class="noInfo">
      <img src="../../../assets/images/nodata.png" alt="">
      <p>暂无可查询的发票</p>
      <p>赶快点击左下角按钮新增发票去哦</p>
    </div>
    <p v-show="!addInvoiceAlready&&loading" class="page-infinite-loading">
      <mt-spinner type="fading-circle"></mt-spinner>
      加载中...
    </p>
  </div>
</template>
<script>
import navTitle from '@/components/navTitle'
import card from '@/views/invoice/components/Card'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'addTag',
  components: {
    navTitle,
    card
  },
  data () {
    return {
      tagName: '',
      tagId: '',
      path: 'chooseTag',
      query: {},
      title: '新增标签',
      invoiceIds: [],
      invoiceNames: [],
      loading: false,
      addInvoiceAlready: false,
      params: {
        pageNo: 1,
        pageSize: 10,
        isApply: 'N',
        tagId: '*'
      }
    }
  },
  computed: {
    ...mapGetters(['invoiceList', 'haveNodata', 'over'])
  },
  mounted () {
    this.query.fromPath = this.$route.query.path
    this.CLEARINVOICELIST()
  },
  methods: {
    ...mapMutations(['CLEARINVOICELIST']),
    saveTag () {
      if (!this.tagName.trim()) {
        this.$message('提示', '页签名称不能为空')
        return
      }
      const obj = {
        tagName: this.tagName,
        createTime: new Date().getTime()
      }
      this.$store.dispatch('addTag', obj).then((res) => {
        this.tagId = res.id
        this.path = this.$route.query.path
        delete this.query.fromPath
        this.query = {
          tagName: this.tagName,
          tagId: this.tagId
        }
      })
    },
    getList () {
      this.$store.dispatch('getInvoiceList', this.params).then(value => {
        this.params.pageNo++
        this.loading = false
      })
    },
    loadMore () {
      if (this.getData === 'error') return // 获取数据失败，不再加载
      if (this.over === true) return // 数据获取完毕不再加载
      this.loading = true
      setTimeout(() => {
        this.getList()
      }, 1500)
    },
    checkIfSave () {
      this.addInvoiceAlready = false
      if (!this.tagId) {
        this.$message('提示', '请您先添加标签')
      } else {
        if (this.addInvoiceAlready) return
        this.params.pageNo = 1
        this.getList()
      }
    },
    // 根据标签添加票据
    matchIDwithTagId () {
      if (this.invoiceIds.length === 0) {
        this.$message('提示', '请选择发票')
        return
      }
      const obj = {
        invoiceTagId: this.tagId,
        invoiceIds: this.invoiceIds
      }
      this.$store.dispatch('invoiceAddTag', obj).then(() => {
        this.addInvoiceAlready = true
        this.CLEARINVOICELIST()
        this.invoiceIds = []
      })
    },
    choose (invoiceId, goodName) {
      if (this.invoiceIds.includes(invoiceId)) {
        this.invoiceIds.splice(this.invoiceIds.findIndex(item => item === invoiceId), 1)
        this.invoiceNames.splice(this.invoiceNames.findIndex(item => item === goodName), 1)
      } else {
        this.invoiceIds.push(invoiceId)
        this.invoiceNames.push(goodName)
      }
    }
  }
}
</script>
<style lang="scss">
  .add-tag-wrapper {
    .add-tag-label {
      width: calc(100vw - 64px);
      padding: 20px 0;
      font-size: 32px;
    }
    .invoice-title {
      padding-top: 20px;
    }
    .add-tag-outer {
      width: 686px;
      position: fixed;
      top: 132px;
      left: 0;
      padding: 20px 32px;
      z-index: 100;
      .icon-icon-plus {
        font-size: 32px;
        margin-right: 20px;
      }
      .tag-name-container {
        width: calc(100vw - 64px);
        .add-tag-name {
          width: 520px;
          padding: 27px 32px;
          font-size: 32px;
          border: none;
        }
        .add-tag {
          width: 100px;
          height: 90px;
          background: #72B0F9;
          color: #FFF;
          justify-content: center;
          align-items: center;
          border-radius: 10px;
          margin-left: 20px;
        }
      }
    }
    .add-invoice {
      width: 686px;
      height: 100px;
      background: #fff;
      padding: 0 32px;
      margin-left: -32px;
      color: #0099FF;
      font-size: 32px;
    }
    .infinite-wrapper {
      width: 750px;
      height: calc(100vh - 584px);
      position: fixed;
      left: 0;
      top: 524px;
      padding: 0 0 50px;
      margin: 0;
      overflow-y: scroll;
      z-index: 1;
      .mint-checkbox-core {
        width: 30px;
        height: 30px;
        margin: 0 0 0 5px;
      }
      .mint-checkbox-input:checked + .mint-checkbox-core::after {
        width: 18px;
        height: 10px;
        left: 5px;
        top: 5px;
        transform: rotate(-45deg) scale(-1, 1)
      }
    }
    .page-infinite-loading {
      width: 100%;
      position: fixed;
      left: 50%;
      bottom: 0;
      margin-left: -50%;
    }
    .noInfo {
      position: fixed;
      left: 50%;
      top: 500px;
      transform: translate(-50%);
      text-align: center;
    }
    .unpay-item {
      width: 98vw;
      padding: 0 2vw 0 0;
      margin: 20px auto;
      .card {
        width: 632px;
      }
    }
    .fill-wrapper {
      list-style: none;
      margin: 0;
      padding: 0;
      margin-left: -32px;
      .file-item {
        width: 686px;
        height: 100px;
        padding: 0 32px;
        background: #fff;
        border-top: 1px solid #eee;
      }
    }
    @supports (bottom: env(safe-area-inset-bottom)){
      .add-tag-outer {
        top: calc(88px + constant(safe-area-inset-top));
        top: calc(88px + env(safe-area-inset-top));
      }
      .infinite-wrapper {
        height: calc(100vh - 540px - constant(safe-area-inset-top));
        height: calc(100vh - 540px - env(safe-area-inset-top));
        top: calc(480px + constant(safe-area-inset-top));
        top: calc(480px + env(safe-area-inset-top));
      }
    }
  }
</style>
