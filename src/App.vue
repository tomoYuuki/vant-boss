<template>
  <div id="app">
    <router-view></router-view>
    <van-tabbar v-if="showTabbar" v-model="activeIndex">
      <van-tabbar-item icon="home-o" to="/job">职位</van-tabbar-item>
      <van-tabbar-item icon="search" to="/discover">发现</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/message">消息</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/profile">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
//tabbar
import { Tabbar, TabbarItem } from "vant";

export default {
  name: "App",
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
  },
  data() {
    return {
      activeIndex: 0,
    };
  },
  computed: {
    showTabbar() {
      return this.$route.path !== "/Login";
    },
  },
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {},
};
</script>

<style scoped></style>
