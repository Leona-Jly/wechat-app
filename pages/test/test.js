//test.js
import util from '../../utils/index.js'

//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    countdown: 3,
    keyword: '', // 搜索关键词
    hintList: [], // 返回数据列表
    scanResult: null, // 扫码结果
    arrList: [],
  },
  
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  inputKeyword(e) { // input输入时进行搜索
    let value = e.detail.value;
    console.log(e)
    // if (value.indexOf('1') === -1){
    //   this.setData({ keyword: value });
    // }else{
    //   this.setData({ keyword: 'aaa' });
    // }
    this.getBaiduHint(value);
  },

  getBaiduHint(input) { // 搜索
    console.log('input: ' + input);
    wx.request({
      url: `https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${input}&json=1`,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (response) => {
        console.log(response);
        let dataString = response.data;
        let beginIndex = dataString.indexOf('{');
        let lastIndex = dataString.lastIndexOf('}');
        let data = {};
        try {
          data = JSON.parse(dataString.substring(beginIndex, lastIndex + 1));
        } catch (err) {
          data.s = [];
          console.log('无法使用JSON.parse解析baidu返回的数据');
        }
        this.setData({ hintList: data.s });
      },
      fail: (err) => {
        console.log(err);
      },
    })
  },

  startScan() { // 扫码
    wx.scanCode({
      onlyFromCamera: false, // Boolean	是否只能从相机扫码，不允许从相册选择图片	1.2.0
      scanType: [], // Array	扫码类型，参数类型是数组，二维码是'qrCode'，一维码是'barCode'，DataMatrix是‘datamatrix’，pdf417是‘pdf417’。	1.7.0
      success: (response) => { //	接口调用成功的回调函数，返回内容详见返回参数说明。
        console.log(response);
        this.setData({ scanResult: JSON.stringify(response) });
      },
      fail: (err) => { // 接口调用失败的回调函数	
        console.log(err);
      },
      complete: () => { //	接口调用结束的回调函数（调用成功、失败都会执行）
      }
    })
  },

  onReachBottom() {
    console.log('到达页面底部运行此函数');
    this.updateArrList();
  },

  updateArrList() {
    let arr = this.data.arrList;
    arr.push(...this.createData());
    this.setData({
      arrList: arr
    });
  },

  createData() {
    let length = this.data.arrList.length;
    if (length >= 30) return [];
    return Array.from({ length: 3 }, (value, index) => `data ${1 + index + length}`);
  },

  doRequest(){
    util.request({
      url: 'list',
      mock: true,
      data: {
        tag: '微信热门',
        start: 1,
        days: 3,
        pageSize: 5,
        langs: 'en'
      }
    }).then(res => {
      console.log(res)
    })
  },

  doCountdown(){
    let timer = setInterval(() => {
      this.setData({
        countdown: --this.data.countdown
      });
      if (this.data.countdown <= 1) {
        clearInterval(timer);
        console.log('countdown完成');
        // wx.switchTab({
        //   url: '../leader/leader',
        // })
      }
    }, 1000);
  },

  onLoad: function () {
    this.doCountdown();
    this.doRequest();

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})