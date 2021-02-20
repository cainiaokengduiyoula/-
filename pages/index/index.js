// pages/index/index.js
import { request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    catitems:[],
    floor: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiperList();
    this.getCatitems();
    this.getFloor();
  },
  // 获取轮播图数据
  getSwiperList() {
    request({
      url: "/home/swiperdata"
    }).then(res => {
      console.log(res);
      res.forEach(item => {
        item.navigator_url = item.navigator_url.replace('/main?','/index?');
      })
      this.setData({
        swiperList: res
      })
    })
  },
  //获取分类数据
  getCatitems() {
    request({
      url: "/home/catitems"
    }).then(res => {
      this.setData({
        catitems: res
      })
    })
  },
  getFloor() {
    request({
      url: "/home/floordata"
    }).then(res => {
      let str ;
      res.forEach(item => {
        item.product_list.forEach(value => {
          value.navigator_url = value.navigator_url.replace('/goods_list?',"/goods_list/index?");
        })
      });
      this.setData({
        floor: res
      })
    }) 
  }
 

})