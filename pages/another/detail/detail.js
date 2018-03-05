// pages/another/detail/detail.js
'use strict';

import util from '../../../utils/index';
import config from '../../../utils/config';

// WxParse HtmlFormater 用来解析 content 文本为小程序视图
import WxParse from '../../../lib/wxParse/wxParse';
// 把 html 转为化标准安全的格式
import HtmlFormater from '../../../lib/htmlFormater';

let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    viewHeight: app.globalData.deviceInfo.windowHeight + 'px', // scroll-view的高度
    scrollTop: 0,
    detailData: {},
    title: '', // 标题
    date: '', // 日期
    datailImage: '', // 详情图片
    isFromShare: false
  },

  back() {
    // if (this.data.isFromShare) {
      wx.navigateBack({
        url: '../index/index'
      })
    // } else {
    //   wx.navigateBack()
    // }
  },

  articleRevert() {
    // this.data.detailData 是之前我们通过setData设置的响应数据
    let htmlContent = this.data.detailData && this.data.detailData.content;
    WxParse.wxParse('article', 'html', htmlContent, this, 0);
    // 第一个参数 article 很重要，在 WxParse 中，我们传入了当前对象 this，当变量 htmlContent 解析之后，会把解析后的数据赋值给当前对象，并命名为 article
    // 所以当文章数据解析后，当前环境上下文中已经存在了数据 article，可以直接在 detail.wxml 中引用： this.data.article
  },

  goTop() {
    this.setData({
      scrollTop: 0
    })
  },

  init(contentId){
    if(contentId){
      this.goTop();
      this.requestDetail(contentId)
        .then(data => {
          this.configPageData(data);
        })
        // 调用wxparse
        .then(() => {
          this.articleRevert();
        });
    }
  },

  configPageData(data){
    if(data){
      // 同步数据到model层，model层数据发生变化的话，视图层会自动渲染
      this.setData({
        detailData: data
      });
      // 设置标题
      let title = this.data.detailData.title || config.defaultBarTitle;
      wx.setNavigationBarTitle({
        title: title,
      })
    }
  },

  requestDetail(contentId){
    return util.request({
      url: 'detail',
      mock: true,
      data: {
        source: 1
      }
    })
      .then(res => {
        let formateUpdateTime = this.formateTime(res.data.lastUpdateTime);
        // 格式化后的时间
        res.data.formateUpdateTime = formateUpdateTime;
        return res.data;
      });
  },

  formateTime(timeStr = ''){
    let year = timeStr.slice(0, 4),
        month = timeStr.slice(5, 7),
        day = timeStr.slice(8, 10);
    return `${year}/${month}/${day}`;
  },

  next(){ // 下一篇
    this.requestNextContentId()
      .then(data => {
        let contentId = data && data.contentId || 0;
        this.init(contentId);
      })
  },

  requestNextContentId(){
    let pubDate = this.data.detailData && this.data.detailData.lastUpdateTime || '';
    let contentId = this.data.detailData && this.data.detailData.contentId || 0;
    return util.request({
      url: 'detail',
      mock: true,
      data: {
        tag: '微信热门',
        pubDate: pubDate,
        contentId: contentId,
        langs: config.appLang || 'en'
      }
    }).then(res => {
      if(res && res.status === 0 && res.data && res.data.contentId){
        util.log(res);
        return res.data;
      }else{
        util.alert('提示', '没有更多文章了！');
        return null;
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*
    * 函数 `onLoad` 会在页面初始化时候加载运行，其内部的 `option` 是路由跳转过来后的参数对象。
    * 我们从 `option` 中解析出文章参数 `contendId`，然后通过调用 `util` 中封装好的 `request` 函数来获取 `mock` 数据。 
    */
    let id = options.contentId || 0;
    this.setData({
      title: options.title,
      date: options.date,
      datailImage: options.image,
      isFromShare: !!options.share
    });
    this.init(id);
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
    let title = this.data.title || config.defaultShareText;
    let image = this.data.detailImage || config.defaultShareImg;
    return {
      // 分享出去的内容标题
      title: title,

      // 用户点击分享出去的内容，跳转的地址
      // contentId为文章id参数；share参数作用是说明用户是从分享出去的地址进来的，后面会用到
      path: `/pages/another/detail/detail?share=1&contentId=${contentId}&title=${title}&date=${date}&image=${datailImage}`,
      imageUrl: image,
      // 分享成功
      success: function(res){},

      // 分享失败
      fail: function(err){}
    }
  },

  notSupportShare() {
    // deviceInfo 是用户的设备信息，我们在 app.js 中已经获取并保存在 globalData 中
    let device = app.globalData.deviceInfo;
    let sdkVersion = device && device.SDKVersion || '1.0.0';
    return /1\.0\.0|1\.0\.1|1\.1\.0|1\.1\.1/.test(sdkVersion);
  },

  share() {
    if (this.notSupportShare()) {
      wx.showModal({
        title: '提示',
        content: '您的微信版本较低，请点击右上角分享'
      })
    }
  }
})