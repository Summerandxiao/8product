const toDate = (value) => {
  if (value.length === 8) {
    let year = value.substring(0, 4)
    let month = value.substring(4, 6)
    let day = value.substring(6, 8)
    return `${year}-${month}-${day}`
  } else {
    return value
  }
}
// 金额千分位加逗号
// const numFormat = (num) => {
//   let c = ''
//   if (num) {
//     c = (num.toString().indexOf('.') !== -1) ? num.toFixed(2).toLocaleString() : num.toFixed(2).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
//   }
//   return c
// }
const numFormat = (num) => {
  if (typeof (num) === 'number') {
    return (num).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  }
}
export default {
  toDate,
  numFormat
}
