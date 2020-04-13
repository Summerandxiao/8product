<template>
  <div class="deliver-wrapper">
    <nav-title :title="title" :path="path"></nav-title>
    <div class="deliver-card" v-for="item in deliver" :key="item.billDeliver">
      <router-link :to="{ name: 'chooseCabinet', query: { type: item.type } }" :class="deliverType[item.type]">{{ item.billDeliver }}</router-link>
    </div>
  </div>
</template>
<script>
import navTitle from '@/components/navTitle'
export default {
  data () {
    return {
      title: '我的投递',
      path: 'main',
      deliver: [
        {
          billDeliver: '报销人投递单据',
          type: 1
        },
        {
          billDeliver: '财务取单据',
          type: 2
        },
        {
          billDeliver: '财务退单据',
          type: 3
        },
        {
          billDeliver: '报销人取退单据',
          type: 4
        }
      ],
      deliverType: {
        '1': 'put-bill',
        '2': 'get-bill',
        '3': 'put-bill',
        '4': 'get-bill'
      }
    }
  },
  components: {
    navTitle
  }
}
</script>
<style lang="scss">
.deliver-wrapper {
  width: 100%;
  height: 100%;
  background: #4C4C4C;
  padding-top: 164px;
  box-sizing: border-box;
  .deliver-card {
    a {
      display: block;
      font-size: 40px;
      color: #fff;
      width: 500px;
      line-height: 245px;
      margin: 24px auto;
      padding-left:20px;
      box-sizing: border-box;
    }
    .put-bill {
      background: url('../../assets/images/deliver1.png');
      background-size: 100% 100%;
    }
    .get-bill {
      background: url('../../assets/images/deliver2.png');
      background-size: 100% 100%;
    }
  }
}
@supports (bottom: env(safe-area-inset-bottom)){
  .deliver-wrapper {
    padding-top: calc(120px + constant(safe-area-inset-top));
    padding-top: calc(120px + env(safe-area-inset-top));
  }
}
</style>
