$(function () {
    let form = layui.form;
    let layer = layui.layer;
    // 定义密码规则
    form.verify({
        // 密码
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        // 新旧密码不能重复
        samePwd: function (value) {
            // console.log(value);
            // console.log($('[name="oldPwd"]').val());
            if (value == $('[name="oldPwd"]').val()) {
                return "新密码不能与原密码一样"
            }
        },
        // 两次密码必须一致
        rePwd: function (value) {
            if (value != $('[name="newPwd"]').val()) {
                return "两次输入密码不一致";
            }
        }

    });

    //表单提交
    $('.layui-form').on('submit', function (e) {
        // 阻止默认
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg("恭喜你，修改密码成功");
                // 重置表单
                $('.layui-form')[0].reset();
                // 跳转
                // location.href='../assets/login.html'
            }
        })

    })

})