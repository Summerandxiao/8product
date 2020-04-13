<template>
  <div class="article-detail-wrapper">
    <nav-title :title="title" :path="path"></nav-title>
    <div class="article-detail">
      <div class="article-title">{{articleData.title}}</div>
      <div class="author-card flex">
        <span class="author">作者：{{articleData.author}}</span>
        <span>发布日期：{{articleData.pubTime}}</span>
      </div>
      <div class="content-card flex" v-html="articleData.content"></div>
      <div v-if="this.attachData.length" class="attach-card">
        <div class="attach-label">附件：</div>
        <div v-for="(row,index) in attachData" :key="index">
          <div class="attach-name" @click="downloadFile(row.attach_id)">{{row.row_id}}.{{row.attach_name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import navTitle from '@/components/navTitle'
import * as Auth from '@/utils/auth'
export default {
  data () {
    return {
      title: '内容管理',
      path: 'article',
      articleData: {},
      attachData: {}
    }
  },
  components: {
    navTitle
  },
  created () {
    this.info = JSON.parse(Auth.getStorage('userInfo'))
    const obj = {
      ruleID: 'portal-pf_article.getArticleByParams',
      articleId: this.$route.query.articleId,
      pgPletId: this.$route.query.pgPletId,
      start: 0,
      limit: 10,
      roleCode: this.info.roleCode
    }
    // 获取通知公告内容
    this.$store.dispatch('getArticleData', obj).then(res => {
      this.articleData = res
      this.articleData.pubTime = this.articleData.pubTime.slice(0, 10)
    })
    const param = {
      ruleID: 'portal-pf_article.getArticleAttachByParams',
      articleId: this.$route.query.articleId,
      start: 0,
      limit: 10
    }
    // 获取公告附件信息
    this.$store.dispatch('getAttachData', param).then(res => {
      this.attachData = res
    })
  },
  methods: {
    downloadFile (attachId) {
      // 下载附件信息，在本地打开
      window.location.href = `/port/pf/portal/downloadFile.do?attachId=${attachId}`
    }
  }
}
</script>
<style lang="scss">
.article-detail-wrapper {
  padding: 110px 20px 20px;
  background: #F1F3F6;
  .article-detail {
    padding: 26px;
    background: #fff;
    .article-title {
      text-align: center;
      color: #0E77CA;
      font-size: 38px;
      padding: 15px 0;
    }
    .author-card {
      padding: 20px 60px;
      border-bottom: 0.5px solid #ccc;
      font-size: 28px;
      color: #666;
    }
    .content-card {
      text-indent: 64px;
      line-height: 64px;
    }
    .attach-card {
      border-top: 0.5px solid #ccc;
      padding: 20px 20px 0;
      .attach-label {
        margin-bottom: 20px;
      }
      .attach-name {
        color: #0000EE;
        margin: 20px;
      }
    }
  }
}
</style>
