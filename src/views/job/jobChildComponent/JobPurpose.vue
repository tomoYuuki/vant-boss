<template>
  <!--城市弹出-->
  <van-popup
    v-model="isPurposePopupShow"
    position="right"
    :style="{ height: '100%', width: '100%' }"
  >
    <van-nav-bar
      title="求职意向"
      left-arrow
      @click-left="onClickLeft"
      :border="false"
      :placeholder="true"
    />

    <!--求职状态-->
    <van-cell
      title="求职状态"
      is-link
      :value="jobState"
      @click="stateClickFn"
    />
    <!--picker弹出-->
    <van-popup
      v-model="isPickerPopupShow"
      position="bottom"
      :style="{ height: '40%' }"
      :close-on-click-overlay="false"
      @click-overlay="closePickerPopup"
    >
      <van-picker
        title="标题"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>
  </van-popup>
</template>

<script>
import { Popup } from "vant";
import { NavBar } from "vant";
import { Picker } from "vant";
import { Cell, CellGroup } from "vant";
export default {
  name: "JobPurpose",
  data() {
    return {
      jobState: "暂无",
    };
  },
  props: {
    isPurposePopupShow: {
      type: Boolean,
      default: false,
    },
    isPickerPopupShow: {
      type: Boolean,
      default: false,
    },
    columns: {
      type: Array,
      default() {
        return ["离职-随时到岗", "在职-月内到岗"];
      },
    },
  },
  components: {
    [Popup.name]: Popup,
    [NavBar.name]: NavBar,
    [Picker.name]: Picker,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
  },
  methods: {
    onClickLeft() {
      this.$emit("onClickLeft");
    },
    stateClickFn() {
      this.$emit("stateClickFn");
    },
    onConfirm(value) {
      this.jobState = value;
      this.$emit("stateChooseEmit");
    },
    onCancel() {
      this.$emit("stateCancelEmit");
    },
    closePickerPopup() {
      this.$emit("closePickerPopup");
    },
  },
};
</script>

<style scoped></style>
