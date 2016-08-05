tMobileSDK = window.tMobileSDK || {};

tMobileSDK.ready = function(func){
    td.ready(func)
};

tMobileSDK.confirm = function(opts) {
    td.confirm({
        title: opts.title || '提示',
        message: opts.message || '',
        buttonLabels: opts.buttonLabels || ['确定','取消'],
        onSuccess: opts.onSuccess,
        onFail: opts.onFail
    })
}

tMobileSDK.toast = function(opts) {
    td.toast({
        text: opts.text || '',
        duration: opts.duration || 5,
        delay: opts.delay || 0,
        onSuccess: opts.onSuccess,
        onFail: opts.onFail
    })
}

tMobileSDK.getLocation = function(opts) {
    td.getLocation({
        onSuccess: opts.onSuccess,
        onFail: opts.onFail
    })
}

tMobileSDK.previewImage = function(opts) {
    
    opts.urls.forEach(function(v, k){
        opts.urls[k] = tMobileSDK.addAuthCode(v);
    });
    opts.current = tMobileSDK.addAuthCode(opts.current);
    
    td.previewImage({
        urls: opts.urls || [],
        current: opts.current || 0,
        onSuccess: opts.onSuccess,
        onFail: opts.onFail
    })
}

tMobileSDK.launchApp = function(opts) {
    td.launchApp({
        app: opts.app || '',
        onSuccess: opts.onSuccess,
        onFail: opts.onFail
    })
}

tMobileSDK.previewFile = function(opts) {
    td.previewFile({
        url: opts.url || '',
        onSuccess: opts.onSuccess,
        onFail: opts.onFail
    })
}

tMobileSDK.call = function(opts) {
    td.call({
        phoneNum: opts.phoneNum || '',
        onSuccess: opts.onSuccess,
        onFail: opts.onFail
    })
}

tMobileSDK.sendMessage = function(opts) {
    td.sendMessage({
        phoneNums: opts.phoneNums || [''],
        content: opts.content || '',
        onSuccess: opts.onSuccess,
        onFail: opts.onFail
    })
}

tMobileSDK.getNetworkType = function(opts) {
    td.getNetworkType({
        onSuccess: opts.onSuccess,
        onFail: opts.onFail
    })
}

tMobileSDK.chooseImage = function(opts) {
    td.chooseImage({
        onSuccess: opts.onSuccess,
        onFail: opts.onFail
    })
}

tMobileSDK.selectFile = function(opts) {
    td.selectFile({
        onSuccess: opts.onSuccess,
        onFail: opts.onFail
    })
}

tMobileSDK.selectUser = function(opts) {
    td.selectUser({
        onSuccess: opts.onSuccess,
        onFail: opts.onFail
    })
}

tMobileSDK.setTitle = function(opts) {
    td.setTitle({
        title: opts.title || '标题',
        onSuccess: opts.onSuccess,
        onFail: opts.onFail
    })
}

tMobileSDK.setRight = function(opts) {
    td.setRight({
        show: opts.show || true,
        control: opts.control || false,
        text: opts.text || '',
        onSuccess: opts.onSuccess,
        onFail: opts.onFail
    })
}

tMobileSDK.actionSheet = function(opts) {
    td.actionSheet({
        title: opts.title || '标题',
        cancelButton: opts.cancelButton || '取消',
        otherButtons: opts.otherButtons || ['btn1','btn2'],
        onSuccess: opts.onSuccess,
        onFail: opts.onFail
    })
}

tMobileSDK.buildHeader = function(headerData) {
    var hash = {}
    var title = []
    if(headerData.c && headerData.c.push) {
        headerData.c.forEach(function(item, index) {
            title.push(item.title)
            hash[index] = item.event
        })
    } else if(headerData.c) {
        title.push(headerData.c.title)
        //hash[0] = headerData.c.event
    }

    headerData.c && this.setTitle({
        title: title,
        onSuccess: function(results) {
            if(results) {
                tMobileSDK.util.eval(hash[results])
            }
        }
    })
    if(headerData.r === null) headerData.r = {}
    headerData.r && this.setRight({
        show: true,
        control: true,
        text: headerData.r.title,
        onSuccess: function(results) {
            if(results === 'clicked') {
                headerData.r.event && tMobileSDK.util.eval(headerData.r.event)
            }
        }
    })
}

tMobileSDK.buildFunc = function(funcData) {
    var hash = {};
    var otherButtons = [];
    funcData.forEach(function(item, index) {
        hash[index] = item.event;
        otherButtons.push(item.title);
    })
    this.actionSheet({
        title: '选项：',
        otherButtons: otherButtons,
        onSuccess: function(results) {
            if(results != -1) {
                tMobileSDK.util.eval(hash[results])
            }
        }
    })
}

/*
 * 增加授权地址
 * @param url 地址
 */

tMobileSDK.addAuthCode = function(url){
    return url;
}