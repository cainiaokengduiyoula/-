// pages/order/index.js
import { request } from "../../request/index.js";
Page({
  data: {
    titles: ['全部','待付款','待发货','退款/退货'],
    currentIndex: 0,
    orders: []
  },
  onShow() {
    const token = wx.getStorageSync('token') ;
    if(!token) {
      wx.navigateTo({
        url: '/pages/auth/index'
      });
      return;
    }
    const pages = getCurrentPages();
    let currentPage = pages[pages.length-1];
    const { type } = currentPage.options;
    this.setData({
      currentIndex: type - 1
    });
    this.getOrders(type);
  },
  async getOrders(type) {
    const res = await request({ 
      url: "/my/orders/all", 
      data: { type } 
    });
    this.setData({
      orders: res.orders.map( v => ({
          ...v,
          // 转换时间戳
          create_time_cn:(new Date(v.create_time*1000).toLocaleString())
        })
      )
    })
  },
  getCurrentIndex(e) {
    this.setData({
      currentIndex: e.detail
    });
    this.getOrders(this.data.currentIndex+1);
  }
})