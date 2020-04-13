<template>
  <div class="article-wrapper">
    <nav-title :title="title" :path="path"></nav-title>
    <div class="inform-card" v-for="(item,index) in article" :key="index" @click="changeAttach(item.article_id, item.pg_plet_id)">
      <div class="inform-article flex">
        <div class="portlet-name">{{item.portlet_name}}</div>
        <span class="inform-pubtime">{{item.pub_time | pubTime}}</span>
      </div>
      <div class="inform-title">{{item.article_title}}</div>
      <div class="inform-review">{{item.review | review}}</div>
    </div>
  </div>
</template>
<script>
import navTitle from '@/components/navTitle'
import * as Auth from '@/utils/auth'
export default {
  data () {
    return {
      title: '通知公告',
      path: 'main',
      article: []
    }
  },
  components: {
    navTitle
  },
  filters: {
    pubTime (val) {
      return val.slice(0, 10)
    },
    review (val) {
      if (val.length > 40) {
        return val.slice(0, 40) + '...'
      } else {
        return val
      }
    }
  },
  created () {
    this.info = JSON.parse(Auth.getStorage('userInfo'))
    this.getArticle()
  },
  methods: {
    changeAttach (val, pgPletId) {
      this.$router.push({ path: 'ArticleDetail', query: { articleId: val, pgPletId: pgPletId } })
    },
    getArticle () {
      const param = {
        ruleID: 'portal-pf_article.getArticleData',
        pgPletId: '',
        roleCode: this.info.roleCode,
        rgCode: this.info.rgCode,
        searchKey: '',
        userId: this.info.userID,
        start: 0,
        limit: 10
      }
      // 获取通知公告列表
      this.$store.dispatch('getArticle', param).then(res => {
        this.article = res
      })
    }
  }
}
</script>
<style lang="scss">
.article-wrapper {
  padding: 110px 20px 20px;
  background: #F1F3F6;
  .inform-card {
    background: #fff;
    margin-bottom: 20px;
    .inform-article {
      padding: 20px;
      .portlet-name {
        font-size: 28px;
        padding: 6px 20px;
        background:rgba(255,153,0,0.1);
        color: #FF9C00;
      }
      .inform-pubtime {
        font-size: 28px;
        color: #666;
      }
    }
    .inform-title {
      width: 450px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding: 0 0 20px 20px;
    }
    .inform-review {
      padding: 0 0 20px 20px;
      font-size: 28px;
      line-height: 50px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .icon-icon-angle-right:before {
    font-size: 28px;
    margin-left: 20px;
  }
}
</style>
