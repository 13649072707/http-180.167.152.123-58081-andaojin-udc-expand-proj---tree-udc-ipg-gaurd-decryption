layui.define('form', function (exports) {
    var $ = layui.$,
        form = layui.form,
        hint = layui.hint();
    var obj = {
        ecm: function (id) {
            var str = ''; //声明字符串
            str += '<option value="5100">v5.10.0.0</option>';
            str += '<option value="5110">v5.11.0.0</option>';
            str += '<option value="5120">v5.12.0.0</option>';
            str += '<option value="5130">v5.13.0.0</option>';
            str += '<option value="5150">v5.15.0.0</option>';
            str += '<option value="5160">v5.16.0.0</option>';
            str += '<option value="5170">v5.17.0.0</option>';
            str += '<option value="5180">v5.18.0.0</option>';
            $(str).appendTo(id);//绑定
            //$("#test option:eq(6)").attr("selected", 'selected'); //默认选择第一个选项
            form.render("select");//注意：最后必须重新渲染下拉框，否则没有任何效果
        }
    }
    exports('selectEcm', obj);
});