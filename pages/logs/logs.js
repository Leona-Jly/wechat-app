//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    queryKey: 'c',
    queryValue: 3
  },
  onShareAppMessage: function () {
    return {
      title: '转发日志',
      path: '/page/logs/logs'
    }
  },
  onLoad: function () {
    console.log('logs.js - onLoad start');
    console.log('this: ', this); // 对象
    console.log('this.route: ', this.route);
    // let currentPages = getCurrentPages(); // 获取当前页面栈的实例，以数组形式按栈的顺序给出，第一个元素为首页，最后一个元素为当前页面
    // console.log(currentPages);
    // console.log(currentPages[0].route);
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    }, () => { console.log('logs.js onLoad logs finished!'); });
    console.log('logs.js - onLoad end');
  },
  onReady: function () {
    console.log('logs.js - onReady');
  },
  onShow: function () {
    console.log('logs.js - onShow');
  },
  onHide: function () {
    console.log('logs.js - onHide');
  },
  onUnload: function () {
    console.log('logs.js - onUnload');
  },
  onPullDownRefresh: function () {
    console.log('logs.js - onPullDownRefresh');
    wx.stopPullDownRefresh();
  },
  onReachBottom: function () {
    console.log('logs.js - onReachBottom');
  },
  onShareAppMessage: function () {
    console.log('logs.js - onShareAppMessage');
  },
  onPageScroll: function (scrollTop) {
    console.log('logs.js - onPageScroll');
    // console.log('logs.js - onPageScroll, and now the scrollTop is:', scrollTop);
  },
})
