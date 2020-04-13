<template>
  <form action="" onsubmit="return false;" class="search-wrapper flex">
    <mt-search
      v-model="searchText"
      :placeholder="placeholder"
      cancel-text=""
      @keyup.enter.native="search">
    </mt-search>
  </form>
</template>

<script>
export default {
  name: 'search',
  props: {
    placeholder: {
      type: String,
      default: '搜索'
    }
  },
  data () {
    return {
      searchText: ''
    }
  },
  watch: {
    searchText () {
      if (!this.searchText) {
        this.$emit('search', this.searchText)
      }
    }
  },
  methods: {
    search () {
      this.$emit('search', this.searchText)
    }
  }
}
</script>

<style lang="scss">
.search-wrapper {
  .mint-search {
    height: inherit;
  }
  .mint-searchbar {
    padding: 0;
    background: none;
    padding: 24px 32px 24px;
    display: inline-flex;
    &-cancel {
      margin: 0;
    }
    &-inner {
      width: 674px;
      height: 64px;
      border-radius: 64px;
      & .mintui-search {
        &:before {
          color:#666;
          font-size: 36px;
        }
      }
    }
    &-core {
      font-size: 28px;
      border-radius: 64px;
      text-align: center;
    }
  }
}
</style>
