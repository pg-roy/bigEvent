$(function () {
    //点击去注册操作
    $('#link_login').click(function () {
        $('.loginBox').hide();
        $('.regBox').show();
    })
    //点击去登录操作
    $('#link_reg').click(function () {
        $('.loginBox').show();
        $('.regBox').hide();
    })
    //验证表单登录
    //layui.form是
    let form = layui.form;
    let layer = layui.layer;
    form.verify({
        //验证密码不能有空格，6-12个字符
        pwd:[/^[\S]{6,12}$/,'密码不能有空格，6-12个字符'],
        repwd:function(value) {
            let values = $('.regBox [name=password]').val();
            if(values !==value) {
                return '两次密码不一致'
            } 
        }
    })
    // 注册页面表单提交注册
    // let data = {
    //     username:$('.regBox [name=username]').val(),
    //     password:$('.regBox [name=password]').val()
    // };
    // console.log(data);
    $('#regs').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/api/reguser',
            data:$(this).serialize(),
            success:function(res) {
                if(res.status !==0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功，请登录');
                $('#link_reg').click();
            }
        })
    })

    // 登录页面表单提交注册
    $('#logins').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/api/login',
            data:$(this).serialize(),
            success:function(res) {
                if(res.status !==0) {
                    return layer.msg(res.message);
                }
                layer.msg('登录成功');
                localStorage.setItem('token',res.token);
                location.href = '/index.html';
            }
        })
    })
    
})