module.exports = {
  plugins: {
    autoprefixer: {
      browsers: ["Android >= 4.0", "iOS >= 8"],
    },
    "postcss-pxtorem": {
      //移动端长度/10
      rootValue: 37.5,
      propList: ["*"],
    },
  },
};
