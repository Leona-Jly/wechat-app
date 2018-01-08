// pages/customFood/customFood.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    formal: [], // 大餐数据
    casual: [] // 小餐数据
  },

  saveCustomFood(e){ // 保存用户自定义美食到全局数据
    // console.log(e.detail.value); // 用户输入的值对象，一定要有name才能获取到
    let formalInput = e.detail.value.formalTextarea.split('，');
    let casualInput = e.detail.value.casualTextarea.split('，');
    app.globalData.foodList.formal = this.popEmpty(formalInput);
    app.globalData.foodList.casual = this.popEmpty(casualInput);
    console.log(app.globalData.foodList.formal, app.globalData.foodList.casual);
    wx.navigateBack();
  },

  popEmpty(arr){ // 删除数组中的空白项
    if(arr.length === 0) return arr;
    let newArr = arr.filter((item) => {
      return item !== ''
    });
    return newArr;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      formal: app.globalData.foodList.formal.join('，'),
      casual: app.globalData.foodList.casual.join('，')
    });
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