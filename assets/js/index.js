$(function () {
    getUserInfo();
    let layer = layui.layer;
    function getUserInfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败');
                }
                //用res.status再判断一下
                //渲染头像函数
                rendarUser(res.data);
            }

        })
    }
    //渲染头像函数
    function rendarUser(user) {
        let name = user.nickname || user.username;
        $('#welcome').html('欢迎' + name);
        if (user.user_pic !== null) {
            $('.layui-nav-img').prop('src', user.user_pic);
            $('.layui-nav-img').show();
            $('.text-avatar').hide();
        } else {
            $('.layui-nav-img').hide();
            $('.text-avatar').html(name[0].toUpperCase()).show();
        }
    }
    //退出按钮
    //①给结构添加退出按钮，绑定点击事件
    //用layer.confirm来判断是否退出，里面有三个参数
    //点击确认清空token，跳转页面
    $('#closeBtn').click(function() {
        layer.confirm('请确认是否退出',{ icon: 3, title: '提示' },function(index) {
            localStorage.removeItem('token');
            location.href = '/login.html';
            layer.close(index);
        })
    })
})