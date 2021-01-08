<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  methods: {
    scrollTo(x, y, time = 300) {
      //先判断是否有值，没值就不执行了
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    getY() {
      return this.scroll ? this.scroll.y : 0;
    }
  },
  mounted() {
    //BScroll的实例化要放在mounted里面，要保证在dom节点挂载后再实例化
    // this.$nextTick(() => {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      observeDOM: true, //这个是处理图片没加载完，高度计算错误的bug的；如果还不行就需要调refresh方法
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });

    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", position => {
        this.$emit("scroll", position);
      });
    }
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("loadMore");
      });
    }

    // this.scroll.refresh();
    // });
  }
};
</script>

<style scoped></style>
