$(function() {
    let form = layui.form;
    let layer = layui.layer;
    form.verify({
        //验证密码不能有空格，6-12个字符
        pwd:[/^[\S]{6,12}$/,'密码不能有空格，6-12个字符'],
        newPwd:function(value) {
            if(value === $('.layui-card [name=oldPwd').val()){
                return '新密码不能和原密码一致'
            }
        },
        rePwd:function(value) {
            let values = $('.layui-card [name=newPwd').val();
            if(values !== value) {
                return '两次密码不一致'
            } 
        }
    });
    $('.layui-form').on('submit',function(e) {
        e.preventDefault();
        $.ajax({
            method:'post',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res) {
                if(res.status !==0) {
                    return layer.msg(res.message);
                }
                layer.msg('修改密码成功')
                ('.layui-form')[0].reset();
            }
        })
    })
})