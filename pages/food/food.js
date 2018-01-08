// pages/food/food.js
const app = getApp();
let randomFoodList = [];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkList: ['formal', 'casual'], // 大餐小餐checkbox选中
    formalDisable: false, // 是否disable大餐checkbox
    casualDisable: false, // 是否disable小餐checkbox
    formal: [], // 大餐数据
    casual: [], // 小餐数据
    randomFood: '', // 随机美食
  },

  checkboxChange(e){ // 大餐小餐checkbox改变时，同时改变美食列表
    // console.log(e.detail.value); // 数组
    let checkList = this.data.checkList = e.detail.value;
    this.setRandomFoolList(checkList);
  },

  setRandomFoolList(checkList){ // 根据checkbox选中情况设置随机美食数据
    if (!checkList || checkList.length === 0) return;
    randomFoodList = [];
    if (checkList.length === 1) { // 只选了其中一项，另一项disable掉
      this.setData({
        [checkList[0] + 'Disable']: true
      });
      randomFoodList = this.data[checkList[0]];
    } else if (checkList.length === 2) { // 两者都选
      this.setData({
        formalDisable: false,
        casualDisable: false
      });
      randomFoodList = this.data.formal.concat(this.data.casual);
    }
  },

  getRandomFood(){ // 获取随机food
    let len = randomFoodList.length;
    if(len === 0) return '';
    let randomNumber = parseInt(Math.random() * len); // 除去第len个
    if(randomFoodList[randomNumber]){
      this.setData({
        randomFood: randomFoodList[randomNumber]
      });
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
  onReady: function () {
    randomFoodList = this.data.formal.concat(this.data.casual);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { // 自定义美食回来后，重新设置数据
    this.setData({
      formal: app.globalData.foodList.formal,
      casual: app.globalData.foodList.casual
    });
    this.setRandomFoolList(this.data.checkList);
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
// "tabBar": {
  //   "color": "#7A7E83",
  //   "selectedColor": "#3cc51f",
  //   "backgroundColor": "#fff",
  //   "borderStyle": "black",
  //   "position": "top",
  //   "list": [
  //     {
  //       "pagePath": "pages/food/food",
  //       "text": "选美食"
  //     },
  //     {
  //       "pagePath": "pages/location/location",
  //       "text": "选位置"
  //     },
  //     {
  //       "pagePath": "pages/random/random",
  //       "text": "随机数"
  //     }
  //   ]
  // },