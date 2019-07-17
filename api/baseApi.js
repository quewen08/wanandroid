"use strict";
import interfaces from "./interfaces.js";
let request = (url, data, type) => new Promise((resolve, reject) => {
  wx.request({
    url: 'https://www.wanandroid.com' + url,
    data: data,
    method: type, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: {
      "Content-Type": "application/x-www-form-urlencoded", // 默认值
      "Cookie": wx.getStorageSync("cookie")
    },
    success: function(res) {
      // success
      if (res.statusCode == 200) {
        if (res.data.errorCode === 0) {
          if (url == interfaces.INTERFACE_USER_LOGIN || url == interfaces.INTERFACE_REGISTER) {
            console.log("login/register:" + res)
            wx.setStorageSync("cookie", res.header['Set-Cookie'])
          }
          resolve(res.data);
        } else {
          reject(res.data)
        }
      } else {
        reject(res)
      }
    },
    fail: function(err) {
      // fail
      reject(err)
    },
    complete: function() {
      // complete
    }
  })
})
module.exports = {
  request
}