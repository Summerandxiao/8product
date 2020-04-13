<template>
  <div class="input-code-wrapper">
    <nav-title :title="title" :path="path" :query="query"></nav-title>
    <div class="para">输入取件密码</div>
    <div class="tip">当前投递柜：{{ cabinet.cabinetName }}，编号{{ cabinet.cabinetNo }}，位于{{ cabinet.cabinetAddress }}</div>
    <div class="input-content flex">
      <input v-model.trim.number="input0" ref="input0" @keydown.8="deleteValue('input0','input0')" @keyup="changeValue($event,'input0','input1')" type="number">
      <input v-model.trim.number="input1" ref="input1" @keydown.8="deleteValue('input1','input0')" @keyup="changeValue($event,'input1','input2')" type="number">
      <input v-model.trim.number="input2" ref="input2" @keydown.8="deleteValue('input2','input1')" @keyup="changeValue($event,'input2','input3')" type="number">
      <input v-model.trim.number="input3" ref="input3" @keydown.8="deleteValue('input3','input2')" @keyup="changeValue($event,'input3','input4')" type="number">
      <input v-model.trim.number="input4" ref="input4" @keydown.8="deleteValue('input4','input3')" @keyup="changeValue($event,'input4','input5')" type="number">
      <input v-model.trim.number="input5" ref="input5" @keydown.8="deleteValue('input5','input4')" @keyup="changeValue($event,'input5','input5')" type="number">
    </div>
    <div class="code">请输入验证码：{{ pickupCode }}</div>
  </div>
</template>
<script>
import navTitle from '@/components/navTitle'

export default {
  name: 'InputCode',
  components: {
    navTitle
  },
  data () {
    return {
      title: '取退单据',
      path: 'chooseCabinet',
      pickupCode: 999999,
      input0: '',
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      input5: '',
      type: 0,
      cabinet: {},
      query: {}
    }
  },
  created () {
    this.type = Number(this.$route.query.type)
    this.query.type = Number(this.$route.query.type)
    this.cabinet = this.$route.query.data
    if (this.$route.query.pickupCode) {
      this.pickupCode = this.$route.query.pickupCode
    }
  },
  mounted () {
  },
  methods: {
    deleteValue (inputValue, previousItem) { // 键盘按下时$event，当前input，上一个input
      if (this[inputValue].length > 0) { // 当前有值，清空之
        this[inputValue] = ''
      } else { // 当前没有值，光标跳转到上一个input，并清空该input值
        this.$nextTick(() => {
          this.$refs[previousItem].focus()
          this[previousItem] = ''
          this[inputValue] = ''
        })
      }
    },
    changeValue (e, inputValue, nextItem) { // 键盘抬起时$event，当前input，下一个input
      if (e.keyCode !== 8) {
        this.$nextTick(() => {
          this.$refs[nextItem].focus() // 截取当前值最后一位，跳到下一个input
          this[inputValue] = (this[inputValue]).toString().slice(-1)
          if (inputValue === 'input5') {
            let str = ''
            str = `${this.input0}${this.input1}${this.input2}${this.input3}${this.input4}${this[inputValue]}`
            if (str === this.pickupCode.toString()) {
              let url = ''
              let obj = {}
              switch (this.type) {
                case 2:
                  url = 'getStorage'
                  obj = { cabinetId: this.cabinet.id, password: str }
                  break
                case 4:
                  url = 'pickupbycode'
                  obj = { cabinetId: this.cabinet.id, pickupCode: this.pickupCode }
                  break
              }
              this.$store.dispatch(url, obj).then((id) => {
                this.$router.push({ path: 'operation', query: { type: this.type, id, address: this.cabinet.cabinetAddress } })
              })
            } else {
              this.$message('提示', '验证码错误，请重新输入')
            }
          }
        })
      }
    }
  }
}
</script>
<style lang="scss">
  .input-code-wrapper {
    width: 660px;
    padding: 192px 45px 60px;
    background: #fff;
    text-align: center;
    .para {
      color: #333;
      font-size: 40px;
      margin-bottom: 30px;
    }
    .tip {
      font-size: 32px;
      color: rgba(153,153,153,1);
      line-height: 45px;
    }
    .input-content {
      margin-top: 80px;
      justify-content: space-between;
      input {
        width: 90px;
        height: 114px;
        text-align: center;
        border: 1px solid #ddd;
        font-size: 40px;
      }
    }
    /* 去掉input[type=number]浏览器默认的icon显示 */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button { // chrome
      -webkit-appearance: none;
      appearance: none;
      margin: 0;
    }
    input{ // 火狐
      -moz-appearance:textfield;
    }
    .code {
      font-size: 40px;
      letter-spacing: 10px;
      margin-top: 20px;
    }
  }
  @supports (bottom: env(safe-area-inset-bottom)){
    .input-code-wrapper {
      padding-top: calc(148px + constant(safe-area-inset-top));
      padding-top: calc(148px + env(safe-area-inset-top));
    }
  }
</style>
