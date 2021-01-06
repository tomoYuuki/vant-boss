<template>
  <div class="login-container">
    <van-swipe :autoplay="3000" class="loginMask" :show-indicators="false">
      <van-swipe-item v-for="index in 3" :key="index" class="swipe-item">
        <img src="~assets/img/loginMask/1.jpg" alt="" />
      </van-swipe-item>
    </van-swipe>
    <div class="button-group">
      <van-button type="primary">我要招人</van-button>
      <van-button type="primary" @click="clickBtn">我要应聘</van-button>
    </div>
  </div>
</template>

<script>
//轮播图
import { Swipe, SwipeItem } from "vant";
//按钮
import { Button } from "vant";
export default {
  name: "Login",

  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Button.name]: Button,
  },
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    //进入用户（求职者）应聘页面
    clickBtn() {
      this.$router.push("/job");
    },
  },
};
</script>

<style lang="less" scoped>
.login-container {
  height: 100%;
  .loginMask {
    .swipe-item {
      height: 100%;
      img {
        height: 100%;
        width: 100%;
      }
    }
  }
  .button-group {
    position: absolute;
    bottom: 1rem;
    width: 100%;
    display: flex;
    justify-content: center;
    .van-button {
      margin-right: 10px;
    }
  }
}
</style>
