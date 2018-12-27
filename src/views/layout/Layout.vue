<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <logo class="logo"/>
    <sidebar class="sidebar-container"/>
    <div class="backbtn">
      <a target="_self" href="/web/index.php" >
        返回系统
      </a>
    </div>
    <div class="main-container">
      <!--<navbar/>-->
      <tags-view/>
      <app-main/>
      <sidebar-right class="sidebarright"/>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, SidebarRight, AppMain, TagsView, Logo } from './components'
import ResizeMixin from './mixin/ResizeHandler'
export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    SidebarRight,
    AppMain,
    TagsView,
    Logo
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  /*新增*/
  .main-container{
    background: rgb(239,244,250);
  }
  .sidebar-container{
    /*margin-top: 100px;*/
    /*border: 1px solid black;*/
    /*overflow-y: scroll;*/
  }
  .sidebarright{
    margin-bottom: -17px;
  }
  .backbtn{
    position: absolute;
    left: 0px;
    bottom: 0px;
    height: 40px;
    line-height: 40px;
    width: 180px;
    padding-left: 40px;
    color: rgb(96, 98, 102);
    font-size: 14px;
    border-top: 1px solid #dfe2e6;
  }
  /*.logo{*/
    /*height: 100px;*/
    /*position: absolute;*/
    /*left: 0px;*/
    /*top: 0px;*/
  /*}*/
</style>
