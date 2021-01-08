const path = require("path");
const myTheme = path.resolve(__dirname, "src/assets/less/index.less");
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        //取别名，方便寻资源
        assets: "@/assets",
        common: "@/common",
        components: "@/components",
        network: "@/network",
        views: "@/views",
      },
    },
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          hack: `true; @import "${myTheme}";`,
        },
      },
    },
  },
};
