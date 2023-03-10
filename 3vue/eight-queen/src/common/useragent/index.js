// 判断浏览器内核、手机系统等，使用 browser.userAgent.mobile
const browser = {
    userAgent: function () {
        var ua = navigator.userAgent;
        var ualower = navigator.userAgent.toLocaleLowerCase();
        return {
            trident: ua.indexOf('Trident') > -1, // IE内核
            presto: ua.indexOf('Presto') > -1, // opera内核
            webKit: ua.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') == -1, // 火狐内核
            mobile: !!ua.match(/AppleWebKit.*Mobile.*/) || !!ua.match(/AppleWebKit/), // 是否为移动终端
            ios: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // IOS终端
            android: ua.indexOf('Android') > -1 || ua.indexOf('Mac') > -1, // 安卓终端
            iPhone: ua.indexOf('iPhone') > -1 || ua.indexOf('Mac') > -1, // 是否为iphone或QQHD浏览器
            iPad: ua.indexOf('iPad') > -1, // 是否为iPad
            webApp: ua.indexOf('Safari') == -1, // 是否web应用程序，没有头部与底部
            QQbrw: ua.indexOf('MQQBrowser') > -1, // QQ浏览器(手机上的)
            weiXin: ua.indexOf('MicroMessenger') > -1, // 微信
            QQ: ualower.match(/\sQQ/i) == " qq", // QQ App内置浏览器（需要配合使用）
            weiBo: ualower.match(/WeiBo/i) == "weibo", // 微博
            ucLowEnd: ua.indexOf('UCWEB7.') > -1, //
            ucSpecial: ua.indexOf('rv:1.2.3.4') > -1,
            webview: !(ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/)) && ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
            ucweb: function () {
                try {
                    return parseFloat(ua.match(/ucweb\d+\.\d+/gi).toString().match(/\d+\.\d+/).toString()) >= 8.2
                } catch (e) {
                    if (ua.indexOf('UC') > -1) {
                        return true;
                    }
                    return false;
                }
            }(),
            Symbian: ua.indexOf('Symbian') > -1,
            ucSB: ua.indexOf('Firofox/1.') > -1
        };
    }()
};
// 判断android手机的 QQ浏览器、QQ APP内置浏览器、微信 APP内置浏览器
var ua = navigator.userAgent.toLowerCase(),
    isWx = false, isQQ = false, isQQInstalled = false;
if (ua.indexOf(' qq') > -1 && ua.indexOf('mqqbrowser') < 0) {
    //qq内置浏览器
    isQQInstalled = true;
    return;
}
if (ua.indexOf('mqqbrowser') > -1 && ua.indexOf(" qq") < 0) {
    //qq浏览器
    isQQ = true;
    return;
}
if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    //微信浏览器
    isWx = true;
    return;
}

