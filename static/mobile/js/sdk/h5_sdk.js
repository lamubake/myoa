tMobileSDK = window.tMobileSDK || {};

tMobileSDK.ready = function(func){
	func();

};

//隐藏右上角按钮
tMobileSDK.hideOptionMenu = function() {
    wx.hideOptionMenu();
};

//显示右上角按钮
tMobileSDK.showOptionMenu = function() {
    wx.showOptionMenu();
};


tMobileSDK.previewImage = function() {
    
};

/*
 * 选择图片上传
 * @param obj 对应的参数
 */
tMobileSDK.chooseImage = function(options) {
    
};

tMobileSDK.uploadImage = function(options) {
    
};

tMobileSDK.saveToServer = function(options){
    
};

/*
 * 增加授权地址
 * @param url 地址
 */

tMobileSDK.addAuthCode = function(url){
    
}