// pages/cart/index.js
import { getSetting, chooseAddress, openSetting, showModal ,showToast} from "../../utils/asyncWx.js";
Page({
  data: {
    address: {},
    cartList: [],
    allChecked: false,
    totalMoney: 0,
    totalCount: 0,
  },
  onShow() {
    const address = wx.getStorageSync('address') || {};
    const cartList = wx.getStorageSync("cartList") || [];
    this.setData({
      address
    })
    this.setCart(cartList);
  },
  // 获取地址
  async handleChooseAddress(e) {
    try {
      let userInfo = wx.getStorageSync('userInfo');
      if(!userInfo) {
        wx.navigateTo({
          url: '/pages/auth/index'
        });
      }else {
        let address = await chooseAddress();
        if(address.cityName) {
          address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
          this.setData({
            address
          });
          wx.setStorageSync('address', address);
        }
      }
    }catch (error) {
      console.log(error);
    } 
  },
  // 点击选中事件
  handleSelect(e) {
    let id = e.currentTarget.dataset.id;
    let index = this.data.cartList.findIndex(item => item.goods_id === id);
    let checked = this.data.cartList[index].checked;
    let str = 'cartList['+index+']'+'.checked';
    this.setData({
      [str]: !checked
    })
    this.setCart(this.data.cartList);
  },
  // 商品数量的编辑功能
  async handleItemNumEdit(e) {
    let { operation, id } = e.currentTarget.dataset;
    let index = this.data.cartList.findIndex(item => item.goods_id === id);
    let str = 'cartList['+index+']'+'.num';
    let num = this.data.cartList[index].num;
    if(num + operation <= 0 ) {
      const res = await showModal({ content: "您是否要删除？" });
      if (res.confirm) {
        const cartList = this.data.cartList;
        cartList.splice(index, 1);
        this.setData({
          cartList
        })
      }
    }else {
      this.setData({
        [str]: this.data.cartList[index].num + operation
      })
    }
    this.setCart(this.data.cartList);
  },
  // 全选
  handleItemAllCheck(e) {
    let { cartList,allChecked } = this.data;
    allChecked = !allChecked;
    cartList.forEach(item => item.checked = allChecked);
    this.setCart(cartList);
  },
  // 设置购物车状态同时 重新计算 底部工具栏的数据 全选 总价格 购买的数量
  setCart(cartList) {
    let allChecked = true;
    let totalMoney = 0;
    let totalCount = 0;
    cartList.forEach(item => {
      if(item.checked) {
        totalCount += item.num;
        totalMoney += item.goods_price * item.num;
      }else {
        allChecked = false;
      }
    });
    allChecked = cartList.length != 0 ? allChecked : false;
    this.setData({
      cartList,
      totalMoney, 
      totalCount, 
      allChecked
    });
    wx.setStorageSync("cartList", cartList);
  },
  // 结算
  // 判断有没有收货地址信息
  // 2 判断用户有没有选购商品
  // 3 经过以上的验证 跳转到 支付页面！
  async handlePay() {
    let { address,totalCount } = this.data;
    if(!address.userName) {
      await showToast({title:"您还没有选择收货地址"});
      return ;
    }
    if(totalCount === 0) {
      await showToast({title:"您还没有选购商品"});
      return ;
    }
    wx.navigateTo({
      url: '/pages/pay/index'
    });
  }
})