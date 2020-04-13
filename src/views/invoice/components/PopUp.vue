<template>
  <mt-popup class="pop-wrapper" v-model="popupVisible" popup-transition="popup-fade" :style="{ top: buttonBottom + 10 + 'px' }">
    <div v-if="realizeMtl" class="photo-scan flex" @click="chooseImage">图像识别</div>
    <div v-else class="photo-scan flex" @click="chooseImage">图像识别</div>
    <input v-if="!realizeMtl" id="upload_file" type="file" capture="camera" class="file-input" accept="image/png,image/jpeg,image/jpg" @change="inputChange"/>
  </mt-popup>
</template>
<script>
export default {
  name: 'PopUp',
  props: ['isShow'],
  data () {
    return {
      popupVisible: false,
      buttonBottom: '50%',
      realizeMtl: false
    }
  },
  watch: {
    isShow () {
      this.popupVisible = this.isShow
    },
    popupVisible () {
      if (this.popupVisible === false) {
        this.$emit('hideScan')
      }
    }
  },
  mounted () {
    // eslint-disable-next-line
    const platform = mtl.platform
    const file = document.getElementById('upload_file')
    if (platform === 'ios' || platform === 'android') {
      this.realizeMtl = true
    }
    if (this.getIos()) {
      file.removeAttribute('capture')
    }
  },
  methods: {
    getIos () {
      // eslint-disable-next-line
      if (!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        return true
      } else {
        return false
      }
    },
    chooseImage () {
      this.popupVisible = false
      const that = this
      // eslint-disable-next-line
      mtl.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          const localIds = res.localIds
          // eslint-disable-next-line
          mtl.getLocalImgData({
            localId: localIds[0],
            success: function (res) {
              that.nextTo(res.localData)
            }
          })
        },
        fail: function (err) {
          const message = err.message // 错误信息
          alert(message)
        }
      })
    },
    inputChange (e) {
      this.popupVisible = false
      const that = this
      let files = e.target.files
      // eslint-disable-next-line
      ImageCompress(files[0], function (data) {
        that.nextTo(data)
      })
    },
    nextTo (base64) {
      const that = this
      that.$store.dispatch('uploadImage', base64).then((data) => {
        that.$store.dispatch('identifyInvoice', data.filePath).then((res) => {
          if (res) {
            const invoiceType = res.invoiceType
            switch (invoiceType) {
              case '01': case '04': case '10': case '11': that.$router.push({ path: 'OrdinaryVATInvoice' }); break
              case '91': that.$router.push({ path: 'TaxiFare' }); break
              case '92': that.$router.push({ path: 'TrainTicket' }); break
              case '93': that.$router.push({ path: 'AirTicket' }); break
              case '24': that.$router.push({ path: 'QuotaInvoice' }); break
              case '98': that.$router.push({ path: 'PontageInvoice' }); break
              default: that.$router.push({ path: 'OtherInvoice' }); break
            }
          } else {
            this.popupVisible = false
          }
        })
      })
    }
  }
}
</script>

<style lang="scss">
  .pop-wrapper {
    background: none;
    transform: translate(-50%, -50%);
    color: #fff;
    .photo-scan {
      background: #4ADDBF;
      margin: 0 auto;
    }
    #upload_file {
      width: 600px;
      height: 260px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
    }
    .photo-scan {
      width: 600px;
      height: 260px;
      border-radius: 20px;
      justify-content: center;
      font-size: 50px;
    }
  }
</style>
