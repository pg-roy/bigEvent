$(function () {
    //$.ajaxPrefilter是jquery对原生ajax的封装后过滤函数，options是xmlHttpRequest被jQuery封装后的对象
    $.ajaxPrefilter(function (options) {
        options.url = 'http://ajax.frontend.itheima.net' + options.url
        console.log(options);
        if (options.url.indexOf('/my/' !== -1)) {
            options.headers = {
                Authorization: localStorage.getItem('token') || ''
            }
        }
        //每次调用ajax请求都会判断responseJSON.status的值和信息
        options.complete = function(res) {
            console.log(res);
            if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                localStorage.removeItem('token');
                location.href = '/login.html';
            }
        }
    });

})