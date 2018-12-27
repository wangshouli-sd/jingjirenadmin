<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default{
  name: 'App',
  created() {
    // this.init()
  },
  methods: {
    init() {
      let baseurl = window.location.origin + '/web/index.php?c=site&a=entry&m=jc_jingjiren&do=index&'
      this.$store.dispatch('setbaseUrl', baseurl) // 设置默认url
    }
  }
}
</script>
