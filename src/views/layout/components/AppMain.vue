<template>
  <section :class="{ 'app-main-open' : isCollapse }" class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key"/>
      </keep-alive>
    </transition>
  </section>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AppMain',
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    },
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    }
  }
}
</script>

<style scoped>
.app-main {
  /*84 = navbar + tags-view = 50 +34 */
  /*min-height: calc(100vh - 84px);*/
  /*position: relative;*/
  overflow-x: hidden;
  overflow-y: scroll;
  position: absolute;
  top: 132px;
  left: 0px;
  right: 0px;
  /*右侧导航栏开启right = 0*/
  /*right: 160;*/
  bottom: 0px;
  transition: right 0.2s linear;
}
.app-main-open{
   right: 0px;
 }
::-webkit-scrollbar-track-piece {
  /*background: #d3dce6;*/
  background: rgba(255,255,255,0);
}
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-thumb {
  background: #99a9bf;
  /*background: rgba(0,0,0,0);*/
  border-radius: 20px;
}
/*::-webkit-scrollbar 滚动条整体部分，可以设置宽度啥的*/
/*::-webkit-scrollbar-button 滚动条两端的按钮*/
/*::-webkit-scrollbar-track  外层轨道*/
/*::-webkit-scrollbar-track-piece  内层滚动槽*/
/*::-webkit-scrollbar-thumb 滚动的滑块*/
/*::-webkit-scrollbar-corner 边角*/
/*::-webkit-resizer 定义右下角拖动块的样式*/
</style>

