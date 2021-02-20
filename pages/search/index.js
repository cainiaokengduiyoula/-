// pages/search/index.js
import { debounce } from "../../utils/util.js";
import { request } from '../../request/index.js';
Page({
  data: {
    goods: [],
    isFocus: false,
    inputDebounce: null,
    inpValue: ''
  },
  onShow() {
    const inputDebounce = debounce(this.qsearch,300);
    this.setData({
      inputDebounce
    })
  },
  handleInput(e) {
    this.data.inputDebounce(e.detail.value);
  },
  async qsearch(query){
    if(!query.trim()) {
      this.setData({
        goods:[],
        isFocus:false
      })
      return ;
    }
    const res = await request({
      url: "/goods/qsearch",
      data: { query }
    })
    this.setData({
      goods: res,
      isFocus: true
    })
  },
  handleCancel() {
    this.setData({
      inpValue:"",
      isFocus:false,
      goods:[]
    })
  },
})