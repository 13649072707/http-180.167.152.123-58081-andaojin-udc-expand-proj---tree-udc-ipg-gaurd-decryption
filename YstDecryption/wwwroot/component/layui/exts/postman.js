layui.define('form', function (exports) {
    var $ = layui.$,
        form = layui.form,
        hint = layui.hint();
    MOD_NAME ='postman'
    var postman = {
        set: function (options) {
            var that = this;
            that.config = $.extend({}, that.config, options);
            return that;
        }
        // 事件监听
        ,
        on: function (events, callback) {
            return layui.onevent.call(this, MOD_NAME, events, callback);
        }

    }
        // 操作当前实例
        ,
        thisIns = function () {
            var that = this,
                options = that.config;

            return {
                // 获取数据
                getData: function () {
                    var that = this;
                    var listpostman = $(that.that.config.el)[0];
                    var rowDivs = listpostman.getElementsByClassName('layui-row')
                    var parameters = [];
                    for (var r = 0; r < rowDivs.length; r++) {
                        var parameter = {}
                        var forminitDivs = rowDivs[r].getElementsByClassName('layui-form-item')
                        var inputElemen = rowDivs[r].getElementsByTagName('input').xulie
                        if (inputElemen) {
                            parameter["sort"] = inputElemen.value;
                        }
                        for (var f = 0; f < forminitDivs.length; f++) {
                            var formName = forminitDivs[f].nodeName.toLocaleLowerCase();
                            switch (formName) {
                                case 'div':
                                    {
                                        var inlineDivs = forminitDivs[f].children;
                                        for (var v = 0; v < inlineDivs.length; v++) {
                                            if (inlineDivs[v].nodeName.toLocaleLowerCase() === 'div') {
                                                var node = inlineDivs[v].children[0];
                                                var name = node.nodeName.toLocaleLowerCase()                                                
                                                switch (name) {
                                                    case 'select':
                                                        //console.log('select:' + node.options[node.options.selectedIndex].value)
                                                        parameter[node.name] = node.options[node.options.selectedIndex].value
                                                        break;
                                                    case 'textarea':
                                                    case 'input':
                                                        if (node.type === 'checkbox') {
                                                            console.log(name + node.value)
                                                            parameter[node.name] = (node.value === 'true' || node.value === '1')?1:0
                                                        } else {
                                                            //console.log('textarea:' + node.value)
                                                            parameter[node.name] = node.value
                                                        }
                                                        break;
                                                    default:
                                                }
                                            }
                                        }
                                    }
                                    break;
                                default:
                            }
                        }
                        parameters.push(parameter);
                    }
                    return parameters;
                },
                //添加一个新的请求,请求参数
                add: function (options) {
                    var that = this;
                    that.config = $.extend({}, postman.config, options);
                    var listpostman = $(that.that.config.el)[0];
                    that.config.postmanList = options || [{ formList: defaultFormPost }]
                    that.that.addPost(listpostman, that.config)
                },
                // 配置数据
                config: options,
                that: that
            }
        },
        Class = function (options) {
            var that = this;
            that.config = $.extend({}, that.config, postman.config, options);
            //that.config.values = options.values
            //seleceedVal = options.values;
            that.render();
        };
    var selecPostList = ['GET', 'POST'];
    var selectDataList = ['application/x-www-form-urlencoded', 'application/json', 'application/xml'];

    var defaultFormPost = [
        { index: 1, name: 'title', title: '请求标题', attributes: [{ name: 'placeholder', value: '请输入标题,用于备注，无其他作用' }, { name: 'lay-verify', value: 'required' }, { name: 'autocomplete', value: 'off' }], value: '', type: 'text' },
        { index: 2, name: 'url', title: '请求地址', attributes: [{ name: 'placeholder', value: '请输入地址' }, { name: 'lay-verify', value: 'url' }, { name: 'autocomplete', value: 'off' }], value: '', type: 'text' },
        { index: 3, name: 'posttype', title: '请求方式', value: '', selects: selecPostList, type: 'select' },
        { index: 4, name: 'datatype', title: '数据类型', value: '', selects: selectDataList, type: 'select' },
        { index: 5, name: 'headparameter', title: '请求头部数据', attributes: [{ name: 'placeholder', value: '格式:key=value&key=value' }], value: '', type: 'textarea' },
        { index: 6, name: 'bodyparameter', title: '请求数据', attributes: [{ name: 'placeholder', value: 'x-www-form-urlencoded格式：key=value&key=value，json和xml请填写对应的格式' }], value: '', type: 'textarea' },
        { index: 7, name: 'resultparameter', title: '存储回调参数', attributes: [{ name: 'placeholder', value: '格式：key&key&key,存储后下个请求可使用' }], value: '', type: 'textarea' }
    ];
    //默认配置
    Class.prototype.config = {

        config: {
            checkedName: 'SELECTPLUS_CHECKED',
            indexName: 'SELECTPLUS_INDEX'
        },
        postmanList: [
            { formList: defaultFormPost },
        ],

        error: ''

    };
    Class.prototype.addPost = function (listpostman, options) {
        var that = this;
        that.config = $.extend({}, that.config, postman.config, options);
        var childs = listpostman.children;
        var numLength = 1;
        for (var i = 0; i < childs.length; i++) {
            if (childs[i].className.toString().indexOf('layui-row') > -1) {
                numLength++
            }
        }
        var postList = that.config.postmanList;
        for (var p = 0; p < postList.length; p++) {
            var codeRowDiv = document.createElement('div');
            codeRowDiv.className = 'layui-row layui-col-space15 layui-postman-position';

            var codeColDiv = document.createElement('div');
            codeColDiv.className = 'layui-col-md12';
            
            var codePanelDiv = document.createElement('div');
            codePanelDiv.className = 'layui-panel layui-scroll';
            var codeInputHiddhe = document.createElement('input')
            codeInputHiddhe.name = 'xulie'
            codeInputHiddhe.type = 'hidden'
            var sortNum = parseInt(postList[p].sort) || numLength
            codeRowDiv.id = "xulie" + sortNum;
            codeInputHiddhe.value = sortNum;
            codePanelDiv.appendChild(codeInputHiddhe)
            //创建上下移动层
            var btnDiv = document.createElement("div");
            btnDiv.className = "layui-upanddownbtn";
            //下移
            var divDown = document.createElement('div');
            divDown.setAttribute('title','下移');
            divDown.className = 'layui-panel-close-left layui-icon btndown ';
            var spanDown = document.createElement("span");
            spanDown.className = "";
            spanDown.innerHTML = "&#xe61a;"
            divDown.appendChild(spanDown);
            divDown.onclick = function (e) {
                var parentsDiv = $(this).parents(".layui-row");
                var next = parentsDiv.next();
                if (next.html() != undefined) {
                    //next.after(parentsDiv);
                    next.fadeOut("slow", function () {
                        $(this).after(parentsDiv);
                    }).fadeIn();
                } else {
                    layer.msg("到底了！");
                }
            }
            btnDiv.appendChild(divDown);
            //上移
            var divUp = document.createElement('div');
            divUp.setAttribute('title', '上移');
            divUp.className = 'layui-panel-close-left layui-icon btnup';
            var spanUp = document.createElement("span");
            spanUp.className = "";
            spanUp.innerHTML = "&#xe619;"
            divUp.appendChild(spanUp);
            divUp.onclick = function (e) {
                var parentsDiv = $(this).parents(".layui-row");
                var prev = parentsDiv.prev();
                if (prev.html() != undefined) {
                    //prev.before(parentsDiv);
                    prev.fadeOut("slow", function () {
                        $(this).before(parentsDiv);
                    }).fadeIn();
                } else {
                    layer.msg('到达最顶部了');
                }
            }
            btnDiv.appendChild(divUp);


            codeRowDiv.appendChild(btnDiv);
            //关闭
            codeLabel = document.createElement('div');
            codeLabel.className = ' layui-panel-close-left layui-icon';
            codeLabel.innerHTML = '&#x1006;';
            codeLabel.setAttribute("data-id", codeRowDiv.id);
            codeLabel.onclick = function (obj) {
                document.getElementById(obj.path[0].getAttribute("data-id")).remove()
            };
            codePanelDiv.appendChild(codeLabel);
            var formList = postList[p].formList.sort((a, b) => {
                if (!a.index || !b.index) {
                    return 1
                }
                return a.index > b.index ? 1 : -1;
            });
            for (var m = 0; m < formList.length; m++) {
                var moduleVal = formList[m]
                var moduleType = moduleVal.type;
                var codeDiv = document.createElement("div");
                codeDiv.className = "layui-form-item ";
                var codeLabel = document.createElement('label');
                codeLabel.className = 'layui-form-label layui-label-width-30';
                codeLabel.innerHTML = moduleVal.title
                codeDiv.appendChild(codeLabel);
                switch (moduleType) {
                    case 'text':
                        {
                            var codeDivInli = document.createElement('div')
                            codeDivInli.className = 'layui-input-inline';
                            var codeInput = document.createElement('input')
                            codeInput.className = 'layui-input'
                            codeInput.name = moduleVal.name
                            codeInput.value = moduleVal.value
                            var atts = moduleVal.attributes || []
                            for (var a = 0; a < atts.length; a++) {
                                codeInput.setAttribute(atts[a].name, atts[a].value);
                            }
                            codeDivInli.appendChild(codeInput);
                            codeDiv.appendChild(codeDivInli)
                        }
                        break;
                    case 'textarea':
                        {
                            var codeDivInli = document.createElement('div')
                            codeDivInli.className = 'layui-input-inline';
                            var codeTextarea = document.createElement('textarea')
                            codeTextarea.className = 'layui-input'
                            codeTextarea.name = moduleVal.name
                            codeTextarea.value = moduleVal.value
                            var atts = moduleVal.attributes || []
                            for (var a = 0; a < atts.length; a++) {
                                codeTextarea.setAttribute(atts[a].name, atts[a].value);
                            }
                            codeDivInli.appendChild(codeTextarea);
                            codeDiv.appendChild(codeDivInli)
                        }
                        break;
                    case 'select':
                        {
                            var codeDivInli = document.createElement('div')
                            codeDivInli.className = 'layui-input-inline';
                            var codeSelect = document.createElement('select')
                            codeSelect.name = moduleVal.name;
                            var option = moduleVal.selects || [];
                            var thatVal = moduleVal.value || (option[0] || '');
                            for (var o = 0; o < option.length; o++) {
                                var codeOption = document.createElement('option')
                                codeOption.innerHTML = option[o]
                                codeOption.value = option[o]
                                codeOption.selected = option[o] === thatVal
                                codeSelect.appendChild(codeOption)
                            }
                            codeDivInli.appendChild(codeSelect);
                            codeDiv.appendChild(codeDivInli)
                        }
                        break;
                    case 'checkbox':
                        {
                            var codeDivInli = document.createElement('div')
                            codeDivInli.className = 'layui-input-inline';
                            var codeCheckbox = document.createElement('input')
                            codeCheckbox.className = 'layui-input'
                            var checkName = moduleVal.name + sortNum;
                            codeCheckbox.id = checkName;
                            codeCheckbox.name = moduleVal.name;
                            codeCheckbox.value = moduleVal.value
                            if ((moduleVal.value === 1 || moduleVal.value === '1') || moduleVal.value === true) {
                                codeCheckbox.setAttribute('checked', 'checked');
                            }
                            codeCheckbox.setAttribute('lay-filter', checkName);                            
                            codeCheckbox.type = 'checkbox'
                            var atts = moduleVal.attributes || []
                            for (var a = 0; a < atts.length; a++) {
                                codeCheckbox.setAttribute(atts[a].name, atts[a].value);
                            }
                            codeDivInli.appendChild(codeCheckbox);
                            codeDiv.appendChild(codeDivInli);
                            form.on('switch(' + checkName + ')', function (obj) {
                                var v = obj.elem.checked;
                                document.getElementById(obj.elem.id).value = v ? '1' : '0';
                            });
                        }
                    default:
                }
                codePanelDiv.appendChild(codeDiv)
            }


            codeColDiv.appendChild(codePanelDiv)
            codeRowDiv.appendChild(codeColDiv)
            listpostman.appendChild(codeRowDiv)
            form.render('select');
            form.render('checkbox');
        }
    }
    //渲染视图
    Class.prototype.render = function () {
        var that = this
            , options = that.config;
        typeof (options.el) === 'string' ? options.el = $(options.el) : options.el;
        
        var listpostman = $(options.el)[0];
        that.addPost(listpostman, options);
    

    };

    postman.render = function (option) {
        var classIns = new Class(option);
        return thisIns.call(classIns)
    };
    exports('postman', postman);
})