// pages/meinv/meinv.js
var util = require("../../utils/util.js");
var app = getApp();
Page({
  data: {
    meinvData: [],
    scrollHeight: 0,
    scrollTop: 0,
    hidden: true,
  },
  onLoad: function (options) {

    // 页面初始化 options为页面跳转所带来的参数
    var that = this;

    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
    
    this.loadMore();

  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  loadMore: function (e) {
    let that = this;
    that.setData({
      hidden: false
    })
    wx.request({
      url: 'https://api.tianapi.com/meinv',
      data: {
        key: util.tianapi_key,
        num: 10,
        page: app.globalData.page
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        if (res.data.code === 200) {
          var data = res.data.newslist;
          var list = that.data.meinvData.concat(data);

          //console.log("加载更多的数据：", list.length, list);
          app.globalData.page++;
          that.setData({ meinvData: list });
          that.setData({
            hidden: true
          })
        }
      }
    })
  },
  refesh: function (e) {
    console.log(e);
  },
  scroll: function (event) {
    //console.log(event);
    //   该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  //长按图片保存
  onLongTap: function (e) {
    let that = this;
    let url = e.currentTarget.dataset.url;
    wx.showModal({
      title: '是否保存？',
      confirmText: "保存",
      success: function (res) {
        if (res.confirm) {
          wx.showToast({
            title: '下载中',
            icon: 'loading'
          });
          wx.downloadFile({
            url: url,
            type: 'image',
            success: function (res) {
              console.log("download tempFilePath:" + res.tempFilePath);
              wx.saveFile({
                tempFilePath: res.tempFilePath,
                success: function (res) {
                  var savedFilePath = res.savedFilePath;
                  console.log("download savedFilePath:" + savedFilePath);
                  wx.showToast({
                    title: '保存成功',
                    icon: 'success'
                  });
                }
              })


            },
            fail: function (res) {
              console.log("download fail");
              wx.showToast({
                title: '保存失败，请稍后再试',
                icon: 'success'
              });
            },
            complete: function (res) {
              console.log("download complete");
            }
          })
        }
      }
    })
  }

})