$(function () {
    // console.log(1);
    // 开发环境服务配置
    let baseURL = 'http://api-breakingnews-web.itheima.net';
    // 测试环境服务配置
    // let baseURL = 'http://api-breakingnews-web.itheima.net';
    // 生产环境服务配置
    // let baseURL = 'http://api-breakingnews-web.itheima.net';
    // 拦截可以得到 get post ajax 的请求 属性值等等

    $.ajaxPrefilter(function (options) {
        // console.log(options.url);
        if (options.url === 'http://127.0.0.1:5500/index.html') return;
        options.url = baseURL + options.url;

        if (options.url.indexOf('/my/') != 1) {
            options.headers = {
                Authorization: localStorage.getItem('token') || ""
            }
            // 身份拦截
            options.complete = function (res) {
                // console.log(res);
                let obj = res.responseJSON;
                if (obj.status == 1 && obj.message == '身份认证失败！') {
                    // 清除数据 
                    localStorage.removeItem('token');
                    // 页面跳转
                    location.href = '/login.html'
                }
            }
        }


    })
})