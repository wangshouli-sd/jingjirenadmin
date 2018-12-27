<template>
  <div :class="isCollapse == true?'scrollbar-header-hide':'scrollbar-header-open'" class="header-logo">
    <div class="avatar-wrapper">
      <img :src="logopath" alt="" class="scrollbar-header-logo">
    </div>
    <svg-icon class="scrollbar-wrapper-icon" icon-class="peoples" />
    <div class="header-hamburger">
      <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
import { showtitleparams } from '@/api/set/index.js'
export default {
  components: {
    Hamburger
  },
  filters: {
    logoFilter(status) {
      if (status) {
        return status
      } else {
        return '@/assets/images/logo.png'
      }
    }
  },
  data() {
    return {
      icon: ''
    }
  },
  computed: {
    isCollapse() {
      return !this.sidebar.opened
    },
    ...mapState({
      pagetitle: state => state.setindex.pageparmas.pagetitle,
      logopath: state => state.setindex.logoimg.path
    }),
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ])
  },
  created() {
    this.handleinitpage()
  },
  methods: {
    handleinitpage() {
      showtitleparams().then((res) => {
        if (res.title) {
          document.title = res.title
        } else {
          document.title = '全民经纪人 赏金业务员'
        }
        this.$store.dispatch('setindex/setpageparmas', res)
      })
    },
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .header-hamburger{
    height: 40px;
    line-height: 40px;
    position: absolute;
    bottom: 0px;
    right: 0px;
    left: 0px;
    background: white;
    transition: width 0.1s linear, height 0.1s linear;
    border-bottom: 1px solid #e0e0e0;
    /*border: 1px solid black;*/
  }
  .header-logo{
    position: relative;
    transition: width 0.28s, height 0.28s;
  }
  .scrollbar-header-open{
    background: rgb(239,244,250);
    height: 130px;
    width: 180px;
    position: absolute;
    top: 0;left: 0;
    z-index: 2;
    text-align: center;
    .scrollbar-header-logo{
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin-top: 20px;
      transform: scale(1);
      transition: transform linear 0.2s;
    }
    .scrollbar-wrapper-icon{
      font-size: 5px;
      transition: transform linear 0.2s;
      transform: scale(0);
    }
  }
  .scrollbar-header-hide{
    background: rgb(239,244,250);
    /*height: 80px;*/
    height: 130px;
    width: 36px;
    position: absolute;
    top: 0;left: 0;
    z-index: 2;
    text-align: center;
    .scrollbar-header-logo{
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin-top: 20px;
      transform: scale(0);
      height: 0px;
      transition: transform linear 0.2s ,height linear 0.2s;
    }
    .scrollbar-wrapper-icon{
      font-size: 20px;
      margin: 8px;
      transition: transform linear 0.2s;
      transform: scale(1);
    }
  }

</style>
