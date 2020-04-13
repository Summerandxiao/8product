const article = r => require.ensure([], () => r(require('@/views/article')), 'article')
const ArticleDetail = r => require.ensure([], () => r(require('../views/article/components/ArticleDeatil.vue')), 'ArticleDetail')
export default [
  {
    path: '/article',
    name: 'article',
    meta: { title: '通知公告' },
    component: article
  },
  {
    path: '/ArticleDetail',
    name: 'ArticleDetail',
    meta: { title: '内容管理' },
    component: ArticleDetail
  }
]
