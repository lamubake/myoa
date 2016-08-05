tMobileSDK = window.tMobileSDK || {};

tMobileSDK.ready = function(func){
    wx.ready(func);

};

//�������Ͻǰ�ť
tMobileSDK.hideOptionMenu = function() {
    wx.hideOptionMenu();
};

//��ʾ���Ͻǰ�ť
tMobileSDK.showOptionMenu = function() {
    wx.showOptionMenu();
};

/**
* ����΢����ͼƬԤ��scrollview
* @param array urls ͼƬurl����
* @param string current ��ǰͼƬurl
*/
tMobileSDK.previewImage = function() {
    var args = arguments;
    var current = '';
    var urls = [];
    if (args.length == 1)
    {
        args[0].find("img").each(function(){
            urls.push($(this).attr("src"));
        });

        if(urls.length > 0)
        {
            args[0].delegate("img", "click", function(){
                tMobileSDK.previewImage($(this).attr("src"), urls);
            });
        }
    } else {
        current = args[0];
        urls = args[1];
    }
    urls.forEach(function(v, k){
        urls[k] = tMobileSDK.addAuthCode(v);
    });
    current = tMobileSDK.addAuthCode(current);

    wx.previewImage({
        current: current,
        urls: urls
    });
};

/*
 * ѡ��ͼƬ�ϴ�
 * @param obj ��Ӧ�Ĳ���
 */
tMobileSDK.chooseImage = function(options) {
    var sdk = this;
    var defaultOpts = {
        count: 9,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        imgTpl: '<li><div class="ui-grid-trisect-img"><img src="%s" /></div></li>',
        success: function (res) {
            var that = this;
            var html = '';
            // ���´򿪵�ʱ���滻֮ǰ��ѡ��
            sdk.uploadServerSuccess = false;
            sdk.imgLocalIds = [];

            var localIds = res.localIds;
            if (typeof localIds == 'object') {
                localIds.forEach(function(v, k){
                    html += that.imgTpl.replace(/%s/g, v);
                });
            }
            that.imgList.append(html).show();
            sdk.imgLocalIds = localIds;
            sdk.imgServerId = [];
            this.chooseCb && this.chooseCb();
        },
        chooseCb : function(){
            var that = this;
            that.upSuccessCb && that.upSuccessCb();
        }
    };
    var opts = $.extend(true, {}, defaultOpts, options);
    wx.chooseImage(opts);
};


tMobileSDK.uploadImage = function(options) {
    var defaultOpts = {
        chooseCb : function (){
            var that = this;
            tMobileSDK.saveToServer({
                upErrorCb : that.upErrorCb,
                upSuccessCb : that.upSuccessCb
            })
        },
        upErrorCb : function (){},
        upSuccessCb : function (){}
    };
    var opts = $.extend(true, {}, defaultOpts, options);
    this.chooseImage(opts);
};

tMobileSDK.saveToServer = function(options){
    var sdk = this;
    var count = 0;
    function upload() {
        wx.uploadImage({
            localId: sdk.imgLocalIds[count],
            isShowProgressTips: 1,
            success: function(res){
                if (res.errMsg != 'uploadImage:ok') {
                    sdk.uploadServerSuccess = false;
                    options.upErrorCb && options.upErrorCb();
                    return false;
                }

                sdk.imgServerId.push(res.serverId);
                
                count++;

                if(count < sdk.imgLocalIds.length) {
                    upload();
                }
                if(count == sdk.imgLocalIds.length) {
                    sdk.uploadServerSuccess = true;
                    options.upSuccessCb && options.upSuccessCb();
                    return;
                }
            }
        });
    }
    upload();
};

/*
 * ������Ȩ��ַ
 * @param url ��ַ
 */

tMobileSDK.addAuthCode = function(url){
    var state = WXS.WXState;
    var baseUrl = WXS.URI;
    if(url.match(/^\/inc\/attach.php/)){
        url = url + "&PHPSESSID="+WXS.P.split(';')[1];
    }
    if(url.match(/^\//)){
        url = window.location.protocol + "//" + window.location.host + url;
    }
    return url;
    //return url.indexOf(baseUrl) != -1 ? (url.indexOf(state) != -1 ? url : (url + "&WXState=" + state)) : (url.indexOf(state) != -1 ? (baseUrl + url) : (baseUrl + url + "&WXState=" + state));
}