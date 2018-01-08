//app.js
App({
  onLaunch: function (options) { // 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onError(err) { // 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
    console.log("app.js onError", err);
  },
  globalData: {
    userInfo: null,
    visitedArticles: '',
    foodList: {
      formal: ["西餐", "自助餐", "火锅", "烧烤", "麻辣香锅", "日本料理", "羊蝎子", "肯德基", "茶餐厅", "海底捞", "比萨", "烤鱼", "海鲜", "铁板烧", "韩国料理", "东南亚菜", "甜点", "农家菜", "云南菜", "川菜", "湘菜", "粤菜", "新疆菜", "西北菜", "东北菜", "法国菜", "泰国菜", "印度菜", "意大利菜", "西班牙菜", "英国菜", "越南菜", "墨西哥菜", "烤鸭", "大排档", "肉蟹煲", "串串", "小龙虾", "素斋", "大盘鸡"],
      casual: ["寿司", "盖浇饭", "砂锅", "大排档", "炒粉干", "年糕", "麻辣烫", "衢州烧饼", "中式快餐", "汉堡", "水果", "汤圆", "馄饨", "水饺", "花甲粉", "烧烤", "泡面", "速冻水饺", "馒头", "包子", "味千拉面", "肯德基", "面包", "蛋糕", "饼干", "蛋炒饭", "扬州炒饭", "咖啡", "比萨", "麦当劳", "兰州拉面", "沙县小吃", "铁板炒饭", "铁板炒饭", "酱香饼", "烤红薯", "韩国料理", "粥", "生煎", "小笼包", "甜点", "小炒", "肉夹馍", "蛋包饭", "鸡蛋汉堡", "章鱼小丸子", "减肥餐", "燕麦", "酸奶", "三明治", "鸡肉卷", "咖喱饭", "热狗", "拌面"]
    }
  }
})