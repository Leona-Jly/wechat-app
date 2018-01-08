// pages/random/random.js
const getRandomNumber = require('../../utils/util.js').getRandomNumber;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    randomNumber: 0, // 随机数
    randomNumberHistory: [] // 历史随机数
  },

  getRandomNum(e) { // 获得随机数；Math.random()取不到1，所以大数额外加1
    let numberLeft = parseInt(e.detail.value.randomInputLeft) || 0;
    let numberRight = parseInt(e.detail.value.randomInputRight) || 100;
    if (numberLeft > numberRight){
      numberLeft += 1;
    } else if(numberLeft < numberRight){
      numberRight += 1;
    }
    let random = getRandomNumber(numberLeft, numberRight);
    this.setData({ randomNumber: random });
    this.data.randomNumberHistory.push(random);
    (this.data.randomNumberHistory.length > 7) && (this.data.randomNumberHistory.shift());
    this.setData({ randomNumberHistory: this.data.randomNumberHistory });
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