import { MessageBox } from 'mint-ui'
import * as Auth from '@/utils/auth'
export const invoice = {
  methods: {
    saveInvoice (list) {
      let image = JSON.parse(Auth.getStorage('image'))
      this.$store.dispatch('saveInvoice', list).then(id => {
        image.orderIndex = 0
        image.billId = id
        this.$store.dispatch('bindBillFile', image).then(rs => {
          if (rs.flag === 'SUCCESS') {
            MessageBox('提示', '添加发票成功').then(() => {
              this.$router.push({ path: 'invoice' })
            })
          } else {
            MessageBox('提示', '发票与附件绑定失败').then(() => {
              this.$router.push({ path: 'invoice' })
            })
          }
        })
      })
    }
  }
}
export const feeMatchItem = {
  created () {
    Object.assign(this.query, this.$route.query)
    this.$store.dispatch('getCostItemList', 'BUSINESS_MAN').then((data) => {
      this.businessMan = data
    })
    this.feeList = this.pageData.list
    this.tmpInfo = this.reimburseTmpInfo.expTypeInfo[this.pageData.expenseType]
    if (!this.temInfo) return
    this.tmpInfo.forEach(ele => {
      this.feeList.forEach((item, index) => {
        if (!item.info) {
          item.info = {}
          item.info.people = ''
        }
        if (item.hasOwnProperty(ele.arField)) {
          switch (ele.infoId) {
            case 'DEPART_PLACE': case 'ARRIVAL_PLACE':
              let arr = []
              if (typeof item[ele.arField] === 'string') {
                arr = JSON.parse(item[ele.arField])
              } else {
                arr = item[ele.arField]
              }
              item.info[ele.infoId] = this.matchArea(arr)
              break
            case 'START_DATE': case 'END_DATE':
              item.info[ele.infoId] = item[ele.arField]
              break
            case 'BUSINESS_MAN':
              // 匹配出差人
              this.matchbusiMan(item[ele.arField], this.feeList[index])
              break
          }
        }
      })
    })
  },
  methods: {
    // 遍历地区，渲染数据
    matchArea (field) {
      if (!field) return
      let city = ''
      this.areaData.forEach((item) => {
        if (item.id === field[0]) {
          city += item.title + ' '
          item.childs.forEach((ele) => {
            if (ele.id === field[1] && !ele.childs) {
              city += ele.title
            } else if (ele.id === field[1] && ele.childs) {
              city += ele.title + ''
              ele.childs.forEach(ele0 => {
                if (ele0.id === field[2]) city += ele0.title
              })
            }
          })
        }
      })
      return city
    },
    // 遍历出差人，并渲染
    matchbusiMan (field, data) {
      const peopleArr = []
      setTimeout(() => {
        this.businessMan.forEach((item) => {
          item.sonList.forEach(item1 => {
            if (field instanceof Array) {
              field.forEach((item2) => {
                if (item1.id === item2) {
                  peopleArr.push(item1.sourceName)
                }
              })
            }
          })
        })
        this.$set(data, 'people', peopleArr.toString())
      }, 340)
    }
  }
}
export const watchTmp = {
  watch: {
    reimburseTmpInfo () {
      this.fillData()
    }
  },
  created () {
    if (Object.keys(this.reimburseTmpInfo).length) {
      this.fillData()
    }
  }
}
export const scrollCtl = {
  methods: {
    scrollAuto () {
      const scrollTop = this.$route.meta.scrollTop
      const content = document.querySelector('.page-infinite-list')
      if (scrollTop && content) {
        content.scrollTop = scrollTop
      }
    }
  }
}
