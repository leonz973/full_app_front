function throttle(fn, gapTime) {
    if (gapTime == null || gapTime == undefined) {
        gapTime = 1500
    }

    let _lastTime = null

    // 返回新的函数
    return function () {
        let _nowTime = +new Date()
        if (_nowTime - _lastTime > gapTime || !_lastTime) {
            fn.apply(this, arguments) //将this和参数传给原函数
            _lastTime = _nowTime
        }
    }
}

/*函数防抖*/
function debounce(fn, interval) {
    var timer;
    var gapTime = interval || 1000; //间隔时间，如果interval不传，则默认1000ms
    return function () {
        clearTimeout(timer);
        var context = this;
        var args = arguments; //保存此处的arguments，因为setTimeout是全局的，arguments不是防抖函数需要的。
        timer = setTimeout(function () {
            fn.call(context, args);
        }, gapTime);
    };
}

export default {
    throttle,
    debounce
};
