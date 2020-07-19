// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
// 1.2 配置选项
const options = {
  // 纵横比
  aspectRatio: 1,
  // 指定预览区域
  preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options);

$('.btns').on('click',function() {
    $('#file').click();
})

 var layer = layui.layer;
$('#file').on('change',function(e) {
    var files = e.target.files;
    if(files.length ===0) {
        return layer.msg('请选择文件');
    }
    var file = e.target.files[0];
    //利用URL.createObjectURL拿到新图片的地址
    var newImgURL = URL.createObjectURL(file);
    console.log(newImgURL);
    $image
   .cropper('destroy')      // 销毁旧的裁剪区域
   .attr('src', newImgURL)  // 重新设置图片路径
   .cropper(options)        // 重新初始化裁剪区域    
});

$('#uploadBtn').on('click',function() {
    let dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    $.ajax({
        method:'post',
        url:'/my/update/avatar',
        data:{
            avatar:dataURL
        },
        success:function(res) {
            if(res.status !==0) {
                return layer.msg('更新失败');
            }
            layer.msg('更新成功')
            parent.getUserInfo();
        }
    })
})