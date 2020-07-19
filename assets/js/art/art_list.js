$(function() {
    initArtList();
    let layer = layui.layer;
    let form = layui.form;
    //渲染文章列表
    function initArtList() {
        $.ajax({
            method:'get',
            url:'/my/article/cates',
            success:function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败');
                }
                let htmlStr = template('tpl-list',res);
                $('tbody').html(htmlStr);
            }
        })
    }
    //添加layer索引，方便关闭
    let indexAdd = null;
    $('#art_addBtn').on('click',function() {
        indexAdd = layer.open({
            type:1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content:$('#dialog-add').html()
        })

    })
    //动态给添加文章form注册事件，当添加文章form提交时，发起请求
    $('body').on('submit','#form-add',function(e) {
        e.preventDefault();
        $.ajax({
            method:'post',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:function(res){
                if (res.status !== 0) {
                    return layer.msg('新增文章分类失败');
                }
                //提交服务器数据后重新渲染列表
                initArtList();
                layer.msg('新增文章分类成功');
                layer.close(indexAdd)
            }
        })
    });
    //编辑功能
    //点击编辑填充表单
    var indexEdit = null;
    $('tbody').on('click','#artEidt',function() {
        indexEdit = layer.open({
            type:1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content:$('#dialog-edit').html(),
        })
        //获取点击的id
        let id = $(this).attr('data-id');
        console.log(id);
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
              form.val('form-edit', res.data)
            }
          })
    })
    //动态给添加文章form注册事件，当添加文章form提交时，发起请求
    $('body').on('submit','#form-edit',function(e) {
        e.preventDefault();
        console.log($(this).serialize());
        $.ajax({
            method:'post',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:function(res){
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('修改文章分类失败');
                }
                //提交服务器数据后重新渲染列表
                layer.msg('修改文章分类成功');
                layer.close(indexEdit)
                getArtList();
            }
        })
    });

    //删除文章
    $('tbody').on('click', '#artDelete', function() {
        var id = $(this).attr('data-id')
        // 提示用户是否要删除
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
          $.ajax({
            method: 'GET',
            url: '/my/article/deletecate/' + id,
            success: function(res) {
              if (res.status !== 0) {
                return layer.msg('删除分类失败！')
              }
              layer.msg('删除分类成功！')
              layer.close(index)
              initArtList()
            }
          })
        })
    })
    
})