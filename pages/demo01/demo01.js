// pages/demo01/demo01.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message: "页面",
    obj: {
      aaa: "aaa"
    },
    num: 1,
    isChecked: true,
    list: ["A","B","C"],
    person: {
      name: "吴彦祖",
      age: 18
    },
    // rich-text标签值
    // 1标签字符串
    //html: '',
    // 2对象数组
    html: [
      {
        // div标签 name属性来指定
        name: "div",
        // 标签上的属性
        attrs: {
          class: "my-div",
          style: "color:red;"
        },
        // 子节点
        children: [
          {
            name: "p",
            attrs: {},
            // 放文本
            children: [
              {
                type: "text",
                text: "hello"
              }
            ]
          }
        ]
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})