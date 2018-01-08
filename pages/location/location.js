// pages/location/location.js
const getRandomNumber = require('../../utils-wechat/util.js').getRandomNumber;
const inputNumbers = {};

Page({

  /**
   * 页面的初始数据
   */
  data: {
    maxNumbers: {}, // 路口以及店铺最大位置集
    randomLocation: '', // 随机位置
    mapCtx: null, // 地图对象
    latitude: '', // 中心纬度
    longitude: '', // 中心经度
    markers: [], // 地图的标记点
    controls: [{ // 地图控件
      id: 'getCurrentLocation',
      iconPath: '../../images/getCurrentLocation.png',
      position: {
        left: 0,
        top: 170,
        width: 30,
        height: 30
      },
      clickable: true
    }]
  },

  sliderChange(e){ // 滑动slider
    inputNumbers[e.currentTarget.id] = e.detail.value;
    this.setData({ maxNumbers: inputNumbers });
  },

  getRandomLocation(){ // 获取随机位置
    let street = (parseInt(this.data.maxNumbers.maxStreetNumber) + 1) || 1;
    let shop = (parseInt(this.data.maxNumbers.maxShopNumber) + 1) || 1;
    let randomStreet = getRandomNumber(1, street);
    let leftOrRight = getRandomNumber() > 50? '左' : '右';
    let randomShop = getRandomNumber(1, shop);
    let random = `第${randomStreet}个路口${leftOrRight}拐第${randomShop}家店`;
    this.setData({ randomLocation: random });
  },

  tapMapControl(e){ // 点击地图控件
    let id = e.controlId;
    if (id === 'getCurrentLocation'){
      this.mapCtx.moveToLocation();
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { // 获取用户地理位置
    let self = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        let latitude = res.latitude
        let longitude = res.longitude
        // let speed = res.speed
        // let accuracy = res.accuracy
        self.setData({
          latitude,
          longitude,
          // markers: [{
          //   latitude,
          //   longitude,
          //   title: "当前位置"
          // }]
        });
      }
    });
    this.mapCtx = wx.createMapContext('locationMap');
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