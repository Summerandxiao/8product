import user from './user'
import invoice from './invoice'
import reimbursement from './reimbursement'
import backlog from './backlog'
import myDeliver from './myDeliver'
import arBill from './arBill'
import article from './article'
import fundManage from './fundManage'

export const api = {
  ...user,
  ...invoice,
  ...backlog,
  ...myDeliver,
  ...arBill,
  ...reimbursement,
  ...article,
  ...fundManage
}
