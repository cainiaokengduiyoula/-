// pages/user/index.js
Page({
  data: {
    userInfo: {},
    collectNums: 0
  },
  onShow: function() {
    const userInfo = wx.getStorageSync("userInfo");
    const collectList = wx.getStorageSync("collectList");
    this.setData({
      userInfo,
      collectNums: collectList.length
    })
  }
})