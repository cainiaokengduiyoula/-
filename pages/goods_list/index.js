// pages/goods_list/index.js
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titles: ['综合','销量','价格'],
    currentIndex: 0,
    goods: [],
    total: 0,
    totalPages: 0,
    QueryParams:{
      query:"",
      cid:"",
      pagenum:1,
      pagesize:10
    },
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      'QueryParams.cid': options.cid||"",
      'QueryParams.query': options.query||"",
    })
    this.getGoods();
  },
  onReachBottom(e) {
    if(this.data.QueryParams.pagenum>=this.data.totalPages) {
      wx.showToast({ title: '没有下一页数据' });
    }else{
      this.setData({
        "QueryParams.pagenum": this.data.QueryParams.pagenum + 1
      })
      this.getGoods();
    }
    this.getGoods();
  },
  onPullDownRefresh(){
    this.setData({
      goods: [],
      "QueryParams.pagenum": 1
    })
    this.getGoods();
  },
  async getGoods() {
    const res = await request({
      url:"/goods/search",
      data:this.data.QueryParams
    });
    const total=res.total;
    this.setData({
      goods:[...this.data.goods,...res.goods],
      totalPages: Math.ceil(total/this.data.QueryParams.pagesize)
    })
    wx.stopPullDownRefresh();
  },
  getCurrentIndex(e) {
    this.setData({
      currentIndex: e.detail,
      goods:[], 
    })
    this.getGoods();
  }
})