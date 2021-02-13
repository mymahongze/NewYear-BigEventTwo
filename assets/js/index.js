$(function () {
    getUserInfo()

    // 退出
    var layer = layui.layer
    // 点击按钮 实现退出的功能
    $('#btnLogout').on('click',function () {
        layer.confirm('确定退出登陆?', {icon: 3, title:'提示'}, function(index){
            // 清空本地存储中的token
            localStorage.removeItem('token')
            // 重新跳转到登录页面
            location.href = '/login.html'
            // 关闭confirm询问框
            layer.close(index);
          });
    })

    function getUserInfo() {
        $.ajax({
            method:"GET",
            url: "/my/userinfo",
            // headers: {
            //     Authorization:localStorage.getItem('token') || ''
            // },
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败！')
                }
                renderAvatar(res.data)
            }
        });
    }

    function renderAvatar(user) {
        var name = user.nickname || user.username
        $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        if (user.user_pic !== null) {
            $('.layui-nav-img').attr('src',user.user_pic).show()
            $('.text-avatar').hide()
        } else {
            $('.layui-nav-img').hide()
            var first = name[0].toUpperCase()
            $('.text-avatar').html(first).show()
        }
    }
})