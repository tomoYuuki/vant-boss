<template>
  <div class="job-container">
    <van-sticky>
      <job-nav-bar @clickPlus="clickNavBarPlus"></job-nav-bar>
      <job-label-bar
        :city="city"
        @showCityPopup="showCityPopup"
        @refreshClick="refreshClick"
        @showFilterPopup="showFilterPopupFn"
      ></job-label-bar>
    </van-sticky>
    <scroll
      class="content"
      ref="scroll"
      :pullUpLoad="true"
      @loadMore="loadMore"
    >
      <van-pull-refresh
        v-model="isLoading"
        @refresh="onRefresh"
        ref="pullRefreshRef"
      >
        <job-list :jobList="jobsData"></job-list>
      </van-pull-refresh>
    </scroll>

    <!--城市弹出-->
    <van-popup
      v-model="isCityPopupShow"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-area
        title="请选择城市"
        :area-list="areaList"
        cancel-button-text=" "
        @confirm="confirmCtiy"
      />
    </van-popup>
    <!--筛选弹出-->
    <van-popup
      v-model="isFilterPopupShow"
      position="bottom"
      closeable
      safe-area-inset-bottom
      :style="{ height: '100%' }"
      @closed="leavePopupFn"
    >
      <div class="title">筛选</div>
      <div class="pop-content">
        <!--学历-->
        <span class="text-title">学历</span>
        <van-grid :column-num="3" :border="false">
          <van-grid-item v-for="(item, index) in edu" :key="index" :text="item">
            <van-button class="btn">{{ item }}</van-button>
          </van-grid-item>
        </van-grid>
        <!--薪资-->
        <span class="text-title">薪资</span>
        <van-grid :column-num="3" :border="false">
          <van-grid-item v-for="(item, index) in salary" :key="index">
            <van-button
              class="btn"
              @click="getIndex($event, item)"
              :style="
                filterArr.indexOf(item) != -1 ? { background: '#bbb' } : {}
              "
              :value="item"
              >{{ item }}</van-button
            >
          </van-grid-item>
        </van-grid>

        <div class="btn-group">
          <van-button type="default" @click="resetBtnFn">重置</van-button>
          <van-button type="primary" @click="comfirmFn">确定</van-button>
        </div>
      </div>
    </van-popup>
    <!--求职意向-->
    <job-purpose
      :isPurposePopupShow="isPurposePopupShow"
      :isPickerPopupShow="isPickerPopupShow"
      @onClickLeft="onClickLeft"
      @stateClickFn="stateClickFn"
      @stateChooseEmit="stateChooseEmit"
      @stateCancelEmit="stateCancelEmit"
      @closePickerPopup="closePickerPopup"
    >
    </job-purpose>
  </div>
</template>

