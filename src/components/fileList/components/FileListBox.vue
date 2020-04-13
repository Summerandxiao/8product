<template>
<div class="filelist-box-wrapper">
  <nav-title path="reimburseDetail" :title="title"></nav-title>
  <div class="file-item flex">
    <div class="item-name">WZ</div>
    <div class="action">
      <i class="iconfont icon-xianshi-"></i>
      <i class="iconfont icon-xiazai"></i>
      <i class="iconfont icon-shanchu"></i>
    </div>
  </div>
  <div class="file-item flex">
    <div class="item-name">WZ</div>
    <div class="action">
      <i class="iconfont icon-xianshi-"></i>
      <i class="iconfont icon-xiazai"></i>
      <i class="iconfont icon-shanchu"></i>
    </div>
  </div>
  <div class="add-bill-info">
    <i class="iconfont icon-fangkuai"></i>上传单据
    <!-- <input type="file" @change="changeFile"> -->
  </div>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
import navTitle from '@/components/navTitle'

export default {
  name: 'FileListBox',
  components: {
    navTitle
  },
  data () {
    return {
      path: 'reimbursementDetail',
      title: '',
      query: {},
      fileList: []
    }
  },
  computed: {
    ...mapGetters(['reimburseTmpInfo'])
  },
  created () {
    this.title = this.$route.query.name
    console.log()
  },
  methods: {
    changeFile (e) {
      let files = e.target.files
      const fileReader = new FileReader()
      fileReader.readAsDataURL(files[0]) // 根据图片路径读取图片
      let fileDetail = files[0]
      alert(fileDetail.name)
    }
  }
}
</script>
<style lang="scss">
.filelist-box-wrapper {
  font-family: PingFangSC;
  margin-top: 132px;
  // background: #fff;
  .file-item {
    width: 710px;
    background: #fff;
    border-radius: 10px;
    margin: 20px auto 0;
    box-sizing: border-box;
    padding: 24px;
    .item-name {
      width: 450px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .iconfont {
      color: #666;
      font-size: 32px;
      margin-right: 20px;
    }
  }
  .add-bill-info  {
    display: block;
    width: 630px;
    background: #3596FA;
    padding: 16px 0;
    color: #fff;
    font-size: 32px;
    text-align: center;
    border-radius: 20px;
    margin: 30px auto;
    .icon-fangkuai {
      color: #fff;
      font-size: 32px;
      margin-right: 8px;
    }
  }
}
@supports (bottom: env(safe-area-inset-bottom)){
  .filelist-box-wrapper {
    margin-top: calc(110px + constant(safe-area-inset-top));
    margin-top: calc(110px + env(safe-area-inset-top));
  }
}
</style>
