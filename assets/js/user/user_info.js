//首先发请求获取用户数据，显示到表单内，表单必须加隐藏域input
$(function() {
    initUserInfo();
    let layer = layui.layer;
    let form = layui.form;

    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败');
                }
                form.val('formUserInfo',res.data);
            }
        })
    }

    //重置按钮表单提交调用initUserInfo函数
    $('#resetBtn').on('click',function(e) {
        e.preventDefault();
        initUserInfo();
    })

    //提交更新，首先进行表单校验
    form.verify({
        nickname:function(value) {
            if(value.length>6) {
                return '6位之间';
            }
        }
    });
    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        //表单验证后再发送修改昵称请求
        $.ajax({
            method:'post',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res) {
                if(res.status !==0) {
                    return layer.msg('更新失败');
                }
                layer.msg('更新成功');
                //提交修改数据后再更新页面
                parent.getUserInfo();
            }
        })
    })
})
