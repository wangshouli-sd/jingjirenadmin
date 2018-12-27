<template>
  <el-scrollbar :class="{ 'scrollbar-wrapper-hide' : isCollapse }" wrap-class="scrollbar-wrapper" class="scrollbar-wrapper">
    <el-menu :collapse="isCollapse">
      <!--<router-link to="/project/index">-->
      <!--<el-menu-item class="submenu-title-noDropdown">-->
      <!--<i class="el-icon-message"></i>-->
      <!--<span slot="title">最新消息</span>-->
      <!--</el-menu-item>-->
      <!--</router-link>-->
      <!--<router-link to="/project/index">-->
      <!--<el-menu-item class="submenu-title-noDropdown">-->
      <!--<i class="el-icon-service"></i>-->
      <!--<span slot="title">联系客服</span>-->
      <!--</el-menu-item>-->
      <!--</router-link>-->
      <!--<router-link to="/opinion/index">-->
      <!--<el-menu-item class="submenu-title-noDropdown">-->
      <!--<i class="el-icon-edit-outline"></i>-->
      <!--<span slot="title">意见反馈</span>-->
      <!--</el-menu-item>-->
      <!--</router-link>-->
      <!--<router-link to="/project/index">-->
      <!--<el-menu-item class="submenu-title-noDropdown">-->
      <!--<i class="el-icon-bell"></i>-->
      <!--<span slot="title">系统提示</span>-->
      <!--</el-menu-item>-->
      <!--</router-link>-->

    </el-menu>

  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .scrollbar-wrapper{
    width: 160px;
    position: fixed;
    right: -180px;
    /*右侧导航栏开启right = 0*/
    /*right: 0;*/
    top: 176px;
    bottom: 0px;
    background: white;
    transition: right 0.2s linear;
    .el-submenu .el-menu-item{
      min-width: 180px !important;
    }
    .submenu-title-noDropdown{
      color: rgb(96, 98, 102);
    }
  }
  .scrollbar-wrapper-open{
    right: -180px;
    /*右侧导航栏开启right = 0*/
    /*right: 0;*/
  }
  .scrollbar-wrapper-hide{
    right: -180px;
  }
</style>
