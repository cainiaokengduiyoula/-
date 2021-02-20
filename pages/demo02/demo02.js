// pages/demo02/demo02.js
Page({
  data: {
    str: "",
    num: 0
  },
  inputEvent(e) {
    console.log(e);
    // 对data进行赋值的写法
    this.setData({
      str: e.detail.value
    }) 
  },
  tapEvent(e) {
    console.log(e);
    this.setData({
      // 获取data中的值 this.data.num
      num: this.data.num + e.currentTarget.dataset.operation
    })
  }
})