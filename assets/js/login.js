$(function() {
    //点击去注册操作
    $('#link_login').on('click',function() {
        $('.loginBox').hide();
        $('.regBox').show();
    });
    //点击去登录操作
    $('#link_reg').on('click',function() {
        $('.loginBox').show();
        $('.regBox').hide();
    });
    let form = layui.form;
    let layer = layui.layer;
    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function(value) {
          // 通过形参拿到的是确认密码框中的内容
          // 还需要拿到密码框中的内容
          // 然后进行一次等于的判断
          // 如果判断失败,则return一个提示消息即可
          let pwds = $('.regBox [name=password]').val();
          if(pwds != value) {
              return '两次密码不一致'
          }
        }
      })
      //注册页面的ajax函数
      $('#regs').submit(function(e) {
        e.preventDefault();
        let data = {
            username: $('.regBox [name=username]').val(),
            password: $('.regBox [name=password]').val(),
        };
        $.ajax({
            method:'post',
            url:'/api/reguser',
            data:data,
            success:function(res) {
                if(res.status !== 0) {
                    return layer.msg('注册失败');
                }
                layer.msg('注册成功，请登录');
                $('#link_reg').click();
            }
        })
      });
      $('#logins').submit(function(e) {
        e.preventDefault();
        $.ajax({
            method:'post',
            url:'/api/login',
            data:$(this).serialize(),
            success:function(res) {
                if(res.status !== 0) {
                    return layer.msg('登录失败');
                }
                layer.msg('登录成功');
                localStorage.setItem('token',res.token);
                location.href = '../../index.html';
                
            }
        })
      })
})