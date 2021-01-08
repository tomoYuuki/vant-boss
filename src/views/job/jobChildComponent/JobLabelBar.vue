<template>
  <div class="job-bar-container">
    <div>
      <van-button size="mini" class="btn1" @click="clickBtn">前端</van-button>

      <van-button size="mini" class="btn1">最新</van-button>
    </div>
    <div>
      <van-button
        type="default"
        size="mini"
        class="btn2"
        @click="showCityPopup"
      >
        {{ city }}
      </van-button>

      <van-button
        type="default"
        size="mini"
        class="btn2"
        @click="showFilterPopup"
        >筛选</van-button
      >
    </div>
  </div>
</template>

<script>
import { Button } from "vant";
import { Col, Row } from "vant";
export default {
  name: "JobLabelBar",
  props: {
    city: {
      type: String,
      deafult: "",
    },
  },
  components: {
    [Button.name]: Button,
    [Col.name]: Col,
    [Row.name]: Row,
  },
  methods: {
    clickBtn() {
      this.$emit("refreshClick");
    },
    showCityPopup() {
      this.$emit("showCityPopup");
    },
    showFilterPopup() {
      this.$emit("showFilterPopup");
    },
  },
};
</script>

<style scoped>
.job-bar-container {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  margin-top: 5px;
  margin-bottom: 10px;
  background: #fff;
}
.btn1 {
  border: 0;
}
.btn2 {
  background: #f0f0f0;
}
</style>
