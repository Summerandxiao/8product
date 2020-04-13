<template>
  <div class="choose-tag-wrapper">
    <nav-title :title="title" :path="path" :add="true"></nav-title>
    <search @search="search"></search>
    <div class="recent-tag" ref="recentTag">
      <div class="recent-tag-title">最近使用</div>
      <div class="flex recent-tag-item-wrapper">
        <div
          v-for="(item) in tagNameList"
          :key="item.tagName"
          :class="[item.tagName ? 'recent-tag-item': 'recent-tag-item-empty', 'flex']">
          <div class="item" v-if="item.tagName"  @click="chooseItem(item.tagName, item.id)">{{ item.tagName }}</div>
          <div v-else></div>
        </div>
      </div>
    </div>
    <div class="page-indexlist-wrapper" ref="wrapper">
      <mt-index-list :show-indicator="true" :height="height">
        <mt-index-section v-for="item in alphabet" :key="item.initial" :index="item.initial">
          <mt-cell-swipe
            v-for="cell in item.cells"
            :key="cell.id"
            :title="cell.tagName"
            :right="[
              {
                content: '取消',
                style: cancelBtn
              },
              {
                content: '删除',
                style: deleteBtn,
                handler: () => detele(cell.id)
              }
            ]"
            @click.native="chooseItem(cell.tagName, cell.id)">
          </mt-cell-swipe>
        </mt-index-section>
      </mt-index-list>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import navTitle from '@/components/navTitle'
import search from '@/components/search'
export default {
  name: 'chooseTag',
  components: {
    navTitle,
    search
  },
  data () {
    return {
      height: 0,
      title: '发票标签',
      path: '',
      alphabet: [],
      tagNameList: [],
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
    ...mapGetters(['invoiceTagList'])
  },
  created () {
    this.path = this.$route.query.fromPath
    this.getTagList()
  },
  methods: {
    getTagList () {
      this.alphabet = []
      this.$store.dispatch('getTagList').then(() => {
        if (this.invoiceTagList.length < 9) {
          this.tagNameList = this.invoiceTagList
          const lest = 3 - Math.floor(this.invoiceTagList.length % 3)
          if (lest !== 3) {
            for (let i = 0; i < lest; i++) {
              this.tagNameList.push({ id: i })
            }
          }
        } else {
          this.tagNameList = this.invoiceTagList.slice(0, 9)
        }
        // 重载页面时计算indexList高度和距顶部距离
        this.$nextTick(() => {
          const bodyHeight = document.documentElement.clientHeight
          const recentTag = this.$refs.recentTag
          this.$refs.wrapper.style.marginTop = recentTag.offsetHeight + recentTag.offsetTop + 'px'
          this.height = bodyHeight - recentTag.offsetHeight - recentTag.offsetTop
        })
        this.realizeList(this.invoiceTagList)
      })
    },
    realizeList (arr) {
      this.alphabet = []
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(initial => {
        let cells = arr.filter(item => {
          if (item.firstLetter !== undefined) {
            if (item.firstLetter.toUpperCase() === initial) {
              return item
            }
          }
        })
        if (cells.length !== 0) {
          this.alphabet.push({
            initial,
            cells
          })
        }
      })
    },
    search (searchText) {
      let arr = []
      this.invoiceTagList.forEach(item => {
        if (item.tagName) {
          if (item.tagName.match(searchText)) {
            arr.push(item)
          }
        }
      })
      this.realizeList(arr)
    },
    chooseItem (name, id) {
      this.$router.push({ path: this.path, query: { tagName: name, tagId: id } })
    },
    detele (id) {
      this.$message('提示', '您确定要删除本条发票吗?').then(() => {
        this.$store.dispatch('deleteTag', id).then(() => {
          this.$message('提示', '删除成功')
          this.getTagList()
        })
      })
    }
  }
}
</script>
<style lang="scss">
.choose-tag-wrapper{
  .search-wrapper {
    position: fixed;
    left: 0;
    top: 132px;
    background: #F1F3F6;
    padding-bottom: 20px;
  }
  .recent-tag {
    width: 664px;
    position: fixed;
    left: 32px;
    top: 264px;
    &-item-wrapper {
      flex-wrap: wrap;
      justify-content: space-between;
    }
    &-item {
      background: #fff;
    }
    &-item-empty {
      background: #F1F3F6
    }
    &-item, &-item-empty {
      width: 208px;
      height: 80px;
      font-size: 28px;
      color: #333;
      border-radius: 10px;
      margin: 10px 0;
      justify-content: center;
      flex-direction: column;
      .item {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: center;
      }
      &:nth-child(3n-1) {
        margin: 0 0;
      }
    }
  }
  .mint-indexsection-index {
    background: #F1F3F6;
    padding: 29px 32px;
    font-size: 32px;
    color: #999;
  }
  .mint-cell:last-child .mint-cell-wrapper {
    background: none;
  }
  .mint-cell-wrapper {
    padding: 0;
    background: none;
    .mint-cell-title {
      padding: 29px 32px;
      font-size: 32px;
    }
  }
  .mint-indexlist-nav {
    background: none;
    border: none;
    .mint-indexlist-navitem {
      font-size: 22px;
      padding: 10px 20px 10px 0;
    }
  }
  .mint-indexlist-content {
    width: 100%;
  }
  @supports (bottom: env(safe-area-inset-bottom)){
    .search-wrapper {
      top: calc(88px + constant(safe-area-inset-top));
      top: calc(88px + env(safe-area-inset-top));
    }
    .recent-tag {
      top: calc(220px + constant(safe-area-inset-top));
      top: calc(220px + env(safe-area-inset-top));
    }
  }
}
</style>
