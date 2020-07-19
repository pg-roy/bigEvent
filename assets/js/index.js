//1页面加载获取发请求获取信息渲染用户头像
$(function () {
    getUserInfo();
    //退出按钮
    //给退出按钮绑定点击事件，利用layui的confirm提示框

    $('#closeBtn').on('click', function () {
        layer.confirm('是否退出', function (index) {
            localStorage.removeItem('token');
            location.href = '/login.html';
            layer.close(index);
        });
    })

})
//写在外侧，方便子页面被调用
function getUserInfo() {
    let layer = layui.layer;
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败');
            }
            rendarData(res.data);
        }
    })
}
//渲染用户头像
function rendarData(user) {
    let name = user.nickname || user.username;
    $('#welcome').html('欢迎' + name);
    if (user.user_pic !== null) {
        $('.layui-nav-img').prop('src', user.user_pic).show();
        $('.text-avatar').hide();

    } else {
        $('.layui-nav-img').hide();
        $('.text-avatar').html(name[0].toUpperCase()).show();
    }
}

//退出按钮
//给退出按钮绑定点击事件，利用layui的confirm提示框