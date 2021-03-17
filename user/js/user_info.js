$(function () {
    // 自定义密码规则
    let form = layui.form;
    let layer = layui.layer;
    form.verify({

        nickname: function (value) {
            // console.log(value);
            if (value.length > 6) {
                return "昵称长度位1-6位之间"
            }
        }

    });

    // 用户渲染
    initUserInfo();


    // 封装函数 获取信息
    function initUserInfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                // 成功渲染
                form.val("formUserInfo", res.data);
            }
        })
    }

    // 表单重置
    $('#btnReset').on('click', function (e) {
        // 阻止默认
        e.preventDefault();
        //新用户渲染
        initUserInfo();
    })

    //修改用户信息
    $('.layui-form').on('submit', function (e) {
        // 阻止默认
        e.preventDefault();
        // 发送请求
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg("恭喜你，用户信息更新成功");
                //调用父页面中更新用户信息的头像方法
                window.parent.getUserInfo();
            }
        })
    })

})


