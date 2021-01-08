<template>
  <van-nav-bar left-text="Web前端" right-text="按钮">
    <template #right>
      <van-icon name="plus" size="20" color="white" @click="clickPlus" />
      <van-icon name="search" size="20" color="white" class="search-icon" />
    </template>
  </van-nav-bar>
</template>

<script>
import { NavBar, Icon } from "vant";
export default {
  name: "JobNavBar",
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
  },
  methods: {
    clickPlus() {
      this.$emit("clickPlus");
    },
  },
};
</script>

<style scoped>
.van-nav-bar {
  background: #14c1bb;
}
.van-nav-bar >>> .van-nav-bar__text {
  font-size: 14px;
  color: #fff;
}
.search-icon {
  border-left: 1px solid #c1c1c1;
  margin-left: 10px;
  padding-left: 10px;
}
</style>
