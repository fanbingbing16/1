// 处理多次点击
export function noMultipleClicks(methods,pamars) {
    let that = this;
    
    if (that.noClick) {
        that.noClick= false;
        methods(pamars);
        setTimeout(function () {
            that.noClick= true;
        }, 2000)
    } else {
        console.log("请稍后点击")
    }
}

