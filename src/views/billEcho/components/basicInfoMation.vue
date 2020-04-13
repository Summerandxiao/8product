<template>
    <div class="basic">
       <div class='basic-title' style="padding-top: 46px;">{{ areData.area.BASE.aliasName }}</div>
       <div v-for="item in areData.areaInfo[typeString + 'BASE']" :key="item.infoId">
         <mt-field  :label="item.infoName"  v-model="baseFormData[item.arField]"  v-if="item.isShow === 'Y'"></mt-field>
       </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['thisAredata'],
  components: {
  },
  data () {
    return {
      data: '',
      title: '我的单据',
      path: 'main',
      baseFormData: {}
    }
  },
  computed: {
    ...mapGetters(['areData', 'userInfo', 'typeString'])
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      console.log('its BASE,Im ready')
    }
  }
}
</script>
<style lang="scss">
.basic{
  background:rgba(255,255,255,1);
  width: 100%;
  .basic-title{
    width:144px;
    height:50px;
    font-size:36px;
    font-family:PingFangSC-Semibold,PingFangSC;
    font-weight:600;
    color:rgba(51,51,51,1);
    line-height:50px;
    margin-left: 32px;
    margin-top: 30px
  }
  .mint-cell-wrapper{
    font-size:32px;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:45px;
  }
  .mint-field-core{
    text-align: right
  }
  .mint-cell-title {
    width: 30%;
  }
}
</style>
