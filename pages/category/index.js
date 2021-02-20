// pages/category/index.js
import { request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: [],
    menu: [],
    list:[],
    currentIndex: 0,
    scrollTop: 0
  },
  onLoad: function (options) {
    const res = wx.getStorageSync("result");
    if(!res) {
      this.getMenu();
    }else {
      if(Date.now() - res.time > 1000 * 10) {
        this.getMenu();
      }else {
        const res = this.data.result;
        const menu = [];
        res.forEach(item => {
          menu.push(item.cat_name);
        });
        this.setData({
          menu,
          list: res[0].children
        });
      }
    }
    
  },
  // getMenu() {
  //   request({
  //     url: "/categories"
  //   }).then(res => {
  //     const menu = [];
  //     console.log(res)
  //     res.forEach(item => {
  //       menu.push(item.cat_name);
  //     });
  //     this.setData({
  //       menu,
  //       list: res[0].children,
  //       result: res
  //     });
  //   })
  // },
  // 使用ES7语法
  async getMenu() {
    const res = await request({
      url: "/categories"
    });
    const menu = [];
    res.forEach(item => {
      menu.push(item.cat_name);
    });
     this.setData({
      menu,
      list: res[0].children,
      result: res
    });
     // 把接口的数据存入到本地存储中
     wx.setStorageSync("result", { time: Date.now(), data: this.data.result });
  },
  handleMenu(e) {
    let index = e.currentTarget.dataset.index;
    if(index === this.data.currentIndex) {
      return 
    }
    this.setData({
      currentIndex: index,
      list: this.data.result[index].children,
      scrollTop: 0
    })
  }
})