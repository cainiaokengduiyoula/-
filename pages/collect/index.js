// pages/collect/index.js
Page({
  data: {
    titles: ['商品收藏','品牌收藏','店铺收藏','浏览足迹'],
    collectList: []
  },
  onShow() {
    const collectList = wx.getStorageSync("collectList") || [];
    this.setData({
      collectList
    });
  },
  getCurrentIndex(e) {
    this.setData({
      currentIndex: e.detail
    });
  }
})