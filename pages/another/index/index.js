// pages/another/index/index.js
'use strict'

import util from '../../../utils/index'
import config from '../../../utils/config'

let app = getApp();
let isDEV = config.isDev;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1, // 当前加载第几页数据
    days: 3,
    pageSize: 4,
    totalSize: 0,
    hasMore: true, // 用来判断下拉加载更多内容操作
    atricleList: [], // 存放文字列表数据，与视图相关联
    defaultImg: config.defaultImg,
  },

  formatArticleData(data){ // 对列表数据格式化
    let formatData;
    
  },

  requestArticle(){ // 获取文章列表数据
    util.request({
      url: 'list',
      mock: true,
      data: {
        tag: '微信热门',
        start: this.data.page || 1,
        days: this.data.days || 3,
        pageSize: this.data.pageSize,
        langs: config.appLang || 'en'
      }
    }).then(res => {
      // 数据正常返回
      if(res && res.status === 0 && res.data && res.data.length){
        // 正常数据 do something
        let articleData = res.data;
        let formatData = this.formatArticleData(articleData);
        console.log(formatData);
      }
      /*
      * 如果加载第一页就没有数据，说明数据存在异常情况
      * 处理方式：弹出异常提示信息（默认提示信息）并设置下拉加载功能不可用
      */
      else if(this.data.page === 1 && res.data && res.data.length === 0){
        util.alert();
        this.setData({
          hasMore: false
        });
      }
      /*
      * 如果非第一页没有数据，那说明没有数据了，停用下拉加载功能即可
      */
      else if(this.data.page !== 1 && res.data && res.data.length === 0){
        this.setData({
          hasMore: false
        });
      }
      /*
      * 返回异常错误
      * 展示后端返回的错误信息，并设置下拉加载功能不可用
      */
      else{
        util.alert('提示', res);
        this.setData({
          hasMore: false
        });
        return null;
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestArticle();
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