<script>
//导入子组件
import JobNavBar from "./jobChildComponent/JobNavBar";
import JobLabelBar from "./jobChildComponent/JobLabelBar";
import JobList from "./jobChildComponent/JobList";
import JobPurpose from "./jobChildComponent/JobPurpose";
//引用公共组件
import Scroll from "components/common/scroll/Scroll";
//vant组件
import { Sticky } from "vant";
import { PullRefresh } from "vant";
import { Toast } from "vant";
import { Area } from "vant";
import { Popup } from "vant";
import { Grid, GridItem } from "vant";
import { Button } from "vant";
//引入地域信息
import area from "assets/js/area.js";
export default {
  name: "Job",
  components: {
    JobNavBar,
    JobLabelBar,
    JobList,
    Scroll,
    JobPurpose,
    [Sticky.name]: Sticky,
    [PullRefresh.name]: PullRefresh,
    [Toast.name]: Toast,
    [Area.name]: Area,
    [Popup.name]: Popup,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Button.name]: Button,
  },
  props: {},
  data() {
    return {
      //created组件时，从接口返回数据中获取的
      jobsData: [
        {
          title: "web前端",
          h2_txt: "什么祥 未融资",
          area: ["沈阳 和平区", "经验不限", "本科"],
          hr: {
            img_avatar: "",
            hr_txt: "海峰-招聘者",
          },
          salary: "5-6K",
        },
        {
          title: "软件开发工程师",
          h2_txt: "牛万科技 未融资",
          area: ["沈阳 沈河区", "1-3年", "学历不限"],
          hr: {
            img_avatar: "",
            hr_txt: "海峰-招聘者",
          },
          salary: "3-8K",
        },
        {
          title: "前端工程师",
          h2_txt: "成林健康科技 未融资",
          area: ["沈阳 皇姑区", "经验不限", "本科"],
          hr: {
            img_avatar: "",
            hr_txt: "马xx-从事招聘专员",
          },
          salary: "5-6K",
        },
        {
          title: "前端开发工程师",
          h2_txt: "师福教育 未融资",
          area: ["沈阳 沈河区", "3-5年", "学历不限"],
          hr: {
            img_avatar: "",
            hr_txt: "杨女士 - 人事",
          },
          salary: "5-8K",
        },
        {
          title: "前端工程师",
          h2_txt: "成林健康科技 未融资",
          area: ["沈阳 皇姑区", "经验不限", "本科"],
          hr: {
            img_avatar: "",
            hr_txt: "马xx-从事招聘专员",
          },
          salary: "5-6K",
        },
        {
          title: "前端技术经理",
          h2_txt: "星擎科技 未融资",
          area: ["沈阳 铁西区", "5-10年", "本科"],
          hr: {
            img_avatar: "",
            hr_txt: "潘舒-CEO",
          },
          salary: "6-11K",
        },
        {
          title: "web前端",
          h2_txt: "什么祥 未融资",
          area: ["沈阳 和平区", "经验不限", "本科"],
          hr: {
            img_avatar: "",
            hr_txt: "海峰-招聘者",
          },
          salary: "5-6K",
        },
      ],
      isLoading: false,
      fakeData: {
        title: "1111",
        h2_txt: "什么祥 未融资",
        area: ["沈阳 和平区", "经验不限", "本科"],
        hr: {
          img_avatar: "",
          hr_txt: "海峰-招聘者",
        },
        salary: "5-6K",
      },
      isCityPopupShow: false,
      isPurposePopupShow: false,
      isPickerPopupShow: false,
      areaList: area,
      city: "宁波",
      isFilterPopupShow: false,

      edu: ["全部", "初中", "高中", "大学"],
      salary: ["1k", "2k", "3k", "10k", "100k"],
      filterArr: [],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    // this.$EventBus.$on("refreshClick", () => {
    //   //下拉操作
    //   this.$refs.scroll.scrollTo(0, 50);
    //   // this.$refs.pullRefreshRef.refresh();
    // });
  },
  destroyed() {},
  methods: {
    onRefresh() {
      setTimeout(() => {
        Toast("刷新成功");
        this.isLoading = false;
        this.jobsData.unshift(this.fakeData);
      }, 1000);
    },
    loadMore() {
      Toast("刷新成功");

      this.jobsData.push(this.fakeData);
      this.$refs.scroll.finishPullUp();
    },
    refreshClick() {
      this.$refs.scroll.scrollTo(0, 50);
    },
    showCityPopup() {
      this.isCityPopupShow = true;
    },
    confirmCtiy(columnsNum) {
      console.log(columnsNum);
      this.city = columnsNum[2].name;
      this.isCityPopupShow = false;
    },
    showFilterPopupFn() {
      this.isFilterPopupShow = true;
    },
    getIndex($event, filter) {
      // let filter = $event.target.value;
      //1.点击哪个按钮，并且添加到数组
      //3.数组中的按钮亮
      //2.重复点击，移除数组
      //如果数组中无这个值，添加；有这个值的话,去掉这个值
      // this.filterArr.indexOf(index) == -1
      //   ? this.filterArr.push(index)
      //   : (() => {
      //       //在数组中找到下标值，然后去掉
      //       let index = this.filterArr.findIndex((x) => {
      //         return x == index;
      //       });
      //       this.filterArr.splice(index, 1);
      //     })();
      this.filterArr.indexOf(filter) == -1
        ? this.filterArr.push(filter)
        : (() => {
            //在数组中找到下标值，然后去掉
            let index = this.filterArr.findIndex((x) => {
              return x == filter;
            });
            this.filterArr.splice(index, 1);
          })();
    },
    leavePopupFn() {
      this.filterArr = [];
    },
    resetBtnFn() {
      this.filterArr = [];
    },
    comfirmFn() {
      //隐藏弹出
      this.isFilterPopupShow = false;
      console.log("提交信息", this.filterArr);
    },
    onClickLeft() {
      this.isPurposePopupShow = false;
    },
    clickNavBarPlus() {
      this.isPurposePopupShow = true;
    },
    stateClickFn() {
      this.isPickerPopupShow = true;
    },
    stateChooseEmit() {
      this.isPickerPopupShow = false;
    },
    stateCancelEmit() {
      this.isPickerPopupShow = false;
    },
    closePickerPopup() {
      this.isPickerPopupShow = false;
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  position: absolute;
  top: 85px;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow: hidden;
}
.title {
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 16px;
}
.pop-content {
  margin-top: 50px;
  .text-title {
    font-size: 20px;
    font-weight: 700px;
    margin-left: 20px;
  }
}
.btn {
  width: 100px;
}
.btn-group {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  .van-button:nth-child(1) {
    margin-right: 12px;
    width: 100px;
  }
  .van-button:nth-child(2) {
    width: 100px;
  }
}
</style>
