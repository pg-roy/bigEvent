$(function() {
    let form = layui.form;
    let layer = layui.layer;
    form.verify({
        //验证密码不能有空格，6-12个字符
        newPwd:[/^[\S]{6,12}$/,'密码不能有空格，6-12个字符'],
        rePwd:function(value) {
            let values = $('.regBox [name=password]').val();
            if(values !==value) {
                return '两次密码不一致'
            } 
        }
    })
})