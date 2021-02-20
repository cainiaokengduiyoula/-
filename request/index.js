// 同时发送代码的次数
let ajaxTimes = 0;
export function request(options) {
    // 判断 url中是否带有 /my/ 请求的是私有的路径 带上header token
    let header={...options.header};
    if(options.url.includes("/my/")){
        // 拼接header 带上token
        header["Authorization"]=wx.getStorageSync("token");
    }

    ajaxTimes++;
    // 显示 加载中 效果
    wx.showLoading({
        title: "加载中",
        mask: true
    });
    // 因为该域名失效所以在小程序项目中设置 不建议合法域名 便可
    const baseURL = "https://api-hmugo-web.itheima.net/api/public/v1";
    return new Promise((resolve,reject) => {
        wx.request({
            ...options,
            header:header,
            url: baseURL + options.url,
            success(result) {
                resolve(result.data.message);
            },
            error(err) {
                reject(err);
            },
            complete() {
                if(--ajaxTimes === 0) {
                    // 隐藏 加载中 效果
                    wx.hideLoading();
                }
            }
        })
    })
}