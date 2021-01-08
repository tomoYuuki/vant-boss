<template>
  <div class="job-list-container">
    <!--工作项-->
    <div v-for="(jobItem, index) in jobList" :key="index" class="job-list">
      <div class="job-header">
        <div class="job-title">{{ jobItem.title }}</div>
        <div class="job-salary">{{ jobItem.salary }}</div>
      </div>
      <div class="job-company-description">
        {{ jobItem.h2_txt }}
      </div>
      <div class="job-company-label">
        <van-tag
          v-for="(item, index) in jobItem.area"
          class="tag"
          :key="index"
          color="#c1c1c1"
          text-color="#000"
          >{{ item }}</van-tag
        >
      </div>
      <div class="job-company-hr">{{ jobItem.hr.hr_txt }}</div>
    </div>
  </div>
</template>

<script>
import { Tag } from "vant";
export default {
  name: "JobList",
  props: {
    jobList: {
      type: Array,
      default() {
        return [
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
        ];
      },
    },
  },
  components: {
    [Tag.name]: Tag,
  },
};
</script>

<style lang="less" scoped>
.job-list {
  height: 130px;
  border-bottom: 8px solid rgb(219, 216, 216);
  padding: 0 10px;
  .job-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    padding-top: 15px;
    .job-title {
      font-weight: 700;
      font-size: 16px;
    }
    .job-salary {
      color: rgb(199, 191, 191);
    }
  }
  .job-company-description {
    margin-bottom: 5px;
  }
  .job-company-label {
    margin-bottom: 5px;
    .tag {
      margin-right: 10px;
    }
  }
  .job-company-hr {
  }
}
</style>
