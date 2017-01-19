//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '一大波美女在靠近，点击进入',
    userInfo: {}
  },
  //事件处理函数
  toMeinv: function() {
    wx.navigateTo({
      url: '../meinv/meinv'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
