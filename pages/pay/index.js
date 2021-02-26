// pages/pay/index.js
import { getSetting, chooseAddress, openSetting, showModal, showToast, requestPayment } from "../../utils/asyncWx.js";
import { request } from "../../request/index.js";
Page({
  data: {
    address: {},
    cartList: [],
    cartcheckedList: [],
    totalMoney: 0,
    totalCount: 0,
  },
  onShow() {
    const address = wx.getStorageSync('address') || {};
    const cartList = wx.getStorageSync("cartList") || [];
    this.setData({
      address
    })
    const cartcheckedList = cartList.filter(item => item.checked);
    let totalMoney = 0;
    let totalCount = 0;
    cartcheckedList.forEach(item => {
      if(item.checked) {
        totalCount += item.num;
        totalMoney += item.goods_price * item.num;
      }
    });
    this.setData({
      cartList,
      totalMoney, 
      totalCount, 
      cartcheckedList
    });
  },
  async handleOrderPay(e) {
    try {
      // 1 判断缓存中有没有token 
      const token = wx.getStorageSync("token");
      // 2 判断
      if (!token) {
        wx.navigateTo({
          url: '/pages/auth/index'
        });
        return;
      }
      // 3 创建订单
      // 3.1 准备 请求头参数
      // const header = { Authorization: token };
      // 3.2 准备 请求体参数
      const order_price = this.data.totalMoney;
      const consignee_addr = this.data.address.all;
      let goods = [];
      this.data.cartcheckedList.forEach(v => goods.push({
        goods_id: v.goods_id,
        goods_number: v.num,
        goods_price: v.goods_price
      }));
      const orderParams = { order_price, consignee_addr, goods };
      // 4 准备发送请求 创建订单 获取订单编号
      const { order_number } = await request({ 
        url: "/my/orders/create", 
        method: "POST", 
        data: orderParams 
      });
      // 5 发起 预支付接口
      const { pay } = await request({ 
        url: "/my/orders/req_unifiedorder",
        method: "POST", 
        data: { order_number } 
      });
      // 6 发起微信支付 
      // 个人小程序无法申请支付功能
      // await requestPayment(pay);
      // 7 查询后台 订单状态
      const res = await request({ 
        url: "/my/orders/chkOrder", 
        method: "POST", 
        data: { order_number } 
      });
      await showToast({ title: "支付成功" });
      // 8 手动删除缓存中 已经支付了的商品
      const newCart = this.data.cartList.filter(item => !item.checked);
      wx.setStorageSync("cartList", newCart);

      setTimeout(function() {
        // 9 支付成功了 跳转到订单页面
        wx.navigateTo({
          url: '/pages/order/index'
        });
      },500);

      // // 9 支付成功了 跳转到订单页面
      // wx.navigateTo({
      //   url: '/pages/order/index'
      // });
    }catch (error) {
      await showToast({ title: "支付失败" });
      console.log(error);
    }
  }
})