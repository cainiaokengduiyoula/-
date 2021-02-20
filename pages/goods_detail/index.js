// pages/goods_detail/index.js
import { request } from '../../request/index.js'
Page({
  data: {
    goodsInfo: {},
    isCollect: false,
    obj: []
  },
  
  onShow(){
    let img= 'https://ww1.sinaimg.cn/large/007rAy9hgy1g24by9t530j30i20i2glm.jpg';
    this.setData({
      'obj[0]': {
        pics_id: Math.random()*100,
        pics_mid: img,
        pics_mid_url: img,
        pics_sma: img,
        pics_sma_url: img,
      }
    });
    // 在onShow中获取页面参数
    let pages =  getCurrentPages();
    let currentPage = pages[pages.length-1];
    let options = currentPage.options;
    const { goods_id } = options;
    this.getDatail(goods_id);
  },
  // 获取数据
  async getDatail(goods_id) {
    const res = await request({
      url: '/goods/detail',
      data: { goods_id }
    });
    this.setData({
      goodsInfo: {
        goods_id: res.goods_id,
        cat_id: res.cat_id,
        goods_name: res.goods_name,
        goods_price: res.goods_price,
        goods_introduce: res.goods_introduce,
        pics: res.pics.length>0?res.pics:this.data.obj,
      }
    });
    const collectList = wx.getStorageSync("collectList") || [];
    const isCollect = collectList.some(item => item.goods_id === this.data.goodsInfo.goods_id);
    this.setData({
      isCollect
    });
  },
  //点击轮播图图片
  handleImage(e) {
    const imgsURL = this.data.goodsInfo.pics.map(item => item.pics_mid_url);
    wx.previewImage({
      urls: imgsURL,
      current: e.currentTarget.dataset.url
    });
  },
  // 点击收藏事件
  handleisCollect(e) {
    let isCollect=false;
    const collectList=wx.getStorageSync("collectList")||[];
    let index=collectList.findIndex(item=>item.goods_id===this.data.goodsInfo.goods_id);
    if(index!==-1){
      collectList.splice(index,1);
      isCollect=false;
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true
      });
    }else{
      collectList.push(this.data.goodsInfo);
      isCollect=true;
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      });
    }
    wx.setStorageSync("collectList", collectList);
    this.setData({
      isCollect
    })
  },
  // 点击加入购物车按钮
  handleCartAdd(e) {
    const cartList = wx.getStorageSync('cartList') || [];
    let index = cartList.findIndex(item => item.goods_id === this.data.goodsInfo.goods_id);
    if(index !== -1) {
      cartList[index].num++;
    }else {
      this.setData({
        'goodsInfo.num': 1,
        'goodsInfo.checked': true
      });
      cartList.push(this.data.goodsInfo);
    }
    wx.setStorageSync('cartList',cartList);
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      // true 防止用户 手抖 疯狂点击按钮 
      mask: true
    })
  }
})