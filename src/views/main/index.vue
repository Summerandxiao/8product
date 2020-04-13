<template>
  <div class="main-wrapper">
    <nav-title :title="title" :toUser="true"></nav-title>
    <mt-swipe :auto="2000">
      <mt-swipe-item v-for="item in items" :key="item.label">
        <img class="image" :src="item.image">
      </mt-swipe-item>
    </mt-swipe>
    <div class="main-content flex">
      <div
        v-for="item in menuList"
        :key="item.id"
        :class="[item.menuIcon ? 'content-item': 'item-empty', 'flex']">
        <div v-if="item.menuIcon">
          <router-link v-if="item.menuUrl" :to="item.menuUrl" class="icon">
            <img class="module-image" :src="'data:image/png;base64,' + item.menuIcon">
          </router-link>
          <div v-else class="icon" @click="alertMessage">
            <img class="module-image" :src="item.menuIcon">
          </div>
          <i>{{item.menuName}}</i>
        </div>
        <div v-else></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as Auth from '@/utils/auth'
import * as dd from 'dingtalk-jsapi' // 此方式为整体加载，也可按需进行加载
import navTitle from '@/components/navTitle'
import mainData from './mainData.json'

export default {
  name: 'mainPage',
  components: {
    navTitle
  },
  data () {
    return {
      title: '移动警保',
      items: [],
      icons: [],
      menuList: []
    }
  },
  created () {
    this.integrateData()
    if (Auth.getStorage('userInfo')) {
      this.menuList = JSON.parse(Auth.getStorage('menuList'))
    } else {
      this.$store.dispatch('cwGetUserInfo').then(res => {
        var roleId = res.roleId
        this.$store.dispatch('getMenuListByRole', roleId).then(res => {
          this.menuList = res
        })
      })
    }
    if (dd.ios) {
      dd.biz.navigation.setLeft({
        control: true, // 是否控制点击事件，true 控制，false 不控制， 默认false
        text: '返回', // 控制显示文本，空字符串表示显示默认文本
        onSuccess: (result) => {
          this.$store.dispatch('loginOut').then(() => {
            this.$router.push({ path: 'login' })
          })
        },
        onFail: (err) => {
          alert(err)
        }
      })
    }
    if (dd.android) {
      document.addEventListener('backbutton', (e) => {
        e.preventDefault()
        this.$store.dispatch('loginOut').then(() => {
          this.$router.push({ path: 'login' })
        })
      })
    }
  },
  methods: {
    integrateData () {
      mainData.banner.forEach(ele => {
        ele.image = require('@/assets/images/' + ele.name)
      })
      this.items = mainData.banner
    },
    alertMessage () {
      this.$message('', '该功能正在开发')
    }
  }
}
</script>

<style lang="scss">
.main-wrapper {
  position: fixed;
  left: 0;
  top: 144px;
  right: 0;
  bottom: 0;
  background: #fff;
  .mint-swipe, .image {
    width: 686px!important;
    height: 360px!important;
    border-radius: 10px;
  }
  .module-image {
    width: 60px;
  }
  .mint-swipe {
    padding: 20px 32px;
    background: #F1F3F6;
    .mint-swipe-indicators {
      bottom: 20px;
      .mint-swipe-indicator {
        margin: 0 10px;
      }
    }
  }
  .main-content {
    // height: 700px;
    padding: 42px 10px 0;
    overflow-y: scroll;
    margin: 0 auto;
    flex-flow: wrap;
    justify-content: space-between;
    align-items: center;
    .iconfont:before {
      color: #fff;
      font-size: 70px;
    }
    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 20px 0 20px;
    }
    i {
      font-style: normal;
      font-size: 26px;
      font-weight: 400;
      color: #666;
    }
    .content-item, .item-empty {
      width: 25%;
      margin: 24px 0;
      justify-content: center;
      flex-direction: column;
      &:nth-child(4n-1) {
        margin: 0 0;
      }
    }
  }
}
@supports (bottom: env(safe-area-inset-bottom)){
  .main-wrapper {
    top: calc(100px + constant(safe-area-inset-top));
    top: calc(100px + env(safe-area-inset-top));
  }
}
a {
  text-decoration: none;
}
.mint-msgbox-content {
  font-size: 32px;
  padding: 40px 0;
}
.mint-msgbox-btns {
  padding: 20px 0;
  .mint-msgbox-confirm {
    font-size: 32px;
  }
}
</style>
