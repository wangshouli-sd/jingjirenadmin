<template>
  <div class="view-wrapper">
    <div class="wel-view-container">
      <el-row style="height: 100%;">
        <el-col :span="16" class="wel-view-left">
          <div class="wel-view-title">{{ welcome }}</div>
          <div class="wel-view-desc">心存梦想，机会就会笼罩你</div>
        </el-col>
        <el-col :span="4" class="wel-view-right">
          <div class="wel-view-r-num">
            <div class="view-r-num-t">经纪人人数</div>
            <div class="view-r-num-b">{{ money.membercount }}</div>
          </div>
          <div class="wel-view-r-chart">
            <svg-icon icon-class="tb" style="font-size: 50px"/>
          </div>
        </el-col>
        <el-col :span="4" class="wel-view-right">
          <div class="wel-view-r-num">
            <div class="view-r-num-t">累计完成业务</div>
            <div class="view-r-num-b">{{ money.taskcount }}</div>
          </div>
          <div class="wel-view-r-chart">
            <svg-icon icon-class="tb" style="font-size: 50px"/>
          </div>

        </el-col>
      </el-row>
    </div>
    <div class="tags-view-container">
      <scroll-pane ref="scrollPane" class="tags-view-wrapper" style=" border-bottom: 1px solid #e0e0e0;height: 40px;">
        <router-link
          v-for="tag in Array.from(visitedViews)"
          ref="tag"
          :class="isActive(tag)?'active':''"
          :to="tag"
          :key="tag.path"
          class="tags-view-item"
          @contextmenu.prevent.native="openMenu(tag,$event)">
          {{ tag.title }}
          <span class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)"/>
        </router-link>
      </scroll-pane>
      <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
        <li @click="refreshSelectedTag(selectedTag)">刷新</li>
        <li @click="closeSelectedTag(selectedTag)">关闭</li>
        <li @click="closeOthersTags">关闭其他</li>
        <li @click="closeAllTags">关闭全部</li>
      </ul>
    </div>
  </div>
</template>

<script>
import ScrollPane from '@/components/ScrollPane'
import { mapState } from 'vuex'
import { totalmoney } from '@/api/home/index.js'
export default {
  components: { ScrollPane },
  data() {
    return {
      welcome: '',
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {}
    }
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    },
    ...mapState({
      money: state => state.homeindex.money // 财务中心数值
    })
  },
  watch: {
    $route() {
      this.addViewTags()
      this.moveToCurrentTag()
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted() {
    this.addViewTags()
  },
  created() {
    this.init()
  },
  methods: {
    generateRoute() {
      if (this.$route.name) {
        return this.$route
      }
      return false
    },
    isActive(route) {
      return route.path === this.$route.path
    },
    addViewTags() {
      const route = this.generateRoute()
      if (!route) {
        return false
      }
      this.$store.dispatch('addView', route)
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag.$el)

            // when query is different then update
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.dispatch('updateVisitedView', this.$route)
            }

            break
          }
        }
      })
    },
    refreshSelectedTag(view) {
      this.$store.dispatch('delCachedView', view).then(() => {
        const { fullPath } = view
        this.$nextTick(() => {
          this.$router.replace({
            path: '/redirect' + fullPath
          })
        })
      })
    },
    closeSelectedTag(view) {
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
        if (this.isActive(view)) {
          const latestView = visitedViews.slice(-1)[0]
          if (latestView) {
            this.$router.push(latestView)
          } else {
            this.$router.push('/')
          }
        }
      })
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag)
      this.$store.dispatch('delOthersViews', this.selectedTag).then(() => {
        this.moveToCurrentTag()
      })
    },
    closeAllTags() {
      this.$store.dispatch('delAllViews')
      this.$router.push('/')
    },
    openMenu(tag, e) {
      this.visible = true
      this.selectedTag = tag
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      this.left = e.clientX - offsetLeft + 15 // 15: margin right
      this.top = e.clientY
    },
    closeMenu() {
      this.visible = false
    },
    init() { // 初始化财务中心参数 api
      totalmoney().then((res) => {
        this.$store.dispatch('homeindex/totalmoney', res)
      })
      var timestamp = new Date()
      if (timestamp.getHours() > 3 && timestamp.getHours() <= 9) {
        this.welcome = '管理员，早上好！'
      } else if (timestamp.getHours() > 9 && timestamp.getHours() <= 12) {
        this.welcome = '管理员，上午好！'
      } else if (timestamp.getHours() > 12 && timestamp.getHours() <= 18) {
        this.welcome = '管理员，下午好！'
      } else if (timestamp.getHours() > 18 && timestamp.getHours() <= 22) {
        this.welcome = '管理员，晚上好!'
      } else {
        this.welcome = '管理员，晚上好！夜深了，注意休息!'
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .view-wrapper{
    /*height: 130px;*/
  }
  .tags-view-container {
    height: 40px;
    width: 100%;
    background: #fff;
    /*border-bottom: 1px solid #d8dce5;*/
    /*box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);*/
    .tags-view-wrapper {
      .tags-view-item {
        display: inline-block;
        position: relative;
        height: 26px;
        line-height: 26px;
        border: 1px solid #e5e9f2;
        -webkit-border-radius: 6px;
        -webkit-border-radius: 6px;
        -moz-border-radius: 6px;
        border-radius: 6px;
        color: #495060;
        background: #fff;
        padding: 0 8px;
        font-size: 12px;
        margin-left: 5px;
        margin-top: 6px;
        margin-bottom: 4px;
        &:first-of-type {
          margin-left: 15px;
        }
        &:last-of-type {
          margin-right: 15px;
        }
        &.active {
          background-color: #42b983;
          color: #fff;
          border-color: #42b983;
          &::before {
            content: '';
            background: #fff;
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            position: relative;
            margin-right: 2px;
          }
        }
        .el-icon-close {
          width: 16px;
          height: 16px;
          vertical-align: 2px;
          border-radius: 50%;
          text-align: center;
          transition: all .3s cubic-bezier(.645, .045, .355, 1);
          transform-origin: 100% 50%;
          &:before {
            transform: scale(.6);
            display: inline-block;
            vertical-align: -3px;
          }
          &:hover {
            background-color: #b4bccc;
            color: #fff;
          }
        }
      }
    }
    .contextmenu {
      margin: 0;
      background: #fff;
      z-index: 100;
      position: absolute;
      list-style-type: none;
      padding: 5px 0;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 400;
      color: #333;
      box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
      li {
        margin: 0;
        padding: 7px 16px;
        cursor: pointer;
        &:hover {
          background: #eee;
        }
      }
    }
  }
  .wel-view-container{
    height: 90px;
    background: #FFFFFF;
    font-family: "PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    .wel-view-left{
      height: 100%;
      padding-left: 30px;
      .wel-view-title{
        color: #0083FF;
        font-size: 22px;
        margin-top: 16px;
      }
      .wel-view-desc{
        font-size: 14px;
        color:#898989;
        margin-top: 16px;
      }
    }
    .wel-view-right{
      height: 100%;
      .wel-view-r-num{
        display: inline-block;
        width: 50%;
        height: 100%;
        vertical-align: middle;
        text-align: center;
        /*line-height: 30px;*/
        .view-r-num-t{
          margin-top: 22px;
          font-size: 12px;
        }
        .view-r-num-b{
          font-size: 16px;
          margin-top: 8px;
          color: #0083FF;
        }
      }
      .wel-view-r-chart{
        display: inline-block;
        width: 40%;
        height: 100%;
        vertical-align: middle;
        padding-top: 20px;
        text-align: center;
      }
    }
  }
</style>
