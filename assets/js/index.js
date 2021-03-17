$(function () {
    // 获取用户数据
    getUserInfo();
    // 退出登录
    let layer = layui.layer;
    $('#btnLogin').on('click', function () {
        layer.confirm('确定要退出吗？', { icon: 3, title: '提示' }, function (index) {
            // 清除数据 
            localStorage.removeItem('token');
            // 页面跳转
            location.href = '/login.html';
            // 关闭
            layer.close(index);
        });
    })
})
//封装获取用户数据
function getUserInfo() {
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        success: (res) => {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message, { icon: 5 });
            }
            // 渲染头像
            renderAvatar(res.data)
        }
    })
}

//封装渲染头像
function renderAvatar(user) {
    let name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 有头像渲染头像没有渲染文字头像
    if (user.user_pic == null) {
        $('.layui-nav-img').hide();
        $('.text-avatar').show().html(name[0].toUpperCase());

    } else {
        $('.layui-nav-img').show().attr('src', user.user_pic);
        $('.text-avatar').hide();
    }
}

