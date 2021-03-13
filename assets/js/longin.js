$(function () {
    // 登录注册切换
    $('#link_reg').on('click', function () {
        $('.longin').hide();
        $('.reg').show();

    })
    $('#link_login').on('click', function () {
        $('.longin').show();
        $('.reg').hide();
    })

    // 校验
    let form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],

        repwd: function (value) {
            // console.log(value);
            // 判定密码是否一致
            if (value != $('.reg input[name=password]').val().trim()) {
                return "两次密码输入不一致";
            }
        }

    })

    // 注册用户
    let layer = layui.layer;
    $('#form-reg').on('submit', function (e) {
        e.preventDefault();
        // 发送数据
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: {
                username: $('.reg input[name=username]').val().trim(),
                password: $('.reg input[name=password]').val().trim()
            },
            success: (res) => {
                // console.log(res);
                if (res.status != 1) {
                    layer.msg('用户注册成功', { icon: 6 });
                    $('#link_login').click();
                    // 重置表单
                    $('#form-reg')[0].reset();
                } else {
                    return layer.msg(res.message, { icon: 5 });
                }
            }
        })
    })

    // 用户登录
    $('#form-login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status != 1) {
                    //    跳转
                    location.href = './index.html'
                    //    保存数据
                    localStorage.setItem('token', res.token)
                } else {
                    return layer.msg(res.message, { icon: 5 });
                }
            }
        })
    })
})