// pages/order_list/index.js
Page({
  data: {
    goods: [],
    total_count: 0,
    total_price: 0,
  },
  onShow: function () {
    let order_item = wx.getStorageSync('order_item');
    let { goods, total_count, total_price } = order_item;
    this.setData({
      goods,
      total_count,
      total_price
    }) 
  }
})