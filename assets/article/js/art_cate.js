$(function () {
    // 文章类别展示
    initArtCateList();

    // 封住函数
    function initArtCateList() {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: (res) => {
                // console.log(res);
                let str = template('cate', { data: res.data })
                $('tbody').html(str);
            }
        })
    }

    let layer = layui.layer;

    $('#btnadd').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            title: "添加章分类",
            area: ['500px', '260px'],
            content: $("#add").html()
        });
    })

    // 提交文章分类添加 事件委托
    let indexAdd = null;
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        // alert($(this).serialize())
        //发送数据
        $.ajax({
            type: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                // 重新展示数据
                initArtCateList();
                layer.msg("恭喜你，文章类别添加成功");
                // 关闭弹窗
                layer.close(indexAdd)
            }
        })

    })

    //修改 
    let form = layui.form;
    let indexEdit = null;
    $('tbody').on('click', '.btn-edit', function (e) {
        e.preventDefault();
        indexEdit = layer.open({
            type: 1,
            title: "修改章分类",
            area: ['500px', '260px'],
            content: $("#edit").html()
        });
        // 获取自定义id
        let id = $(this).attr('data-id');
        // alert(id)
        //发送数据
        $.ajax({
            type: 'get',
            url: '/my/article/cates/' + id,
            success: (res) => {
                // 赋值 所在元素属性 lay-filter="" 对应的值
                form.val("form-edit", res.data)
            }
        })

    })

    //提交修改
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        // alert($(this).serialize())
        //发送数据
        $.ajax({
            type: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                // 重新展示数据
                initArtCateList();
                layer.msg("恭喜你，文章类别更新成功");
                // 关闭弹窗
                layer.close(indexEdit)
            }
        })

    })
    //删除
    $('tbody').on('click', '.btn-delete', function () {
        // 获取自定义id
        let id = $(this).attr('data-id');

        //显示提示框
        layer.confirm('确定要删除吗?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                type: 'get',
                url: '/my/article/deletecate/' + id,
                success: (res) => {
                    // console.log(res);
                    if (res.status != 0) {
                        return layer.msg(res.message)
                    }
                    // 重新渲染
                    initArtCateList();
                    layer.msg("恭喜你，文章分类删除成功");
                }
            })
            layer.close(index);
        });

    })

})