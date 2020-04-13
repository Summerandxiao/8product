const list = r => require.ensure([], () => r(require('@/views/invoice')), 'invoice')
const chooseTag = r => require.ensure([], () => r(require('@/components/tag/components/ChooseTag.vue')), 'invoice')
const addTag = r => require.ensure([], () => r(require('@/components/tag/components/AddTag.vue')), 'invoice')
const OrdinaryVATInvoice = r => require.ensure([], () => r(require('@/views/invoice/components/detail/OrdinaryVATInvoice')), 'invoice')
const TaxiFare = r => require.ensure([], () => r(require('@/views/invoice/components/detail/TaxiFare')), 'invoice')
const TrainTicket = r => require.ensure([], () => r(require('@/views/invoice/components/detail/TrainTicket')), 'invoice')
const AirTicket = r => require.ensure([], () => r(require('@/views/invoice/components/detail/AirTicket')), 'invoice')
const QuotaInvoice = r => require.ensure([], () => r(require('@/views/invoice/components/detail/QuotaInvoice')), 'invoice')
const OtherInvoice = r => require.ensure([], () => r(require('@/views/invoice/components/detail/OtherInvoice')), 'invoice')
const PontageInvoice = r => require.ensure([], () => r(require('@/views/invoice/components/detail/PontageInvoice')), 'invoice')
export default [
  {
    path: '/invoice',
    name: 'invoice',
    meta: { title: '我的发票' },
    component: list
  },
  {
    path: '/chooseTag',
    name: 'chooseTag',
    meta: { title: '发票标签' },
    component: chooseTag
  },
  {
    path: '/addTag',
    name: 'addTag',
    meta: { title: '发票标签' },
    component: addTag
  },
  {
    path: '/OrdinaryVATInvoice',
    name: 'OrdinaryVATInvoice',
    meta: { title: '增值税发票' },
    component: OrdinaryVATInvoice
  },
  {
    path: '/TaxiFare',
    name: 'TaxiFare',
    meta: { title: '出租车票' },
    component: TaxiFare
  },
  {
    path: '/TrainTicket',
    name: 'TrainTicket',
    meta: { title: '火车票' },
    component: TrainTicket
  },
  {
    path: '/AirTicket',
    name: 'AirTicket',
    meta: { title: '飞机票' },
    component: AirTicket
  },
  {
    path: '/QuotaInvoice',
    name: 'QuotaInvoice',
    meta: { title: '定额发票' },
    component: QuotaInvoice
  },
  {
    path: '/OtherInvoice',
    name: 'OtherInvoice',
    meta: { title: '其他发票' },
    component: OtherInvoice
  },
  {
    path: '/PontageInvoice',
    name: 'PontageInvoice',
    meta: { title: '通行费' },
    component: PontageInvoice
  }
]
