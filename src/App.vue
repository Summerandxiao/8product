<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #F1F3F6;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  a {
    &, &:active, &:visited {
      text-decoration: none;
    }
  }
}
#nav {
  padding: 30px;
}
.flex {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.mint-indicator-text {
  font-size: 28px;
}
.mint-spinner-fading-circle {
  display: inline-block;
  vertical-align: middle;
}
.page-infinite-loading {
  margin: 0 0 20px;
  text-align: center;
}
.mint-msgbox {
  &-title, &-content, &-confirm {
    font-size: 32px;
  }
  &-message {
    font-size: 32px;
    line-height: 100px;
  }
  &-content {
    padding: 40px 0;
  }
  &-btns {
    padding: 20px 0;
  }
}
.dotted-line-1px {
  position: relative;
  border: none;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    border: 1px dashed #eee;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 200%;
    height: 200%;
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
    -webkit-transform-origin: left top;
    transform-origin: left top;
  }
}
.line-1px {
  position: relative;
  border: none;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    border: 1px solid #eee;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 200%;
    height: 200%;
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
    -webkit-transform-origin: left top;
    transform-origin: left top;
  }
}
</style>
