// pages/leader/leader.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: '', // 搜索关键词
    hintList: [], // 返回数据列表
    scanResult: null, // 扫码结果
  },

  inputKeyword(e){ // input输入时进行搜索
    let value = e.detail.value;
    console.log(e)
    // if (value.indexOf('1') === -1){
    //   this.setData({ keyword: value });
    // }else{
    //   this.setData({ keyword: 'aaa' });
    // }
    // this.getBaiduHint(value);
  },

  getBaiduHint(input){ // 搜索
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
        try{
          data = JSON.parse(dataString.substring(beginIndex, lastIndex + 1));
        }catch(err){
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

  startScan(){ // 扫码
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