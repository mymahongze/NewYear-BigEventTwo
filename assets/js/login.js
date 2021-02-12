$(function () {
    $('#link_reg').on('click',function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click',function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    var form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6~12位，且不能出现空格'],
        repwd:function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd != value) {
                return '两次密码不一致！'
            }
        }
    })

    var layer = layui.layer
    // 注册
    $("#form_reg").on('submit',function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: "/api/reguser",
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val(),
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功！请登录')
                $('#link_login').click()
            }
        });
    })
    // 登陆
    $("#form_login").on('submit',function (e) {
        e.preventDefault()
        $.ajax({
            method:'POST',
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登陆成功！')
                localStorage.setItem('token',res.token)
                location.href = '/index.html'
            }
        });
    })
})