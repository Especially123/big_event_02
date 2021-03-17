$(function () {
    // 优化时间  定义时间过滤器 
    template.defaults.imports.dataFormat = function (dtStr) {
        let dt = new Date(dtStr);

        let y = dt.getFullYear();
        let m = padZero(dt.getMonth() + 1);
        let d = padZero(dt.getDate());

        let hh = padZero(dt.getHours());
        let mm = padZero(dt.getMinutes());
        let ss = padZero(dt.getSeconds());

        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    }
    // 时间个数添加0
    function padZero(num) {
        return num < 10 ? "0" + num : num;
    }

    let layer = layui.layer;


    //定义参数
    let q = {
        pagenum: 1,        //页码值
        pagesize: 2,      //每页显示多少条数据
        cate_id: "",     //文章分类的 Id
        state: "",     //文章的状态，可选值有：已发布、草稿

    }
    // 获取文章类别数据
    initTable();
    // 封装 获取文章类别数据
    function initTable() {
        $.ajax({
            type: 'get',
            url: '/my/article/list',
            data: q,
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                //    成功 渲染
                let str = template('tpl-table', { data: res.data });
                $('tbody').html(str);
                // 调用分页
                renderPage(res.total)
            }
        })
    }

    // 初始化分类
    let form = layui.form;
    initCate();
    // 封装 初始化分类

    function initCate() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                // 赋值 渲染
                let str = template('tpl-cate', { data: res.data })
                $('[name="cate_id"]').html(str);
                // 因为是 表单  数据重新解析
                form.render();
            }
        })
    }

    //筛选
    $("#form-search").on('submit', function (e) {
        e.preventDefault();

        // 获取
        let state = $('[name="state"]').val();
        let cate_id = $('[name="cate_id"]').val();

        // 赋值
        q.status = state;
        q.cate_id = cate_id;
        // 初始化
        initTable();
    })

    //分页
    let laypage = layui.laypage;
    function renderPage(total) {
        // alert(total)
        laypage.render({
            elem: 'pageBox',//注意，这里的 test1 是 ID，不用加 # 号
            curr: q.pagenum, //第几页
            limit: q.pagesize,//每页几条
            count: total,//数据总数，从服务端得到
            //分页模块设置
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 4, 6, 8],//每页显示多少条数据
            // 触发 jump 分页初始化的时候页码改变
            jump: function (obj, first) {
                //obj包含了当前分页的所有参数， first是否第一次初始
                // 赋值页面
                // console.log(obj.curr, obj.limit);
                q.pagenum = obj.curr;
                q.pagesize = obj.limit;
                // 改变当前业
                q.pagenum = obj.curr;
                //首次不执行
                if (!first) {
                    // 初始化
                    initTable();
                }
            }
        });
    }

    //删除
    $('tbody').on('click', '.btn-delete', function () {
        let id = $(this).attr('data-id');
        layer.confirm('确定要删除吗?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                type: 'get',
                url: '/my/article/delete/' + id,
                success: (res) => {
                    // console.log(res);
                    if (res.status != 0) {
                        return layer.msg(res.message)
                    }
                    // 重新渲染
                    layer.msg("恭喜你，文章删除成功");
                    // 页面汇总删除按钮个数等于1 页码大于1
                    if ($('.btn-delete').length == 1 && q.pagenum > 1) q.pagenum--;
                    initTable();
                }
            })
            layer.close(index);
        });
    })
})