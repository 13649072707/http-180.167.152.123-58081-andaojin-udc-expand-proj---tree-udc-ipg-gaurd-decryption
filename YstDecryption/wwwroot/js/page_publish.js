define("lib/page_publish", function () { }),
    define("component/noItemIcon/index", [lang(), "knockout"], function (e, t) {
        t.components.register("noItemIcon", {
            viewModel: function (o) {
                (this.isDefault = !e[o.itemType]),
                    (this.icon = t.observable(
                        "Content/images/noDataIcons/" +
                        (this.isDefault ? "noData" : o.itemType) +
                        ".png"
                    )),
                    (this.msg = t.observable(e[o.itemType] ? e[o.itemType] : e.noData));
            },
            template:
                '<div class="noItemIcon"><img data-bind="attr:{src:icon}" /> <br /><span data-bind="text:msg" ></span></div> ',
        });
    }),
    define(
        "component/loading/index",
        ["require", "exports", "module", "knockout"],
        function (e, t, o) {
            var n = e("knockout"),
                i = 0;
            o.exports = function () {
                (this.isShowLoading = n.observable(!1)), (this.counter += 1);
            };
            var a = o.exports.prototype;
            (a.getView = function () {
                var e =
                    '<div class="container-loading" data-unique-id="' +
                    this.counter +
                    '"><span data-bind="visible:isShowLoading" class="icon-loading"><em></em> </span></div>';
                return $(e).get(0);
            }),
                (a.counter = 0),
                (a.activate = function () { }),
                (a.show = function (e) {
                    if ((clearTimeout(i), e)) this.isShowLoading(!0);
                    else {
                        var t = this;
                        i = setTimeout(function () {
                            t.isShowLoading(!0);
                        }, 2e3);
                    }
                }),
                (a.hide = function () {
                    clearTimeout(i), this.isShowLoading(!1);
                });
        }
    ),
    define(
        "component/message/index",
        ["durandal/app", "knockout", "jquery", "./../loading/index"],
        function (e, t, o, n) {
            function i() {
                u.success(!1), u.error(!1), u.warning(!1);
            }
            function a() {
                e.on("message:show").then(function (e) {
                    var t = {
                        message: "",
                        type: f.success,
                        delay: 1500,
                        handler: null,
                        showClose: !0,
                        modal: !0,
                    };
                    "string" == typeof e && (e = { message: e }),
                        (e = o.extend({}, t, e));
                    var n = e;
                    void 0 !== m[n.type] && null !== m[n.type]
                        ? (n.type === m.loading && p.show(-1 == n.delay),
                            n.type === m.loaded && p.hide())
                        : ((r = n),
                            l(!0),
                            constInfo.userInfo.NavigationMenuNoShow &&
                            o(".message-box").css("margin-top", "50px"),
                            e.modal ||
                            o(".container-messager").css({
                                width: o(window).width(),
                                height: o(window).height(),
                            }),
                            c(n.showClose),
                            d(n.message),
                            i(),
                            n.type === f.warn ? u[n.type + "ing"](!0) : u[n.type](!0),
                            clearTimeout(s),
                            (s = setTimeout(function () {
                                o(".container-messager").css({ width: "auto", height: "auto" }),
                                    l(!1);
                            }, n.delay)));
                }),
                    e.on("message:hide").then(function (e) {
                        l(!1);
                    });
            }
            window.durandalApp = e;
            var r = (require("header/userinfo/constinfo"), null),
                s = null,
                d = t.observable(),
                l = t.observable(!1),
                c = t.observable(!1),
                u = {
                    success: t.observable(!1),
                    error: t.observable(!1),
                    warning: t.observable(!1),
                },
                p = new n(),
                f = { error: "error", success: "success", warn: "warn" },
                m = { loading: "loading", loaded: "loaded" };
            return {
                loading: p,
                content: d,
                isShowMessage: l,
                showClose: c,
                msgCss: u,
                compositionComplete: function (e, t, o) {
                    a();
                },
                onCloseClick: function () {
                    o(".container-messager").css({ width: "auto", height: "auto" }),
                        l(!1),
                        clearTimeout(s);
                },
                onMessageContentClick: function (e, t) {
                    o(t.target).hasClass("metadata-batchAdds") &&
                        (r.handler && r.handler(!0), t.stopPropagation()),
                        o(t.target).hasClass("security-batchAdds") &&
                        (r.handler && r.handler(!1), t.stopPropagation());
                },
            };
        }
    ),
    define("header/userinfo/cookie", [], function () {
        return function (e, t, o) {
            if (void 0 === t) {
                var n = null;
                if (window.document.cookie && "" != window.document.cookie)
                    for (
                        var i = window.document.cookie.split(";"), a = 0;
                        a < i.length;
                        a++
                    ) {
                        var r = $.trim(i[a]);
                        if (r.substring(0, e.length + 1) == e + "=") {
                            n = decodeURIComponent(r.substring(e.length + 1));
                            break;
                        }
                    }
                return n;
            }
            (o = o || {}),
                null === t && ((t = ""), (o = $.extend({}, o)), (o.expires = -1));
            var s = "";
            if (
                o.expires &&
                ("number" == typeof o.expires || o.expires.toUTCString)
            ) {
                var d;
                "number" == typeof o.expires
                    ? ((d = new Date()),
                        d.setTime(d.getTime() + 24 * o.expires * 60 * 60 * 1e3))
                    : (d = o.expires),
                    (s = "; expires=" + d.toUTCString());
            }
            var l = o.path ? "; path=" + o.path : "",
                c = o.domain ? "; domain=" + o.domain : "",
                u = o.secure ? "; secure" : "";
            window.document.cookie = [e, "=", encodeURIComponent(t), s, l, c, u].join(
                ""
            );
        };
    }),
    define("doc/navigation/service", ["durandal/app"], function (e) {
        function t() {
            this.paths, this.current, this.pathObj;
        }
        var o = t.prototype;
        (o.gotoPath = function (t) {
            (this.current = t), e.trigger(this.pathObj.message, t);
        }),
            (o.gotoParent = function () {
                var t = this.paths || [];
                t.length && (this.current = t.pop()),
                    window.location.hash.indexOf("fromInfobar") < 0 &&
                    t.length &&
                    (this.current = t.pop()),
                    e.trigger(this.pathObj.message, this.current, {});
            }),
            (o.refresh = function () {
                this.paths;
                (this.current = this.paths[this.paths.length - 1]),
                    e.trigger(this.pathObj.message, this.current, !0);
            });
        var n = new t();
        return (
            e.on("navigation:init").then(function (e) {
                e.message.indexOf("team") < 0 ||
                    ((n.pathObj = e),
                        (n.paths = e.paths),
                        (n.current = n.paths[n.paths.length - 1]));
            }),
            {
                gotoPath: function (e) {
                    n.gotoPath(e);
                },
                gotoParent: function () {
                    n.gotoParent();
                },
                refresh: function () {
                    n.refresh();
                },
            }
        );
    }),
    define(
        "doc/navigation/index",
        ["require", "./service", "underscore"],
        function (e, t, o) {
            function n(e, t, o) {
                var n = document.createElement("span"),
                    i = {};
                return (
                    (i.width = n.offsetWidth),
                    (i.height = n.offsetHeight),
                    (n.style.visibility = "hidden"),
                    (n.style.fontSize = e),
                    (n.style.fontFamily = t),
                    (n.style.display = "inline-block"),
                    document.body.appendChild(n),
                    void 0 !== n.textContent ? (n.textContent = o) : (n.innerText = o),
                    (i.width = parseFloat(window.getComputedStyle(n).width) - i.width),
                    (i.height = parseFloat(window.getComputedStyle(n).height) - i.height),
                    i
                );
            }
            var i,
                a,
                r,
                s,
                d = e("knockout"),
                l = e("durandal/app"),
                c = e("header/userinfo/constinfo"),
                u = d.observableArray(),
                p = d.observableArray(),
                f = null,
                m = { id: -2, text: "......" },
                h = d.observable(1);
            return {
                compositionComplete: function (e) {
                    i = l.on("navigation:init").then(function (e) {
                        (ele_font_size = $("input").css("font-size")),
                            (ele_font_family = $("input").css("font-family"));
                        var t = $(".navigation-list").width();
                        if ("leftPanelResize" == e.message) {
                            var i = $.extend(!0, [{}], p());
                            if (i.length > 2)
                                for (var d = "", l = i.length - 1; l >= 0; l--) {
                                    d += i[l].text + "<";
                                    var c = n("12px", '"Microsoft YaHei", arial', d),
                                        g = Math.ceil(c.width);
                                    if (t - g < 40) {
                                        l;
                                        var v = i.slice(0, 0),
                                            y = i.slice(l + 1 - i.length);
                                        i = v.concat(i[0]).concat(m).concat(y);
                                        break;
                                    }
                                }
                            return void u(i);
                        }
                        (a = e), (r = e && e.sharePerm);
                        var i = e.paths;
                        if ((p(e.paths), (f = o.clone(i)), i.length > 2))
                            for (var d = "", l = i.length - 1; l >= 0; l--) {
                                d += i[l].text + "<";
                                var c = n("12px", '"Microsoft YaHei", arial', d),
                                    g = Math.ceil(c.width);
                                if (t - g < 40) {
                                    l;
                                    var v = i.slice(0, 0),
                                        y = i.slice(l + 2 - i.length),
                                        w = i.slice(l + 1 - i.length);
                                    (m.id = w[0].id), (i = v.concat(i[0]).concat(m).concat(y));
                                    break;
                                }
                            }
                        u(i), (s = f[f.length - 1]), h(s);
                    });
                },
                currentNode: h,
                pathNodes: u,
                orgPathNodes: p,
                gotoPath: function (e) {
                    -1 != e.id &&
                        ((c.systemInfo.instanceConfigInfo.EnableGMP &&
                            window.location.href.indexOf("search?") > 0) ||
                            (h(e), (e.sharePerm = r), l.trigger(a.message, e)));
                },
                gotoParent: function () {
                    (s = u()),
                        s.length && h(s.pop()),
                        window.location.hash.indexOf("fromInfobar") < 0 &&
                        s.length &&
                        h(s.pop()),
                        (h().sharePerm = r),
                        l.trigger(a.message, h(), {});
                },
                refresh: function () {
                    (s = u()), h(s[s.length - 1]), l.trigger(a.message, h(), !0);
                },
            };
        }
    ),
    define(
        "doc/tactic/processStrategy/processStrategy",
        ["underscore", "knockout", "durandal/app", "header/userinfo/constinfo"],
        function (e, t, o, n) {
            function i(e) {
                if (((c = ""), (u = ""), e && e.data))
                    return (
                        e.folderType && ((c = e.id), (l = e.folderType)),
                        e.fileType && ((u = e.id), (l = e.fileType)),
                        e.data.folderType && ((c = e.data.id), (l = e.data.folderType)),
                        void (e.data.fileType && ((u = e.data.id), (l = e.data.fileType)))
                    );
                $.each(e, function (e, t) {
                    var o;
                    (o = t.data ? t.data : t),
                        o.folderType ? (c += o.id + ",") : o.fileType && (u += o.id + ",");
                }),
                    (c = a(c, ",")),
                    (u = a(u, ","));
            }
            function a(e, t) {
                return e.replace(new RegExp((t || " ") + "$"), "");
            }
            function r(t, o) {
                var a, r;
                i(t),
                    "create" == o &&
                    (d =
                        1 == t.length && (t[0].folderType || t[0].data.folderType)
                            ? t[0].id
                                ? t[0].id
                                : t[0].data.id
                            : t[0].data.parentFolderId),
                    "delete" == o &&
                    (d =
                        1 == t.length
                            ? "" != u
                                ? t[0].data.parentFolderId
                                : t[0].data.id
                            : t[0].data.parentFolderId),
                    "update" == o && (d = t.data.parentFolderId),
                    "attribute" == o &&
                    (t[0].data.folderType &&
                        ((l = t[0].data.folderType), (d = t[0].data.id)),
                        t[0].data.fileType &&
                        ((l = t[0].data.fileType), (d = t[0].data.parentFolderId))),
                    "share" == o &&
                    (t[0].data.folderType &&
                        ((l = t[0].data.folderType), (d = t[0].data.id)),
                        t[0].data.fileType &&
                        ((l = t[0].data.fileType), (d = t[0].data.parentFolderId))),
                    "public" == o &&
                    (t[0].data.folderType &&
                        ((l = t[0].data.folderType), (d = t[0].data.id)),
                        t[0].data.fileType &&
                        ((l = t[0].data.fileType), (d = t[0].data.parentFolderId))),
                    "SecretLevel" == o &&
                    (t.folderType && ((l = t.folderType), (d = t.data.id)),
                        t.fileType
                            ? ((l = t.fileType), (d = t.parentFolderId))
                            : t.isFolder ||
                            void 0 == t.isFolder ||
                            ((l = t[0].data.fileType), (d = t[0].data.parentFolderId)),
                        !d &&
                        t.length > 0 &&
                        ((d = t[0].data.parentFolderId), (l = t[0].data.fileType))),
                    "DataFerry" == o &&
                    (d =
                        1 == t.length
                            ? "" != u
                                ? t[0].data.parentFolderId
                                : t[0].data.id
                            : t[0].data.parentFolderId),
                    "FexFerry" == o &&
                    (d =
                        1 == t.length
                            ? "" != u
                                ? t[0].data.parentFolderId
                                : t[0].data.id
                            : t[0].data.parentFolderId),
                    $.ajax({
                        data: {
                            module: "WebClient",
                            fun: "GetProcessStrategyByKey",
                            entryId: d,
                            entryType: "1",
                        },
                        async: !1,
                    }).done(function (e) {
                        0 == e.result &&
                            ((a = e.processStrategy), (r = e.openTheThirdPartyProcess));
                    });
                var s = [];
                switch (o) {
                    case "create":
                        s = e.filter(a, function (t) {
                            return e.contains([1], t.procType);
                        });
                        break;
                    case "update":
                        s = e.filter(a, function (t) {
                            return e.contains([2], t.procType);
                        });
                        break;
                    case "delete":
                        s = e.filter(a, function (t) {
                            return e.contains([3], t.procType);
                        });
                        break;
                    case "attribute":
                        s = e.filter(a, function (t) {
                            return e.contains([4], t.procType);
                        });
                        break;
                    case "share":
                        s = e.filter(a, function (t) {
                            return e.contains([5], t.procType);
                        });
                        break;
                    case "public":
                        s = e.filter(a, function (t) {
                            return e.contains([6], t.procType);
                        });
                        break;
                    case "SecretLevel":
                        s = e.filter(a, function (t) {
                            return e.contains([7], t.procType);
                        });
                        break;
                    case "DataFerry":
                        s = e.filter(a, function (t) {
                            return e.contains([8], t.procType);
                        });
                        break;
                    case "FexFerry":
                        s = e.filter(a, function (t) {
                            return e.contains([9], t.procType);
                        });
                }
                if (s.length > 0) {
                    var p,
                        f = "",
                        m = "";
                    if (
                        ("create" == o &&
                            (t[0] && t[0].id
                                ? (f = t[0].id)
                                : t[0] && t[0].data && t[0].data.id && (f = t[0].data.id),
                                t[0] && t[0].folderType
                                    ? (m = t[0].folderType)
                                    : t[0] &&
                                    t[0].data &&
                                    t[0].data.folderType &&
                                    (m = t[0].data.folderType)),
                            1 == r)
                    ) {
                        var h = "?";
                        switch ((s[0].stgProcAddress.indexOf("?") > -1 && (h = "&"), o)) {
                            case "create":
                                p =
                                    s[0].stgProcAddress +
                                    h +
                                    "entryId=" +
                                    f +
                                    "&entryType=" +
                                    m +
                                    "&entryName=" +
                                    encodeURI(t[0].name) +
                                    "&folders=&files=&orgToken=" +
                                    constInfo.getTokenCookie();
                                break;
                            case "update":
                                p =
                                    s[0].stgProcAddress +
                                    h +
                                    "entryId=" +
                                    t.data.id +
                                    "&entryType=" +
                                    t.data.fileType +
                                    "&entryName=" +
                                    encodeURI(t.data.name) +
                                    "&folders=&files=&orgToken=" +
                                    constInfo.getTokenCookie();
                                break;
                            case "delete":
                                p =
                                    s[0].stgProcAddress +
                                    h +
                                    "entryId=& entryType=& entryName=& folders=" +
                                    c +
                                    "&files=" +
                                    u +
                                    "&orgToken=" +
                                    constInfo.getTokenCookie();
                                break;
                            case "attribute":
                                p =
                                    s[0].stgProcAddress +
                                    h +
                                    "entryId=&entryType=" +
                                    l +
                                    "&entryName=" +
                                    encodeURI(t[0].data.name) +
                                    "&folders=" +
                                    c +
                                    "&files=" +
                                    u +
                                    "&orgToken=" +
                                    constInfo.getTokenCookie();
                                break;
                            case "share":
                            case "public":
                                p =
                                    s[0].stgProcAddress +
                                    h +
                                    "entryId=" +
                                    c +
                                    u +
                                    "&entryType=" +
                                    l +
                                    "&entryName=&folders=&files=&orgToken=" +
                                    constInfo.getTokenCookie();
                                break;
                            case "SecretLevel":
                                p =
                                    void 0 == t.data
                                        ? s[0].stgProcAddress +
                                        h +
                                        "entryId=" +
                                        t[0].data.id +
                                        "&entryType=" +
                                        n.systemInfo.instanceConfigInfo.SecretEdition +
                                        "&entryName=" +
                                        encodeURI(t[0].data.name) +
                                        "&secretlevelId=" +
                                        t[0].data.securityLevelId +
                                        "&secretleveName=" +
                                        encodeURI(t[0].data.securityLevelName) +
                                        "&entryName=&folders=&files=" +
                                        u +
                                        "&orgToken=" +
                                        constInfo.getTokenCookie()
                                        : s[0].stgProcAddress +
                                        h +
                                        "entryId=" +
                                        t.data.id +
                                        "&entryType=" +
                                        n.systemInfo.instanceConfigInfo.SecretEdition +
                                        "&entryName=" +
                                        encodeURI(t.data.name) +
                                        "&secretlevelId=" +
                                        t.data.securityLevelId +
                                        "&secretleveName=" +
                                        encodeURI(t.data.securityLevelName) +
                                        "&entryName=&folders=&files=" +
                                        u +
                                        "&orgToken=" +
                                        constInfo.getTokenCookie();
                                break;
                            case "DataFerry":
                            case "FexFerry":
                                p =
                                    s[0].stgProcAddress +
                                    h +
                                    "entryId=&entryType=&entryName=&folders=" +
                                    c +
                                    "&files=" +
                                    u +
                                    "&orgToken=" +
                                    constInfo.getTokenCookie();
                        }
                    } else
                        switch (o) {
                            case "create":
                                p =
                                    "/edoc2Flow-web/edoc2-form/jumpStartForm?processId=" +
                                    s[0].procId +
                                    "&entryId=" +
                                    f +
                                    "&entryType=" +
                                    m +
                                    "&entryName=" +
                                    encodeURI(t[0].name) +
                                    "&folders=&files=&orgToken=" +
                                    constInfo.getTokenCookie();
                                break;
                            case "update":
                                p =
                                    "/edoc2Flow-web/edoc2-form/jumpStartForm?processId=" +
                                    s[0].procId +
                                    "&entryId=" +
                                    t.data.id +
                                    "&entryType=" +
                                    t.data.fileType +
                                    "&entryName=" +
                                    encodeURI(t.data.name) +
                                    "&folders=&files=&orgToken=" +
                                    constInfo.getTokenCookie();
                                break;
                            case "delete":
                                p =
                                    "/edoc2Flow-web/edoc2-form/jumpStartForm?processId=" +
                                    s[0].procId +
                                    "&entryId=&entryType=&entryName=&folders=" +
                                    c +
                                    "&files=" +
                                    u +
                                    "&orgToken=" +
                                    constInfo.getTokenCookie();
                                break;
                            case "attribute":
                                p =
                                    "/edoc2Flow-web/edoc2-form/jumpStartForm?processId=" +
                                    s[0].procId +
                                    "&entryId=&entryType=" +
                                    l +
                                    "&entryName=" +
                                    encodeURI(t[0].data.name) +
                                    "&folders=" +
                                    c +
                                    "&files=" +
                                    u +
                                    "&orgToken=" +
                                    constInfo.getTokenCookie();
                                break;
                            case "share":
                            case "public":
                                p =
                                    "/edoc2Flow-web/edoc2-form/jumpStartForm?processId=" +
                                    s[0].procId +
                                    "&entryId=" +
                                    c +
                                    u +
                                    "&entryType=" +
                                    l +
                                    "&entryName=&folders=&files=&orgToken=" +
                                    constInfo.getTokenCookie();
                                break;
                            case "SecretLevel":
                                p =
                                    "/edoc2Flow-web/edoc2-form/jumpStartForm?processId=" +
                                    s[0].procId +
                                    "&entryId=" +
                                    n.userInfo.SecLevel +
                                    "&entryType=" +
                                    n.systemInfo.instanceConfigInfo.SecretEdition +
                                    "&entryName=&secretlevelId=" +
                                    n.userInfo.SecLevel +
                                    "&secretleveName=&entryName=&folders=&files=" +
                                    u +
                                    "&orgToken=" +
                                    constInfo.getTokenCookie();
                                break;
                            case "DataFerry":
                            case "FexFerry":
                                p =
                                    "/edoc2Flow-web/edoc2-form/jumpStartForm?processId=" +
                                    s[0].procId +
                                    "&entryId=&entryType=&entryName=&folders=" +
                                    c +
                                    "&files=" +
                                    u +
                                    "&orgToken=" +
                                    constInfo.getTokenCookie();
                        }
                    return window.open(p), !0;
                }
                return !1;
            }
            function s(e, t) {
                var o = {};
                return (
                    i(e),
                    $.ajax({
                        type: "GET",
                        url: "/inbiz/api/services/WorkFlowDoc/IsProcessStrategy",
                        data: {
                            token: constInfo.getTokenCookie(),
                            fileIds: u,
                            folderIds: c,
                            processType: t,
                        },
                        async: !1,
                    }).done(function (e) {
                        o = {
                            IsProcessStrategy: e.IsProcessStrategy,
                            IsNoDocument: e.IsNoDocument,
                            NoProcessStrategy: e.NoProcessStrategy,
                        };
                    }),
                    o
                );
            }
            var d,
                l,
                c = (t.observableArray(), ""),
                u = "";
            return {
                getProcessStrategy: r,
                IsProcessStrategy: s,
                getView: function () {
                    return $("<div></div>").get(0);
                },
                compositionComplete: function (e, o) {
                    var n = t.dataFor(o);
                    n.datas(), n.datas().action;
                },
            };
        }
    ),
    define(
        "component/upload/index",
        [
            "jquery",
            "durandal/app",
            "knockout",
            "komapping",
            "WebUploader",
            "header/userinfo/constinfo",
            "header/userinfo/cookie",
            "doc/navigation/index",
            lang(),
            "edoc2ErrorCode",
            "doc/tactic/processStrategy/processStrategy",
        ],
        function (e, t, o, n, i, a, r, s, d, l, c) {
            function u(e, t) {
                var o = 0;
                return (
                    $.ajax({
                        data: {
                            token: t,
                            module: "SystemManager",
                            fun: "GetCurrentUserSpeedLimit",
                            userId: e,
                        },
                        async: !1,
                    }).done(function (e) {
                        if (e && 0 == e.result && e.speedLimit && "" != e.speedLimit) {
                            var t = JSON.parse(e.speedLimit);
                            (o = t.UploadLimit),
                                t.DownloadLimit > 0
                                    ? $.cookie("maxspeed", t.DownloadLimit)
                                    : $.cookie("maxspeed", null);
                        }
                    }),
                    o
                );
            }
            function p(e) {
                var t = "";
                e.strategy && e.strategy() && (t = e.strategy()),
                    !t && W[e.folderId()] && (t = W[e.folderId()]);
                var o = e.fileId();
                if (o > 0)
                    if (t) {
                        var n = e.updateFileVerId();
                        $.ajax({
                            data: {
                                module: "WebClient",
                                fun: "UndoCreateFileVer",
                                fileId: o,
                                fileVerId: n,
                            },
                        }).done(function (e) { });
                    } else
                        $.ajax({
                            data: {
                                module: "WebClient",
                                fun: "UndoCreateFileByFileId",
                                fileId: o,
                            },
                        }).done(function (e) {
                            F.getFiles("queued", "interrupt").length >= 0 && De();
                        });
                var i = e.statusText(),
                    a = e.id();
                if (a) {
                    var r = F.getFile(a);
                    ((r && 610 == r.nResult) || ("queued" != i && "interrupt" != i)) &&
                        F.getFiles("queued", "interrupt").length >= 0 &&
                        De();
                }
                F.removeFile(e.id(), !0), N.remove(e);
            }
            function f(e) {
                $.ajax({
                    data: {
                        token: $.cookie("token"),
                        module: "MetaDataManager",
                        fun: "GetFldMetaTypesAndAttr",
                        fldId: e,
                        objType: 4,
                        isFillMetaAttr: !0,
                    },
                    async: !1,
                }).done(function (e) {
                    e && (we = e.isForce);
                });
            }
            function m(e) {
                $.ajax({
                    data: {
                        module: "WebClient",
                        fun: "FilesMetadataMaintenance",
                        fileIds: e,
                        isMetadataMaintenance: !0,
                    },
                }).done(function (e) {
                    0 !== e.result &&
                        t.trigger("message:show", { type: "error", message: e.result });
                });
            }
            function h(e) {
                $.ajax({
                    data: { module: "WebClient", fun: "GetPermByFileId", fileId: e },
                    async: !1,
                }).done(function (e) {
                    e && ((be = e.metadataPerm), (xe = e.setLvlPerm));
                });
            }
            function g(e) {
                var t = F.getFile(e.id());
                t && t.doubleCheck && e.statusText("queued"), F.retry(e.id());
            }
            function v(e, t, o) {
                $.ajax({
                    data: {
                        module: "UploadFileManager",
                        fun: "IsExistsHeadMd5",
                        headMd5: e,
                        regionId: t,
                    },
                }).done(function (e) {
                    var t = !0 === e.exists;
                    o && o(t);
                });
            }
            function y(e) {
                "interrupt" === e.statusText()
                    ? De()
                    : "progress" === e.statusText() && e.statusText("pausing"),
                    Ie();
            }
            function w(e, t) {
                var o = "";
                return (
                    "number" == typeof e
                        ? void 0 ===
                        (o =
                            5 === e
                                ? "UPDATE" == t
                                    ? d.ErrorCode5Update
                                    : d.ErrorCode5Create
                                : d["ErrorCode" + e]) && (o = d.ErrorCodeOther + e)
                        : (o = "abort" === e ? d.uploaderEnd : e),
                    o
                );
            }
            function b(e, t, o) {
                if (!(!1 === a.systemInfo.instanceConfigInfo.SecondPass || t.size <= J))
                    if (t.fileMd5) {
                        T("之前算过：" + t.name + "'s md5 --\x3e " + t.fileMd5);
                        $e(t.id);
                    } else
                        t.size > G
                            ? e.md5File(t, 0, G).then(function (n) {
                                v(n, o, function (o) {
                                    o &&
                                        e.md5File(t).then(function (e) {
                                            T(t.name + "--\x3e" + e), (t.fileMd5 = e);
                                        });
                                });
                            })
                            : e.md5File(t).then(function (e) {
                                T(t.name + "--\x3e" + e), (t.md5 = e);
                            });
            }
            function x(e, t, o) {
                var n = !1;
                return (
                    void 0 === Re || void 0 === Re[e]
                        ? (Re || (Re = {}),
                            $.ajax({
                                async: void 0 === o || o,
                                data: {
                                    module: "FolderOperationManager",
                                    fun: "HaveCreateFolderPerm",
                                    folderId: e,
                                },
                            }).done(function (o) {
                                (n = o.havePerm), (Re[e] = o.havePerm), t && t(o.havePerm);
                            }))
                        : (n = Re[e]),
                    n
                );
            }
            function T(e) {
                window.console && console.log(e);
            }
            function I(e) {
                var t = !1;
                $.each(ke.fileIds, function (o, n) {
                    if (n === e) return (t = !0), !1;
                }),
                    t || ke.fileIds.push(e);
            }
            function k(e) {
                var t = $.cookie("token");
                t || (t = getTokenByCondition());
                var o = e.RegionUrl;
                e.StoragePlatform;
                return o
                    ? ((o = o.lastIndexOf("/") === o.length - 1 ? o : o + "/"),
                        e.IsSupportMultiTd
                            ? o +
                            "document/uploadMultiTd" +
                            (a.isPubilsh ? "?code=" + a.code : "?token=" + t)
                            : o +
                            "document/upload" +
                            (a.isPubilsh ? "?code=" + a.code : "?token=" + t))
                    : e.IsSupportMultiTd
                        ? "/document/uploadMultiTd" +
                        (a.isPubilsh ? "?code=" + a.code : "?token=" + t)
                        : a.systemInfo.uploadUrl +
                        (a.isPubilsh ? "?code=" + a.code : "?token=" + t);
            }
            function S(e, t) {
                var o = {},
                    n = "",
                    i = "";
                for (var a in e) {
                    if (((fileType = e[a].fileType.replace(".", "")), "" == fileType))
                        break;
                    n = n + "," + fileType;
                    var r = P(fileType);
                    "" != r && (i = i + "," + r);
                }
                return "" == n
                    ? o
                    : (t
                        ? ("" != i && (i = i.substr(1)),
                            (o = { extensionsButQueued: n + ",", mimeTypes: i }))
                        : (o = { extensionsButQueued: n + "," }),
                        o);
            }
            function P(e) {
                switch (e) {
                    case "doc":
                        return "application/msword";
                    case "docx":
                        return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
                    case "xlsx":
                        return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                    case "pptx":
                        return "application/vnd.openxmlformats-officedocument.presentationml.presentation";
                    case "ppsx":
                        return "application/vnd.openxmlformats-officedocument.presentationml.slideshow";
                    case "pdf":
                        return "application/pdf";
                    case "swf":
                        return "application/x-shockwave-flash";
                    case "exe":
                        return "application/octet-stream";
                    case "tar":
                        return "application/x-tar";
                    case "tgz":
                        return "application/x-compressed";
                    case "zip":
                        return "application/x-zip-compressed";
                    case "z":
                        return "application/x-compress";
                    case "wav":
                        return "audio/wav";
                    case "wma":
                        return "audio/x-ms-wma";
                    case "wmv":
                        return "video/x-ms-wmv";
                    case "mp3":
                        return "audio/mpeg";
                    case "mid":
                        return "audio/mid";
                    case "bmp":
                        return "image/bmp";
                    case "gif":
                        return "image/gif";
                    case "png":
                        return "image/png";
                    case "tif":
                    case "tiff":
                        return "image/tiff";
                    case "jpeg":
                    case "jpg":
                        return "image/jpeg";
                    case "txt":
                        return "text/plain";
                    case "xml":
                        return "text/xml";
                    case "html":
                        return "text/html";
                    case "css":
                        return "text/css";
                    case "js":
                        return "text/javascript";
                    default:
                        return "." + e;
                }
            }
            function C(e, t, o) {
                if (
                    le &&
                    F.options.accept[0] &&
                    F.options.accept[0].extensionsButQueued &&
                    -1 ==
                    F.options.accept[0].extensionsButQueued.indexOf(
                        "," + e.ext + ","
                    ) &&
                    F.options.isAllow
                )
                    return void (
                        o && o({ availableSizes: 0, result: 611, reason: d.ErrorCode611 })
                    );
                if (
                    le &&
                    F.options.accept[0] &&
                    F.options.accept[0].extensionsButQueued &&
                    -1 !=
                    F.options.accept[0].extensionsButQueued.indexOf(
                        "," + e.ext + ","
                    ) &&
                    !F.options.isAllow
                )
                    return void (
                        o && o({ availableSizes: 0, result: 611, reason: d.ErrorCode611 })
                    );
                (token = $.cookie("token")),
                    token && token !== e.token && (e.token = token);
                var n = $.extend(
                    { module: "RegionDocOperationApi", fun: "CheckAndCreateDocInfo" },
                    e
                );
                $.ajax({ async: void 0 === t || t, data: n }).done(function (e) {
                    o(e);
                });
            }
            var F,
                D,
                L = o.observable(1),
                z = o.observable(),
                M = o.observable(),
                N = o.observableArray(),
                R = o.observable(),
                A = !0,
                j = !1,
                E = "",
                O = o.observable(),
                B = o.observable(),
                U = o.observable(),
                W = {},
                V = o.observable(),
                q = 6442450944,
                _ = (o.observable(!1), !1),
                H = !1,
                Q = "",
                G = 1048576,
                J = 5242880,
                X = 500;
            0 != a.getSystemType() && (X = 0);
            var Z,
                Y,
                K,
                ee,
                te,
                oe,
                ne,
                ie,
                ae,
                re,
                se,
                de,
                le = !1,
                ce = !1,
                ue = o.observable(!0),
                pe = void 0;
            "true" === $.getQueryString("singleuploadmode") && (X = 1),
                1 === X && (ue = o.observable(!1));
            var fe,
                me,
                he,
                ge = o.observable(X),
                ve = {},
                ye = !0,
                we = !1,
                be = !1,
                xe = !1,
                Te = function () {
                    L(1),
                        M() && (Se(M(), z()), (M = o.observable())),
                        Ie(),
                        "finish" === O() && (N.removeAll(), F.reset()),
                        /^#system/.test(window.location.hash) &&
                        t.trigger("templatelist:reload", "Refresh"),
                        ce ||
                        (window.parent.activeUploaderHost &&
                            window.parent.activeUploaderHost.onHideWindow &&
                            window.parent.activeUploaderHost.onHideWindow());
                },
                Ie = function () {
                    L() &&
                        (t.trigger("person:updateCapacity"),
                            "uploading" === O()
                                ? V(
                                    d.miniInfoUploading + F.getFiles("queued", "interrupt").length
                                )
                                : "paused" === O() && V(d.miniInfoPaused));
                },
                ke = { folderId: 0, fileIds: [] },
                Se = function (e, t) {
                    for (var o in t)
                        if ("__ko_mapping__" !== o && e[o]) {
                            var n = t[o]();
                            t[o](e[o]()), e[o](n);
                        }
                },
                Pe = void 0,
                Ce = function () {
                    if (Pe) return Pe;
                    var e = document.createElement("input");
                    return (
                        (e.type = "file"), (Pe = "multiple" in e && "webkitdirectory" in e)
                    );
                },
                Fe = function (r) {
                    if ((r && r.forceInit && (F = null), !F)) {
                        var s = new Image();
                        (s.onload = s.onerror =
                            function () {
                                (1 == this.width && 1 == this.height) || (A = !1);
                            }),
                            (s.src =
                                "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==");
                        var c = k({ RegionType: 1 });
                        a.reloadSysConfigInfo();
                        var p = a.getSysConfigInfo(),
                            g = !1,
                            v = 1024 * p.ChunkSize * 1024,
                            y = u(a.userInfo.id, a.userInfo.token);
                        y > 0 && ((g = !0), (v = y)),
                            (F = i.create({
                                pick: { id: oe, label: d.addFile, multiple: ue() },
                                dnd: K,
                                paste: document.body,
                                duplicate: !0,
                                pasteBefore: function () {
                                    return (
                                        arguments.callee.caller.caller.caller.caller.caller
                                            .arguments[0].target == document.body && !L()
                                    );
                                },
                                swf: "scripts/lib/webuploader/Uploader.swf",
                                chunked: !0,
                                chunkSize: v,
                                server: c,
                                accept: ve,
                                disableGlobalDnd: !0,
                                fileNumLimit: ge(),
                                compress: null,
                                threads: 1,
                                auto: !0,
                                fileSingleSizeLimit: q,
                                isSpeedLimit: g,
                                isAllow: ye,
                            })),
                            R(F.request("predict-runtime-type")),
                            (F.onFileQueued = function (e) {
                                if (z()) {
                                    if (
                                        le &&
                                        !ce &&
                                        window.parent.activeUploaderHost &&
                                        window.parent.activeUploaderHost.onBeforeFileQueued &&
                                        0 == window.parent.activeUploaderHost.onBeforeFileQueued(e)
                                    )
                                        return void F.cancelFile(e.id);
                                    e.folderId = z().id();
                                    var t = {};
                                    (t.id = e.id),
                                        (t.hash = e.__hash),
                                        (t.name = e.name),
                                        (t.size = a.formatSize(e.size)),
                                        (t.ext = e.ext),
                                        (t.type = e.type),
                                        z().masterFile() &&
                                        z().masterFile().id() &&
                                        (t.masterFileId = z().masterFile().id()),
                                        (t.folderId = z().id()),
                                        (t.folderName = z().name()),
                                        (t.folderPath = z().path()),
                                        (t.fileId = 0),
                                        (t.folderRelativePath = ""),
                                        (t.regionHash = ""),
                                        (t.percent = 0),
                                        (t.speed = 0);
                                    var i = a.getFileIcon(e.ext);
                                    i || (i = "unknown"),
                                        (t.icon = $.format(
                                            "external/icon-file-type/32/{0}.png",
                                            i
                                        )),
                                        (t.statusText = "queued"),
                                        (t.reason = ""),
                                        (t.strategy = ""),
                                        (t.uploadId = a.getGuid()),
                                        (t.fullPath = e.source.fullPath || ""),
                                        (t.regionId = 1),
                                        (t.approved = !0);
                                    var r = n.fromJS(t);
                                    (r.speedInfo = o.computed(function () {
                                        return 0 === this.speed()
                                            ? ""
                                            : $.format("{0}/s", a.formatSize(this.speed()));
                                    }, r)),
                                        N.push(n.fromJS(r)),
                                        e.on("statuschange", function (t, o) {
                                            var n = $e(e.id);
                                            0 == e.size
                                                ? ("complete" !== n.statusText() &&
                                                    "error" !== n.statusText() &&
                                                    "cancelled" !== n.statusText()
                                                    ? n.statusText(t)
                                                    : (t = n.statusText()),
                                                    "error" === n.statusText()
                                                        ? e.setStatus("error")
                                                        : "cancelled" === n.statusText() &&
                                                        e.setStatus("complete"))
                                                : "cancelled" !== n.statusText() && n.statusText(t),
                                                "progress" === t &&
                                                (n.reason(""),
                                                    e.startTime || (e.startTime = new Date()));
                                        }),
                                        F.makeThumb(
                                            e,
                                            function (e, t) {
                                                e || (A && r.icon(t));
                                            },
                                            64,
                                            64
                                        );
                                }
                            }),
                            (F.onFileDequeued = function (e) { }),
                            (F.onUploadProgress = function (e, t) {
                                var o = $e(e.id);
                                if (o && 100 != o.percent()) {
                                    var n = (100 * t).toFixed(2);
                                    o.percent(n);
                                    var i = e.size * t,
                                        a = (new Date() - e.startTime) / 1e3;
                                    o.speed(i / a);
                                }
                            }),
                            F.on("beforeFileQueued", function (e) {
                                if (pe && !pe(e)) return !1;
                                if (
                                    (F.options.accept[0] &&
                                        F.options.accept[0].extensionsButQueued &&
                                        -1 ==
                                        F.options.accept[0].extensionsButQueued.indexOf(
                                            "," + e.ext + ","
                                        ) &&
                                        -1 == E.indexOf("," + e.ext) &&
                                        F.options.isAllow
                                        ? (E = E + "," + e.ext)
                                        : F.options.accept[0] &&
                                        F.options.accept[0].extensionsButQueued &&
                                        -1 !=
                                        F.options.accept[0].extensionsButQueued.indexOf(
                                            "," + e.ext + ","
                                        ) &&
                                        -1 == E.indexOf("," + e.ext) &&
                                        !F.options.isAllow &&
                                        (E = E + "," + e.ext),
                                        e.source.fullPath)
                                ) {
                                    if (Q) {
                                        var t = e.source.fullPath.split("/");
                                        t &&
                                            t.length > 2 &&
                                            (e.source.fullPath = e.source.fullPath.replace(
                                                "/" + t[1] + "/",
                                                "/" + Q + "/"
                                            ));
                                    }
                                    if (!z()) return;
                                    if (!x(z().id(), null, !1)) return (T = !0), !1;
                                }
                            });
                        var T = !1;
                        if (
                            (F.on("filesQueued", function (e) {
                                T &&
                                    ((T = !1),
                                        t.trigger("message:show", {
                                            type: "error",
                                            message: d.noPermCreateFolder,
                                        })),
                                    "" != E &&
                                    ((E = E.substr(1)),
                                        t.trigger("message:show", {
                                            type: "error",
                                            message: d.acceptError,
                                        }),
                                        (E = "")),
                                    Ie();
                            }),
                                F.on("uploadStart", function (e) {
                                    if (le && !ce && parent.window.activeUploaderHost) {
                                        parent.window.activeUploaderHost.files;
                                    }
                                    var n = $e(e.id);
                                    if (n) {
                                        a.reloadSysConfigInfo();
                                        var i = a.getSysConfigInfo(),
                                            r = i.ZeroBytesDoubleCheck;
                                        if (0 == e.size && r && void 0 === e.doubleCheck)
                                            return (
                                                F.stop(),
                                                e.setStatus("error", 4320),
                                                (e.doubleCheck = 1),
                                                n.approved(!1),
                                                void n.reason(d.ErrorCode4320)
                                            );
                                        var s = "";
                                        e.nResult &&
                                            610 === e.nResult &&
                                            (n.strategy && n.strategy() && (s = n.strategy()),
                                                !s && W[n.folderId()] && (s = W[n.folderId()]));
                                        var l = s ? "UPDATE" : "UPLOAD",
                                            u = "";
                                        n.masterFileId && n.masterFileId() && (u = n.masterFileId());
                                        var p,
                                            f = n.folderId(),
                                            m = a.isPubilsh ? a.code : "";
                                        if (e.lastModifiedDate instanceof Date)
                                            p = e.lastModifiedDate.format("yyyy-MM-dd hh:mm:ss");
                                        else
                                            try {
                                                p = new Date(e.source.source.lastModified).format(
                                                    "yyyy-MM-dd hh:mm:ss"
                                                );
                                            } catch (e) {
                                                p = "";
                                            }
                                        var h = e.source.fullPath;
                                        e.source.fullPath &&
                                            (h = e.source.fullPath.replace(/\+/g, "%2b"));
                                        var g = {
                                            folderId: f,
                                            masterFileId: u,
                                            token: a.userInfo.token,
                                            fileName: n.name(),
                                            fileRemark: "",
                                            size: e.size,
                                            type: e.type,
                                            attachType: 0,
                                            fullPath: h,
                                            code: m,
                                            strategy: s,
                                            lastModifiedDate: p,
                                            fileModel: l,
                                            ext: e.ext,
                                        };
                                        if (le)
                                            try {
                                                "update" === z().operateType() &&
                                                    z().updateFileId() &&
                                                    ((g.fileId = z().updateFileId()),
                                                        (g.strategy = z().strategy()),
                                                        (g.fileModel = "UPDATE"));
                                            } catch (e) { }
                                        C(g, !1, function (i) {
                                            if (
                                                (le &&
                                                    D &&
                                                    e.size > D &&
                                                    ((i.reason = d.ErrorCode617),
                                                        (i.result = 617),
                                                        t.trigger("message:show", {
                                                            type: "error",
                                                            message: d.ErrorCode617,
                                                        })),
                                                    F.options.accept[0] &&
                                                        F.options.accept[0].extensionsButQueued &&
                                                        -1 ==
                                                        F.options.accept[0].extensionsButQueued.indexOf(
                                                            "," + e.ext + ","
                                                        ) &&
                                                        F.options.isAllow
                                                        ? ((i.result = 611), (i.reason = d.ErrorCode611))
                                                        : F.options.accept[0] &&
                                                        F.options.accept[0].extensionsButQueued &&
                                                        -1 !=
                                                        F.options.accept[0].extensionsButQueued.indexOf(
                                                            "," + e.ext + ","
                                                        ) &&
                                                        !F.options.isAllow &&
                                                        ((i.reason = d.ErrorCode611),
                                                            (i = {
                                                                availableSizes: i.availableSizes,
                                                                result: 611,
                                                                reason: d.ErrorCode611,
                                                            })),
                                                    0 === i.result)
                                            ) {
                                                n.approved(!0),
                                                    n.regionHash(i.data.RegionHash),
                                                    n.fileId(i.data.FileId),
                                                    n.regionId(i.data.RegionId),
                                                    i.data.FileVerId &&
                                                    (n.updateFileVerId = o.observable(i.data.FileVerId));
                                                var a = k(i.data);
                                                if (
                                                    (F.option("server", a),
                                                        (e.nResult = i.result),
                                                        e.size > 0)
                                                )
                                                    le || b(F, e, i.data.RegionId);
                                                else {
                                                    var r = i.data.FileId;
                                                    F.skipFile(e),
                                                        n.statusText("complete"),
                                                        n.percent(100),
                                                        ke.folderId !== f
                                                            ? ((ke.folderId = f), (ke.fileIds = [r]))
                                                            : I(r),
                                                        le &&
                                                        window.parent.activeUploaderHost &&
                                                        ((window.parent.activeUploaderHost.isDrawRecord =
                                                            !0),
                                                            void 0 ==
                                                            window.parent.activeUploaderHost._filesArray &&
                                                            (window.parent.activeUploaderHost._filesArray =
                                                                []),
                                                            ke.fileIds.length > 0 &&
                                                            window.parent.activeUploaderHost._filesArray.push(
                                                                {
                                                                    name: e.name,
                                                                    size: e.size,
                                                                    id: ke.fileIds[ke.fileIds.length - 1],
                                                                    fileType: 2,
                                                                    parentId: ke.folderId,
                                                                    ext: e.ext,
                                                                }
                                                            ));
                                                }
                                            } else n.approved(!1), F.option("server", c), (e.nResult = i.result), (e.FILE_MODE = l), 4302 === i.result || 2048 === i.result || 4096 === i.result ? (e.reason = i.reason) : (e.reason = i.result), 0 == e.size && (610 == i.result ? (F.stop(), e.setStatus("error", i.result), n.reason(d.ErrorCode610), Ne(n, F, e)) : ((reason = w(e.reason, l)), n.reason(reason), n.statusText("error")));
                                        });
                                    }
                                }),
                                F.on("error", function (e, o, n) {
                                    switch (e) {
                                        case "Q_EXCEED_NUM_LIMIT":
                                            t.trigger("message:show", {
                                                type: "error",
                                                message: $.format(d.outnumlimit, o),
                                            });
                                            break;
                                        case "F_EXCEED_SIZE":
                                            t.trigger("message:show", {
                                                type: "error",
                                                message: $.format(d.uploadedFileSize, a.formatSize(o)),
                                            });
                                    }
                                }),
                                F.on("uploadError", function (e, t) {
                                    F.stop(), (e.startTime = void 0);
                                    var o = $e(e.id);
                                    o &&
                                        (o.uploadId(a.getGuid()),
                                            (t = w(t, e.FILE_MODE)),
                                            o.reason(t),
                                            o.percent(0),
                                            e.nResult && 610 === e.nResult
                                                ? Ne(o, F, e)
                                                : 4 === parseInt(t)
                                                    ? (o.reason(l.ErrorCode4),
                                                        (window.top.location.href =
                                                            "api/auth/login?returnUrl=" +
                                                            window.encodeURIComponent(window.location.href)))
                                                    : 5 === e.nResult
                                                        ? o.reason(l.ErrorCode5)
                                                        : F.getFiles("queued", "interrupt").length > 0 && De());
                                }),
                                F.on("uploadComplete", function (e) {
                                    Ie();
                                }),
                                F.on("uploadSuccess", function (e) {
                                    0 == e.nResult &&
                                        window.parent.activeUploaderHost &&
                                        ((window.parent.activeUploaderHost.isDrawRecord = !0),
                                            void 0 == window.parent.activeUploaderHost._filesArray &&
                                            (window.parent.activeUploaderHost._filesArray = []),
                                            ke.fileIds.length > 0 &&
                                            window.parent.activeUploaderHost._filesArray.push({
                                                name: e.name,
                                                size: e.size,
                                                id: ke.fileIds[ke.fileIds.length - 1],
                                                fileType: 2,
                                                parentId: ke.folderId,
                                                ext: e.ext,
                                            }));
                                }),
                                F.on("uploadAccept", function (e, t, o) {
                                    var n = $e(e.file.id);
                                    if (!n) return !1;
                                    if (t && t.status) {
                                        if ("Error" === t.status)
                                            return (
                                                o && o(4302 === t.errorCode ? t.message : t.errorCode), !1
                                            );
                                        var i = n.fileId();
                                        return (
                                            "true" === t.tag &&
                                            (F.skipFile(e.file),
                                                (n.secondPass = !0),
                                                n.statusText("secondPass"),
                                                n.percent(100)),
                                            n.secondPass || "End" === t.status
                                                ? (ke.folderId != e.file.folderId
                                                    ? ((ke.folderId = e.file.folderId),
                                                        (ke.fileIds = [i]))
                                                    : I(i),
                                                    !0)
                                                : (n.statusText &&
                                                    "pausing" === n.statusText() &&
                                                    (F.stop(!0), Ie()),
                                                    !0)
                                        );
                                    }
                                    return !1;
                                }),
                                F.on("uploadBeforeSend", function (e, t) {
                                    var o = e.file,
                                        n = $e(o.id);
                                    n &&
                                        (!1 === n.approved() &&
                                            ((t.approved = !1), (t.reason = o.reason)),
                                            (t.fileName = n.name()),
                                            (t.regionHash = n.regionHash()),
                                            (t.regionId = n.regionId()),
                                            (t.uploadId = n.uploadId()),
                                            (t.chunkSize = F.options.chunkSize),
                                            (t.blockSize = e.blob.size),
                                            o.fileMd5 && (t.fileMd5 = o.fileMd5));
                                }),
                                F.on("all", function (e) {
                                    switch (e) {
                                        case "ready":
                                            O("ready");
                                            break;
                                        case "uploadFinished":
                                            if (F.getFiles("error").length > 0)
                                                return O("paused"), void Ie();
                                            if ((O("finish"), 0 === F.getFiles().length)) return;
                                            if (
                                                (window.parent.activeUploaderHost &&
                                                    (window.parent.activeUploaderHost.isDrawRecord = !1),
                                                    ke.fileIds.length > 0)
                                            ) {
                                                var n =
                                                    ($.extend({}, ke.fileIds), F.getFiles("complete")),
                                                    i = F.getFiles("progress");
                                                i.length && (n = n.concat(i));
                                                var r = [];
                                                $.each(n, function (e, t) {
                                                    if (!n[e]) return !0;
                                                    var o = $e(n[e].id);
                                                    if (!o) return !0;
                                                    r.push({
                                                        name: n[e].name,
                                                        size: n[e].size,
                                                        id: o.fileId(),
                                                        fileType: 2,
                                                        parentId: ke.folderId,
                                                        ext: n[e].ext,
                                                    });
                                                }),
                                                    h(ke.fileIds[0]);
                                                var s = $.format(d.uploadFinishNorm, ke.fileIds.length);
                                                if (
                                                    /^#doc\/enterprise/.test(window.location.hash) &&
                                                    a.LicMetaData() &&
                                                    !H
                                                ) {
                                                    var l = be ? d.uploadMetadata : "",
                                                        c = xe ? d.uploadLvlPerm : "";
                                                    s = $.format(
                                                        !0 === _ ? d.uploadFinishNoMetadata : d.uploadFinish,
                                                        ke.fileIds.length,
                                                        l,
                                                        c
                                                    );
                                                }
                                                if (le) {
                                                    if (ce) top.postMessage(JSON.stringify(r), "*");
                                                    else if (
                                                        window.parent.activeUploaderHost &&
                                                        window.parent.activeUploaderHost.onUploadFinish
                                                    ) {
                                                        var u = [];
                                                        (window.__uploadFinishFiles =
                                                            window.__uploadFinishFiles || {}),
                                                            $.each(r, function (e, t) {
                                                                window.__uploadFinishFiles[
                                                                    t.fileType + "_" + t.id
                                                                ] || u.push(t);
                                                            }),
                                                            u.length &&
                                                            ((window.parent.activeUploaderHost.uploadMessage =
                                                                s),
                                                                parent.window.activeUploaderHost.onUploadFinish(
                                                                    u
                                                                ),
                                                                $.each(u, function (e, t) {
                                                                    window.__uploadFinishFiles[
                                                                        t.fileType + "_" + t.id
                                                                    ] = 1;
                                                                }));
                                                    }
                                                } else if (
                                                    (f(n[0].folderId),
                                                        o.$store.dispatch("setUploadFiles", r),
                                                        we)
                                                ) {
                                                    var p = ke.fileIds.join();
                                                    m(p),
                                                        be
                                                            ? t.trigger("component:show", {
                                                                moduleId: "doc/metadata/index",
                                                                message: he,
                                                                datas: r,
                                                            })
                                                            : t.trigger("message:show", {
                                                                type: "success",
                                                                message: s,
                                                                delay: 4e3,
                                                                handler: function (e) {
                                                                    e
                                                                        ? t.trigger("component:show", {
                                                                            moduleId: "doc/metadata/index",
                                                                            message: he,
                                                                            datas: r,
                                                                        })
                                                                        : t.trigger("component:show", {
                                                                            moduleId:
                                                                                "doc/informationbar/basicinfo/singlefile/batchmoficationlevel/index",
                                                                            message: he,
                                                                            datas: r,
                                                                        });
                                                                },
                                                            });
                                                } else
                                                    t.trigger("message:show", {
                                                        type: "success",
                                                        message: s,
                                                        delay: 4e3,
                                                        handler: function (e) {
                                                            e
                                                                ? t.trigger("component:show", {
                                                                    moduleId: "doc/metadata/index",
                                                                    message: he,
                                                                    datas: r,
                                                                })
                                                                : t.trigger("component:show", {
                                                                    moduleId:
                                                                        "doc/informationbar/basicinfo/singlefile/batchmoficationlevel/index",
                                                                    message: he,
                                                                    datas: r,
                                                                });
                                                        },
                                                    });
                                            } else le && 0 == F.getFiles("error").length && window.parent.activeUploaderHost && window.parent.activeUploaderHost.uploadSkip && window.parent.activeUploaderHost.uploadSkip();
                                            window.setTimeout(function () {
                                                (ke = { folderId: 0, fileIds: [] }),
                                                    "enterprise:reload" === he
                                                        ? setTimeout(function () {
                                                            t.trigger("enterprise:reload", {
                                                                force: !0,
                                                                needResetViewType: !1,
                                                                needSavePageNum: !0,
                                                                customSort: !0,
                                                            });
                                                        }, 10)
                                                        : "person:reload" === he
                                                            ? setTimeout(function () {
                                                                t.trigger("person:reload", {
                                                                    force: !0,
                                                                    needResetViewType: !1,
                                                                    needSavePageNum: !0,
                                                                    customSort: !0,
                                                                });
                                                            }, 10)
                                                            : "enterpriselist:reload" === he
                                                                ? setTimeout(function () {
                                                                    t.trigger("enterprise:reload", {
                                                                        force: !0,
                                                                        needResetViewType: !1,
                                                                    });
                                                                }, 10)
                                                                : "personlist:reload" === he
                                                                    ? setTimeout(function () {
                                                                        t.trigger("person:reload", {
                                                                            force: !0,
                                                                            needResetViewType: !1,
                                                                            needSavePageNum: !0,
                                                                        });
                                                                    }, 10)
                                                                    : "team:load" === he || "teamlist:reload" === he
                                                                        ? setTimeout(function () {
                                                                            t.trigger(he, z());
                                                                        }, 10)
                                                                        : "teamdata:reload" === he
                                                                            ? setTimeout(function () {
                                                                                he && t.trigger(he, { id: z().id() });
                                                                            }, 10)
                                                                            : "outpublish:reload" === he
                                                                                ? setTimeout(function () {
                                                                                    t.trigger("outpublish:reload");
                                                                                }, 10)
                                                                                : setTimeout(function () {
                                                                                    he && t.trigger(he);
                                                                                }, 10);
                                            }, 1e3),
                                                "/outpublish.html" === window.location.pathname && Te(),
                                                setTimeout(function () {
                                                    (Re = void 0),
                                                        le || Te(),
                                                        "html5" !== R() &&
                                                        setTimeout(function () {
                                                            Fe({ forceInit: !0 });
                                                        }, 500);
                                                }, 1200),
                                                Ie();
                                            break;
                                        case "startUpload":
                                            O("uploading");
                                            break;
                                        case "stopUpload":
                                            O("paused");
                                    }
                                }),
                                "html5" === R())
                        ) {
                            var S = e(
                                '<div id="dropOverlay"><h1>' + d.dndGlobal + "</h1></div>"
                            ).appendTo(document.body),
                                P = function (e) {
                                    if (a.parseQueryString().IsVDriver)
                                        return e.preventDefault(), void e.stopPropagation();
                                    var t = e.originalEvent.dataTransfer,
                                        o = t.types,
                                        n = 0;
                                    $.each(o, function (e, t) {
                                        "files" === t.toLowerCase() && n++;
                                    }),
                                        0 !== n &&
                                        (e.preventDefault(),
                                            e.stopPropagation(),
                                            /\/quick/.test(window.location.hash) ||
                                            /^#system/.test(window.location.hash) ||
                                            (/^#doc\/team/.test(window.location.hash) &&
                                                7 === z().id()) ||
                                            (L() && S.css("display", "block")));
                                },
                                M = function (e) {
                                    e.preventDefault(), e.stopPropagation(), L();
                                },
                                B = function (e) {
                                    e.preventDefault(),
                                        e.stopPropagation(),
                                        L() && S.css("display", "none");
                                },
                                U = function (e) {
                                    if (
                                        (e.preventDefault(),
                                            e.stopPropagation(),
                                            L() && (S.css("display", "none"), "html5" === R()))
                                    ) {
                                        if (
                                            (t.trigger("upload:show", {
                                                showWindow: !0,
                                                localFolderSelect: !0,
                                            }),
                                                j)
                                        )
                                            return void (j = !1);
                                        F.request("enter", e);
                                    }
                                },
                                V = function (e) {
                                    e.preventDefault(),
                                        e.stopPropagation(),
                                        S.css("display", "none");
                                };
                            e(document.body).on({ dragenter: P }),
                                S.on({ dragover: M, dragleave: B, drop: U, dblclick: V });
                        }
                    }
                },
                De = function () {
                    F.upload();
                },
                $e = function (e) {
                    return $.grep(N(), function (t, o) {
                        return t.id() == e;
                    })[0];
                },
                Le = function (e, t) {
                    t.cancelFile(e.id()), t.retry();
                },
                ze = function (e, t, o) {
                    e.statusText("cancelled"), t.skipFile(o), t.upload();
                },
                Me = function (e, t, o) {
                    U(null),
                        U({
                            fileName: e.name(),
                            folderId: e.folderId(),
                            folderName: e.folderName(),
                            attachmentRename: 3 === e.folderId(),
                            callback: function (n) {
                                "rename" === n.processStrategy
                                    ? e.name(n.newFileName)
                                    : n.alwaysApplyCurStrategy
                                        ? (W[e.folderId()] = n.processStrategy)
                                        : e.strategy(n.processStrategy),
                                    "skip" === n.processStrategy
                                        ? ze(e, t, o)
                                        : (0 == o.size && (e.statusText(""), e.reason("")),
                                            t.retry(o));
                            },
                        }),
                        B(null),
                        L(!1),
                        B("doc/versionManagement/renamed/index");
                },
                Ne = function (e, t, o) {
                    var n = "";
                    e.strategy && e.strategy() && (n = e.strategy()),
                        !n && W[e.folderId()] && (n = W[e.folderId()]),
                        le
                            ? ((n = z().strategy()),
                                n
                                    ? "skip" === n
                                        ? ze(e, t, o)
                                        : ("rename" === n
                                            ? e.name(
                                                e.name().substring(0, e.name().lastIndexOf(".")) +
                                                new Date().valueOf() +
                                                e.name().substring(e.name().lastIndexOf("."))
                                            )
                                            : ((W[e.folderId()] = n), e.strategy(n)),
                                            0 == o.size && (e.statusText(""), e.reason("")),
                                            o.size > 0
                                                ? t.retry(o)
                                                : setTimeout(function () {
                                                    t.retry(o);
                                                }, 1))
                                    : Le(e, t))
                            : "skip" === n
                                ? ze(e, t, o)
                                : n
                                    ? (0 == o.size && (e.statusText(""), e.reason("")),
                                        o.size > 0
                                            ? t.retry(o)
                                            : setTimeout(function () {
                                                t.retry(o);
                                            }, 1))
                                    : Me(e, t, o);
                },
                Re = void 0;
            return {
                lang: d,
                runtime: R,
                showWindow: L,
                clickShow: function () {
                    var e = this.currentFolder();
                    e &&
                        (e.relativePath() ||
                            -1 === e.folderType() ||
                            a.getFolderRelativePath(e.path()).done(function (t) {
                                e.relativePath(t);
                            })),
                        L(!1);
                },
                hideWindow: Te,
                currentFolder: z,
                path: o.computed(function () {
                    if (!z()) return "";
                    var e = "",
                        t = n.toJS(z);
                    if (t.masterFile)
                        return (
                            t.relativePath &&
                            ((e = t.relativePath.split("\\")), (e = e[e.length - 1])),
                            d.toAttachment + "'" + e + "'" + d.updateAttachment
                        );
                    if (
                        (e = t.relativePath) &&
                        ((t.namePath && /^PersonalRoot/i.test(t.namePath)) ||
                            t.id === window.constInfo.userInfo.topPersonalFolderId ||
                            t.parentFolderId == window.constInfo.userInfo.topPersonalFolderId)
                    ) {
                        var o = e.split("\\");
                        o.splice(1, 1), (e = o.join("\\"));
                    }
                    return d.toFolder + e;
                }),
                upload: De,
                state: O,
                fileList: N,
                renameComponent: B,
                renameData: U,
                miniInfo: V,
                binding: function () {
                    (Z = e("#uploadContainer")),
                        (Y = e('<div class="pickContainer"></div>').appendTo(Z)),
                        e(
                            '<div class="form" style="padding: 0px 20px; word-break: break-all;" data-bind="text:path,attr: {title: path }"></div>'
                        ).appendTo(Y),
                        e(
                            '<button type="button" class="form-button start" style="display: none" data-bind="click:upload">start</button>'
                        ).appendTo(Y),
                        (K = e(
                            '<div class="placeholder" data-bind="css:{solid:fileList().length>0}" ></div>'
                        ).appendTo(Z)),
                        (ee = e(
                            '<div style="display:none" data-bind="compose:{model:renameComponent}"></div>'
                        ).appendTo(Z));
                    var t =
                        '<ul class="filelist uploadModuleFlag">\x3c!--ko foreach:fileList --\x3e<li><div class="inline-mask" data-bind="style: { width: $data.percent()+ \'%\'},visible:$data.statusText() != \'error\'"></div><div class="inline-content"><img class="fileicon" data-bind="attr: { src: $data.icon}" onerror="this.src=\'external/icon-file-type/32/unknown.png\'; this.onerror=null;"/><span class="filename vertical-mid" data-bind="text:$data.fullPath()+$data.name(),attr: {title: $data.fullPath()+$data.name() }"></span><span class="filesize vertical-mid" data-bind="text:$data.size"></span><span class="speedinfo vertical-mid" data-bind="text:$data.speedInfo,visible:$data.statusText() == \'progress\'"></span>' +
                        "<span class=\"status \" data-bind=\"visible:$data.statusText() != 'complete'&&$data.statusText() != 'error'&&$data.statusText() != 'pausing',attr:{title:$data.reason()},style:{ backgroundImage : 'url(scripts/lib/webuploader/'+$data.statusText()+'.png)'},click:$root.paused\"></span><span class=\"status \" data-bind=\"visible:$data.statusText() == 'paused',attr:{title:$data.reason()},style:{ backgroundImage : 'url(scripts/lib/webuploader/'+$data.statusText()+'.png)'}\"></span><span class=\"status \" data-bind=\"visible:$data.statusText() == 'uploading',attr:{title:$data.reason()},style:{ backgroundImage : 'url(scripts/lib/webuploader/'+$data.statusText()+'.png)'}\"></span><span class=\"status \" data-bind=\"visible:$data.statusText() != 'complete'&&$data.statusText() == 'error',attr:{title:$data.reason()},style:{ backgroundImage : 'url(scripts/lib/webuploader/ic_retry.png)'},click:$root.retryFile\"></span><span class=\"file-successinfo \" data-bind=\"text:$data.folderRelativePath(),attr: {title: $data.name },visible:$data.statusText() == 'complete'\"></span><span class=\"error\" data-bind=\"text:$data.reason(),attr: {title: $data.reason() },visible:$data.statusText() == 'error'\"></span><span class=\"status_mid vertical-mid\" style='width:48px' data-bind=\"attr: {title: $data.name },text:$root.lang.suspend,visible:$data.statusText() == 'interrupt'\"></span><span class=\"status_mid vertical-mid\" style='width:48px' data-bind=\"attr: {title: $data.name },text:$root.lang.uploaded,visible:$data.statusText() == 'complete'\"></span><span class=\"status_mid vertical-mid\" style='width:48px' data-bind=\"attr: {title: $data.name },text:$root.lang.queued,visible:$data.statusText() == 'queued'\"></span><span class=\"status_mid vertical-mid\" style='width:48px' data-bind=\"attr: {title: $data.name },text:$root.lang.secondPass,visible:$data.statusText() == 'secondPass'\"></span><span class=\"status_mid vertical-mid\" style='width:48px' data-bind=\"attr: {title: $data.name },text:$root.lang.skip,visible:$data.statusText() == 'cancelled'\"></span></div><span class=\"remove\" data-bind=\"css:{ remove: ($data.statusText() != 'complete'&&$data.statusText() != 'cancelled'&&$data.statusText() != 'secondPass'), success: ($data.statusText() == 'complete'||$data.statusText() == 'cancelled'||$data.statusText() == 'secondPass')},click:$root.removeFile\"></span></li>\x3c!--/ko--\x3e";
                    $.browser.msie9
                        ? ((t +=
                            '<li class="dnd-upload-button" data-bind="css:{\'webuploader-element-invisible\':fileList().length>0}"></li>'),
                            (t +=
                                '<li class="dnd-tip" data-bind="visible:runtime() != \'html5\' && fileList().length==0"><h1>' +
                                $.format(d.dndTip3, X) +
                                "</h1><p>" +
                                d.dndTip2 +
                                "</p></li>"))
                        : ((t +=
                            '<li class="dnd-upload-button" data-bind="visible:fileList().length==0" ></li>'),
                            (t +=
                                '<li class="dnd-tip" data-bind="visible:runtime() == \'html5\' && fileList().length==0"><h1>' +
                                $.format(d.dndTip1, X) +
                                "</h1></li>")),
                        (t += "</ul>"),
                        (te = e(t).appendTo(K)),
                        (oe = e('<div class="filePicker"></div>').appendTo(
                            K.find(".dnd-upload-button")
                        )),
                        Ce() &&
                        ((ie = e(
                            '<div class="filePicker webuploader-container "></div>'
                        ).appendTo(K.find(".dnd-upload-button"))),
                            (ae = e(
                                '<div class="webuploader-pick">' + d.addFolder + "</div>"
                            ).appendTo(ie)),
                            (re = e(
                                '<div style="position: absolute; top: 0px; left: 0px; width: 120px; height: 36px; overflow: hidden; bottom: auto; right: auto;"></div>'
                            ).appendTo(ie)),
                            (se = e(
                                '<input type="file" name="file" class="webuploader-element-invisible" style="display:none" webkitdirectory multiple />'
                            ).appendTo(re)),
                            (de = e(
                                '<label style="opacity: 0; width: 100%; height: 100%; display: block; cursor: pointer; background: rgb(255, 255, 255);"></label>'
                            ).appendTo(re)),
                            de.on("click", function () {
                                se.trigger("click");
                            }),
                            de.on("mouseenter mouseleave", function (e) {
                                switch (e.type) {
                                    case "mouseenter":
                                        ae.addClass("webuploader-pick-hover");
                                        break;
                                    case "mouseleave":
                                        ae.removeClass("webuploader-pick-hover");
                                }
                            }),
                            se.on("change", function (e) {
                                var t = e.target.files;
                                t &&
                                    t.length > 0 &&
                                    ((t = $.map(t, function (e) {
                                        var t = e.webkitRelativePath.split("/");
                                        return (
                                            t &&
                                            t.length > 0 &&
                                            ((t = t.slice(0, t.length - 1)),
                                                (e.fullPath = "/" + t.join("/") + "/")),
                                            e
                                        );
                                    })),
                                        F.addFile(t),
                                        se.val(""));
                            })),
                        (ne = e(
                            '<div class="mini-upload" data-bind="visible:showWindow()&&(state()==\'uploading\'||state()==\'paused\'),attr: {title: miniInfo },click:clickShow"><img data-bind="attr:{src:\'scripts/lib/webuploader/\'+state()+\'.gif\'}" style="vertical-align: middle;height:14px" /><span data-bind="text:miniInfo" style="vertical-align: middle;line-height: 14px;"></span></div>'
                        ).appendTo(Z)),
                        te.css("position", "relative"),
                        te.perfectScrollbar("update").perfectScrollbar();
                },
                attached: function (e, t) {
                    ne.appendTo(document.body);
                    var o = $.getQueryString("moduledata");
                    if (o) {
                        var n = JSON.parse(o);
                        if (
                            (n && n.datas && n.datas.multiple && ue(n.datas.multiple),
                                n && n.datas && n.datas.fileNum && ge(n.datas.fileNum),
                                n && n.datas && n.datas.accept && (ve = n.datas.accept),
                                n && void 0 != n.isAllow && (ye = n.isAllow),
                                n &&
                                n.uploadAccept &&
                                n.uploadAccept.fileTypes &&
                                !n.datas.accept &&
                                (ve = S(n.uploadAccept.fileTypes, ye)),
                                n && n.datas && n.datas.fileControlUnit)
                        ) {
                            var i = 0,
                                a = n.datas.fileSize || 0;
                            "KB" == n.datas.fileControlUnit
                                ? (i = 1024)
                                : "MB" == n.datas.fileControlUnit
                                    ? (i = 1048576)
                                    : "G" == n.datas.fileControlUnit && (i = 1073741824);
                            var r = "6G";
                            0 < i * a && i * a < q
                                ? ((D = i * a), (r = a + n.datas.fileControlUnit))
                                : (D = 6442450944),
                                (q = 0);
                            var s = "<h1>" + $.format(d.dndTip4, r) + "</h1>";
                            te.find("li.dnd-tip").append(s);
                        }
                    }
                    Fe(), $("ul.filelist.uploadModuleFlag").perfectScrollbar("update");
                },
                compositionComplete: function (e, i) {
                    /^#system/.test(window.location.hash) &&
                        t.trigger("templatelist:reload", "Refresh");
                    var r = { module: "update", message: "team" };
                    t.trigger("upload:init", r),
                        t.on("upload:init").then(function (e) {
                            var t = e.select[0];
                            if ("folder" === a.getObjType(t)) {
                                (t.relativePath = ""),
                                    (t.masterFile = o.observable()),
                                    t.data && (t = $.extend({}, t, t.data)),
                                    t.name || (t.name = "folder name empty");
                                var i = n.fromJS(t);
                                z(i);
                            }
                        }),
                        t.on("upload:show").then(function (e) {
                            var r = k({ RegionType: 1 });
                            F.options.server !== r && F.option("server", r),
                                e.isOutpublish && (_ = !0),
                                e.rootFolderName && (Q = e.rootFolderName);
                            var s = o.dataFor(i);
                            if (
                                ((fe = s.moduleName()),
                                    (me = s.datas()),
                                    (he = s.message()),
                                    "favoritelist" === fe)
                            ) {
                                if (c.IsProcessStrategy(me, 1).IsProcessStrategy)
                                    return (
                                        (e.window = !1),
                                        (j = !0),
                                        void t.trigger("message:show", {
                                            type: "error",
                                            message: d.ProcessEnabled,
                                        })
                                    );
                            }
                            if ("enterprise" === fe && c.getProcessStrategy(me, "create"))
                                return (e.window = !1), void (j = !0);
                            if (((H = !1), e.showWindow)) {
                                if (
                                    (Ce() && e.localFolderSelect
                                        ? K.find(".webuploader-container")
                                            .css("display", "inline-block")
                                            .css("margin", "0 10px")
                                        : ie && ie.css("display", "none"),
                                        e.masterFile)
                                ) {
                                    H = !0;
                                    var l = {};
                                    (l.id = 3),
                                        (l.name = "Attachment"),
                                        (l.relativePath = ""),
                                        (l.path = e.masterFile
                                            .path()
                                            .substr(0, e.masterFile.path().length - 1)),
                                        M.fromJS(l),
                                        (M().masterFile = o.observable(e.masterFile)),
                                        z() ? Se(z(), M()) : (z = M);
                                }
                                if (
                                    (!e.isEformEnv &&
                                        e.folder &&
                                        ((e.folder.relativePath = ""),
                                            M.fromJS(e.folder),
                                            Se(z(), M())),
                                        e.isEformEnv)
                                ) {
                                    var u = {
                                        id: e.folder.id,
                                        name: e.folder.name,
                                        path: e.folder.path,
                                        relativePath: e.folder.relativePath,
                                        masterFile: o.observable(),
                                        strategy: e.strategy,
                                        operateType: e.operateType,
                                        updateFileId: e.updateFileId,
                                        namePath: e.folder.namePath,
                                        parentFolderId: e.folder.parentFolderId,
                                    };
                                    (le = e.isEformEnv), (ce = e.isCrossDomain), z(n.fromJS(u));
                                }
                                if (!z() || !z().path()) return;
                                L(!e.showWindow);
                                var p = $.getQueryString("moduledata");
                                if (p) {
                                    var f = JSON.parse(p);
                                    f &&
                                        f.datas &&
                                        f.datas.isEformEnv &&
                                        $(".panel.window").addClass("isEformEnvAttachmentList");
                                }
                                $("ul.filelist.uploadModuleFlag").perfectScrollbar("update"),
                                    s.moduleDataType &&
                                    "custom" === o.unwrap(s.moduleDataType) &&
                                    $("#uploadContainer").closest(".window").css({ top: 0 }),
                                    a.getFolderRelativePath(z().path()).done(function (t) {
                                        e.masterFile
                                            ? z().relativePath(
                                                $.format("{0}\\{1}", t, e.masterFile.name())
                                            )
                                            : z().relativePath(t);
                                    });
                            }
                        });
                },
                activate: function () {
                    $("ul.filelist.uploadModuleFlag").perfectScrollbar("update");
                },
                removeFile: function (e) {
                    p(e);
                },
                paused: function (e) {
                    y(e);
                },
                retryFile: function (e) {
                    g(e);
                },
            };
        }
    ),
    define("doc/contextmenu/menuinfo", {}),
    define("doc/contextmenu/publishMenuCfg", [], function () {
        return [
            {
                id: "back",
                command: "outpublish/plugins/back/index",
                icon: "goback.png",
                text: "返回",
                lang: { zhcn: "返回", zhtw: "返回", en: "Return", jp: "戻る" },
                entryType: [
                    "publishroot",
                    "file",
                    "files",
                    "folder",
                    "folders",
                    "subfolder",
                    "mix",
                ],
                moduleType: ["outpublish"],
            },
            {
                id: "refresh",
                command: "outpublish/plugins/refresh/index",
                icon: "refresh.png",
                text: "刷新",
                lang: { zhcn: "刷新", zhtw: "重繪", en: "Refresh", jp: "リフレッシュ" },
                entryType: [
                    "publishroot",
                    "file",
                    "files",
                    "folder",
                    "folders",
                    "subfolder",
                    "mix",
                ],
                moduleType: ["outpublish"],
            },
            {
                id: "download",
                command: "outpublish/plugins/download/index",
                icon: "download.png",
                text: "下载",
                lang: {
                    zhcn: "下载",
                    zhtw: "下載",
                    en: "download",
                    jp: "ダウンロード",
                },
                entryType: [
                    "publishroot",
                    "file",
                    "files",
                    "folder",
                    "folders",
                    "subfolder",
                    "mix",
                ],
                moduleType: ["outpublish"],
            },
            {
                id: "decryptdownload",
                command: "outpublish/plugins/decryptdownload/index",
                icon: "download.png",
                text: "解密下载",
                lang: {
                    zhcn: "解密下载",
                    zhtw: "解密下載",
                    en: "Decrypt download",
                    jp: "ダウンロードの復号化",
                },
                entryType: [
                    "publishroot",
                    "file",
                    "files",
                    "subfolder",
                    "mix",
                ],
                moduleType: ["outpublish"],
            },
            {
                id: "upload",
                command: "component/upload/index",
                icon: "upload.png",
                text: "上传",
                lang: { zhcn: "上传", zhtw: "上傳", en: "Upload", jp: "アップロード" },
                entryType: [
                    "publishroot",
                    "file",
                    "files",
                    "folder",
                    "folders",
                    "subfolder",
                    "mix",
                ],
                moduleType: ["outpublish"],
            },
            {
                id: "update",
                command: "doc/updatefile/index",
                icon: "update.png",
                text: "更新",
                lang: { zhcn: "更新", zhtw: "更新", en: "Update", jp: "変更" },
                entryType: [
                    "publishroot",
                    "file",
                    "files",
                    "folder",
                    "folders",
                    "subfolder",
                    "mix",
                ],
                moduleType: ["outpublish"],
            },
            {
                id: "log",
                command: "outpublish/plugins/outpublishlog/index",
                icon: "log.png",
                text: "外部日志",
                lang: {
                    zhcn: "外部日志",
                    zhtw: "外部日誌",
                    en: "External log",
                    jp: "外部ログ",
                },
                entryType: [
                    "publishroot",
                    "file",
                    "files",
                    "folder",
                    "folders",
                    "subfolder",
                    "mix",
                ],
                moduleType: ["outpublish"],
            },
        ];
    }),
    define("doc/contextmenu/menusort", {}),
    define("doc/contextmenu/menutemplateconfig", ["./permtype"], function (e) {
        return [
            {
                command: "doc/refresh/index",
                icon: "refresh",
                text: "刷新",
                lang: {
                    zhcn: "刷新",
                    zhtw: "重繪",
                    en: "Refresh",
                    jp: "リフレッシュ",
                    ja: "リフレッシュ",
                },
                entryType: ["folder", "file", "files", "templateroot"],
                moduleType: ["template"],
            },
            {
                command: "component/upload/index",
                icon: "upload",
                text: "上传",
                lang: { zhcn: "上传", zhtw: "上傳", en: "upload", jp: "アップロード" },
                entryType: [
                    "folder",
                    "teamcreator",
                    "teamadmin",
                    "teaminsider",
                    "sysinsider",
                    "publicroot",
                    "personroot",
                    "record",
                    "record",
                    "root",
                    "templateroot",
                    "mix",
                ],
                perm: [e.createFile],
                moduleType: ["template"],
            },
            {
                command: "doc/delete/index",
                icon: "delete",
                text: "删除",
                lang: { zhcn: "删除", zhtw: "删除", en: "delete", jp: "削除" },
                entryType: [
                    "folder",
                    "vitualfolder",
                    "file",
                    "files",
                    "folders",
                    "mix",
                    "link",
                    "links",
                    "form",
                    "record",
                    "forms",
                    "records",
                ],
                perm: [e.deleteFile],
                moduleType: ["template"],
            },
            {
                command: "NewMenu",
                icon: "create",
                text: "新建",
                lang: { zhcn: "新建", zhtw: "新建", en: "Newly build", jp: "新築" },
                entryType: [
                    "teamcreator",
                    "templateroot",
                    "teamadmin",
                    "teaminsider",
                    "sysinsider",
                    "publicroot",
                    "personroot",
                    "mix",
                ],
                perm: [e.createFolder],
                moduleType: ["template"],
                children: [
                    {
                        command: "doc/folder/create/index",
                        icon: "folder16",
                        text: "新建文件夹",
                        lang: {
                            zhcn: "新建文件夹",
                            zhtw: "新建資料夾",
                            en: "New Folder",
                            jp: "新規フォルダ",
                        },
                        entryType: [
                            "teamcreator",
                            "teamadmin",
                            "teaminsider",
                            "sysinsider",
                            "publicroot",
                            "personroot",
                            "mix",
                        ],
                        perm: [e.createFolder],
                        moduleType: ["template"],
                    },
                    {
                        command: "doc/folder/createoffice/index",
                        icon: "docx32",
                        text: "Word文档",
                        lang: {
                            zhcn: "Word文档",
                            zhtw: "Word檔案",
                            en: "Word Document",
                            jp: "Wordドキュメント",
                        },
                        entryType: [
                            "teamcreator",
                            "teamadmin",
                            "teaminsider",
                            "sysinsider",
                            "publicroot",
                            "personroot",
                            "mix",
                        ],
                        perm: [e.createFolder],
                        moduleType: ["template"],
                    },
                    {
                        command: "doc/folder/createoffice/index",
                        icon: "ppt",
                        text: "PowerPoint文档",
                        lang: {
                            zhcn: "PowerPoint文档",
                            zhtw: "PowerPoint檔案",
                            en: "PPT Document",
                            jp: "PowerPointファイル",
                        },
                        entryType: [
                            "teamcreator",
                            "teamadmin",
                            "teaminsider",
                            "sysinsider",
                            "publicroot",
                            "personroot",
                            "mix",
                        ],
                        perm: [e.createFolder],
                        moduleType: ["template"],
                    },
                    {
                        command: "doc/folder/createoffice/index",
                        icon: "excel",
                        text: "Excel文档",
                        lang: {
                            zhcn: "Excel文档",
                            zhtw: "Excel檔案",
                            en: "Excel Document",
                            jp: "Excelドキュメント",
                        },
                        entryType: [
                            "teamcreator",
                            "teamadmin",
                            "teaminsider",
                            "sysinsider",
                            "publicroot",
                            "personroot",
                            "mix",
                        ],
                        perm: [e.createFolder],
                        moduleType: ["template"],
                    },
                    {
                        command: "doc/filetemplate/index",
                        icon: "templet",
                        text: "从模板新建",
                        lang: {
                            zhcn: "从模板新建文档",
                            zhtw: "從範本新建檔案",
                            en: "New from templates",
                            jp: "テンプレートから新しいドキュメントを作成する",
                        },
                        entryType: [
                            "teamcreator",
                            "teamadmin",
                            "teaminsider",
                            "sysinsider",
                            "publicroot",
                            "personroot",
                            "mix",
                        ],
                        perm: [e.createFolder],
                        moduleType: ["teamfolder", "template"],
                    },
                ],
            },
            {
                command: "doc/folder/edit/index",
                icon: "edit",
                text: "属性",
                lang: { zhcn: "属性", zhtw: "内容", en: "attribute", jp: "属性" },
                entryType: ["folder", "virtualfolder", "record", "templateroot"],
                moduleType: ["template"],
            },
            {
                command: "doc/updatefile/index",
                icon: "update",
                text: "更新",
                lang: { zhcn: "更新", zhtw: "更新", en: "Update", jp: "更新" },
                entryType: ["file"],
                perm: [e.updateFileVersion],
                moduleType: ["template"],
            },
            {
                command: "component/permission/index",
                icon: "authorize",
                text: "分配权限",
                lang: {
                    zhcn: "分配权限",
                    zhtw: "分配許可權",
                    en: "Allocation permissions",
                    jp: "権限を割り当てる",
                },
                entryType: [
                    "publicroot",
                    "personroot",
                    "folder",
                    "link",
                    "form",
                    "record",
                    "root",
                    "templateroot",
                ],
                perm: [e.admin],
                moduleType: ["template"],
            },
            {
                command: "doc/download/index",
                icon: "download",
                text: "下载",
                lang: {
                    zhcn: "下载",
                    zhtw: "下載",
                    en: "download",
                    jp: "ダウンロード",
                },
                entryType: ["file", "files", "folders", "mix", "shareme"],
                perm: [e.download],
                moduleType: ["template"],
            },
        ];
    }),
    define("doc/contextmenu/previewMenuCfg", [], function () {
        return [
            {
                command: "doc/informationbar/comment/quickCreate",
                icon: "annotation",
                text: "评论&批注",
                lang: {
                    zhcn: "评论&批注",
                    zhtw: "評論&批註",
                    en: "notes&postil",
                    jp: "コメント",
                },
                entryType: ["file"],
                perm: [1 << 20],
                moduleType: ["preview"],
            },
            {
                command: "doc/extedit/extedit",
                icon: "extedit",
                text: "扩展编辑",
                lang: {
                    zhcn: "扩展编辑",
                    zhtw: "擴展編輯",
                    en: "Extended Edit",
                    jp: "擴展編輯",
                },
                entryType: ["file"],
                perm: [512],
                moduleType: ["preview"],
            },
            {
                command: "doc/onlineedit/index",
                icon: "rename",
                text: "在线编辑",
                lang: {
                    zhcn: "在线编辑",
                    zhtw: "在線編輯",
                    en: "Online Editing",
                    jp: "オンライン編集",
                },
                entryType: ["file"],
                moduleType: ["preview"],
            },
            {
                command: "doc/onlineview/index",
                icon: "savingupdate",
                text: "退出编辑",
                lang: {
                    zhcn: "退出编辑",
                    zhtw: "退出編輯",
                    en: "Exit the editor",
                    jp: "編集から抜ける",
                },
                entryType: ["file"],
                moduleType: ["preview"],
            },
            {
                command: "doc/download/index",
                icon: "download",
                text: "下载",
                lang: {
                    zhcn: "下载",
                    zhtw: "下載",
                    en: "Download",
                    jp: "ダウンロード",
                },
                entryType: ["file"],
                perm: [32],
                moduleType: ["preview"],
            },
            {
                command: "outpublish/plugins/download/index",
                icon: "download",
                text: "下载",
                lang: {
                    zhcn: "下载",
                    zhtw: "下載",
                    en: "Download",
                    jp: "ダウンロード",
                },
                entryType: ["file"],
                perm: [32],
                moduleType: ["preview"],
            },
            {
                command: "doc/localOpen/index",
                icon: "localOpen",
                text: "本地打开",
                lang: {
                    zhcn: "本地打开",
                    zhtw: "本地打開",
                    en: "Local open",
                    jp: "ローカルを開く",
                },
                entryType: ["file"],
                moduleType: ["preview"],
            },
            {
                command: "doc/localEdit/index",
                icon: "localEdit",
                text: "本地编辑",
                lang: {
                    zhcn: "本地编辑",
                    zhtw: "本地編輯",
                    en: "Local Edit",
                    jp: "ローカル編集",
                },
                entryType: ["file"],
                moduleType: ["preview"],
            },
            {
                command: "doc/print/index",
                icon: "print",
                text: "打印",
                lang: { zhcn: "打印", zhtw: "打印", en: "Print", jp: "印刷" },
                entryType: ["file"],
                perm: [16],
                moduleType: ["preview"],
            },
            {
                command: "doc/favorite/index",
                icon: "favorite",
                text: "收藏",
                lang: { zhcn: "收藏", zhtw: "收藏", en: "Favorites", jp: "お気に入り" },
                entryType: ["file"],
                moduleType: ["preview"],
            },
            {
                command: "doc/unfavorite/index",
                icon: "unfavorite.png",
                text: "取消收藏",
                lang: {
                    zhcn: "取消收藏",
                    zhtw: "取消收藏",
                    en: "Cancel Favorites",
                    jp: "コレクションの取り消し",
                },
                entryType: ["file"],
                moduleType: ["preview"],
            },
            {
                command: "doc/publish/index",
                icon: "public.png",
                text: "外发",
                lang: {
                    zhcn: "外发",
                    zhtw: "外發",
                    en: "External Share",
                    jp: "外部送信",
                },
                entryType: ["file"],
                perm: [32768],
                moduleType: ["preview"],
            },
            {
                command: "doc/share/index",
                icon: "share.png",
                text: "共享",
                lang: { zhcn: "共享", zhtw: "共亯", en: "Share", jp: "共有" },
                entryType: ["file"],
                perm: [8388608],
                moduleType: ["preview"],
            },
            {
                command: "doc/refreshforsearch/index",
                icon: "refresh.png",
                text: "刷新",
                lang: { zhcn: "刷新", zhtw: "重繪", en: "Refresh", jp: "ダウンロード" },
                entryType: ["searchroot"],
                moduleType: ["enterprise"],
            },
            {
                command: "doc/refreshforsearch/index",
                icon: "refresh.png",
                text: "刷新",
                lang: { zhcn: "刷新", zhtw: "重繪", en: "Refresh", jp: "ダウンロード" },
                entryType: ["searchroot"],
                moduleType: ["person"],
            },
            {
                command: "doc/refreshforsearch/index",
                icon: "refresh.png",
                text: "刷新",
                lang: { zhcn: "刷新", zhtw: "重繪", en: "Refresh", jp: "ダウンロード" },
                entryType: ["searchroot"],
                moduleType: ["teamfolder", "team"],
            },
            {
                command: "doc/localLocation/index",
                icon: "localLocation",
                text: "本地定位",
                lang: {
                    zhcn: "本地定位",
                    zhtw: "本地定位",
                    en: "Local location",
                    jp: "ローカル位置",
                },
                entryType: ["file"],
                moduleType: ["preview"],
            },
            {
                command: "doc/previewlog/index",
                icon: "log",
                text: "操作日志",
                lang: {
                    zhcn: "操作日志",
                    zhtw: "操作日誌",
                    en: "Operation log",
                    jp: "操作ログ",
                },
                entryType: ["file"],
                moduleType: ["preview"],
            },
        ];
    }),
    define("doc/contextmenu/intagMenuCfg", [], function () {
        return {
            intag: [
                {
                    command: "doc/refresh/index",
                    icon: "refresh.png",
                    text: "刷新",
                    lang: {
                        zhcn: "刷新",
                        zhtw: "重繪",
                        en: "Refresh",
                        ja: "リフレッシュ",
                    },
                    entryType: ["file", "files", "intag"],
                    moduleType: ["intag"],
                },
                {
                    command: "doc/intag/rename/index",
                    icon: "rename.png",
                    text: "重命名标签",
                    lang: {
                        zhcn: "重命名标签",
                        zhtw: "重命名標籤",
                        en: "rename tag",
                        ja: "名づけをする",
                    },
                    entryType: ["file", "files", "intag"],
                    moduleType: ["intag"],
                },
                {
                    command: "doc/intag/removetag/index",
                    icon: "cancel.png",
                    text: "删除标签",
                    lang: {
                        zhcn: "删除标签",
                        zhtw: "删除標籤",
                        en: "delete a tap",
                        ja: "ラベルの削除",
                    },
                    entryType: ["file", "files", "intag"],
                    moduleType: ["intag"],
                },
            ],
            intagfile: [
                {
                    command: "doc/refresh/index",
                    icon: "refresh.png",
                    text: "刷新",
                    lang: {
                        zhcn: "刷新",
                        zhtw: "重繪",
                        en: "Refresh",
                        ja: "リフレッシュ",
                    },
                    entryType: ["file", "files", "intag"],
                    moduleType: ["intag"],
                },
                {
                    command: "doc/intag/removefile/index",
                    icon: "removefile.png",
                    text: "移除文件",
                    lang: {
                        zhcn: "移除文件",
                        zhtw: "移除文件",
                        en: "Remove file",
                        ja: "ファイルを除去する",
                    },
                    entryType: ["file", "files", "intag"],
                    moduleType: ["intag"],
                },
            ],
            intagright: [
                {
                    command: "doc/refresh/index",
                    icon: "refresh.png",
                    text: "刷新",
                    lang: {
                        zhcn: "刷新",
                        zhtw: "重繪",
                        en: "Refresh",
                        ja: "リフレッシュ",
                    },
                    entryType: ["file", "files", "intag"],
                    moduleType: ["intag"],
                },
                {
                    command: "doc/intag/rename/index",
                    icon: "rename.png",
                    text: "重命名标签",
                    lang: {
                        zhcn: "重命名标签",
                        zhtw: "重命名標籤",
                        en: "rename tag",
                        ja: "名づけをする",
                    },
                    entryType: ["file", "files", "intag"],
                    moduleType: ["intag"],
                },
                {
                    command: "doc/intag/edit/index",
                    icon: "edit.png",
                    text: "编辑语料",
                    lang: {
                        zhcn: "编辑语料",
                        zhtw: "编辑语料",
                        en: "Editing language",
                        ja: "語料を編集する",
                    },
                    entryType: ["file", "files", "intag"],
                    moduleType: ["intag"],
                },
                {
                    command: "doc/intag/removetag/index",
                    icon: "cancel.png",
                    text: "删除标签",
                    lang: {
                        zhcn: "删除标签",
                        zhtw: "删除標籤",
                        en: "delete a tap",
                        ja: "ラベルの削除",
                    },
                    entryType: ["file", "files", "intag"],
                    moduleType: ["intag"],
                },
            ],
            myrecommend: [
                {
                    command: "doc/quick/myrecommendList/exchange/index",
                    icon: "refresh.png",
                    text: "换一换",
                    lang: {
                        zhcn: "换一换",
                        zhtw: "換一換",
                        en: "Exchange",
                        ja: "換えてみる",
                    },
                    entryType: ["myrecommend"],
                    moduleType: ["myrecommend"],
                },
            ],
            intagload: [
                {
                    command: "doc/refresh/index",
                    icon: "refresh.png",
                    text: "刷新",
                    lang: {
                        zhcn: "刷新",
                        zhtw: "重繪",
                        en: "Refresh",
                        ja: "リフレッシュ",
                    },
                    entryType: ["file", "files", "intag"],
                    moduleType: ["intag"],
                },
            ],
        };
    }),
    define("doc/contextmenu/processStrategyCache", [], function () {
        function e(e) {
            return o[e]
                ? o[e]
                : ($.ajax({
                    data: {
                        module: "WebClient",
                        fun: "GetProcessStrategyByKey",
                        entryId: e,
                        entryType: "1",
                    },
                    async: !1,
                }).done(function (t) {
                    o[e] = t.processStrategy || [];
                }),
                    o[e]);
        }
        function t(e) {
            delete o[e];
        }
        var o = {};
        return { get: e, del: t };
    }),
    define("doc/contextmenu/processStrategyMenuCfg", [], function () {
        return [
            {
                command: "doc/tactic/processStrategy/processStrategy",
                icon: "flowoperation",
                text: "流程操作",
                lang: { zhcn: "流程操作", zhtw: "", en: "Workflow", jp: "フロー操作" },
                entryType: ["folder", "folders", "files", "file", "mix"],
                perm: [1],
                moduleType: ["enterprise"],
                children: [
                    {
                        Id: 332,
                        command: "doc/tactic/processStrategy/process/createProcess",
                        icon: "create",
                        text: "新增流程",
                        lang: {
                            zhcn: "新增流程",
                            zhtw: "",
                            en: "Add New Files",
                            jp: "新たな流れ",
                        },
                        entryType: ["folder"],
                        perm: [128],
                        moduleType: ["enterprise"],
                    },
                    {
                        Id: 333,
                        command: "doc/tactic/processStrategy/process/updateProcess",
                        icon: "update",
                        text: "更新流程",
                        lang: {
                            zhcn: "更新流程",
                            zhtw: "",
                            en: "Update",
                            jp: "更新の流れ",
                        },
                        entryType: ["file"],
                        perm: [512],
                        moduleType: ["enterprise"],
                    },
                    {
                        Id: 334,
                        command: "doc/tactic/processStrategy/process/deleteProcess",
                        icon: "delete",
                        text: "删除流程",
                        lang: {
                            zhcn: "删除流程",
                            zhtw: "",
                            en: "Delete Files",
                            jp: "削除フロー",
                        },
                        entryType: ["folder", "folders", "files", "file", "mix"],
                        perm: [2048],
                        moduleType: ["enterprise"],
                    },
                    {
                        Id: 336,
                        command: "doc/tactic/processStrategy/process/attributeProcess",
                        icon: "attribute",
                        text: "权限申请",
                        lang: {
                            zhcn: "权限申请",
                            zhtw: "",
                            en: "Permission APP.",
                            jp: "権限の申請",
                        },
                        entryType: ["folder", "file"],
                        perm: [1],
                        moduleType: ["enterprise"],
                    },
                    {
                        Id: 337,
                        command: "doc/tactic/processStrategy/process/shareProcess",
                        icon: "share",
                        text: "共享流程",
                        lang: {
                            zhcn: "共享流程",
                            zhtw: "",
                            en: "Sharing",
                            jp: "共有フロー",
                        },
                        entryType: [
                            "teamcreator",
                            "teamadmin",
                            "teaminsider",
                            "sysinsider",
                            "publicroot",
                            "personroot",
                            "mix",
                        ],
                        perm: [8388608],
                        moduleType: ["enterprise"],
                    },
                    {
                        Id: 338,
                        command: "doc/tactic/processStrategy/process/publicProcess",
                        icon: "public",
                        text: "外发流程",
                        lang: {
                            zhcn: "外发流程",
                            zhtw: "",
                            en: "External Sharing",
                            jp: "外発の流れ",
                        },
                        entryType: [
                            "folder",
                            "teamadmin",
                            "teaminsider",
                            "sysinsider",
                            "publicroot",
                            "personroot",
                            "mix",
                        ],
                        perm: [32768],
                        moduleType: ["enterprise"],
                    },
                ],
            },
        ];
    }),
    define(
        "doc/contextmenu/menufilter",
        [
            "underscore",
            "jquery",
            "./menuinfo",
            "./publishMenuCfg",
            "./permtype",
            "header/userinfo/constinfo",
            "./menusort",
            "./menutemplateconfig",
            "./previewMenuCfg",
            "./intagMenuCfg",
            "./processStrategyCache",
            "./processStrategyMenuCfg",
            "doc/contextmenu/permtype",
        ],
        function (e, t, o, n, a, r, s, d, l, c, u, p, f) {
            function m(e, t) {
                return t in e;
            }
            function h(e) {
                for (
                    var t = { team: [], person: [], enterprise: [] }, o = 0;
                    o < e.length;
                    ++o
                ) {
                    var n = e[o];
                    if (n.data && n.data.path) {
                        var i = n.data.path.split("\\")[0];
                        "7" == i
                            ? t.team.push(n)
                            : "2" == i
                                ? t.person.push(n)
                                : "1" == i && t.enterprise.push(n);
                    }
                }
                return t;
            }
            var g = function (o) {
                var n = [];
                t.each(o, function (e, t) {
                    return t.data && "sharetome" == t.data.shareMenuType
                        ? (n.push("folder"), n.push("folder"), !1)
                        : t.data && t.data.searchroot
                            ? (n.push("searchroot"), !1)
                            : t.data && m(t.data, "folderType") && 1 == t.data.id
                                ? (n.push("publicroot"), !1)
                                : t.data &&
                                    m(t.data, "folderType") &&
                                    t.data.id == r.userInfo.topPersonalFolderId
                                    ? (n.push("personroot"), !1)
                                    : t.data && m(t.data, "folderType") && 5 == t.data.id
                                        ? (n.push("templateroot"), !1)
                                        : (t.data &&
                                            m(t.data, "folderType") &&
                                            -1 == t.data.folderType &&
                                            n.push("root"),
                                            t.data &&
                                            m(t.data, "folderType") &&
                                            1 == t.data.folderType &&
                                            n.push("folder"),
                                            t.data &&
                                            t.data.fileType &&
                                            2 == t.data.fileType &&
                                            n.push("file"),
                                            t.data &&
                                            t.data.fileType &&
                                            32 == t.data.fileType &&
                                            (t.data.shortcut && 1 == t.data.shortcut.entryType
                                                ? n.push("folderlink")
                                                : n.push("link")),
                                            t.data && t.data.favoritetype && n.push("favoritetype"),
                                            t.data && t.data.favoritelist && n.push("favoritelist"),
                                            t.data && t.data.mymessage && n.push("mymessage"),
                                            t.data && t.data.mypartition && n.push("mypartition"),
                                            t.data && t.data.update && n.push("update"),
                                            t.data && t.data.myshare && n.push("myshare"),
                                            t.data && t.data.sharerefesh && n.push("sharerefesh"),
                                            t.data && t.data.sharemerefesh && n.push("sharemerefesh"),
                                            t.data && t.data.shareme && n.push("shareme"),
                                            t.data && t.data.mysubscribe && n.push("mysubscribe"),
                                            t.data && t.data.mypublish && n.push("mypublish"),
                                            t.data && t.data.mylock && n.push("mylock"),
                                            t.data && t.data.mytag && n.push("mytag"),
                                            t.data && t.data.tagtype && n.push("tagtype"),
                                            void (
                                                t.data &&
                                                7 == t.data.parentFolderId &&
                                                (n.push("team"),
                                                    t.data.currentTeamUserType &&
                                                    1 == t.data.currentTeamUserType &&
                                                    n.push("teamcreator"),
                                                    t.data.currentTeamUserType &&
                                                    2 == t.data.currentTeamUserType &&
                                                    n.push("teamadmin"),
                                                    t.data.currentTeamUserType &&
                                                    3 == t.data.currentTeamUserType &&
                                                    n.push("teaminsider"),
                                                    ((t.data.currentTeamUserType &&
                                                        4 == t.data.currentTeamUserType) ||
                                                        t.data.isCurrentTeamUserOutside) &&
                                                    n.push("teamoutsider"),
                                                    t.data.createTeam &&
                                                    1 == t.data.createTeam &&
                                                    n.push("sysinsider"))
                                            ));
                }),
                    (n = e.countBy(n));
                var i = {};
                return (
                    n.searchroot && (i.searchroot = !0),
                    n.mymessage && (i.mymessage = !0),
                    n.mypartition && (i.mypartition = !0),
                    n.publicroot && (i.publicroot = !0),
                    n.personroot && (i.personroot = !0),
                    n.templateroot && (i.templateroot = !0),
                    n.file && (n.file > 1 ? (i.files = !0) : (i.file = !0)),
                    n.folder && (n.folder > 1 ? (i.folders = !0) : (i.folder = !0)),
                    n.link && (n.link > 1 ? (i.links = !0) : (i.link = !0)),
                    n.folderlink &&
                    (n.folderlink > 1 ? (i.folderlinks = !0) : (i.folderlink = !0)),
                    n.myshare &&
                    (1 == o.length &&
                        (i.folder && (delete n.folder, delete i.folder),
                            i.file && (delete n.file, delete i.file)),
                        (i.myshare = !0)),
                    n.shareme && (i.shareme = !0),
                    n.sharemerefesh && (i.sharemerefesh = !0),
                    n.mysubscribe && (i.mysubscribe = !0),
                    n.subscriberefesh && (i.subscriberefesh = !0),
                    n.publishrefesh && (i.publishrefesh = !0),
                    n.mypublish &&
                    (1 == o.length &&
                        (i.folder && (delete n.folder, delete i.folder),
                            i.file && (delete n.file, delete i.file)),
                        (i.mypublish = !0)),
                    n.mylock && (i.mylock = !0),
                    n.mytag && (i.mytag = !0),
                    n.tagtype && (i.tagtype = !0),
                    n.mypublishcancel &&
                    (n.mypublishcancel > 1
                        ? (i.mypublishcancel = !0)
                        : (i.mypublish = !0)),
                    n.mypublishcancelall && (i.mypublishcancelall = !0),
                    n.root && (i.root = !0),
                    n.favoritelist && (i.favoritelist = !0),
                    n.favoritetype && (i.favoritetype = !0),
                    n.favoritedata && (i.favoritedata = !0),
                    n.update && (i.update = !0),
                    n.outpublishlistback && (i.outpublishlistback = !0),
                    n.team && (i.team = !0),
                    n.teamcreator && (i.teamcreator = !0),
                    n.teamadmin && (i.teamadmin = !0),
                    n.teaminsider && (i.teaminsider = !0),
                    n.teamoutsider
                        ? ((i.teamoutsider = !0), delete n.folder, i)
                        : (n.sysinsider && (i.sysinsider = !0),
                            Object.getOwnPropertyNames(n).length > 1 && (i.mix = !0),
                            i)
                );
            },
                v = function (t, o, n) {
                    var i = [];
                    if (t.favoritetype && t.mix) {
                        if (t.favoritetype && n.length > 1)
                            for (var a = 0; a < o.length; a++)
                                if ("doc/refresh/index" == o[a].command) return i.push(o[a]), i;
                        return i;
                    }
                    for (entryType in t)
                        if (0 == i.length) {
                            var r = y(o, entryType, n);
                            i = e.compact(r);
                        } else {
                            var r = y(o, entryType, n);
                            (r = e.compact(r)), (i = e.intersection(i, r));
                        }
                    return i;
                },
                y = function (o, n, i) {
                    return e.map(o, function (e) {
                        if (!e.entryType) return e.command;
                        if (
                            t.grep(e.entryType, function (e, t) {
                                return e == n;
                            }).length > 0
                        ) {
                            if (b(e, i)) return e.command;
                        } else if ("doc/goback/index" == e.command && "searchroot" == n && window.location.hash.indexOf("fromInfobar") > 0) return e.command;
                        return "";
                    });
                },
                w = function (o, n) {
                    return t.grep(o, function (t) {
                        return e.contains(n, t.command);
                    });
                },
                b = function (t, o) {
                    if (o.length > 0 && "sharetome" == o[0].shareMenuType)
                        return (
                            "doc/delete/index" == t.command ||
                            "doc/goback/index" == t.command ||
                            "doc/refresh/index" == t.command
                        );
                    var n = [
                        "doc/download/index",
                        "doc/extedit/extedit",
                        "doc/updatefile/index",
                        "doc/favorite/index",
                        "doc/unfavorite/index",
                        "doc/informationbar/basicinfo/singlefile/tag/index",
                    ],
                        i = !1;
                    if ("doc/tactic/processStrategy/processStrategy" == t.command)
                        if (0 == o[0].procType.length) i = !0;
                        else {
                            t.children = e.filter(t.children, function (t) {
                                return e.contains(o[0].procType, t.Id);
                            });
                            var r = e.map(t.children, function (e) {
                                if (b(e, o)) return e;
                            });
                            (r = e.compact(r)),
                                (t.children = r),
                                0 == t.children.length && (i = !0);
                        }
                    if (i) return !1;
                    if (!t.perm) return !0;
                    for (var s = !0, d = 0; d < o.length; d++)
                        if (o[d].data.permission || 0 == o[d].data.permission) {
                            var l = o[d].data;
                            if (l.shortcut) {
                                var c = l.shortcut.entryPermission,
                                    u = e.find(n, function (e) {
                                        return e == t.command;
                                    });
                                if (u)
                                    for (var p = 0; p < t.perm.length; p++)
                                        if ((t.perm[p] & c) != t.perm[p]) return !1;
                            }
                            var m = require("knockout").$store.state.curentModule();
                            if (
                                m &&
                                m.hash &&
                                "quick/myshareme" == m.hash &&
                                "doc/updatefile/index" == t.command
                            )
                                return (
                                    o[d].data.sharePerm ==
                                    (f.sharePreview |
                                        f.sharePrint |
                                        f.shareDownload |
                                        f.shareEdit)
                                );
                            if (
                                "doc/download/index" == t.command ||
                                "doc/movecopy/copy/index" == t.command
                            ) {
                                var m = require("knockout").$store.state.curentModule();
                                if (!(o.length > 1)) {
                                    if (m && m.hash && "quick/myshareme" == m.hash)
                                        return (
                                            o[d].data.sharePerm ==
                                            (f.sharePreview | f.sharePrint | f.shareDownload) ||
                                            o[d].data.sharePerm ==
                                            (f.sharePreview | f.shareDownload) ||
                                            o[d].data.sharePerm ==
                                            (f.sharePreview |
                                                f.sharePrint |
                                                f.shareDownload |
                                                f.shareEdit)
                                        );
                                    for (var p = 0; p < t.perm.length; p++) {
                                        if (
                                            o[d].data.folderType &&
                                            t.perm[p] == a.download &&
                                            (a.display & o[d].data.permission) == a.display
                                        )
                                            return !0;
                                        if ((t.perm[p] & o[d].data.permission) == t.perm[p])
                                            return !0;
                                    }
                                    return !1;
                                }
                                for (var p = 0; p < t.perm.length; p++) {
                                    if (o[d].data.folderType && t.perm[p] == a.download) {
                                        s =
                                            (a.display & o[d].data.permission) == a.display
                                                ? s && !0
                                                : s && !1;
                                        break;
                                    }
                                    s =
                                        (t.perm[p] & o[d].data.permission) == t.perm[p]
                                            ? s && !0
                                            : s && !1;
                                }
                                if (
                                    (0 == t.perm.length && (s = !1),
                                        m && m.hash && "quick/myshareme" == m.hash)
                                )
                                    return (
                                        o[d].data.sharePerm ==
                                        (f.sharePreview | f.sharePrint | f.shareDownload) ||
                                        o[d].data.sharePerm == (f.sharePreview | f.shareDownload) ||
                                        o[d].data.sharePerm ==
                                        (f.sharePreview |
                                            f.sharePrint |
                                            f.shareDownload |
                                            f.shareEdit)
                                    );
                                if (0 == s) return s;
                                if (d == o.length - 1) return s;
                            } else
                                for (var p = 0; p < t.perm.length; p++)
                                    if ((t.perm[p] & o[d].data.permission) != t.perm[p])
                                        return !1;
                        }
                    return !0;
                },
                x = function (o, n) {
                    return t.grep(o, function (t) {
                        return e.contains(t.moduleType, n);
                    });
                },
                T = function (e, t, o) {
                    for (var n = {}, i = [], a = 0; a < e.length; a++) n[o(e[a])] = e[a];
                    for (var r = 0; r < t.length; r++) n[o(t[r])] && i.push(t[r]);
                    return i;
                },
                I = function (e, o, n, i) {
                    var a = t.grep(e, function (e) {
                        if (
                            (o.file || o.link) &&
                            !o.mix &&
                            "doc/versionManagement/publish/index" == e.command
                        ) {
                            if (!n[0].data) return !1;
                            if (0 == n[0].data.lastVerNumStr.split(".")[1]) return !1;
                        }
                        if (
                            (o.file ||
                                o.files ||
                                o.folder ||
                                o.folders ||
                                o.link ||
                                o.links ||
                                o.folderlink ||
                                o.folderlinks) &&
                            !o.team
                        ) {
                            if ("doc/onlineedit/index" == e.command && 1 == n.length)
                                return (
                                    !n[0].data.isOnlineEditing || !1 === n[0].data.isOnlineEditing
                                );
                            if ("doc/onlineview/index" == e.command && 1 == n.length)
                                return !(
                                    !n[0].data.isOnlineEditing || !0 !== n[0].data.isOnlineEditing
                                );
                            if ("doc/favorite/index" == e.command) {
                                var a = !0;
                                if (
                                    (t.each(n, function (e, t) {
                                        t.data.isfavorite || (a = !1);
                                    }),
                                        1 == a)
                                )
                                    return !1;
                            }
                            if ("doc/unfavorite/index" == e.command && 1 == n.length)
                                return !!n[0].data.isfavorite;
                            if ("doc/download/index" == e.command) {
                                if (!1 === n[0].data.downloadPerm) return !1;
                                var s = !1;
                                return (
                                    n.length > 0 &&
                                    t.each(n, function (e, t) {
                                        if (
                                            t.data.shareSurplusTimeOld &&
                                            "hasExpired" == t.data.shareSurplusTimeOld
                                        )
                                            return (s = !0), !1;
                                    }),
                                    !s
                                );
                            }
                        }
                        if (o.file || o.files) {
                            if (0 == e.command.indexOf("doc/quick/mytag/tagEdit")) return !0;
                            if (0 == e.command.indexOf("doc/quick/mytag/") && !n[0].tagName)
                                return !1;
                        } else if ((o.teamcreator && o.team) || (o.folder && o.team)) {
                            if (
                                "doc/team/stick/index" == e.command &&
                                n[0].data &&
                                ("0" != n[0].data.isStick || n[0].data.isStick)
                            )
                                return !1;
                            if (
                                "doc/team/unStick/index" == e.command &&
                                n[0].data &&
                                ("0" == n[0].data.isStick || !n[0].data.isStick)
                            )
                                return !1;
                            if (
                                "doc/team/edit/index" == e.command &&
                                n[0].data &&
                                !o.teamadmin &&
                                !o.teamcreator
                            )
                                return !1;
                        } else if (o.favoritetype && n.length > 1) {
                            if ("doc/quick/myfavorite/deletefavoritetype/index" == e.command)
                                return !1;
                            if ("doc/rename/index" == e.command) return !1;
                        } else if ("doc/unfavorite/index" == e.command) return !1;
                        if (
                            (1 != t(".navigation-list").children("li").length
                                ? e.command
                                : "doc/quick/myfavorite/newfavoritetype/index" == e.command &&
                                n[0].select &&
                                n[0].select.length,
                                !r.IntelligentTag() &&
                                "doc/informationbar/basicinfo/singlefile/intelligenttag/index" ==
                                e.command)
                        )
                            return !1;
                        if (
                            null != i &&
                            "person" == i &&
                            "doc/publish/index" == e.command
                        ) {
                            var d = r.userInfo.IsOutgoing;
                            if (0 == d) return !1;
                        }
                        if (
                            null != i &&
                            "preview" == i &&
                            "doc/publish/index" == e.command &&
                            "2" == n[0].path.split("\\")[0]
                        ) {
                            var d = r.userInfo.IsOutgoing;
                            if (0 == d) return !1;
                        }
                        if (
                            null != i &&
                            "preview" == i &&
                            "doc/share/index" == e.command &&
                            "2" == n[0].path.split("\\")[0]
                        ) {
                            var d = r.userInfo.IsShare;
                            if (0 == d) return !1;
                        }
                        if (null != i && "person" == i && "doc/share/index" == e.command) {
                            if (0 == r.userInfo.IsShare) return !1;
                        }
                        var l = r.systemInfo.instanceConfigInfo.DataFerry;
                        if (
                            "doc/tactic/processStrategy/process/DataFerryProcess" == e.command
                        ) {
                            if (0 == l) return !1;
                            if (!n[0].procType || 0 == n[0].procType.length) return !1;
                            var c = n[0].procType.indexOf(340);
                            if (-1 == c) return !1;
                        }
                        var u = r.systemInfo.instanceConfigInfo.FexFerry;
                        if (
                            "doc/tactic/processStrategy/process/fexFerryProcess" == e.command
                        ) {
                            if (0 == u) return !1;
                            if (!n[0].procType || 0 == n[0].procType.length) return !1;
                            var c = n[0].procType.indexOf(341);
                            if (-1 == c) return !1;
                        }
                        return (
                            "doc/quick/myshare/cancelAllExpiredShare/index" != e.command ||
                            "myshare" != i ||
                            !!o.myshare
                        );
                    });
                    if ("favoritelist" === i) {
                        var s = h(n);
                        if (
                            0 != s.team.length ||
                            0 != s.person.length ||
                            0 != s.enterprise.length
                        ) {
                            var d = t.grep(a, function (e) {
                                return 0 === e.command.indexOf("doc/quick/myfavorite");
                            });
                            for (var l in s) {
                                var c = s[l];
                                if (0 != c.length) {
                                    var u = j(c, l, null);
                                    a = T(u, a, function (e) {
                                        return e.command;
                                    });
                                }
                            }
                            a = d.concat(a);
                        }
                        n.length > 1 &&
                            (a = t.grep(a, function (e) {
                                return (
                                    "doc/quick/myfavorite/newfavoritetype/index" != e.command
                                );
                            }));
                    }
                    return (
                        "sharetome" != i &&
                        ((o.searchroot &&
                            window.location.hash.indexOf("fromInfobar") > 0) ||
                            (1 == n.length &&
                                (o.file || o.folder) &&
                                (n[0].isSelected || n[0].data.isSelected) &&
                                r.isRootFolder(n[0].data.path) &&
                                (a = t.grep(a, function (e) {
                                    return "doc/goback/index" != e.command;
                                })))),
                        n[0] &&
                        n[0].data &&
                        n[0].data.message &&
                        ("myshareme" == n[0].data.message ||
                            "myshare" == n[0].data.message) &&
                        (a = t.grep(a, function (e) {
                            return "doc/goback/index" != e.command;
                        })),
                        t.each(n, function (e, o) {
                            if (o.data && ("4" == o.data.state || "512" == o.data.state))
                                return (
                                    (a = t.grep(a, function (e) {
                                        return (
                                            (o.data.currentOperatorId === r.userInfo.id ||
                                                "doc/unlock/index" != e.command) &&
                                            "doc/delete/index" != e.command &&
                                            "doc/rename/index" != e.command &&
                                            "doc/updatefile/index" != e.command &&
                                            "doc/attribute/index" != e.command &&
                                            "component/permission/index" != e.command &&
                                            "doc/movecopy/cut/index" != e.command
                                        );
                                    })),
                                    !1
                                );
                        }),
                        a
                    );
                },
                k = function (e, o, n, a) {
                    var r = e;
                    if ("sharetome" == a)
                        for (i = 0; i < n.length; i++) {
                            var s = n[i];
                            s.data &&
                                s.data.data &&
                                s.data.data.sharetOverdue &&
                                ((r = []),
                                    t.each(e, function (e, t) {
                                        "doc/download/index" != t.command && r.push(t);
                                    }));
                        }
                    return r;
                },
                S = function (e, o, n, i) {
                    var a = [];
                    return r.isNotification()
                        ? e
                        : (t.each(e, function (e, t) {
                            "doc/notify/notify" != t.command && a.push(t);
                        }),
                            a);
                },
                P = function (e, o, n, i) {
                    if (i) {
                        for (var a = !1, r = 0; r < n.length; r++) {
                            if (n[r].hiddenAnnotation) {
                                a = !0;
                                break;
                            }
                        }
                        if (a) {
                            var s = e;
                            t.each(s, function (t, o) {
                                o &&
                                    "doc/informationbar/comment/quickCreate" === o.command &&
                                    e.splice(t, 1);
                            });
                        }
                        return e;
                    }
                },
                C = function (e, o, n, i) {
                    var a = e;
                    if (i) {
                        for (var s = !1, d = 0; d < n.length; d++) {
                            var l = n[d];
                            l.data &&
                                [4, 512].indexOf(l.data.state) >= 0 &&
                                ((s = !0), l.data.editorId != r.userInfo.id && !1);
                        }
                        var c = [];
                        return (
                            t.each(e, function (e, t) {
                                var o = ["doc/lock/index", "doc/unlock/index"];
                                "mylock" != i
                                    ? o.indexOf(t.command) < 0 &&
                                    ((s && "doc/updatefile/index" == t.command) || c.push(t))
                                    : "doc/updatefile/index" != t.command && c.push(t);
                            }),
                            (e = a = c),
                            a
                        );
                    }
                },
                F = function (e, o, n, i) {
                    var a = e;
                    return (
                        1 == n.length &&
                        128 == n[0].data.state &&
                        ((a = []),
                            t.each(e, function (e, t) {
                                "doc/unlock/index" != t.command && a.push(t);
                            })),
                        a
                    );
                },
                D = function (e, o, n, i) {
                    var a = e;
                    if (i) {
                        for (var r = 0; r < n.length; r++) {
                            var s = n[r];
                            s.data &&
                                1024 == s.data.state &&
                                ((a = []),
                                    t.each(e, function (e, t) {
                                        ("doc/goback/index" != t.command &&
                                            "doc/refresh/index" != t.command &&
                                            "doc/delete/index" != t.command &&
                                            "doc/metadata/index" != t.command &&
                                            "doc/recyclebin/restore/index" != t.command &&
                                            "doc/recyclebin/deleteUltimate/index" != t.command &&
                                            "doc/recyclebin/deleteAll/index" != t.command) ||
                                            a.push(t);
                                    }));
                        }
                        return a;
                    }
                },
                $ = function (e, o, n, i) {
                    var a = e,
                        r = t.cookie("copy"),
                        s = t.cookie("cut");
                    return (
                        "true" != r &&
                        "true" != s &&
                        ((a = []),
                            t.each(e, function (e, t) {
                                "doc/movecopy/paste/index" != t.command && a.push(t);
                            })),
                        a
                    );
                },
                L = function (e, o, n, i) {
                    for (var a = e, r = 0; r < n.length; r++)
                        if (n[r] && "0" == n[r].permission)
                            return (
                                (a = []),
                                t.each(e, function (e, t) {
                                    ("doc/goback/index" != t.command &&
                                        "doc/refresh/index" != t.command) ||
                                        a.push(t);
                                }),
                                a
                            );
                    return a;
                },
                z = function (e, o, n, i) {
                    var a = e;
                    return (
                        "sharetome" == i &&
                        ((a = []),
                            t.each(e, function (e, t) {
                                "doc/delete/index" != t.command && a.push(t);
                            })),
                        a
                    );
                },
                M = function (e, t, o, n) {
                    if ("preview" == n && o[0]) {
                        var a = new Array();
                        for (i in e)
                            window.location.href.indexOf("sharecode") > -1 ||
                                window.location.href.indexOf("code") > -1
                                ? "doc/localOpen/index" != e[i].command &&
                                "doc/localLocation/index" != e[i].command &&
                                a.push(e[i])
                                : a.push(e[i]);
                        e = a;
                    }
                    return e;
                },
                N = function (e, t, o, n) {
                    var a = new Array();
                    for (i in e) "doc/secpublish/index" != e[i].command && a.push(e[i]);
                    return (e = a);
                },
                R = function (o, n, i, a) {
                    if ("person" == a) {
                        var s = new Array();
                        for (d in o) "doc/docoptlog/index" != o[d].command && s.push(o[d]);
                        o = s;
                    }
                    if ("myshare" == a && i.length > 1) {
                        var s = new Array();
                        for (d in o) "doc/share/index" != o[d].command && s.push(o[d]);
                        o = s;
                    }
                    if ("preview" == a && i[0] && "Template" == i[0].mould) {
                        var s = new Array();
                        for (d in o) "download" === o[d].icon && s.push(o[d]);
                        o = s;
                    }
                    var d;
                    if ("template" == a) {
                        var c = i[0].path;
                        c ||
                            (c = i[0].data && i[0].data.namePath ? i[0].data.namePath : "");
                        var u = c.split("\\");
                        if (
                            u.length >= 2 && !i[0].parentFolderId
                                ? "5" == u[0] && "13" == u[1]
                                : "13" == u[0]
                        ) {
                            var s = new Array();
                            for (d in o)
                                ("refresh" !== o[d].icon &&
                                    "update" !== o[d].icon &&
                                    "download" !== o[d].icon) ||
                                    s.push(o[d]);
                            o = s;
                        }
                    }
                    if ("SystemTemplate" == i[0].name && "template" == a) {
                        var s = new Array();
                        for (d in o)
                            "delete" != o[d].icon &&
                                "folder16" != o[d].icon &&
                                "edit" != o[d].icon &&
                                "authorize" != o[d].icon &&
                                s.push(o[d]);
                        o = s;
                    }
                    if ("outpublish" === a) {
                        var p = {
                            back: "back",
                            download: "download",
                            upload: "upload",
                            extedit: "",
                            log: "log",
                            decryptdownload: "decryptdownload",
                            refresh: "refresh",
                            update: "update",
                        },
                            f = i[0].operationData,
                            m = i[0].permissionData,
                            h = null;
                        f.isPublishFile &&
                            ((h = f.isSingleFile
                                ? f.isDetelefile
                                    ? [p.extedit, p.log]
                                    : [p.download, p.decryptdownload,p.update, p.extedit, p.log]
                                : f.isMultiFile && !f.isDetelefile
                                    ? [p.download, p.decryptdownload,p.log]
                                    : [p.log]),
                                f.canRefresh && h.unshift(p.refresh)),
                            f.isPublishFolder &&
                            (f.isSingleFile
                                ? (h = [p.download, p.decryptdownload,p.update, p.extedit, p.log])
                                : f.isMultiFile
                                    ? (h = [p.download, p.decryptdownload,p.log])
                                    : f.isSingleFolder
                                        ? (h = f.isSelectAllFolde
                                            ? [p.download, p.decryptdownload,p.upload, p.log]
                                            : [p.upload, p.log])
                                        : f.isMultiFolder
                                            ? (h = [p.download, p.decryptdownload,p.log])
                                            : f.isFileAndFolder && (h = [p.download, p.decryptdownload,p.log]),
                                f.canRefresh && h.unshift(p.refresh),
                                f.isInSubFolder && h.unshift(p.back)),
                            (h = e.reject(h, function (e) {
                                return "" === e;
                            })),
                            m.canEdit || (h = e.reject(h, function (e) {
                                return e === p.extedit || e === p.update;
                            })),
                            m.canUpload || (h = e.reject(h, function (e) {
                                return e === p.upload;
                            })),
                            m.canDownload || (h = e.reject(h, function (e) {
                                return e === p.download;
                            })),
                            m.canDecryptdownload || (h = e.reject(h, function (e) {
                                return e === p.decryptdownload;
                            })),
                            (o = e.filter(o, function (t) {
                                return e.contains(h, t.id);
                            }));
                    }
                    var f = e.find(i, function (e) {
                        return !!(e.data && e.data.shortcut && e.data.shortcut.isDelete);
                    });
                    if (f) {
                        var g = ["doc/delete/index", "doc/refresh/index"];
                        o = e.filter(o, function (t) {
                            var o = t.command.toLowerCase();
                            return e.contains(g, o);
                        });
                    }
                    if ("preview" == a) {
                        var v = "outpublish/plugins/download/index",
                            y = i[0],
                            w = [],
                            b = function () {
                                w.push("doc/publish/index"),
                                    w.push("doc/share/index"),
                                    w.push("doc/favorite/index"),
                                    w.push("doc/unfavorite/index");
                            };
                        if ("publish" == y.type)
                            b(),
                                w.push("doc/onlineedit/index"),
                                w.push("doc/onlineview/index"),
                                w.push("doc/download/index"),
                                y.canDown || w.push(v),
                                w.push("doc/extedit/extedit");
                        else if ("share" == y.type) {
                            b();
                            for (var d = 0; d < o.length; d++)
                                "outpublish/plugins/download/index" == o[d].command &&
                                    w.push("doc/download/index");
                            if (
                                (w.push("doc/favorite/index"),
                                    y.canDown || w.push(v),
                                    y.canPrint || w.push("doc/print/index"),
                                    w.push("doc/extedit/extedit"),
                                    (y.canEdit || y.canDown) &&
                                    !e.find(o, function (e) {
                                        return e.command.toLowerCase() == v;
                                    }))
                            ) {
                                var x = e.find(l, function (e) {
                                    return e.command.toLowerCase() == v;
                                }),
                                    T = e.find(l, function (e) {
                                        return "doc/print/index" == e.command.toLowerCase();
                                    });
                                o.push(T), o.push(x);
                            }
                            if (
                                !y.canEdit &&
                                !y.canDown &&
                                y.canPrint &&
                                !e.find(o, function (e) {
                                    return "doc/print/index" == e.command.toLowerCase();
                                })
                            ) {
                                var T = e.find(l, function (e) {
                                    return "doc/print/index" == e.command.toLowerCase();
                                });
                                o.push(T);
                            }
                        } else w.push(v);
                        (void 0 === y.unneedOnlineEditing ||
                            (y.unneedOnlineEditing && !0 === y.unneedOnlineEditing)) &&
                            w.push("doc/onlineedit/index"),
                            y.unneedPrint && w.push("doc/print/index"),
                            y.unneedDownload &&
                            (w.push("doc/download/index"),
                                w.push("outpublish/plugins/download/index")),
                            y.unneedFavorite &&
                            (w.push("doc/favorite/index"), w.push("doc/unfavorite/index")),
                            y.unneedPublish && w.push("doc/publish/index"),
                            y.unneedShare && w.push("doc/share/index"),
                            y.unneedExtedit && w.push("doc/extedit/extedit"),
                            y.unneedLocalOpen && w.push("doc/localopen/index"),
                            y.unneedLocalLocation && w.push("doc/locallocation/index"),
                            y.canExtEdit || w.push("doc/extedit/extedit"),
                            ("\\" + y.path + "\\").indexOf("\\6\\") > -1 &&
                            w.push("doc/extedit/extedit");
                        try {
                            (function () {
                                return /windows|win32/i.test(navigator.userAgent);
                            })() || w.push("doc/extedit/extedit");
                        } catch (e) {
                            console.log(e);
                        }
                        (y.unneedOplog || "share" == y.type || "publish" == y.type) &&
                            w.push("doc/previewlog/index");
                        var I = r.systemInfo.instanceConfigInfo.PreviewBtnSetting;
                        if (I)
                            for (var f in I)
                                0 == I[f].IsShow &&
                                    (w.push(I[f].SettingKey.toLowerCase()),
                                        "doc/download/index" == I[f].SettingKey &&
                                        w.push("outpublish/plugins/download/index"));
                        o.indexOf("doc/download/index");
                        o = e.filter(o, function (t) {
                            var o = t.command.toLowerCase();
                            return !e.contains(w, o);
                        });
                        for (var f in o)
                            if (null != o[f].command && void 0 != o[f].command) {
                                var k = e.filter(I, function (e) {
                                    return (
                                        e.SettingKey.toLowerCase() == o[f].command.toLowerCase()
                                    );
                                });
                                if (k && k.length > 0) o[f].sort = k[0].SettingValue;
                                else if ("doc/onlineview/index" == o[f].command.toLowerCase()) {
                                    var k = e.filter(I, function (e) {
                                        return "doc/onlineedit/index" == e.SettingKey.toLowerCase();
                                    });
                                    k && k.length > 0 && (o[f].sort = k[0].SettingValue);
                                } else o[f].sort = 100 * f;
                            }
                        o = e.sortBy(o, function (e) {
                            return e.sort;
                        });
                        var S = [],
                            P = [];
                        for (var f in o)
                            if (null != o[f].command && void 0 != o[f].command) {
                                var C = o[f].command.toLowerCase();
                                if (!e.contains(S, C)) {
                                    S.push(C);
                                    var F = e.filter(o, function (e) {
                                        return e.sort == o[f].sort && e.command.toLowerCase() != C;
                                    });
                                    F &&
                                        F.length > 0 &&
                                        ((o[f].children = F),
                                            t.each(F, function (e, t) {
                                                S.push(t.command.toLowerCase());
                                            })),
                                        P.push(o[f]);
                                }
                            }
                        o = P;
                    }
                    if (i && i.length > 0 && "recyclebinlist" != i[0].module) {
                        if (
                            e.find(i, function (e) {
                                return e.data && 2 == e.data.state;
                            })
                        ) {
                            var g = ["doc/delete/index"];
                            o = e.filter(o, function (t) {
                                var o = t.command.toLowerCase();
                                return e.contains(g, o);
                            });
                        }
                    }
                    return (
                        "sharetome" === a &&
                        i.length > 0 &&
                        e.first(i).isInSub &&
                        (o = e.filter(o, function (e) {
                            return "doc/refresh/index" !== e.command;
                        })),
                        o
                    );
                },
                A = function (e, o) {
                    return t.grep(e, function (e) {
                        return e.command == o;
                    });
                },
                j = function (i, a, f) {
                    if ("intag" == a) return c.intag;
                    if ("myrecommend" == a) return c.myrecommend;
                    if ("intagFiles" == a) return c.intagfile;
                    if ("intagRightMenu" == a) {
                        return t.extend(!0, [], c.intagright);
                    }
                    if ("intagload" == a) return c.intagload;
                    var m = o.concat(d);
                    if (((m = m.concat(n)), (m = m.concat(l)), "enterprise" == a)) {
                        var h = t.extend(!0, [], p);
                        m = m.concat(h);
                    }
                    var y = m,
                        b = {},
                        T = [];
                    if (
                        (f && (y = A(y, f)),
                            (b = g(i)),
                            (y = x(y, a)),
                            b.folder || b.folders)
                    ) {
                        var j = r.getSysConfigInfo();
                        if (j && !j.enableFolderMetaData)
                            for (var E = 0; E < y.length; E++)
                                if ("doc/metadata/batchadd/index" == y[E].command) {
                                    y.splice(E, 1);
                                    break;
                                }
                    }
                    if ("enterprise" == a) {
                        var O = 0;
                        O =
                            i.length > 1
                                ? i[0].data.parentFolderId
                                : 1 == b.file
                                    ? i[0].data.parentFolderId
                                    : i[0].data.id;
                        for (var B = [], U = 0, E = 0; E < i.length; E++)
                            i[E].isFolder && U++;
                        for (var W = u.get(O), E = 0; E < W.length; E++)
                            switch (W[E].procType) {
                                case 1:
                                    1 == i.length && 1 == b.folder && B.push(332);
                                    break;
                                case 2:
                                    1 == i.length && 1 == b.file && B.push(333);
                                    break;
                                case 3:
                                    B.push(334);
                                    break;
                                case 4:
                                    1 != b.mix && U < 2 && B.push(336);
                                    break;
                                case 5:
                                    1 != b.mix && 1 != b.folders && B.push(337);
                                    break;
                                case 6:
                                    1 != b.mix && 1 != b.folders && B.push(338);
                                    break;
                                case 7:
                                    1 != b.mix && 1 != b.folders && B.push(339);
                                    break;
                                case 8:
                                    1 != b.mix &&
                                        1 != b.folders &&
                                        -1 == B.indexOf(341) &&
                                        B.push(340);
                                    break;
                                case 9:
                                    1 != b.mix && 1 != b.folders && B.push(341);
                            }
                        i[0].procType = B;
                    }
                    var V = s,
                        q = V[a];
                    q &&
                        (e.map(b, function (t, o) {
                            var n = q[o];
                            n &&
                                e.map(n, function (t) {
                                    var o = e.findIndex(y, function (e) {
                                        return e.Id == t.menuId;
                                    });
                                    o > -1 && (y[o].sort = t.sort);
                                });
                        }),
                            (y = e.sortBy(y, "sort"))),
                        (T = v(b, y, i)),
                        b.favoritetype && 1 == T.length
                            ? (y = T)
                            : ((y = w(y, T)),
                                (y = I(y, b, i, a)),
                                (y = R(y, 0, i, a)),
                                (y = k(y, 0, i, a)),
                                (y = S(y)),
                                (y = C(y, 0, i, a)),
                                (y = P(y, 0, i, a)),
                                (y = $(y)),
                                (y = D(y, 0, i, a)),
                                (y = M(y, 0, i, a)),
                                (y = L(y, 0, i)),
                                (y = F(y, 0, i)),
                                (y = z(y, 0, 0, a))),
                        (y = N(y));
                    var _ = r.getLang(),
                        H = { "zh-cn": "zhcn", "zh-tw": "zhtw", en: "en", ja: "jp" };
                    if (
                        1 == i.length &&
                        i[0].data &&
                        i[0].data.type &&
                        32 == i[0].data.type &&
                        i[0].data.shortcut &&
                        "2" == i[0].data.shortcut.entryPath.split("\\")[0]
                    )
                        for (var E = 0; E < y.length; E++)
                            "doc/lock/index" == y[E].command && y.splice(E, 1);
                    "teamcreate" == a &&
                        t.each(y, function (e, t) {
                            if ("doc/team/create/index" == t.command)
                                return r.ShowNewTeam(!0), !1;
                            r.ShowNewTeam(!1);
                        });
                    var Q = require("knockout").$store.state.curentModule();
                    if (Q && "quick/myfavorite" == Q.hash) {
                        var G = !1;
                        t.each(i, function (e, t) {
                            t.data.isDeleted && (G = !0);
                        });
                        var J = [];
                        G &&
                            (t.each(y, function (e, t) {
                                ("doc/refresh/index" != t.command &&
                                    "doc/quick/myfavorite/deletefavorite/index" != t.command) ||
                                    J.push(t);
                            }),
                                (y = J));
                    }
                    var X = H[_];
                    return (
                        e.each(y, function (t) {
                            t.lang &&
                                ((t.text = t.lang[X] || t.text),
                                    t.children &&
                                    e.each(t.children, function (e) {
                                        e.text = e.lang[X] || t.text;
                                    }));
                        }),
                        y
                    );
                };
            return { filter: j };
        }
    ),
    define(
        "doc/contextmenu/index",
        [
            "jquery",
            "komapping",
            "./menufilter",
            "doc/tactic/processStrategy/processStrategy",
        ],
        function (e, t, o, n) {
            var i,
                a,
                r,
                s,
                d,
                l,
                c = require("knockout"),
                u = require("durandal/app"),
                p = c.observableArray(),
                f = [],
                m = 0,
                h = c.observable(),
                g = function (t) {
                    e.ajax({
                        data: {
                            module: "WebClient",
                            fun: "GetTeamFolderInfoByTeamId",
                            TeamId: t,
                        },
                        async: !1,
                    }).done(function (e) {
                        h(e.folderInfo);
                    });
                };
            return {
                bindingComplete: function (t) {
                    (i = t), (l = e(".right-menu > .menu").clone(!0));
                    e(l);
                },
                buildMenu: function () {
                    e(l).perfectScrollbar("update").perfectScrollbar();
                },
                destroyMenu: function () {
                    if (l) {
                        var t = e(l);
                        e.data(t[0], "menu") && t.menu("destroy");
                    }
                },
                onMenuClick: function (o, i) {
                    if (
                        (i.stopImmediatePropagation(),
                            f.length && (f[0].toolparam2017 = o.text),
                            o.inline)
                    ) {
                        if (!a) return;
                        r ? a.call(r, o.command) : a();
                    } else
                        e(".right-menu > .menu").hide(),
                            "doc/folder/createoffice/index" == o.command ||
                                "doc/filetemplate/index" == o.command
                                ? n.getProcessStrategy(f, "create") ||
                                u.trigger("component:show", {
                                    moduleId: o.command,
                                    datas: f,
                                    message: s,
                                    moduleName: d,
                                })
                                : "doc/uploadAttach/index" == o.command
                                    ? u.trigger("component:show", {
                                        moduleId: "component/upload/index",
                                        datas: { masterFile: t.fromJS(f[0].data) },
                                        moduleName: "",
                                        message: "informationbarattachment:reload",
                                    })
                                    : u.trigger("component:show", {
                                        moduleId: o.command,
                                        datas: f,
                                        message: s,
                                        moduleName: d,
                                    });
                    e(l).menu("destroy");
                },
                onHidden: function (t, o) {
                    e(".right-menu > .menu").hide();
                },
                onSubmenuMouseover: function (t, o) {
                    "doc/tactic/processStrategy/processStrategy" === t.command &&
                        t.children.length > 1
                        ? e(e(o.currentTarget).children()[1])
                            .css(
                                "left",
                                e(o.currentTarget).offset().left + e(o.currentTarget).width()
                            )
                            .css(
                                "top",
                                e(o.currentTarget).offset().top - 26 * (t.children.length - 1)
                            )
                            .show()
                        : e(e(o.currentTarget).children()[1])
                            .css(
                                "left",
                                e(o.currentTarget).offset().left + e(o.currentTarget).width()
                            )
                            .css("top", e(o.currentTarget).offset().top)
                            .show();
                },
                onMouseOverMenu: function () {
                    clearTimeout(m);
                },
                onSubmenuMouseout: function (t, o) {
                    e(e(o.currentTarget).children()[1]).hide();
                },
                showMenu: function (t, n, i, l, u, v, y) {
                    (f = c.toJS(i)),
                        i[0] &&
                        i[0].isTimeList &&
                        (g(f[0].folderId),
                            (f[0].currentTeamUserType = h().currentTeamUserType)),
                        i.isTimeList &&
                        (g(f[0].data.folderId),
                            (f[0].data.currentTeamUserType = h().currentTeamUserType)),
                        (a = l),
                        (d = y),
                        (s = v),
                        (r = u);
                    var w = o.filter(f, y),
                        b = [];
                    if (0 != constInfo.getSystemType()) {
                        for (var x = 0; x < w.length; x++) {
                            var T = w[x];
                            (T.command.indexOf("goback") >= 0 ||
                                T.command.indexOf("refresh") >= 0 ||
                                T.command.indexOf("download") >= 0) &&
                                b.push(T);
                        }
                        (w = b), (w = b);
                    }
                    if (!e.isArray(w) || 0 !== w.length) {
                        p.removeAll(), p(w), this.buildMenu();
                        var I = window.innerHeight,
                            k = e(".right-menu > .menu").height(),
                            n = I > n + k ? n : I - k - 10;
                        e(".right-menu > .menu").css({ left: t, top: n, display: "block" }),
                            e(document).one("click", function () {
                                e(".right-menu > .menu").hide();
                            }),
                            (m = setTimeout(function () {
                                e(".right-menu > .menu").hide();
                            }, 1500));
                    }
                },
                getTime: function () {
                    var e = new Date();
                    return e.getSeconds() + ":" + e.getMilliseconds();
                },
                currentMenuList: p,
            };
        }
    ),
    define(
        "doc/toolbar/index",
        [
            "jquery",
            "durandal/app",
            "plugins/router",
            "durandal/events",
            "knockout",
            "komapping",
            "../contextmenu/menufilter",
            "doc/contextmenu/permtype",
            lang(),
            "doc/tactic/processStrategy/processStrategy",
            "doc/contextmenu/index",
        ],
        function (e, t, o, n, i, a, r, s, d, l, c) {
            function u(e) {
                (this.view = e),
                    (this.moreBtn = {
                        command: "more",
                        icon: "more",
                        text: d.more,
                        width: 66,
                        isActive: i.observable(!1),
                        cls: "more",
                    }),
                    (this.filterMenuData = null),
                    (this.distance = 0);
            }
            function p(e) {
                (this.name = e),
                    (this.buttonList = i.observableArray()),
                    (this.core = new u(this)),
                    (this.jqToolbar = null),
                    (this.currentDatas = []),
                    (this.message = null),
                    (this.moduleName = null),
                    this.maskHandlerId,
                    (this.isLoadSearch = !1),
                    (this.viewUrl = "doc/toolbar/index.html");
            }
            var f = 0,
                m = 0,
                h = !0,
                g = !1,
                v = null,
                y = u.prototype;
            (y.filterMenu = function (e, t) {
                var o = this;
                (o.filterMenuData = r.filter(e, t)),
                    $.each(o.filterMenuData, function (e, t) {
                        (t.isActive = i.observable(!1)),
                            "doc/recyclebin/search/index" == t.command &&
                            (t.recyclebinsearch = i.observable(""));
                    });
            }),
                (y.buildToolbar = function (e, t) {
                    function o(e) {
                        if (
                            ($.each(b, function (e, o) {
                                if (
                                    "NewMenu" == o.command ||
                                    "doc/folder/create/index" == o.command
                                ) {
                                    var n = i.observableArray([
                                        {
                                            command: "doc/folder/create/index",
                                            icon: "folder16",
                                            text: "新建文件夹",
                                            lang: {
                                                zhcn: "新建文件夹",
                                                zhtw: "新建資料夾",
                                                en: "New Folder",
                                                ja: "新規フォルダ",
                                            },
                                            entryType: [
                                                "teamcreator",
                                                "teamadmin",
                                                "teaminsider",
                                                "sysinsider",
                                                "publicroot",
                                                "personroot",
                                                "mix",
                                            ],
                                            perm: [s.createFolder],
                                            moduleType: ["template"],
                                        },
                                        {
                                            command: "doc/folder/createoffice/index",
                                            icon: "docx32",
                                            text: "Word文档",
                                            lang: {
                                                zhcn: "Word文档",
                                                zhtw: "Word檔案",
                                                en: "Word Document",
                                                ja: "Wordドキュメント",
                                            },
                                            entryType: [
                                                "teamcreator",
                                                "teamadmin",
                                                "teaminsider",
                                                "sysinsider",
                                                "publicroot",
                                                "personroot",
                                                "mix",
                                            ],
                                            perm: [s.createFolder],
                                            moduleType: ["template"],
                                        },
                                        {
                                            command: "doc/folder/createoffice/index",
                                            icon: "ppt",
                                            text: "PowerPoint文档",
                                            lang: {
                                                zhcn: "PowerPoint文档",
                                                zhtw: "PowerPoint檔案",
                                                en: "PPT Document",
                                                ja: "PowerPointファイル",
                                            },
                                            entryType: [
                                                "teamcreator",
                                                "teamadmin",
                                                "teaminsider",
                                                "sysinsider",
                                                "publicroot",
                                                "personroot",
                                                "mix",
                                            ],
                                            perm: [],
                                            moduleType: ["template"],
                                        },
                                        {
                                            command: "doc/folder/createoffice/index",
                                            icon: "excel",
                                            text: "Excel文档",
                                            lang: {
                                                zhcn: "Excel文档",
                                                zhtw: "Excel檔案",
                                                en: "Excel Document",
                                                ja: "Excelドキュメント",
                                            },
                                            entryType: [
                                                "teamcreator",
                                                "teamadmin",
                                                "teaminsider",
                                                "sysinsider",
                                                "publicroot",
                                                "personroot",
                                                "mix",
                                            ],
                                            perm: [s.createFolder],
                                            moduleType: ["template"],
                                        },
                                        {
                                            command: "doc/filetemplate/index",
                                            icon: "templet",
                                            text: "从模板新建",
                                            lang: {
                                                zhcn: "从模板新建文档",
                                                zhtw: "從範本新建檔案",
                                                en: "New from templates",
                                                ja: "テンプレートから新しいドキュメントを作成する",
                                            },
                                            entryType: [
                                                "teamcreator",
                                                "teamadmin",
                                                "teaminsider",
                                                "sysinsider",
                                                "publicroot",
                                                "personroot",
                                                "mix",
                                            ],
                                            perm: [s.createFolder],
                                            moduleType: ["teamfolder", "template"],
                                        },
                                    ]);
                                    $.each(n(), function (e, t) {
                                        switch (constInfo.getLang()) {
                                            case "en":
                                                t.text = t.lang.en;
                                                break;
                                            case "ja":
                                                t.text = t.lang.ja;
                                                break;
                                            case "zh-tw":
                                                t.text = t.lang.zhtw;
                                        }
                                    }),
                                        (o.children = n);
                                }
                                if (o.moduleType && "intag" == o.moduleType[0]) {
                                    var r = constInfo.getLang();
                                    "en" == r
                                        ? (o.text = o.lang.en)
                                        : "ja" == r
                                            ? (o.text = o.lang.ja)
                                            : "zh-tw" == r && (o.text = o.lang.zh - tw);
                                }
                                if (o)
                                    if ("preview" == t) {
                                        var d =
                                            constInfo.systemInfo.instanceConfigInfo.PreviewMenuNum;
                                        x < d ? (a.push(o), x++) : y.push(o);
                                    } else if (p < v) y.push(o);
                                    else {
                                        if (
                                            -1 != o.moduleType.indexOf("sharetome") &&
                                            -1 != o.command.indexOf("doc/delete/index")
                                        )
                                            return;
                                        a.push(o), (v = c.width()), p < v && y.push(a.pop());
                                    }
                            }),
                                y.length > 0)
                        ) {
                            if ("preview" == t) {
                                for (var o = [], n = 0; n < y.length; n++) {
                                    var r = y[n];
                                    if (r.children && r.children.length > 0) {
                                        var d = r.children;
                                        delete r.children,
                                            o.push(r),
                                            $.each(d, function (e, t) {
                                                o.push(t);
                                            });
                                    } else o.push(r);
                                }
                                y = o;
                            }
                            for (var n = 0; n < y.length; n++)
                                "cancel.png" == y[n].icon.toLowerCase() && (y[n].icon = ""),
                                    y[n].icon ||
                                    ("doc/quick/myshare/cancelshare/index" != y[n].command &&
                                        "doc/quick/mytag/removetag/index" != y[n].command) ||
                                    (y[n].icon = "cancel.png");
                            w && ((w.children = i.observableArray(w.children)), a.push(w)),
                                (e.moreBtn.children = i.observableArray(y)),
                                a.push(e.moreBtn);
                        } else
                            w && ((w.children = i.observableArray(w.children)), a.push(w));
                        if ("preview" == t) {
                            var l = c.width() + 2;
                            c.parent().width(l),
                                setTimeout(function () {
                                    $(window).resize();
                                }, 100);
                        }
                    }
                    this.filterMenu(e, t);
                    var n = this,
                        a = this.view.buttonList;
                    if (this.filterMenuData) {
                        var r = [];
                        if (0 != constInfo.getSystemType()) {
                            for (var d = 0; d < this.filterMenuData.length; d++) {
                                var l = this.filterMenuData[d];
                                (l.command.indexOf("goback") >= 0 ||
                                    l.command.indexOf("refresh") >= 0 ||
                                    l.command.indexOf("download") >= 0) &&
                                    r.push(l);
                            }
                            (this.filterMenuData = r), (n.filterMenuData = r);
                        }
                        var c = this.view.jqToolbar;
                        "preview" == t && c.parent().width(2e3);
                        var u = c.parent().width();
                        if (!(u <= 0)) {
                            var p =
                                u -
                                (c.parent().find(".docsetbar").length > 0
                                    ? c.parent().find(".docsetbar").width()
                                    : this.distance) -
                                this.moreBtn.width,
                                v = 0,
                                y = [];
                            a.removeAll(),
                                (p = window.parseInt(1 * p)),
                                $(document).width() > 1400 && (p = window.parseInt(0.8 * p));
                            for (
                                var w, b = [], x = 0, d = 0;
                                d < this.filterMenuData.length;
                                d++
                            )
                                if (
                                    "doc/tactic/processStrategy/processStrategy" ==
                                    this.filterMenuData[d].command
                                )
                                    (w = this.filterMenuData[d]), (p -= 100);
                                else {
                                    if (
                                        "mypublish" == t &&
                                        void 0 != e &&
                                        e.length > 0 &&
                                        "流程外发" == e[0].data.Publish_State &&
                                        "doc/publish/index" == this.filterMenuData[d].command
                                    )
                                        continue;
                                    b.push(this.filterMenuData[d]);
                                }
                            if (
                                this.filterMenuData[0] &&
                                "doc/quick/myrecommendList/exchange/index" ==
                                this.filterMenuData[0].command
                            ) {
                                var T = constInfo.getLang();
                                "en" == T
                                    ? (this.filterMenuData[0].text =
                                        this.filterMenuData[0].lang.en)
                                    : "ja" == T
                                        ? (this.filterMenuData[0].text =
                                            this.filterMenuData[0].lang.jp)
                                        : "zh-tw" == T &&
                                        (this.filterMenuData[0].text =
                                            this.filterMenuData[0].lang.zhtw);
                            }
                            if ("preview" == t)
                                if (
                                    h &&
                                    ((e && "share" == e[0].type) ||
                                        (e && e[0].permission & s.download) == s.download)
                                ) {
                                    var I = !!window.ActiveXObject || "ActiveXObject" in window,
                                        k = navigator.userAgent,
                                        S = k.indexOf("Firefox") > -1;
                                    if ("true" == $.getQueryString("attachment")) {
                                        var P = [];
                                        if (
                                            ($.each(b, function (e, t) {
                                                ("doc/download/index" != t.command &&
                                                    "doc/print/index" != t.command) ||
                                                    P.push(t);
                                            }),
                                                (b = P),
                                                "InWriter" == constInfo.getLicInfo().ProductType)
                                        ) {
                                            var P = [];
                                            $.each(b, function (e, t) {
                                                if (
                                                    "standard" ==
                                                    constInfo.getLicInfo().InWriterProductModel &&
                                                    "doc/informationbar/comment/quickCreate" == t.command
                                                )
                                                    return !0;
                                                "doc/localEdit/index" != t.command &&
                                                    "doc/localLocation/index" != t.command &&
                                                    "doc/localOpen/index" != t.command &&
                                                    "doc/extedit/extedit" != t.command &&
                                                    P.push(t),
                                                    (b = P);
                                            });
                                        }
                                        o(this);
                                    } else if (
                                        (I || S) &&
                                        "https:" == location.protocol.toLocaleLowerCase()
                                    ) {
                                        var C = [];
                                        if (
                                            ($.each(b, function (e, t) {
                                                "doc/localOpen/index" != t.command &&
                                                    "doc/localLocation/index" != t.command &&
                                                    "doc/localEdit/index" != t.command &&
                                                    C.push(t);
                                            }),
                                                (b = C),
                                                "InWriter" == constInfo.getLicInfo().ProductType)
                                        ) {
                                            var P = [];
                                            $.each(b, function (e, t) {
                                                if (
                                                    "standard" ==
                                                    constInfo.getLicInfo().InWriterProductModel &&
                                                    "doc/informationbar/comment/quickCreate" == t.command
                                                )
                                                    return !0;
                                                "doc/localEdit/index" != t.command &&
                                                    "doc/localLocation/index" != t.command &&
                                                    "doc/localOpen/index" != t.command &&
                                                    "doc/extedit/extedit" != t.command &&
                                                    P.push(t),
                                                    (b = P);
                                            });
                                        }
                                        o(this);
                                    } else {
                                        var F = new WebSocket("ws://127.0.0.1:54321"),
                                            D = this;
                                        if (
                                            window.location.href.toLowerCase().indexOf("sharecode") >
                                            -1 ||
                                            window.location.href.toLowerCase().indexOf("code") > -1
                                        ) {
                                            var C = [];
                                            if (
                                                ($.each(b, function (e, t) {
                                                    "doc/localOpen/index" != t.command &&
                                                        "doc/localLocation/index" != t.command &&
                                                        "doc/localEdit/index" != t.command &&
                                                        C.push(t);
                                                }),
                                                    (b = C),
                                                    "InWriter" == constInfo.getLicInfo().ProductType)
                                            ) {
                                                var P = [];
                                                $.each(b, function (e, t) {
                                                    if (
                                                        "standard" ==
                                                        constInfo.getLicInfo().InWriterProductModel &&
                                                        "doc/informationbar/comment/quickCreate" ==
                                                        t.command
                                                    )
                                                        return !0;
                                                    "doc/localEdit/index" != t.command &&
                                                        "doc/localLocation/index" != t.command &&
                                                        "doc/localOpen/index" != t.command &&
                                                        "doc/extedit/extedit" != t.command &&
                                                        P.push(t),
                                                        (b = P);
                                                });
                                            }
                                            o(this);
                                        } else
                                            (F.onopen = function () {
                                                if (((h = !1), (g = !0), 1 == ++m)) {
                                                    if (
                                                        "InWriter" == constInfo.getLicInfo().ProductType
                                                    ) {
                                                        var e = [];
                                                        $.each(b, function (t, o) {
                                                            if (
                                                                "standard" ==
                                                                constInfo.getLicInfo().InWriterProductModel &&
                                                                "doc/informationbar/comment/quickCreate" ==
                                                                o.command
                                                            )
                                                                return !0;
                                                            "doc/localEdit/index" != o.command &&
                                                                "doc/localLocation/index" != o.command &&
                                                                "doc/localOpen/index" != o.command &&
                                                                "doc/extedit/extedit" != o.command &&
                                                                e.push(o),
                                                                (b = e);
                                                        });
                                                    }
                                                    o(D);
                                                }
                                            }),
                                                (F.onerror = function (e) {
                                                    if (((h = !1), !g && 1 == ++f)) {
                                                        var t = [];
                                                        if (
                                                            ($.each(b, function (e, o) {
                                                                "doc/localOpen/index" != o.command &&
                                                                    "doc/localLocation/index" != o.command &&
                                                                    "doc/localEdit/index" != o.command &&
                                                                    t.push(o);
                                                            }),
                                                                (b = t),
                                                                "InWriter" == constInfo.getLicInfo().ProductType)
                                                        ) {
                                                            var n = [];
                                                            $.each(b, function (e, t) {
                                                                if (
                                                                    "standard" ==
                                                                    constInfo.getLicInfo()
                                                                        .InWriterProductModel &&
                                                                    "doc/informationbar/comment/quickCreate" ==
                                                                    t.command
                                                                )
                                                                    return !0;
                                                                "doc/localEdit/index" != t.command &&
                                                                    "doc/localLocation/index" != t.command &&
                                                                    "doc/localOpen/index" != t.command &&
                                                                    "doc/extedit/extedit" != t.command &&
                                                                    n.push(t),
                                                                    (b = n);
                                                            });
                                                        }
                                                        o(D);
                                                    }
                                                });
                                    }
                                } else {
                                    if (
                                        ((e && e[0].permission & s.preview) != s.preview &&
                                            (("doc/favorite/index" != b[0].command &&
                                                "doc/unfavorite/index" != b[0].command) ||
                                                b.shift(0, 1)),
                                            !g)
                                    ) {
                                        var C = [];
                                        $.each(b, function (e, t) {
                                            "doc/localOpen/index" != t.command &&
                                                "doc/localLocation/index" != t.command &&
                                                "doc/localEdit/index" != t.command &&
                                                C.push(t);
                                        }),
                                            (b = C);
                                    }
                                    if ("InWriter" == constInfo.getLicInfo().ProductType) {
                                        var P = [];
                                        $.each(b, function (e, t) {
                                            if (
                                                "standard" ==
                                                constInfo.getLicInfo().InWriterProductModel &&
                                                "doc/informationbar/comment/quickCreate" == t.command
                                            )
                                                return !0;
                                            "doc/localEdit/index" != t.command &&
                                                "doc/localLocation/index" != t.command &&
                                                "doc/localOpen/index" != t.command &&
                                                "doc/extedit/extedit" != t.command &&
                                                P.push(t),
                                                (b = P);
                                        });
                                    }
                                    o(this);
                                }
                            else {
                                if ("InWriter" == constInfo.getLicInfo().ProductType) {
                                    var P = [];
                                    $.each(b, function (e, t) {
                                        if (
                                            "standard" ==
                                            constInfo.getLicInfo().InWriterProductModel &&
                                            "doc/informationbar/comment/quickCreate" == t.command
                                        )
                                            return !0;
                                        "doc/localEdit/index" != t.command &&
                                            "doc/localLocation/index" != t.command &&
                                            "doc/localOpen/index" != t.command &&
                                            "doc/extedit/extedit" != t.command &&
                                            P.push(t),
                                            (b = P);
                                    });
                                }
                                o(this);
                            }
                        }
                    }
                });
            var w = p.prototype;
            return (
                (w.reNameForMore = function () {
                    this.core.moreBtn.text = d.moreOpt;
                }),
                (w.activate = function () { }),
                (w.compositionComplete = function (e, t, o) {
                    this.jqToolbar = $(e);
                }),
                (w.detached = function () { }),
                (w.onSubmenuMouseover = function (e, t) {
                    if ($(t.currentTarget).children("div").get(0)) {
                        $(t.currentTarget).offset().left,
                            $(t.currentTarget).width(),
                            $(t.currentTarget).offset().top;
                        (v = $(t.currentTarget)),
                            $($(t.currentTarget).children("div").get(0)).show();
                    }
                }),
                (w.onSubmentMouseout = function (e, t) {
                    $(t.currentTarget).children("div").get(0) &&
                        $($(t.currentTarget).children("div").get(0)).hide();
                }),
                (w.refreshData = function (e) {
                    if (e) {
                        var o = this;
                        if (
                            ((o.currentDatas = e.select),
                                (o.message = e.message),
                                (o.moduleName = e.module),
                                !o.isLoadSearch)
                        ) {
                            window.location.hash.indexOf("search") >= 0 &&
                                ((o.currentDatas[0].data.searchroot = !0),
                                    t.trigger("search:get-toolbar-selected-items", e)),
                                (o.isLoadSearch = !0);
                        }
                        o.core.buildToolbar(o.currentDatas, o.moduleName), o.reload();
                    }
                }),
                (w.reLoadSize = function () {
                    if (this.name) {
                        var e = new RegExp(this.name, "gi"),
                            t = o.activeInstruction().config.moduleId;
                        e.test(t) &&
                            this.core.buildToolbar(this.currentDatas, this.moduleName);
                    } else this.core.buildToolbar(this.currentDatas, this.moduleName);
                }),
                (w.doCommand = function (e, o) {
                    o.stopPropagation(), c.onHidden();
                    var n = this;
                    if (
                        "more" !== e.command &&
                        "NewMenu" !== e.command &&
                        (!this.maskHandlerId ||
                            "doc/goback/index" === e.command ||
                            "outpublish/plugins/back/index" === e.command ||
                            "more" === e.command)
                    ) {
                        this.currentDatas.length &&
                            (this.currentDatas[0].toolparam2017 = e.text),
                            (this.maskHandlerId = 1);
                        "doc/tactic/processStrategy/processStrategy" === e.command &&
                            ("create.png" == e.icon && (this.currentDatas.action = "create"),
                                "update.png" == e.icon && (this.currentDatas.action = "update"),
                                "delete.png" == e.icon && (this.currentDatas.action = "delete"),
                                "attribute.png" == e.icon &&
                                (this.currentDatas.action = "attribute"));
                        var i = require("knockout").$store.state.curentModule();
                        if (
                            "doc/folder/createoffice/index" == e.command ||
                            "doc/filetemplate/index" == e.command
                        )
                            if (i && "favoritelist" === i.module) {
                                var r = l.IsProcessStrategy(this.currentDatas, 1);
                                r.IsProcessStrategy
                                    ? t.trigger("message:show", {
                                        type: "error",
                                        message: d.ProcessEnabled,
                                    })
                                    : t.trigger("component:show", {
                                        moduleId: e.command,
                                        datas: this.currentDatas,
                                        message: this.message,
                                        moduleName: this.moduleName,
                                    });
                            } else
                                i && "enterprise" === i.module
                                    ? l.getProcessStrategy(this.currentDatas, "create") ||
                                    t.trigger("component:show", {
                                        moduleId: e.command,
                                        datas: this.currentDatas,
                                        message: this.message,
                                        moduleName: this.moduleName,
                                    })
                                    : t.trigger("component:show", {
                                        moduleId: e.command,
                                        datas: this.currentDatas,
                                        message: this.message,
                                        moduleName: this.moduleName,
                                    });
                        else
                            "doc/uploadAttach/index" == e.command
                                ? t.trigger("component:show", {
                                    moduleId: "component/upload/index",
                                    datas: { masterFile: a.fromJS(this.currentDatas[0].data) },
                                    moduleName: "",
                                    message: "informationbarattachment:reload",
                                })
                                : "doc/recyclebin/search/index" == e.command
                                    ? t.trigger("recyclebin:list")
                                    : t.trigger("component:show", {
                                        moduleId: e.command,
                                        datas: this.currentDatas,
                                        message: this.message,
                                        moduleName: this.moduleName,
                                    });
                        setTimeout(function () {
                            n.maskHandlerId = 0;
                        }, 1e3);
                    }
                }),
                (w.submenuMouseover = function (e, t) {
                    if (
                        (e.isActive(!0),
                            ("function" != typeof e.children || 0 !== e.children().length) &&
                            ($($(t.currentTarget).children()[1]).show(),
                                $(t.currentTarget).find(".threeChildren")))
                    ) {
                        var o =
                            $(t.currentTarget).offset().left +
                            $($(t.currentTarget).children()[1]).width(),
                            n = $(t.currentTarget).offset().top;
                        v && (n = v.offset().top),
                            $(t.currentTarget)
                                .find(".threeChildren")
                                .css("left", o)
                                .css("top", n);
                    }
                }),
                (w.submenuMouseout = function (e, t) {
                    e.isActive(!1), $($(t.currentTarget).children()[1]).hide();
                }),
                (w.reload = function () {
                    t.trigger("component:show", {
                        moduleId: void 0,
                        datas: this.currentDatas,
                        message: this.message,
                        moduleName: this.moduleName,
                    });
                }),
                {
                    createToolbar: function (e) {
                        var t = new p(e);
                        return n.includeIn(t), t;
                    },
                }
            );
        }
    ),
    define(
        "doc/informationbar/formatdatabytype",
        ["require", "jquery", "header/userinfo/constinfo", lang()],
        function (e, t, o, n) {
            function i() { }
            function a() { }
            function r() { }
            function s() {
                this.providers = {
                    singleFolder: new i(),
                    singleFile: new a(),
                    composed: new r(),
                };
            }
            return (
                (i.prototype.format = function (e) {
                    var o = "",
                        i = "",
                        a = 0,
                        r = 0,
                        s = "";
                    return (
                        window._currentFolder &&
                        ((o = window._currentFolder.createTime),
                            (i = window._currentFolder.modifyTime),
                            (a = window._currentFolder.childFileCount),
                            (r = window._currentFolder.childFolderCount),
                            (s = window._currentFolder.remark)),
                        (e.createTimeV = t.dateFormat(e.createTime || o)),
                        (e.modifyTimeV = t.dateFormat(e.modifyTime || i)),
                        (e.conclude = t.format(
                            n.conclude,
                            e.childFileCount || a,
                            e.childFolderCount || r
                        )),
                        (e.showBtnCalculate = !0),
                        (e.showProcessBar = !1),
                        (e.showUsedSize = !1),
                        (e.folderUsedSize = -1),
                        (e.secName = ""),
                        (e.remark = e.remark || s),
                        t.each(constInfo.sercurityLevel(), function (t, o) {
                            (e.securityLevelId || e.securityLevel) == o.SecLevelId &&
                                (e.secName = o.SecLevelName);
                        }),
                        e
                    );
                }),
                (a.prototype.format = function (e) {
                    if (
                        ((e.createTimeV = e.createTime),
                            (e.modifyTimeV = e.modifyTime),
                            "string" == typeof e.createTime &&
                            e.createTime.toLowerCase().indexOf("date") > -1 &&
                            (e.createTimeV = t.dateFormat(e.createTime)),
                            "string" == typeof e.modifyTime &&
                            e.modifyTime.toLowerCase().indexOf("date") > -1 &&
                            (e.modifyTimeV = t.dateFormat(e.modifyTime)),
                            0 == e.state
                                ? ((e.stateDesc = n.norm),
                                    (e.showStatePic = !1),
                                    (e.LockTip = ""))
                                : 2 == e.state
                                    ? ((e.stateDesc = n.uploading),
                                        (e.showStatePic = !0),
                                        (e.LockTip = ""))
                                    : 1024 == e.state
                                        ? ((e.stateDesc = n.metadataMaintenance),
                                            (e.showStatePic = !1),
                                            (e.LockTip = ""))
                                        : 4 == e.state || 512 == e.state
                                            ? ((e.stateDesc = n.lock),
                                                (e.showStatePic = !0),
                                                512 == e.state && (e.stateDesc = n.editing),
                                                (e.currentOperator || e.editorName) &&
                                                    (e.archiveTime || e.checkOutTime)
                                                    ? (e.LockTip =
                                                        (e.currentOperator || e.editorName) +
                                                        n.lockIn +
                                                        (e.archiveTime
                                                            ? constInfo.getDateInterval(e.archiveTime)
                                                            : constInfo.getDateInterval(e.checkOutTime)))
                                                    : (e.LockTip = ""))
                                            : (e.LockTip = ""),
                            /^[0-9]+.?[0-9]*$/.test(e.size)
                                ? (e.size = constInfo.formatSize(e.size) || "")
                                : (e.size = e.size || ""),
                            (e.FileSecurityscan = e.FileSecurityscan || 0),
                            e.FileSecurityscan > 0)
                    ) {
                        var i = o.getSysConfigInfo().securityScanEngineList,
                            a = [];
                        if (i) {
                            for (var r = 0; r < i.length; r++) {
                                var s = i[r];
                                (e.FileSecurityscan & s.Engine) > 0 && a.push(s.Name);
                            }
                            e.fileSecurityscanDesc = n.securityScan2;
                        }
                    }
                    switch (e.FileSecurityscan) {
                        case -1:
                            e.fileSecurityscanDesc = n.securityScan0;
                            break;
                        case 0:
                            e.fileSecurityscanDesc = n.securityScan1;
                            break;
                        case -10:
                            e.fileSecurityscanDesc = n.securityScan3;
                    }
                    return e;
                }),
                (r.prototype.format = function (e) {
                    var o = 0,
                        i = 0,
                        a = 0;
                    t.each(e, function (e, t) {
                        1 == t.data.type || 1 == t.data.fvType || 1 == t.data.folderType
                            ? o++
                            : 2 == t.data.type || 2 == t.data.fileType
                                ? i++
                                : a++;
                    });
                    var r = o + i + a,
                        s = t.format(n.chooseNum, r);
                    return { folder: o, file: i, other: a, all: s };
                }),
                (s.prototype.formate = function (e) {
                    var t,
                        o = 1,
                        n = null;
                    e.select && 1 == e.select.length
                        ? (t = e.select[0])
                        : e.select
                            ? ((t = e.select), (o = 2))
                            : ((t = e), (n = e));
                    var i;
                    return (
                        1 == o
                            ? (t.data && (n = t.data),
                                n && n.data && null != n.data && (n = n.data),
                                (null !== n.folderType) & (void 0 !== n.folderType) &&
                                n.folderType >= -1 &&
                                n.folderType <= 1 &&
                                ((n.teamTotalCount = e.teamTotalCount),
                                    (i = this.providers.singleFolder)),
                                void 0 != n.fileType &&
                                2 == n.fileType &&
                                (i = this.providers.singleFile),
                                void 0 != n.fileType &&
                                32 == n.fileType &&
                                (i = this.providers.singleFile))
                            : ((i = this.providers.composed),
                                (n = t),
                                (i = this.providers.composed)),
                        i ? i.format(n) : n
                    );
                }),
                s
            );
        }
    ),
    define(
        "doc/informationbar/service",
        ["knockout", "header/userinfo/constinfo", "./formatdatabytype"],
        function (e, t, o) {
            function n() {
                (this.formatdataProvider = new o()),
                    (this.blockPaths = {
                        teamInfo: "team/index",
                        matedataInfo: "meta/index",
                        flowInfo: "workfolw/index",
                        historyFile: "historyfile/index",
                        attachFile: "relativefile/index",
                        accessory: "attachment/index",
                        commentsAndAnnotation: "comment/index",
                        teamLog: "teamlog/index",
                        teamnotice: "teamnotice/index",
                        basicInfo: "basicinfo/{0}/index",
                    });
            }
            var i = n.prototype;
            (i.getBlockPath = function (e) {
                var o = e.name,
                    n = this.blockPaths[o];
                n = "doc/informationbar/" + (n || o + "/index");
                var i = t.getAllRightSidePanelList(e.id, n);
                return i || n;
            }),
                (i.getNamePath = function (e) {
                    return $.ajax({
                        async: !1,
                        data: { module: "WebClient", fun: "GetFolderPath", folderId: e },
                    });
                }),
                (i.getAllInfoBar = function (t) {
                    var o = new $.Deferred(),
                        n = {
                            module: "SystemManager",
                            fun: "GetAllInfoBar",
                            token: getTokenByCondition(),
                        };
                    return (
                        t && (n.code = t),
                        $.ajax({ data: n })
                            .done(function (t) {
                                for (
                                    var n = t.InfoBarList.sort(function (e, t) {
                                        return e.sort > t.sort ? -1 : 1;
                                    }),
                                    i = [],
                                    a = $.getLan(),
                                    r = 0;
                                    r < n.length;
                                    r++
                                )
                                    a && "ja" == a
                                        ? (n[r].title = n[r].jp)
                                        : a && "zh-tw" == a
                                            ? (n[r].title = n[r].zhtw)
                                            : a && "en" == a && (n[r].title = n[r].en);
                                for (var r = 0; r < n.length; r++)
                                    i.push({
                                        id: n[r].id,
                                        name: n[r].name.slice(0),
                                        show: n[r].show,
                                        sort: n[r].sort,
                                        title: n[r].title.slice(0),
                                        iscustom: n[r].iscustom,
                                        classname: n[r].classname.slice(0),
                                        isActive: e.observable(!1),
                                    });
                                (i = i.sort(function (e, t) {
                                    return e.sort < t.sort ? -1 : 1;
                                })),
                                    o.resolve(i);
                            })
                            .fail(function (e) {
                                o.reject(e);
                            }),
                        o.promise()
                    );
                }),
                (i.GetTypeRightSidePanelList = function (e) {
                    var t = {
                        module: "WebClient",
                        fun: "GetTypeRightSidePanelList",
                        type: e,
                    };
                    $.ajax({ async: !1, data: t }).done(function (e) {
                        return e.list;
                    });
                }),
                (i.calculateSpaceSize = function (e) {
                    var o = new $.Deferred(),
                        n = 0,
                        i = "",
                        a = t.getCurrentPlace();
                    if (1 != e.fileType) return void o.reject();
                    var r,
                        s = "GetFolderSizeChildCount";
                    return (
                        e.name == lang.recyleBin
                            ? ((s = "GetDeleteFolderSizeChildCount"), (i = a[0]), (n = a[1]))
                            : ((n = e.id),
                                e.deletedBy && (s = "GetDeleteFolderSizeChildCount")),
                        $.ajax({
                            data: {
                                module: "WebClient",
                                fun: s,
                                folderId: n,
                                path: i,
                                token: getTokenByCondition(),
                            },
                        }).done(function (e) {
                            e &&
                                void 0 !== e.folderSize &&
                                ((r = {
                                    folderSize: e.folderSize,
                                    childFolderCurr: e.childFolderCurr,
                                    childFileCurr: e.childFileCurr,
                                }),
                                    o.resolve(r));
                        }),
                        o.promise()
                    );
                }),
                (i.formatDateTime = function (e) {
                    var t = e.getMonth() + 1,
                        o = e.getDate();
                    return (
                        t >= 1 && t <= 9 && (t = "0" + t),
                        o >= 0 && o <= 9 && (o = "0" + o),
                        e.getFullYear() +
                        "-" +
                        t +
                        "-" +
                        o +
                        " " +
                        e.getHours() +
                        ":" +
                        e.getMinutes() +
                        ":" +
                        e.getSeconds()
                    );
                }),
                (i.formateData = function (e) {
                    return this.formatdataProvider.formate(e);
                }),
                (i.getEntityTypeNorm = function (e) {
                    var t = { type: null, ishide: null },
                        o = constInfo.getTeamTopFolderId();
                    if (1 != e.select.length) {
                        if (e.select.length > 1)
                            if (i && i.parentFolderId == o) t.type = "topteam";
                            else
                                for (var n = 1; n < e.select.length; n++)
                                    if (e.select[0].data.fileType) {
                                        if (!e.select[n].data.fileType) {
                                            t.type = "composed";
                                            break;
                                        }
                                        t.type = "multiplefiles";
                                    } else {
                                        if (e.select[n].data.fileType) {
                                            t.type = "composed";
                                            break;
                                        }
                                        t.type = "multiplefolders";
                                    }
                        else if ("mylock" == e.module) t.type = "mylockinfo";
                        else if (e.select.data && e.select.data.data.id == o)
                            t.type = "topteam";
                        else
                            for (var n = 1; n < e.select.length; n++)
                                if (e.select[0].data.fileType) {
                                    if (!e.select[n].data.fileType) {
                                        t.type = "composed";
                                        break;
                                    }
                                    t.type = "multiplefiles";
                                } else {
                                    if (e.select[n].data.fileType) {
                                        t.type = "composed";
                                        break;
                                    }
                                    t.type = "multiplefolders";
                                }
                        return t;
                    }
                    var i = null;
                    return (
                        e.select[0] && e.select[0].data && (i = e.select[0].data),
                        e.select[0] && i && i.data,
                        i &&
                            (null !== i.folderType) & (void 0 !== i.folderType) &&
                            i.folderType >= -1 &&
                            i.folderType <= 1
                            ? ((t.type = "singlefolder"),
                                i.parentFolderId == o &&
                                (i.id != o ? (t.type = "team") : (t.type = "topteam")),
                                i.fromquick && 1 == i.fromquick
                                    ? ((t.ishide = 1), t)
                                    : (i.parentFolderId == o &&
                                        (i.id != o ? (t.type = "team") : (t.type = "topteam")),
                                        t))
                            : i && i.fileType
                                ? 32 == i.fileType
                                    ? (i && i.shortcut && 1 == i.shortcut.entryType
                                        ? (t.type = "singlefolder")
                                        : (t.type = "singlefile"),
                                        t)
                                    : ((t.type = "singlefile"),
                                        i.fromquick && 1 == i.fromquick ? ((t.ishide = 1), t) : t)
                                : i && i && (i.fvId || 0 === i.fvId)
                                    ? ((t.type = "singlecoll"), (t.ishide = 1), t)
                                    : i && i && "sharefilelist" == i.module
                                        ? ((t.type = "singleshare"), (t.ishide = !1), t)
                                        : i && i && i.folderType && -1 == i.folderType
                                            ? (i.parentFolderId == o
                                                ? i.id != o
                                                    ? (t.type = "team")
                                                    : (t.type = "topteam")
                                                : "team" == e.module && (t.type = "team"),
                                                i.parentFolderId == o
                                                    ? i.id == o
                                                        ? (t.type = "topteam")
                                                        : (t.type = "team")
                                                    : "team" == e.module && (t.type = "singlefolder"),
                                                "recyclebinlist" == e.module && (t.type = "singlefolder"),
                                                t)
                                            : i && void 0 != i.folderType
                                                ? ((t.type = "singlefolder"), t)
                                                : void 0
                    );
                });
            return (
                (i.getEntityType = function (e, t) {
                    var o, n;
                    if (
                        (e.select &&
                            e.select[0] &&
                            e.select[0].data &&
                            ((o = e.select[0].data),
                                "sharetome" == e.module && o.isHasFiles
                                    ? (n = { type: "singleshare", ishide: !1 })
                                    : null != o.fvId && 1 == o.fvType
                                        ? (n = { type: "singlecoll", ishide: !1 })
                                        : o.mylock && (n = { type: null, ishide: !1 })),
                            (t.isInOutpublish() || t.isInPublishPreview()) &&
                            ((n = { type: "composed", ishide: !1 }),
                                e.select && 1 == e.select.length))
                    ) {
                        var i = e.select[0].data;
                        i.folderType && (n.type = "publishfolder"),
                            i.fileType && (n.type = "publishfile");
                    }
                    return n || (n = this.getEntityTypeNorm(e)), n;
                }),
                (i.wrapData = function (e, t) {
                    e &&
                        ((e.useCountCalculate = constInfo.useCountCalculateFn(
                            e.maxFolderSize,
                            e.size
                        )),
                            (e.useRateCalculate = constInfo.useRateCalculate(
                                e.maxFolderSize,
                                e.size
                            )),
                            void 0 !== t.select.teamUser
                                ? ((e.teamId = t.select[0].data.teamId),
                                    (e.teamUser = t.select.teamUser))
                                : void 0 !== t.select[0] &&
                                void 0 !== t.select[0].teamUser &&
                                (t.select[0].data.teamId &&
                                    (e.teamId = t.select[0].data.teamId),
                                    t.select[0].teamUser &&
                                    ((e.teamUser = t.select[0].teamUser),
                                        (e.teamId = t.select[0].teamUser[0].TeamId))),
                            void 0 !== e.fileType && (e.testtype = 2),
                            void 0 !== e.folderType && (e.testtype = 1),
                            1 == e.id
                                ? (e.showQcCode = !1)
                                : e.folderType && -1 == e.folderType
                                    ? (e.showQcCode = !1)
                                    : void 0 != e.path && this.filterPath(e.path.replace(/\\/g, "_"))
                                        ? (e.showQcCode = !1)
                                        : void 0 != e && (e.showQcCode = !0));
                }),
                (i.filterPath = function (e) {
                    if (void 0 == e) return !1;
                    if (e.indexOf("2_") > -1) {
                        if (2 == e.split("_").length) return !0;
                    }
                    return !1;
                }),
                n
            );
        }
    ),
    define(
        "doc/informationbar/gmpAnnotation",
        ["knockout", "header/userinfo/constinfo", lang()],
        function (e, t, o) {
            function n() {
                (this.annotations = {}),
                    (this.hiddenAnnotation = !1),
                    (this.annotationInvokeError = !1),
                    (this.commentInvokeError = !1),
                    (this.annotationInvokeErrorCode = 200),
                    (this.commentInvokeErrorCode = 200);
            }
            var i = new n(),
                a = n.prototype;
            if (
                ((a.isGMP = function () {
                    return constInfo.systemInfo.instanceConfigInfo.EnableGMP;
                }),
                    (a.isInvokeError = function (e) {
                        if (this.isGMP())
                            if ("annotation" === e) {
                                if (this.annotationInvokeError)
                                    return $.messager.alert(o.error, o.invokeErrMsg, "error"), !0;
                            } else if ("comment" === e && this.commentInvokeError)
                                return $.messager.alert(o.error, o.invokeErrMsg, "error"), !0;
                        return !1;
                    }),
                    i.isGMP())
            )
                if (window.location.search.toLowerCase().indexOf("incident") > 0) {
                    var r = $.getQueryString("fileVerId"),
                        s = $.getQueryString("fileId"),
                        d = $.getQueryString("incident"),
                        l = constInfo.userInfo.guid;
                    (s = s || 0), (r = r || 0);
                    var c = "";
                    constInfo.systemInfo.instanceConfigInfo &&
                        constInfo.systemInfo.instanceConfigInfo
                            .GMPAnnotationPermissionAPI &&
                        (c =
                            constInfo.systemInfo.instanceConfigInfo
                                .GMPAnnotationPermissionAPI),
                        c || ((i.hiddenAnnotation = !1), (i.annotationInvokeError = !0)),
                        $.ajax({
                            type: "get",
                            async: !1,
                            url: c,
                            data: { FileId: s, FileVerId: r, UserId: l, Incident: d },
                        }).then(
                            function (e) {
                                200 === e.code
                                    ? ((i.hiddenAnnotation = !e.data.annotate),
                                        (i.annotations = e.data.annotations),
                                        (i.annotationInvokeError = !1),
                                        (i.annotationInvokeErrorCode = 200))
                                    : ((i.hiddenAnnotation = !1),
                                        (i.annotationInvokeError = !0),
                                        (i.annotationInvokeErrorCode = e.code));
                            },
                            function (e) {
                                (i.hiddenAnnotation = !1), (i.annotationInvokeError = !0);
                            }
                        );
                } else
                    (i.hiddenAnnotation = !0),
                        (i.annotations = []),
                        (i.annotationInvokeError = !1),
                        (i.annotationInvokeErrorCode = 200);
            return (
                (a.getGMPCommentHidden = function (e) {
                    that = this;
                    var t = { hiddenComment: !1, comments: [] };
                    if (this.isGMP())
                        if (window.location.search.toLowerCase().indexOf("incident") > 0) {
                            var o = $.getQueryString("fileVerId"),
                                n = $.getQueryString("fileId"),
                                i = $.getQueryString("incident"),
                                a = constInfo.userInfo.guid;
                            (n = n || 0), (o = o || 0);
                            var r = "";
                            constInfo.systemInfo.instanceConfigInfo &&
                                constInfo.systemInfo.instanceConfigInfo
                                    .GMPCommentPermissionAPI &&
                                (r =
                                    constInfo.systemInfo.instanceConfigInfo
                                        .GMPCommentPermissionAPI),
                                r || ((that.commentInvokeError = !0), (t.hiddenComment = !1)),
                                $.ajax({
                                    type: "get",
                                    async: !1,
                                    url: r,
                                    data: {
                                        FileId: n,
                                        FileVerId: o,
                                        UserId: a,
                                        Incident: i,
                                        AnnotationId: e,
                                    },
                                }).then(
                                    function (e) {
                                        console.log(e),
                                            200 === e.code
                                                ? ((t.hiddenComment = !e.data.comment),
                                                    (t.comments = e.data.comments),
                                                    (that.commentInvokeError = !1),
                                                    (that.commentInvokeErrorCode = 200))
                                                : ((that.commentInvokeError = !0),
                                                    (that.commentInvokeErrorCode = e.code),
                                                    (t.hiddenComment = !1));
                                    },
                                    function (e) {
                                        (t.hiddenComment = !1), (that.commentInvokeError = !1);
                                    }
                                );
                        } else
                            (t.hiddenComment = !0),
                                (t.comments = []),
                                (that.commentInvokeError = !1),
                                (that.commentInvokeErrorCode = 200);
                    return t;
                }),
                i
            );
        }
    ),
    define(
        "doc/informationbar/index",
        [
            "require",
            "knockout",
            "komapping",
            "scrollbar",
            "durandal/app",
            "underscore",
            "jquery",
            lang(),
            "header/userinfo/constinfo",
            "./service",
            "./gmpAnnotation",
        ],
        function (
            require,
            ko,
            komapping,
            scrollbar,
            app,
            _,
            $,
            lang,
            constinfo,
            Service,
            gmpAnnotation
        ) {
            function InfoBarCollapsing(e) {
                (this.view = e), (this.defaultPanelWidth = 300);
            }
            function addPropStateDesc(e) {
                var t = lang["DocState" + e.state];
                e.stateDesc = t;
            }
            function InformationBar() {
                (this.activationData = {
                    isInRecycle: ko.observable(!1),
                    isInOutpublish: ko.observable(!1),
                    isInPreview: ko.observable(!1),
                    isInPublishPreview: ko.observable(!1),
                }),
                    (this.activeView = ko.observable()),
                    (this.isActive = ko.observable()),
                    (this.InfobarItems = ko.observableArray()),
                    (this.objType = ko.observable()),
                    (this.initData = ko.observable()),
                    (this.infoWidth = ko.observable(300)),
                    (this.isurlconfig = ko.observable(!1)),
                    (this.urladdress = ko.observable()),
                    this.BaseItemValues,
                    (this.PreviewPageFilterItemValues = []),
                    (this.infobarStatus = rightPanelState),
                    (this.permission = { canDown: ko.observable(!0) }),
                    this.jRightPanel,
                    this.jLeftPanel,
                    this.currentModule,
                    (this.modulesCache = []),
                    (this.service = new Service()),
                    (this.infobarCollapsing = new InfoBarCollapsing(this));
            }
            var rightPanelState = ko.observable(!1),
                icPt = InfoBarCollapsing.prototype;
            (icPt.init = function () {
                var that = this;
                app.on("informationbar:toggleinformationBar").then(function (e) {
                    if (e && e.isRecall) {
                        var t = require("knockout").$store.state.curentModule();
                        "enterprise" == t.module
                            ? $.cookie("enterpriseRightPanelType", !rightPanelState())
                            : "team" == t.module
                                ? $.cookie("teamRightPanelType", !rightPanelState())
                                : "person" == t.module &&
                                $.cookie("personRightPanelType", !rightPanelState());
                    }
                    if (e && 0 == e.type) return void that.toggleRightPanel(!1);
                    if (e && 1 == e.type) return void that.toggleRightPanel(!0);
                    if (
                        (e &&
                            3 == e.type &&
                            activeView("doc/informationbar/teaminfo/index"),
                            e && 4 == e.type)
                    ) {
                        that.view.clearAllSelected();
                        var o = that.view.BaseItemValues.filter(function (e) {
                            return "historyFile" === e.name;
                        });
                        return (
                            (o[0].entityType = "singlefile"),
                            o[0].isActive(!0),
                            (that.view.currentModule = o[0]),
                            that.view.loadCurrentModule(),
                            void that.toggleRightPanel(!0)
                        );
                    }
                    e &&
                        5 == e.type &&
                        (that.view.activeView(null),
                            that.view.activeView("doc/informationbar/comment/index"),
                            (that.view.activationData.command = "locate"),
                            (that.view.activationData.annotation = e.annotation)),
                        e &&
                        6 == e.type &&
                        (that.view.activeView(null),
                            that.view.activeView("doc/informationbar/comment/index"),
                            (that.view.activationData.command = "quickCreate"),
                            (that.view.activationData.capture = e.capture)),
                        that.toggleRightPanel(),
                        $(".document-list-body").perfectScrollbar("update");
                }),
                    this.view.jRightPanel.resizable({
                        onResize: function () {
                            that.setSize($(this).width());
                        },
                        onStopResize: function () {
                            that.view.jRightPanel.width() < 100 && that.setSize(0),
                                that.view.infoWidth(that.view.jRightPanel.width());
                        },
                        edge: 5,
                        maxWidth: 500,
                        minWidth: 99,
                        handles: "w",
                    }),
                    $(window).on("resize.docpanel", function () {
                        var curentModule = require("knockout").$store.state.curentModule(),
                            type = 0;
                        if (curentModule)
                            if ("enterprise" == curentModule.module) {
                                var enterpriseRightPanelType = eval(
                                    $.cookie("enterpriseRightPanelType")
                                );
                                null != enterpriseRightPanelType &&
                                    (type = enterpriseRightPanelType ? 1 : 0);
                            } else if ("team" == curentModule.module) {
                                var teamRightPanelType = eval($.cookie("teamRightPanelType"));
                                null != teamRightPanelType &&
                                    (type = teamRightPanelType ? 1 : 0);
                            } else if ("person" == curentModule.module) {
                                var personRightPanelType = eval(
                                    $.cookie("personRightPanelType")
                                );
                                null != personRightPanelType &&
                                    (type = personRightPanelType ? 1 : 0);
                            } else
                                type =
                                    curentModule.hash &&
                                        "quick/mytag" == curentModule.hash &&
                                        $(".icon-toright-selected").length > 0
                                        ? 1
                                        : 0;
                        else type = 0;
                        var rightPanelWidth = $(".right-panel").width();
                        curentModule &&
                            curentModule.hash &&
                            ("quick/myshareme" == curentModule.hash ||
                                "quick/myfavorite" == curentModule.hash) &&
                            rightPanelWidth > 0 &&
                            (type = 1),
                            1 == type ? that.setSize(300) : that.setSize(0);
                    });
            }),
                (icPt.toggleRightPanel = function (e) {
                    return 0 == e
                        ? void this.setSize(0)
                        : 1 == e
                            ? void (0 == this.view.infoWidth()
                                ? (this.setSize(this.defaultPanelWidth),
                                    this.view.infoWidth(this.defaultPanelWidth))
                                : this.setSize(this.view.infoWidth()))
                            : void (this.view.jRightPanel.width() > 0
                                ? this.setSize(0)
                                : (0 == this.view.infoWidth()
                                    ? (this.setSize(this.defaultPanelWidth),
                                        this.view.infoWidth(this.defaultPanelWidth))
                                    : this.setSize(this.view.infoWidth()),
                                    "doc/informationbar/basicinfo/singlefile/index" ==
                                    this.view.__moduleId__ &&
                                    app.trigger("infobartaglist:reload", {
                                        id: this.view.initData().id(),
                                        force: !0,
                                    })));
                }),
                (icPt.setSize = function (e) {
                    0 == e
                        ? ($(".icon-toright")
                            .removeClass("icon-toright-selected")
                            .addClass("icon-toright"),
                            this.view.infobarStatus(!1),
                            app.trigger("hidehotword", !1))
                        : ($(".icon-toright")
                            .removeClass("icon-torigh")
                            .addClass("icon-toright-selected"),
                            this.view.infobarStatus(!0),
                            app.trigger("hidehotword", !0)),
                        this.view.jRightPanel
                            .width(e)
                            .css(
                                "left",
                                $(window).width() -
                                this.view.jLeftPanel.outerWidth() -
                                e -
                                $(".leftNavList").width()
                            ),
                        this.view.jRightPanel
                            .prev()
                            .css("right", this.view.jRightPanel.width()),
                        app.trigger("singlefolder:index", { type: !0 });
                });
            var inforBarPt = InformationBar.prototype;
            return (
                (inforBarPt.getShowModules = function (e, t, o, n) {
                    for (
                        var i = [], e = e.infobarlist, a = 0;
                        a < this.BaseItemValues.length;
                        a++
                    ) {
                        var r = this.BaseItemValues[a];
                        if (!(this.PreviewPageFilterItemValues.indexOf(r.name) > -1))
                            for (var s = 0; s < e.length; ++s)
                                if (e[s].toLowerCase() == r.name.toLowerCase() && r.show) {
                                    var d = $.extend({}, r);
                                    (d.entityType = t),
                                        "person" == o || "team" == o
                                            ? "matedataInfo" != r.name && i.push(d)
                                            : i.push(d);
                                }
                    }
                    if (0 == i.length) return i;
                    var l = !1;
                    if (this.currentModule)
                        for (var a = 0; a < i.length; ++a)
                            this.currentModule.name.toLowerCase() ==
                                i[a].name.toLowerCase() &&
                                (i[a].isActive(!0), (this.currentModule = i[a]), (l = !0));
                    return l || (i[0].isActive(!0), (this.currentModule = i[0])), i;
                }),
                (inforBarPt.clearAllSelected = function () {
                    for (var e = this.InfobarItems(), t = 0; t < e.length; ++t)
                        e[t].isActive(!1);
                }),
                (inforBarPt.getModulePath = function (e) {
                    var t = this.service.getBlockPath(e);
                    return (
                        "basicinfo" == e.name.toLowerCase() &&
                        ("publishfolder" == e.entityType
                            ? (e.entityType = "singlefolder")
                            : "publishfile" == e.entityType &&
                            (e.entityType = "singlefile"),
                            ("multiplefiles" != e.entityType &&
                                "multiplefolders" != e.entityType) ||
                            (e.entityType = "composed"),
                            (t = $.format(t, e.entityType))),
                        t
                    );
                }),
                (inforBarPt.compositionComplete = function (e, t, o) {
                    var n = this;
                    (($(t).parent().data("tag") &&
                        "outpublish" === $(t).parent().data("tag")) ||
                        "true" ===
                        $.getQueryString(
                            window.decodeURIComponent(window.location.href),
                            "isPublish"
                        )) &&
                        this.activationData.isInOutpublish(!0),
                        $(t).parent().data("tag") &&
                        "preview" === $(t).parent().data("tag") &&
                        this.activationData.isInPreview(!0),
                        $(t).parent().data("tag") &&
                        "preview" === $(t).parent().data("tag") &&
                        $.getQueryString("code") &&
                        this.activationData.isInPublishPreview(!0),
                        (this.jRightPanel = $(".right-panel", $(e).parent().parent()).eq(
                            0
                        )),
                        (this.jLeftPanel = $(
                            ".left-panel",
                            this.jRightPanel.parent().parent().parent()
                        ).eq(0)),
                        void 0 == n.BaseItemValues &&
                        this.service
                            .getAllInfoBar($.getQueryString("code"))
                            .then(function (e) {
                                n.BaseItemValues = e;
                            }),
                        app.on("upload:init").then(function (e) {
                            if (
                                "update" == e.module ||
                                "myshare" == e.module ||
                                "mypublish" == e.module ||
                                "mysubscribe" == e.module ||
                                "template" == e.module
                            )
                                return void n.activeView(null);
                            if (
                                ("recyclebinlist" == e.module
                                    ? n.activationData.isInRecycle(!0)
                                    : n.activationData.isInRecycle(!1),
                                    e.module && "null" == e.module)
                            )
                                return void n.activeView(null);
                            var t,
                                o = n.service.getEntityType(e, n.activationData);
                            if (o && o.type) {
                                var i,
                                    a = n.formateData(e),
                                    r = e.module;
                                if (
                                    null != a &&
                                    a.path &&
                                    "teamcreate" != r &&
                                    "teamfolder" != r &&
                                    "recyclebinlist" != r
                                ) {
                                    var s = a.path.split("\\");
                                    s.length > 0 &&
                                        ("1" == s[0]
                                            ? ((i = s[0]), (r = "enterprise"))
                                            : "7" == s[0]
                                                ? ((i = s[0]), (r = "team"))
                                                : "2" == s[0] && (r = "person"));
                                }
                                if (null != a && a.name) {
                                    var d = a.name.split(".");
                                    if (
                                        d.length > 0 &&
                                        "link" == d[d.length - 1] &&
                                        a.shortcut &&
                                        a.shortcut.entryPath
                                    ) {
                                        var l = a.shortcut.entryPath.split("\\");
                                        l.length > 0 &&
                                            ("1" == l[0]
                                                ? ((i = l[0]), (r = "enterprise"))
                                                : "7" == l[0]
                                                    ? ((i = l[0]), (r = "team"))
                                                    : "2" == l[0] && ((i = l[0]), (r = "person")));
                                    }
                                }
                                if (r)
                                    if ("enterprise" == r || "preview" == r)
                                        switch (o.type) {
                                            case "singlefile":
                                                t = "1001";
                                                break;
                                            case "multiplefiles":
                                                t = "1002";
                                                break;
                                            case "singlefolder":
                                                t = "1003";
                                                break;
                                            case "multiplefolders":
                                                t = "1004";
                                                break;
                                            case "composed":
                                                t = "1005";
                                                break;
                                            case "publishfile":
                                            case "publishfolder":
                                                t = "1008";
                                        }
                                    else if ("person" == r)
                                        switch (o.type) {
                                            case "singlefile":
                                                t = "3001";
                                                break;
                                            case "multiplefiles":
                                                t = "3002";
                                                break;
                                            case "singlefolder":
                                                t = "3003";
                                                break;
                                            case "multiplefolders":
                                                t = "3004";
                                                break;
                                            case "composed":
                                                t = "3005";
                                                break;
                                            case "publishfile":
                                            case "publishfolder":
                                                t = "3008";
                                        }
                                    else if ("team" == r)
                                        switch (o.type) {
                                            case "singlefile":
                                                t = "7001";
                                                break;
                                            case "multiplefiles":
                                                t = "7002";
                                                break;
                                            case "singlefolder":
                                                t = "7003";
                                                break;
                                            case "multiplefolders":
                                                t = "7004";
                                                break;
                                            case "composed":
                                                t = "7005";
                                                break;
                                            case "publishfile":
                                            case "publishfolder":
                                                t = "7008";
                                        }
                                    else if ("recyclebinlist" == r) {
                                        if (e && e.select.length > 0 && e.select[0].path) {
                                            var c = e.select[0].path.split("\\");
                                            "1" == c[0]
                                                ? (t = "1009")
                                                : "7" == c[0]
                                                    ? (t = "7009")
                                                    : "2" == c[0] && (t = "3009");
                                        } else if (window.location.hash) {
                                            var u = window.location.hash.split("/");
                                            u.length > 2 &&
                                                ("enterprise" == u[1]
                                                    ? (t = "1009")
                                                    : "team" == u[1]
                                                        ? (t = "7009")
                                                        : "person" == u[1] && (t = "3009"));
                                        }
                                    } else if ("mylock" == r)
                                        switch (o.type) {
                                            case "mylockinfo":
                                                t = "8005";
                                                break;
                                            case "singlefile":
                                                t = "1001";
                                                break;
                                            case "multiplefiles":
                                                t = "1002";
                                                break;
                                            case "singlefolder":
                                                t = "1003";
                                                break;
                                            case "multiplefolders":
                                                t = "1004";
                                                break;
                                            case "composed":
                                                t = "1005";
                                        }
                                    else if ("favoritelist" == r)
                                        switch (o.type) {
                                            case "singlefile":
                                                t = "1001";
                                                break;
                                            case "multiplefiles":
                                                t = "1002";
                                                break;
                                            case "singlefolder":
                                                t = "1003";
                                                break;
                                            case "multiplefolders":
                                                t = "1004";
                                                break;
                                            case "composed":
                                                t = "1005";
                                        }
                                    else if ("teamcreate" == r) t = "7006";
                                    else if ("teamfolder" == r) t = "7007";
                                    else if ("mytag" == r)
                                        switch (o.type) {
                                            case "singlefile":
                                                t = "1001";
                                                break;
                                            case "multiplefiles":
                                                t = "1002";
                                                break;
                                            case "singlefolder":
                                                t = "1003";
                                                break;
                                            case "multiplefolders":
                                                t = "1004";
                                                break;
                                            case "composed":
                                                t = "1005";
                                        }
                                    else if ("sharetome" == r)
                                        switch (o.type) {
                                            case "singlefile":
                                                t = "1001";
                                                break;
                                            case "multiplefiles":
                                                t = "1002";
                                                break;
                                            case "singlefolder":
                                                t = "1003";
                                                break;
                                            case "multiplefolders":
                                                t = "1004";
                                                break;
                                            case "composed":
                                                t = "1005";
                                        }
                                    else if ("outpublish" == r)
                                        switch (o.type) {
                                            case "composed":
                                                t = "1008";
                                        }
                                if (
                                    (e.select &&
                                        1 === e.select.length &&
                                        e.select[0].permissionData &&
                                        ((a.permissionData = e.select[0].permissionData),
                                            (a.operationData = e.select[0].operationData)),
                                        addPropStateDesc(a),
                                        a &&
                                        (void 0 !== a.name && (a.shortName = a.name),
                                            void 0 == a.type && (a.type = a.testtype),
                                            (n.initData.sourceData = a),
                                            n.initData.fromJS(a),
                                            !a.shortcut &&
                                            n.initData().shortcut &&
                                            delete n.initData().shortcut),
                                        o && o.type)
                                ) {
                                    var i = o.type,
                                        p = a.type,
                                        s = e.module,
                                        f = $.getLan(),
                                        o = o.type;
                                    (showModuels = constinfo.getTypeRightList(t, i, p, s, f, o)),
                                        showModuels &&
                                        ((this.currentModule = showModuels[0]),
                                            n.InfobarItems(showModuels),
                                            n.loadCurrentModules(showModuels[0]));
                                }
                            }
                        }),
                        this.infobarCollapsing.init();
                }),
                (inforBarPt.onInfobarClick = function (e, t) {
                    this.clearAllSelected(),
                        (this.currentModule = e),
                        this.currentModule.isActive(!0),
                        this.loadCurrentModule();
                }),
                (inforBarPt.formateData = function (e) {
                    if (!$.isArray(e.select)) return this.service.formateData(e);
                    var t = this.service.formateData(e);
                    return this.service.wrapData(t, e), t;
                }),
                (inforBarPt.clculateSize = function (e) {
                    return constInfo.formatSize(e);
                }),
                (inforBarPt.loadCurrentModule = function () {
                    "publish" == this.currentModule.entityType &&
                        (this.currentModule.entityType = "singlefolder");
                    var e = this;
                    if (this.currentModule && 1 == this.currentModule.ContentType)
                        e.getAddress();
                    else {
                        this.isurlconfig(!1),
                            (path = this.getModulePath(this.currentModule));
                        var t = function (t, o) {
                            t.refreshData && o && t.refreshData(e), e.activeView(t);
                        };
                        if (e.modulesCache[path]) return void t(e.modulesCache[path], !0);
                        require([path], function (o) {
                            t(o), (e.modulesCache[path] = o);
                        });
                    }
                }),
                (inforBarPt.loadCurrentModules = function (e) {
                    e &&
                        $.each(this.InfobarItems(), function (t, o) {
                            e.id == o.id ? o.isActive(!0) : o.isActive(!1);
                        }),
                        "publish" == e.entityType && (e.entityType = "singlefolder");
                    var t = this;
                    if (1 == e.ContentType) t.getAddress(e);
                    else {
                        this.isurlconfig(!1), (path = this.getModulePath(e));
                        var o = function (e, o) {
                            e.refreshData && o && e.refreshData(t),
                                (t.activeView() &&
                                    t.activeView().__moduleId__ == e.__moduleId__ &&
                                    "doc/informationbar/team/index" ==
                                    t.activeView().__moduleId__) ||
                                t.activeView(e);
                        };
                        if (t.modulesCache[path]) return void o(t.modulesCache[path], !0);
                        require([path], function (e) {
                            o(e), (t.modulesCache[path] = e);
                        });
                    }
                }),
                (inforBarPt.getAddress = function (e) {
                    this.isurlconfig(!0);
                    var t = "";
                    (t =
                        this.currentModule && this.currentModule.ParameterSet
                            ? JSON.parse(this.currentModule.ParameterSet)
                            : e.ParameterSet),
                        t.custom || (t = JSON.parse(t));
                    for (var o = "?", n = "", i = 0; i < t.custom.rows.length; i++) {
                        var a = "";
                        "{fileId}" == t.custom.rows[i].value
                            ? (t.custom.rows[i].value = this.initData().id())
                            : "{lastVerId}" == t.custom.rows[i].value
                                ? (t.custom.rows[i].value = this.initData().lastVerId())
                                : "{token}" == t.custom.rows[i].value &&
                                (t.custom.rows[i].value = constinfo.userInfo.token),
                            (a =
                                i != t.custom.rows.length - 1
                                    ? t.custom.rows[i].field + "=" + t.custom.rows[i].value + "&"
                                    : t.custom.rows[i].field + "=" + t.custom.rows[i].value),
                            (o += a);
                    }
                    n =
                        "zh-cn" == constinfo.getLang()
                            ? "&" + t.parameterfield + "=" + t.langZhcn
                            : "en" == constinfo.getLang()
                                ? "&" + t.parameterfield + "=" + t.langEn
                                : "ja" == constinfo.getLang()
                                    ? "&" + t.parameterfield + "=" + t.langJa
                                    : "&" + t.parameterfield + "=" + t.langZhtw;
                    var r =
                        this.currentModule.ContentBaseUrl +
                        this.currentModule.ContentAddress +
                        o +
                        n;
                    this.urladdress(r);
                }),
                new InformationBar()
            );
        }
    ),
    define(
        "common/edoc2v5-qrcode",
        [
            "qrcode",
            "jquery",
            lang(),
            "knockout",
            "komapping",
            "header/userinfo/constinfo",
        ],
        function (e, t, o, n, i, a) {
            function r(n) {
                if (!n) throw Error(o.PleasePassObj);
                var i = null;
                if (!n.selector) throw Error(o.PleasePassJquery);
                i = n.selector;
                var r = n.text ? n.text : "hello world",
                    s = n.position ? n.position : "right",
                    d = n.hideDelay ? n.hideDelay : 200,
                    l = n.width ? n.width : 120,
                    c = n.height ? n.height : 120,
                    u = n.bgColor ? n.bgColor : "#ffffff",
                    p = n.color ? n.color : "#000000",
                    f = n.deltaX ? n.deltaX : 0,
                    m = n.deltaY ? n.deltaY : 0,
                    h = {
                        width: l,
                        height: c,
                        colorDark: p,
                        colorLight: u,
                        correctLevel: e.CorrectLevel.H,
                    },
                    g = '<div style="width:' + l + "px;height:" + c + 'px;"></div>';
                if (n && n.showLink) {
                    var v = n.getNewContent();
                    (g =
                        '<div  id="codeImg" class="codeImg" style="width:188px;height:' +
                        c +
                        'px;"><p style="color: #666666;" >' +
                        o.link +
                        '</p>  <div style="padding-top:6px;padding-bottom:10px;"> <input type="text" value=' +
                        v +
                        ' id="copy-text"  class="copy-text" style="padding-left:1px;margin-right:0px;border-radius: 4px;border: 1px solid #d0d4d9;max-width: 130px;height:22px;font-size:12px;"><input class="copyLink  form-button" type="button" value=' +
                        o.copy +
                        ' style="line-height:0px;padding:0 5px;height:24px;margin-left: 3px" / > </div><input id="copyQR" class="copyQR form-button" type="button" value=' +
                        o.down +
                        ' style="line-height:0px;padding:0 5px;height:24px;margin-left: 133px;position: absolute;margin-top: 40px;"/ ></div>'),
                        t("body").off("click", ".codeImg .copyQR"),
                        t("body").on("click", ".codeImg .copyQR", function () {
                            var e = t(this).closest(".codeImg").find("img").attr("src");
                            a.downloadFileImg("二维码.png", e);
                        });
                }
                ((n && n.isPublishManger) || n.isMyPublish) &&
                    ((g =
                        '<div class="codeImg" style="width:' +
                        l +
                        'px;height:180px;"><div><input class="copyQR form-button" type="button" value=' +
                        o.down +
                        ' style="position: absolute;margin-top: 155px;margin-left: 47px;"/ ></div></div>'),
                        t("body").off("click", ".codeImg .copyQR"),
                        t("body").on("click", ".codeImg .copyQR", function () {
                            var e = t(this).closest(".codeImg").find("img").attr("src");
                            a.downloadFileImg("二维码.png", e);
                        })),
                    ((n && n.isOutpublish) || n.isShowDownBut) &&
                    ((g =
                        '<div class="codeFileImg" style="width:' +
                        l +
                        'px;height:180px;"><div><input id="copyQR" class="copyQR form-button" type="button" value=' +
                        o.down +
                        ' style="position: absolute;margin-top: 155px;margin-left: 47px;"/ ></div></div>'),
                        t("body").off("click", ".codeFileImg .copyQR"),
                        t("body").on("click", ".codeFileImg .copyQR", function () {
                            var e = t(this).closest(".codeFileImg").find("img").attr("src");
                            a.downloadFileImg("二维码.png", e);
                        })),
                    n &&
                    n.isFilePublish &&
                    ((g =
                        '<div class="codeFileImg" style="width:' +
                        l +
                        'px;height:150px;"><div><input id="copyQR" class="copyQR form-button" type="button" value=' +
                        o.down +
                        ' style="position: absolute;margin-top: 80px;margin-left: 70px;display:none;"/ ></div></div>'),
                        t("body").off("click", ".codeFileImg .copyQR"),
                        t("body").on("click", ".codeFileImg .copyQR", function () {
                            var e = t(this).closest(".codeFileImg").find("img").attr("src");
                            a.downloadFileImg("二维码.png", e);
                        })),
                    t(i).tooltip({
                        position: s,
                        content: g,
                        hideDelay: d,
                        deltaX: f,
                        deltaY: m,
                        onShow: function (o) {
                            var i = t(this);
                            if (!i.data("make-code")) {
                                i.data("make-code", !0);
                                var a = t(g).get(0),
                                    s = new e(a, h);
                                i.data("anchor", a), i.data("qrcode", s);
                            }
                            i.data("qrcode-content")
                                ? (r = i.data("qrcode-content"))
                                : n.getNewContent && (r = n.getNewContent()),
                                i.data("qrcode").makeCode(r),
                                i.tooltip("update", i.data("anchor")),
                                i
                                    .tooltip("tip")
                                    .css({ padding: "10px", "border-radius": "5px" }),
                                n.onShow && n.onShow.apply(this, arguments),
                                n.onCopy && ((i.url = r), n.onCopy.apply(i, arguments));
                        },
                    });
            }
            return { makeHoverQrcode: r };
        }
    ),
    define(
        "doc/informationbar/basicinfo/service",
        ["jquery", "knockout", "../" + lang()],
        function (e, t, o) {
            function n() { }
            var i = n.prototype;
            return (
                (i.getFileInfo = function (t) {
                    return e.ajax({
                        data: { module: "WebClient", fun: "GetFileById", fileId: t },
                    });
                }),
                (i.getFolderInfo = function (t) {
                    var o = {
                        module: "WebClient",
                        fun: "GetFolderId",
                        folderId: t,
                        token: getTokenByCondition(),
                    },
                        n = e.getQueryString("code");
                    return 0 !== n.length && (o.code = n), e.ajax({ data: o });
                }),
                (i.decorateFileByShortCut = function (e, t) {
                    this.getFileInfo(e.shortcut.entryId()).done(function (o) {
                        if (0 == o.result) {
                            var n = t(o.file);
                            e.lastVerNumStr(n.lastVerNumStr),
                                e.stateDesc(n.stateDesc),
                                e.securityLevelName(n.securityLevelName);
                        }
                    });
                }),
                (i.decorateFolderByShortCut = function (t, n) {
                    this.getFolderInfo(t.shortcut.entryId()).done(function (i) {
                        if (0 == i.result) {
                            var a = n(i.folder);
                            t.secName(a.secName);
                            var r = e.format(
                                o.conclude,
                                a.childFileCount || 0,
                                a.childFolderCount || 0
                            );
                            t.conclude(r);
                        }
                    });
                }),
                (i.ajaxGetCollInfoById = function (t) {
                    return e.ajax({
                        data: {
                            module: "WebClient",
                            fun: "GetFavoritesByParentId",
                            mnParentId: t,
                            mnPermission: 0,
                            docViewId: 0,
                            argsXml:
                                "<GetListArgs><PageSize>100000</PageSize><PageNum>1</PageNum></GetListArgs>",
                        },
                    });
                }),
                n
            );
        }
    ),
    define(
        "doc/index",
        [
            "durandal/app",
            "plugins/router",
            "knockout",
            "underscore",
            "header/userinfo/constinfo",
            "durandal/system",
            lang(),
            "doc/toolbar/index",
            "doc/contextmenu/index",
        ],
        function (
            app,
            router,
            ko,
            _,
            constInfo,
            system,
            lang,
            Toolbar,
            contextmenu
        ) {
            function InterceptEvent() { }
            function loadViewData(e, t) {
                var o = { module: "SystemManager", fun: "GetShowSubNav", navType: 1 },
                    n = $.getQueryString("code");
                0 !== n.length && (o.code = n),
                    $.ajax({ data: o, async: !1 }).done(function (n) {
                        if (n.url && "ErrorCode4" == n.errorCode)
                            return void (window.top.location.href =
                                n.url +
                                "?returnUrl=" +
                                window.encodeURIComponent(window.location.href));
                        o = n.nav;
                        for (
                            var i = constInfo.getLang() ? constInfo.getLang() : "zh-cn",
                            a = 0;
                            a < o.length;
                            a++
                        )
                            "en" == i
                                ? (o[a].title = o[a].en)
                                : "ja" == i
                                    ? (o[a].title = o[a].ja)
                                    : "zh-tw" == i && (o[a].title = o[a].zhtw);
                        var r = {};
                        $.each(o, function (e, t) {
                            r[t.id] = {
                                nav: t.nav,
                                sort: t.sort,
                                title: t.title,
                                activity: t.activity,
                            };
                        }),
                            !1 === t && window.navdata && (o = window.navdata),
                            (1 == t || null == t || !window.navdata) && (window.navdata = o);
                        for (var a = 0; a < o.length; a++)
                            (o[a].nav = r[o[a].id].nav),
                                (o[a].sort = r[o[a].id].sort),
                                o[a].route.indexOf("[") > -1 &&
                                o[a].route.lastIndexOf("]") > -1 &&
                                (o[a].route = evil(o[a].route)),
                                o[a].activity && (defaultSelectItem = o[a]),
                                (o[a].activity = ko.observable(o[a].activity));
                        (navigationModel = o.sort(function (e, t) {
                            return e.sort > t.sort ? 1 : -1;
                        })),
                            e && e();
                    });
            }
            function evil(e) {
                return new Function("return " + e)();
            }
            function SetCurActItem(e) {
                if (e) {
                    if (null != e.id) {
                        for (var t = 0; t < navigationModel.length; t++)
                            navigationModel[t].activity(!1);
                        e.activity(!0);
                    }
                } else
                    for (var t = 0; t < navigationModel.length; t++)
                        navigationModel[t].activity(!1);
            }
            function maprouter() {
                return (childRouter = router
                    .createChildRouter()
                    .makeRelative({ moduleId: "doc", fromParent: !0 })
                    .map(navigationModel)
                    .buildNavigationModel());
            }
            var navigationModel,
                activeView = ko.observable(),
                defaultPanelWidth = 200,
                panelWidth = ko.observable(defaultPanelWidth),
                navigationView = ko.observable("doc/navigation/index"),
                toolbarView = Toolbar.createToolbar("doc/"),
                docSetBarView = ko.observable("doc/docSetBar/index"),
                informationbarView = ko.observable("doc/informationbar/index"),
                curSelectNavType = ko.observable(1),
                sidebarType = $.cookie("sidebarType"),
                curSelectNavView = ko.observable(
                    !!(sidebarType && sidebarType.length < 0) || "mini" != sidebarType
                ),
                defaultSelectItem = null,
                childRouter = null,
                jLeftPanel,
                data = "",
                isOpenLeftBar = ko.observable(),
                app = app,
                pt = InterceptEvent.prototype;
            app.on("doc:toggleLeftPanelPerbar").then(function (e) {
                $(".left-content")
                    .scrollLeft(0)
                    .scrollTop(0)
                    .perfectScrollbar("destroy")
                    .perfectScrollbar();
            }),
                (pt.intercept = function () {
                    this.bindComputed(),
                        app.on("toolbar:update").then(function (e) {
                            ko.$store.dispatch("setCurrent", e.select, e.module, e.message);
                        }),
                        $(window).on("resize.docpanel", function () {
                            toolbarView.moduleName && toolbarView.reLoadSize();
                        });
                }),
                (pt.bindComputed = function () {
                    ko.computed(function () {
                        var e = ko.$store.state.currentData(),
                            t = ko.$store.state.toolbarComplationCompleted();
                        e && t && toolbarView.refreshData(e);
                    });
                }),
                app.on("doc:toggleLeftPanelHide").then(function (e) {
                    e.hide && setSize(0);
                });
            var setSize = function (width) {
                var curentModule = require("knockout").$store.state.curentModule();
                if (curentModule && curentModule.module) {
                    if ("enterprise" == curentModule.module) {
                        var enterpriseLeft = eval($.cookie("enterpriseLeftPanel"));
                        null != enterpriseLeft && enterpriseLeft && (width = 0);
                    } else if ("team" == curentModule.module) {
                        var teamLeft = eval($.cookie("teamLeftPanel"));
                        null != teamLeft && teamLeft && (width = 0);
                    } else if ("person" == curentModule.module) {
                        var personLeft = eval($.cookie("personLeftPanel"));
                        null != personLeft && personLeft && (width = 0);
                    }
                    constInfo.userInfo.LeftSideTreeNoShow &&
                        (app.trigger("docsetbar:hide_to_right"), (width = 0));
                }
                curentModule &&
                    "myshareme" == curentModule.id &&
                    window.edoc2MyShareMe &&
                    (width = 0),
                    curentModule && "myrecommend" == curentModule.id && (width = 0),
                    curentModule && "mypartition" == curentModule.id && (width = 0),
                    curentModule &&
                    "quick/mytag" == curentModule.hash &&
                    window.edoc2MyTags &&
                    (width = 0),
                    curentModule &&
                    "quick/mypublish" == curentModule.hash &&
                    (width = 0),
                    0 == width
                        ? ($(".bar-left")
                            .removeClass("icon-toleft-selected")
                            .addClass("icon-toleft"),
                            isOpenLeftBar(!1))
                        : ($(".bar-left")
                            .removeClass("icon-toleft")
                            .addClass("icon-toleft-selected"),
                            isOpenLeftBar(!0)),
                    jLeftPanel || (jLeftPanel = $(".left-panel").eq(0)),
                    jLeftPanel &&
                    (jLeftPanel.width(width),
                        constInfo.userInfo.LeftSideTreeNoShow &&
                        jLeftPanel.css("boder", 0),
                        constInfo.userInfo.LeftNavigationMenuNoShow
                            ? (jLeftPanel.css("left", 0),
                                jLeftPanel.next().css("margin-left", width))
                            : jLeftPanel.next().css("left", width),
                        $(window).trigger("resize.docpanel"));
            },
                toggleLeftPanel = function (e, t) {
                    return (
                        t && (e = !0),
                        0 == e
                            ? void setSize(0)
                            : 1 == e
                                ? void (0 == panelWidth()
                                    ? (setSize(defaultPanelWidth), panelWidth(defaultPanelWidth))
                                    : setSize(panelWidth()))
                                : void (jLeftPanel.width() > 0
                                    ? setSize(0)
                                    : 0 == panelWidth()
                                        ? (setSize(defaultPanelWidth), panelWidth(defaultPanelWidth))
                                        : setSize(panelWidth()))
                    );
                };
            app.on("uichange:subnav").then(function () {
                loadViewData(function () {
                    childRouter = router.createChildRouter().map(navigationModel);
                    var e = $.grep(childRouter.routes, function (e) {
                        return e.nav;
                    }),
                        t = constInfo.IntelligentCommend(),
                        o = [];
                    $.each(e, function (e, n) {
                        (t || "doc/quick/myrecommend/index" != n.moduleId) && o.push(n);
                    }),
                        _retuenobj.items(o),
                        (jLeftPanel = $(".left-panel").eq(0)),
                        e.length &&
                        jLeftPanel
                            .find(".navbar-list>a")
                            .css({ width: 100 / e.length + "%" });
                }, !1);
            }),
                app.on("doc:navigateTo", function (e) {
                    childRouter && childRouter.navigate(e);
                }),
                loadViewData(),
                constInfo.userInfo.isOutsider &&
                (navigationModel = [
                    {
                        route: "team(/:id)(/:id)",
                        moduleId: "team/index",
                        title: lang.team,
                        hash: "#doc/team",
                        nav: !0,
                        className: "nav-team",
                    },
                ]),
                maprouter();
            var _retuenobj, lastNavigateId, lastNav;
            return (_retuenobj = {
                openLfetPanel: function () {
                    curSelectNavView(!curSelectNavView()),
                        curSelectNavView()
                            ? $.cookie("sidebarType", "full")
                            : $.cookie("sidebarType", "mini"),
                        $(window).trigger("resize.docpanel");
                },
                canActivate: function () {
                    var e = ko.$store.state.currentFolderPosition;
                    if (!e.folderId) return !0;
                    var t = window.location.hash;
                    if (
                        "#doc" ==
                        (t = t.substr(0, t.indexOf("?") > 0 ? t.indexOf("?") : t.length))
                    ) {
                        var o = ko.$store.state.curentModule();
                        if (o) {
                            o.hash ||
                                ((o.hash = "enterprise/1"),
                                    (o.id = "1"),
                                    (o.module = "enterprise"));
                            var n = window.setTimeout(function () {
                                if (
                                    (window.clearTimeout(n),
                                        /^enterprise\/[\d]+\/search$/i.test(o.hash) ||
                                        "enterprise/1" == o.hash)
                                ) {
                                    var e =
                                        "#doc/" +
                                        o.hash.replace(/search\/?/, "") +
                                        "?key=" +
                                        new Date().getTime();
                                    router.navigate(e);
                                } else router.navigate("#doc/" + o.hash);
                            });
                            return !0;
                        }
                    }
                    var i = t.split("/"),
                        a = i[1],
                        r = i[2];
                    return "quick" == a
                        ? ((e.position = a),
                            ko.$store.dispatch("setCurrentFolderPosition", e),
                            !0)
                        : a != e.position
                            ? (router.navigate(i[0] + "/" + i[1] + "/" + (r || e.folderId), !1),
                                !0)
                            : !(!r && e.folderId) ||
                            (router.navigate(i[0] + "/" + i[1] + "/" + e.folderId, !1), !0);
                },
                activate: function (e) {
                    if (e && "string" == typeof e) {
                        var t = ["enterprise", "person"],
                            o = ["mypublish", "mysubscribe", "mylock", "mypartition"];
                        _.find(t, function (t) {
                            return e.indexOf(t) > -1;
                        })
                            ? toggleLeftPanel(!0)
                            : _.find(o, function (t) {
                                return e.indexOf(t) > -1;
                            }) && toggleLeftPanel(!1);
                    }
                },
                panelWidth: panelWidth,
                binding: function () {
                    return (
                        new InterceptEvent().intercept(),
                        constInfo.userInfo.LeftNavigationMenuNoShow &&
                        $("#langLeft").hide(),
                        { cacheViews: !0 }
                    );
                },
                attched: function (e, t, o) { },
                compositionComplete: function (e, t, o) {
                    if (constInfo.userInfo.isGaValidata)
                        return void 0 !== constInfo.systemInfo.loginPageUrl &&
                            "" !== constInfo.systemInfo.loginPageUrl
                            ? void (window.top.location.href =
                                constInfo.systemInfo.loginPageUrl +
                                "?returnUrl=" +
                                window.encodeURIComponent(location.href))
                            : void (window.top.location = "/api/auth/login");
                    var n = (ko.dataFor(t), this);
                    ko.$store.dispatch("toolbarcomplation"),
                        (jLeftPanel = $(".left-panel", e).eq(0)),
                        (navshowlength = $.grep(navigationModel, function (e) {
                            return e.nav;
                        }).length),
                        navshowlength &&
                        jLeftPanel
                            .find(".navbar-list>a")
                            .css({ width: 100 / navshowlength + "%" }),
                        setSize(panelWidth()),
                        jLeftPanel.resizable({
                            onResize: _.throttle(function () {
                                setSize($(this).width());
                            }, 250),
                            onStopResize: function () {
                                jLeftPanel.width() < 100 && setSize(0),
                                    panelWidth(jLeftPanel.width()),
                                    app.trigger("navigation:init", {
                                        message: "leftPanelResize",
                                    });
                            },
                            edge: 8,
                            maxWidth: 500,
                            minWidth: 99,
                            handles: "e",
                        }),
                        $(".leftNavList a").tooltip({
                            showDelay: curSelectNavView() ? 1e3 : 100,
                            hideDelay: 50,
                            position: "right",
                        }),
                        curSelectNavView.subscribe(function (e) {
                            $(".leftNavList a").tooltip({
                                showDelay: e ? 2e3 : 100,
                                hideDelay: 50,
                                position: "right",
                            });
                        }),
                        $(".leftNavList a").addClass("navtip"),
                        $(".left-content").perfectScrollbar("update").perfectScrollbar(),
                        app.on("doc:toggleLeftPanel").then(function (e) {
                            return (
                                e &&
                                10 === e.type &&
                                (e.isSelected ? (e.type = 0) : (e.type = 1)),
                                e && 0 === e.type
                                    ? void (0 == curSelectNavType() && "message" == e.module
                                        ? toggleLeftPanel(!0)
                                        : (toggleLeftPanel(!1),
                                            $(".document-list-body").perfectScrollbar("update")))
                                    : e && 1 === e.type
                                        ? void toggleLeftPanel(!e || 0 !== e.myTags)
                                        : void toggleLeftPanel()
                            );
                        }),
                        ("#doc" != window.location.hash && "" != window.location.hash) ||
                        null != childRouter.activeItem() ||
                        (constInfo.userInfo.isOutsider
                            ? router.navigate("doc/team")
                            : constInfo.userInfo.enablePersonFolder || defaultSelectItem
                                ? defaultSelectItem
                                    ? router.navigate(defaultSelectItem.hash)
                                    : router.navigate("doc/person")
                                : router.navigate("doc/enterprise"));
                    for (var i, a = 0; a < childRouter.routes.length; a++)
                        childRouter.routes[a].isActive() && (i = childRouter.routes[a]);
                    i &&
                        (toggleLeftPanel(i.loadTree, 0 == curSelectNavType()),
                            setTimeout(function () {
                                toggleLeftPanel(i.loadTree, 0 == curSelectNavType());
                            }, 100)),
                        app.on("doc:toggleDisplayCapacity").then(function (e) {
                            e
                                ? ($(".left-capacity").eq(0).show(),
                                    $(".left-content").eq(0).css({ bottom: "80px" }))
                                : ($(".left-capacity").eq(0).hide(),
                                    $(".left-content").eq(0).css({ bottom: "50px" }));
                        }),
                        this.activeView.subscribe(function (e) {
                            "string" == typeof e && e.toLowerCase().indexOf("/search") >= 0
                                ? n.isHidden(!0)
                                : n.isHidden(!1);
                            var t = system.getModuleId(e);
                            "object" == typeof e &&
                                "component/docView/DocView" === t &&
                                "person" === e.vm.viewName()
                                ? app.trigger("doc:toggleDisplayCapacity", !0)
                                : app.trigger("doc:toggleDisplayCapacity", !1);
                        });
                },
                router: childRouter,
                items: ko.observableArray(
                    $.grep(childRouter.routes, function (e) {
                        var t = constInfo.IntelligentCommend();
                        constInfo.systemInfo.instanceConfigInfo &&
                            constInfo.systemInfo.instanceConfigInfo.SecretEdition;
                        return t || "doc/quick/myrecommend/index" != e.moduleId
                            ? e.nav
                            : "";
                    })
                ),
                selectLang: function (e) {
                    var t = getCurLangName();
                    return (t = t.split("-").join("")), "jp" == t && (t = "ja"), e[t];
                },
                activeView: activeView,
                navigationView: navigationView,
                toolbarView: toolbarView,
                docSetBarView: docSetBarView,
                informationbarView: informationbarView,
                isHidden: ko.observable(!1),
                app: app,
                onclickLeftNavItem: function (e, t) {
                    t.stopPropagation(), contextmenu.onHidden();
                    var o = this;
                    return (
                        "doc/quick/myshareme/index" == e.moduleId &&
                        $.ajax({
                            data: {
                                module: "DocShareManager",
                                fun: "GetAllShareEntry",
                                pageNum: 1,
                                pageSize: 10,
                                async: !1,
                            },
                        }).done(function (e) {
                            e.listShare && 0 == e.listShare.length
                                ? toggleLeftPanel(!1, !1)
                                : e.listShare &&
                                e.listShare.length > 0 &&
                                ((window.edoc2MyShareMe = !1),
                                    toggleLeftPanel(!0, !0),
                                    o.app.trigger("sharemeTree:reload"));
                        }),
                        setTimeout(function () {
                            app.trigger("doc:toggleLeftPanelPerbar"),
                                $(".team-list").scrollTop(0).scrollLeft(0);
                        }, 100),
                        "nav-myfavorite" == e.className ||
                        "nav-mytag" == e.className ||
                        (toggleLeftPanel(e.loadTree, 0 == curSelectNavType()), !0)
                    );
                },
                onModifyIR: function (e) {
                    e &&
                        "IR" == e.en &&
                        setTimeout(function () {
                            for (var e = $(".tooltip-content").length, t = 0; t < e; t++)
                                "IR" == $(".tooltip-content").eq(t).text() &&
                                    $(".tooltip-content")
                                        .eq(t)
                                        .text("Intelligent Recommendation");
                        }, 1e3);
                },
                onclickBottomNavItem: function (e, t) {
                    return (
                        alert(0),
                        toggleLeftPanel(e.loadTree, 0 == curSelectNavType()),
                        setTimeout(function () {
                            app.trigger("doc:toggleLeftPanelPerbar");
                        }, 100),
                        !0
                    );
                },
                curSelectNavType: curSelectNavType,
                curSelectNavView: curSelectNavView,
                isOpenLeftBar: isOpenLeftBar,
                toggleLeftPanel: function (e) {
                    setTimeout(function () {
                        toggleLeftPanel(e);
                    }, 110);
                },
            });
        }
    ),
    define(
        "doc/informationbar/basicinfo/singlefolder/index",
        [
            "komapping",
            "knockout",
            "common/edoc2v5-qrcode",
            "durandal/app",
            lang(),
            "../service",
            "header/userinfo/constinfo",
            "doc/index",
            "doc/contextmenu/permtype",
        ],
        function (e, t, o, n, i, a, r, s, d) {
            function l(e, t) {
                return e + i.files + t + i.folders;
            }
            function c(e, t) {
                m.initData().showProcessBar(!0),
                    (t = t.toFixed(0)),
                    $("#p").progressbar({ text: e, value: t });
            }
            function u(e) {
                var o = t.$store.state.curentModule();
                if (!o) return 2;
                var n =
                    ("enterprise" == o.module ||
                        "person" == o.module ||
                        "team" == o.module) &&
                    "-1" == o.id,
                    i = e.initData.sourceData.id ? e.initData.sourceData.id : 0;
                return "team" == o.module && window.location.href.indexOf(!1)
                    ? 1
                    : 0 == i && n
                        ? 1
                        : 2;
            }
            function p(e) {
                switch (e) {
                    case "PublicRoot":
                        return r.productMes().DocFuncCompanyName;
                    case "PersonalRoot":
                        return r.productMes().DocFuncPersonalName;
                    case "Team":
                        return r.productMes().DocFuncTeamName;
                }
            }
            function f(e, t) {
                return /^1\\/.test(e)
                    ? "doc/enterprise/" + t
                    : /^2\\/.test(e)
                        ? "doc/person/" + t
                        : /^7\\/.test(e)
                            ? "doc/team/" + t
                            : void 0;
            }
            var m = require("doc/informationbar/index"),
                h = new a(),
                g = null,
                v =
                    (t.observable(),
                        t.observable(),
                        function () {
                            var e = {};
                            return (
                                jQuery(".navbar-list a").each(function (t, o) {
                                    var n = $(this).attr("class");
                                    n.indexOf("selected") > -1 &&
                                        (n.indexOf("enterprise") > -1 && (e = [1, 0]),
                                            n.indexOf("person") > -1 &&
                                            (e = [
                                                r.userInfo.personActive.path,
                                                r.userInfo.personActive.id,
                                            ]));
                                }),
                                e
                            );
                        }),
                y = t.computed(function () {
                    return m.infoWidth() - 120 + "px";
                }),
                w = t.computed(function () {
                    return m.infoWidth() - 160 + "px";
                }),
                b = {
                    isInOutpublish: t.observable(!1),
                    isInPublishPreview: t.observable(!1),
                },
                x = t.observable(!1),
                T = t.observable(!1),
                I = t.observable(!1),
                k = (t.$store.state.curentModule(), t.observable(1));
            return (
                n.on("singlefolder:index").then(function (e) {
                    e.type &&
                        $(".singfolderScroll")
                            .perfectScrollbar("update")
                            .perfectScrollbar();
                }),
                {
                    isRecyle: k,
                    parentData: b,
                    isPublicRoot: x,
                    isPersonRoot: T,
                    showLoading: I,
                    decorate: function () {
                        var e = this,
                            t = m.initData();
                        m.initData.sourceData.shortcut &&
                            (e.referenceFolderLocation(),
                                h.decorateFolderByShortCut(t, function (t) {
                                    return e.sourceName(t.name), m.formateData(t);
                                }));
                    },
                    goToSource: function () {
                        var e = m.initData.sourceData;
                        if (e.shortcut) {
                            if (
                                (m.initData.sourceData.shortcut.entryPermission & d.display) !=
                                d.display
                            )
                                return void n.trigger("message:show", {
                                    type: "error",
                                    message: i.noPerm,
                                });
                            var o = e.shortcut.entryPath.split("\\");
                            o = o[o.length - 2];
                            var a = f(e.shortcut.entryPath, o);
                            "person" == a.split("/")[1] &&
                                t.$store.dispatch("setCurrentFolderPosition", {
                                    folderId: a.split("/")[2],
                                    position: "person",
                                }),
                                s.router.navigate(a);
                        }
                    },
                    referenceFolderLocation: function () {
                        var e = m.initData();
                        if (e.namePath()) {
                            var t = (e.namePath(), e.namePath().split("\\")),
                                o = t[0];
                            "PersonalRoot" == o && t.splice(1, 1);
                            var n = p(o);
                            return (
                                (t[0] = n),
                                t.length > 2
                                    ? e.parentFolderName(t[t.length - 2] + "\\" + t[t.length - 1])
                                    : e.parentFolderName(t.join("\\")),
                                m.initData()
                            );
                        }
                    },
                    activate: function (e) {
                        b.isInOutpublish(e.isInOutpublish()),
                            b.isInPublishPreview(e.isInPublishPreview());
                        var t = u(m);
                        this.isRecyle(t), this.decorate();
                    },
                    compositionComplete: function () {
                        "en" == constInfo.getLang() &&
                            $("#folderCreatime").css("max-width", "80px"),
                            $(".singfolderScroll")
                                .perfectScrollbar("update")
                                .perfectScrollbar();
                        var e = this;
                        e.setQrcode(),
                            m.initData().folderUsedSize(" "),
                            m.initData().conclude(" "),
                            g ||
                            (g = n.on("upload:init").then(function (t) {
                                if (
                                    "update" != t.module &&
                                    "myfavorite" != t.module &&
                                    "myshare" != t.module &&
                                    "mypublish" != t.module &&
                                    "mylock" != t.module &&
                                    "mysubscribe" != t.module &&
                                    "publish" != t.module &&
                                    "outpublish" != t.module &&
                                    !((t.module && "null" == t.module) || t.select.length > 1)
                                ) {
                                    var o = t.select[0].data
                                        ? t.select[0].data.id
                                        : t.select[0][0].data.id;
                                    if (e.folderId != o) {
                                        var n = t.select[0].data || t.select[0][0].data;
                                        (32 != n.fileType ||
                                            (n.shortcut && 2 != n.shortcut.entryType)) &&
                                            n.folderType &&
                                            (e.decorate(), (e.folderId = t.select[0].data.id));
                                    }
                                }
                            }));
                    },
                    parentView: function () {
                        var e = u(m);
                        this.isRecyle(e);
                        var o = m.initData.sourceData;
                        o.shortcut && this.isRecyle(2);
                        var n = t.$store.state.curentModule();
                        if (
                            (o.id &&
                                "1" == o.id &&
                                !o.parentFolderName &&
                                (o.parentFolderName = "PublicRoot"),
                                o.data &&
                                o.data.name &&
                                o.data.name.indexOf("_") > 0 &&
                                "2" == o.path.substring(0, 1))
                        ) {
                            T(!0);
                            var i = r.productMes().DocFuncPersonalName;
                            return m.initData().name(i), m.initData();
                        }
                        if (
                            n &&
                            (x("enterprise" == n.module && 1 == n.id && 1 === o.id ? !0 : !1),
                                T("PersonalRoot" === o.parentFolderName ? !0 : !1),
                                x() || T())
                        ) {
                            var a = p(o.parentFolderName);
                            m.initData().name(a);
                        }
                        return m.initData();
                    },
                    sourceData: function () {
                        return m.initData.sourceData;
                    },
                    recentFileInfo: function () {
                        alert("文件新增趋势");
                    },
                    lang: i,
                    sourceName: t.observable(),
                    folderId: null,
                    niceWidth: y,
                    nameWidth: w,
                    setQrcode: function () {
                        o.makeHoverQrcode({
                            selector: ".single-folder-qrcode",
                            width: 150,
                            height: 150,
                            position: "bottom",
                            hideDelay: 200,
                            getNewContent: function () {
                                var e = window.location.href,
                                    t =
                                        (window.location.protocol,
                                            window.location.host,
                                            window.location.search,
                                            window.location.pathname,
                                            $.cookie("tkn"),
                                            m.initData().id());
                                return e.substring(0, e.lastIndexOf("/") + 1) + t;
                            },
                            onShow: function () {
                                var e = $(this),
                                    t = this.getBoundingClientRect();
                                e
                                    .tooltip("tip")
                                    .css({
                                        left: t.left - 150 + "px",
                                        top: t.top + 30 + "px",
                                        width: "150px",
                                        height: "150px",
                                    }),
                                    e.tooltip("arrow").css({ display: "none" });
                            },
                        });
                    },
                    calculate: function () {
                        var e = this;
                        e.showLoading(!0);
                        var o = 0,
                            i = "",
                            a = v(),
                            r = "GetFolderSizeChildCount";
                        (o = m.initData.sourceData.id ? m.initData.sourceData.id : 0),
                            m.initData.sourceData.shortcut &&
                            (o = m.initData.sourceData.shortcut.entryId);
                        var s = t.$store.state.curentModule();
                        if (s) {
                            if (
                                ((("enterprise" == s.module ||
                                    "person" == s.module ||
                                    "team" == s.module) &&
                                    "-1" == s.id) ||
                                    ("team" == s.module &&
                                        window.location.href.indexOf("recycle") > 0)) &&
                                ((r = "GetDeleteFolderSizeChildCount"), 0 == o)
                            )
                                if (a[0]) (i = a[0]), (o = a[1]);
                                else if (
                                    "team" == s.module &&
                                    window.location.href.indexOf("recycle") > 0
                                ) {
                                    var d = window.location.href,
                                        u = d.substr(
                                            d.lastIndexOf("/") + 1,
                                            d.indexOf("?") - d.lastIndexOf("/") - 1
                                        );
                                    (i = "7\\" + u), (o = u);
                                }
                        }
                        $.ajax({
                            data: {
                                module: "WebClient",
                                fun: r,
                                folderId: o,
                                path: i,
                                recalculate: !0,
                            },
                        }).done(function (t) {
                            e.showLoading(!1),
                                t &&
                                void 0 !== t.folderSize &&
                                ("person" == t.module && n.trigger("person:updateCapacity"),
                                    m.initData().conclude(l(t.childFiles, t.childFolders)),
                                    m.initData().folderUsedSize(m.clculateSize(t.folderSize)),
                                    void 0 == m.initData().maxFolderSize ||
                                        0 == m.initData().maxFolderSize() ||
                                        e.isRecyle()
                                        ? (m.initData().showProcessBar(!1),
                                            m.initData.sourceData.shortcut
                                                ? m.initData().folderUsedSize(m.clculateSize(0))
                                                : m
                                                    .initData()
                                                    .folderUsedSize(m.clculateSize(t.folderSize)))
                                        : c(
                                            m.clculateSize(m.initData().folderUsedSize()) +
                                            "/" +
                                            m.clculateSize(m.initData().maxFolderSize()),
                                            (100 * m.initData().folderUsedSize()) /
                                            m.initData().maxFolderSize()
                                        ));
                        });
                    },
                }
            );
        }
    ),
    define(
        "outpublish/service",
        [
            "knockout",
            "jquery",
            "durandal/app",
            "underscore",
            "header/userinfo/constinfo",
        ],
        function (e, t, o, n, i) {
            var a = (function () {
                var e = function (e, o, n) {
                    return t.ajax({ data: t.extend({ module: e, fun: o }, n) });
                };
                return {
                    getPublishInfoByCode: function (t) {
                        return e("PublishManager", "GetPublishInfoByCode", t);
                    },
                    GetPublishSystemInfoByCode: function (e) {
                        return t.ajax({
                            data: t.extend(
                                { module: "SystemManager", fun: "GetPublishSystemInfoByCode" },
                                e
                            ),
                            async: !1,
                        });
                    },
                    getPublishBasicInfoByCode: function (t) {
                        return e("PublishManager", "GetPublishBasicInfoByCode", t);
                    },
                    checkPublishPasswordByCode: function (t) {
                        return e("PublishManager", "CheckPublishPasswordByCode", t);
                    },
                    changePublishDownloadTime: function (t) {
                        return e("PublishManager", "ChangePublishDownloadTime", t);
                    },
                    getProductLogo: function (t) {
                        return e("WebClient", "GetProductLogo", t);
                    },
                    getExpirationTime: function (t) {
                        return e("WebClient", "ExpirationTime", t);
                    },
                    getFolderChildren: function (t) {
                        return e("WebClient", "GetFolderChildren", t);
                    },
                    loadPublishFile: function (t) {
                        return e("WebClient", "LoadPublishFile", t);
                    },
                };
            })();
            return {
                helper: {
                    loading: {
                        show: function () {
                            o.trigger("message:show", { type: "loading" });
                        },
                        hide: function () {
                            o.trigger("message:show", { type: "loaded" });
                        },
                    },
                    msg: {
                        alert: function (e, t) {
                            t
                                ? o.trigger("message:show", { type: "success", message: e })
                                : o.trigger("message:show", { type: "error", message: e });
                        },
                    },
                    isRightClick: function (e) {
                        return 2 === e.button;
                    },
                    getNavigatePath: function (e, t) {
                        return /^1\\/.test(e)
                            ? "doc/enterprise/" + t
                            : /^2\\/.test(e)
                                ? "doc/person/" + t
                                : /^7\\/.test(e)
                                    ? "doc/team/" + t
                                    : "";
                    },
                    getFileThumbIcon: function (e, t, o) {
                        var n = constInfo.getFileIconUrl(o, "48"),
                            i = constInfo.getThumbUrl(t),
                            a = new Image();
                        return (
                            (a.onload = function () {
                                e.thumbUrl(i);
                            }),
                            (a.src = i),
                            n
                        );
                    },
                    getFileListIcon: function (e) {
                        return constInfo.getFileIconUrl(e);
                    },
                    getFolderIcon: function () {
                        return i.getFolderIconUrl();
                    },
                    getArgXml: function (e, t, o, n) {
                        var i = "",
                            a = "",
                            r = "",
                            s = "";
                        null !== e && (i = "<PageSize>" + e + "</PageSize>"),
                            null !== t && (a = "<PageNum>" + t + "</PageNum>"),
                            null !== o && (r = "<SortInfoName>" + o + "</SortInfoName>"),
                            null !== n && (s = "<SortDesc>" + n + "</SortDesc>");
                        var d = "<GetListArgs>" + i + a + r + s + "</GetListArgs>";
                        return encodeURIComponent(d);
                    },
                },
                getCode: function () {
                    return t.getQueryString(
                        window.decodeURIComponent(window.location.href),
                        "code"
                    );
                },
                generalCodeParam: function () {
                    var e,
                        o,
                        n = window.decodeURIComponent(window.location.href);
                    return (
                        t.getQueryString(n, "code")
                            ? ((e = "code"), (o = t.getQueryString(n, "code")))
                            : t.getQueryString(n, "shareCode") &&
                            ((e = "shareCode"), (o = t.getQueryString(n, "shareCode"))),
                        "&" + e + "=" + o
                    );
                },
                ajax: a,
            };
        }
    ),
    define(
        "outpublish/outpublish",
        ["plugins/router", "./service", "cookie", lang()],
        function (e, t, o, n) {
            return {
                router: e,
                activate: function () {
                    return t.getCode()
                        ? e
                            .map([
                                {
                                    route: ["", "view"],
                                    title: n.publish,
                                    moduleId: "outpublish/view/index",
                                    nav: !1,
                                },
                                {
                                    route: "authentication",
                                    title: n.vali,
                                    moduleId: "outpublish/authentication/index",
                                    nav: !1,
                                },
                                {
                                    route: "expire",
                                    title: n.expire,
                                    moduleId: "outpublish/expire/index",
                                    nav: !1,
                                },
                            ])
                            .buildNavigationModel()
                            .activate()
                        : (document.writeln(n.urlCode), !1);
                },
            };
        }
    ),
    define(
        "outpublish/plugins/publishView/list/List",
        [
            commLang(),
            "./../" + lang(),
            "knockout",
            "komapping",
            "underscore",
            "durandal/app",
            "easyuimapping",
            "jquery",
            "../../../service",
            "doc/contextmenu/index",
            "header/userinfo/constinfo",
            "doc/contextmenu/permtype",
        ],
        function (e, t, o, n, i, a, r, s, d, l, c, u) {
            function p() {
                (this.isSelectAll = o.observable(!1)),
                    (this.folderList = o.observableArray([])),
                    (this.fileList = o.observableArray([])),
                    (this.selectedList = o.observableArray([])),
                    (this.columnTitleList = o.observableArray([])),
                    (this.isTriggerColumnTitleStopResize = o.observable(!1)),
                    (this.showPaging = o.observable(!1)),
                    (this.message = "");
            }
            function f(e, t) {
                var o = e.vm,
                    n = e.parent,
                    a = n.vm.publishType(),
                    r = {
                        isPublishFolder: !1,
                        isPublishFile: !1,
                        isSingleFile: !1,
                        isMultiFile: !1,
                        isSingleFolder: !1,
                        isFileAndFolder: !1,
                        isMultiFolder: !1,
                        isInPublishRoot: !1,
                        isInSubFolder: !1,
                        canRefresh: !1,
                        isSelectAllFolde: !1,
                        isDetelefile: !1,
                    };
                if (((r.canRefresh = 0 === o.selectedList().length), a === v.file)) {
                    r.isPublishFile = !0;
                    var s = !1;
                    if (t.length > 0) {
                        for (var d = 0; d < t.length; d++)
                            if (t[d].isSelected) {
                                s = !0;
                                break;
                            }
                        1 === t.length ? (r.isSingleFile = !0) : (r.isMultiFile = !!s);
                        for (var l = 0; l < t.length; l++)
                            if (t[l].data.isDeleted) {
                                r.isDetelefile = !0;
                                break;
                            }
                    }
                }
                if (a === v.folder) {
                    var c = n.vm.publishInfo().publishFolderId,
                        u = n.vm.currentFolder().id;
                    if (
                        ((r.isPublishFolder = !0),
                            u === c ? (r.isInPublishRoot = !0) : (r.isInSubFolder = !0),
                            t.length > 0)
                    )
                        if (1 === t.length)
                            t[0].data.fileType === g.file && (r.isSingleFile = !0),
                                t[0].data.folderType === g.folder && (r.isSingleFolder = !0),
                                ((o && o.isSelectAll && o.isSelectAll()) ||
                                    (t && t[0] && t[0].isSelected)) &&
                                (r.isSelectAllFolde = !0);
                        else {
                            var p = i.countBy(t, function (e) {
                                var t = e.data;
                                return t.fileType === g.file
                                    ? "fileNum"
                                    : t.folderType === g.folder
                                        ? "folderNum"
                                        : void 0;
                            });
                            p.fileNum > 0 && !p.folderNum && (r.isMultiFile = !0),
                                !p.fileNum && p.folderNum > 0 && (r.isMultiFolder = !0),
                                p.fileNum > 0 && p.folderNum > 0 && (r.isFileAndFolder = !0);
                        }
                }
                return r;
            }
            function m(e, t) {
                (this.parent = t),
                    (this.vm = new p()),
                    (this.vf = k),
                    (this.constinfo = c);
            }
            var h = d.helper,
                g = (d.ajax, { folder: 1, file: 2, shortCut: 32 }),
                v = { file: "file", folder: "folder" },
                y = [
                    {
                        Name: "basic:name",
                        Title: t.name,
                        Width: 300,
                        Remark: null,
                        DataType: "docName",
                        SortDesc: !0,
                        isActive: !1,
                        isSort: !0,
                        minWidth: 100,
                    },
                    {
                        Name: "basic:creator",
                        Title: t.creator,
                        Width: 100,
                        Remark: null,
                        DataType: "string",
                        SortDesc: !0,
                        isActive: !1,
                        isSort: !0,
                        minWidth: 100,
                    },
                    {
                        Name: "basic:createTime",
                        Title: t.createTime,
                        Width: 100,
                        Remark: null,
                        DataType: "datetime",
                        SortDesc: !0,
                        isActive: !1,
                        isSort: !0,
                        minWidth: 100,
                    },
                    {
                        Name: "basic:editor",
                        Title: t.editor,
                        Width: 150,
                        Remark: null,
                        DataType: "string",
                        SortDesc: !0,
                        isActive: !1,
                        isSort: !0,
                        minWidth: 100,
                    },
                    {
                        Name: "basic:modifyTime",
                        Title: t.modifyTime,
                        Width: 150,
                        Remark: null,
                        DataType: "datetime",
                        SortDesc: !0,
                        isActive: !1,
                        isSort: !0,
                        minWidth: 100,
                    },
                    {
                        Name: "basic:size",
                        Title: t.size,
                        Width: 100,
                        Remark: null,
                        DataType: "fileSize",
                        SortDesc: !0,
                        isActive: !1,
                        isSort: !0,
                        minWidth: 100,
                    },
                    {
                        Name: "basic:version",
                        Title: t.version,
                        Width: 150,
                        Remark: null,
                        DataType: "version",
                        SortDesc: !0,
                        isActive: !1,
                        isSort: !0,
                        minWidth: 100,
                    },
                    {
                        Name: "basic:downloadTime",
                        Title: t.downloadTime,
                        Width: 160,
                        Remark: null,
                        DataType: "downloadTime",
                        SortDesc: !0,
                        isActive: !1,
                        isSort: !1,
                        minWidth: 100,
                    },
                    {
                        Name: "basic:previewTimes",
                        Title: t.previewTimes,
                        Width: 160,
                        Remark: null,
                        DataType: "previewTimes",
                        SortDesc: !0,
                        isActive: !1,
                        isSort: !1,
                        minWidth: 100,
                    },
                ],
                w = { download: 2, upload: 4, edit: 8 },
                b = function (e) {
                    return {
                        canUpload: (e & w.upload) === w.upload,
                        canEdit: (e & w.edit) === w.edit,
                        canDownload: (e & w.download) === w.download,
                        canDecryptdownload: (e & w.download) === w.download
                    };
                },
                x = {
                    updateToolbarData: function (e) {
                        var t = this,
                            n = t.vm,
                            r = t.parent,
                            s = n.selectedList(),
                            d = !1;
                        if (0 === s.length && r.vm.publishType() === v.folder) {
                            var c = r.vm.currentFolder();
                            (c.data = i.clone(c)),
                                1 === c.id && (c.data.folderType = -1),
                                (s = [c]);
                        } else{
                            0 === s.length &&
                                r.vm.publishType() === v.file &&
                                ((s = n.fileList()), (d = !0));
                        }
                        var u = o.toJS(s);
                        0 !== u.length &&
                            setTimeout(function () {
                                (u[0].operationData = f(t, u)),
                                    (u[0].permissionData = b(r.vm.publishPermission())),
                                    (window.permissionData = u[0].permissionData),
                                    (u[0].permissionData.downloadTime = r.vm.downloadTime()),
                                    d
                                        ? a.trigger("upload:init", {
                                            message: n.message,
                                            select: [],
                                            module: r.vm.viewName(),
                                        })
                                        : a.trigger("upload:init", {
                                            message: n.message,
                                            select: u,
                                            module: r.vm.viewName(),
                                        }),
                                    a.trigger("toolbar:update", {
                                        message: n.message,
                                        select: u,
                                        module: r.vm.viewName(),
                                    }),
                                    e &&
                                    e.showContextMenu &&
                                    l.showMenu(
                                        e.pageX,
                                        e.pageY,
                                        u,
                                        function (e) { },
                                        t,
                                        n.message,
                                        r.vm.viewName()
                                    );
                            }, 10);
                    },
                    initData: function () {
                        var e = this,
                            t = e.vm;
                        t.selectedList([]), t.fileList([]), t.folderList([]);
                    },
                    initSelectable: function (e, t) {
                        var n = this,
                            i = n.vm;
                        s(e).selectable({
                            filter: t,
                            distance: 10,
                            selecting: function (e, t) {
                                var a = o.dataFor(t.selecting);
                                a.isSelected() ||
                                    (a.isSelected(!0), i.selectedList.push(a), n.isSelectAll()),
                                    n.updateSelectAll();
                            },
                            unselecting: function (e, t) {
                                var a = o.dataFor(t.unselecting);
                                a.isSelected() && (a.isSelected(!1), i.selectedList.remove(a)),
                                    n.updateSelectAll();
                            },
                            start: function (e, t) {
                                n.clearSelectedList();
                            },
                            stop: function (e, t) {
                                n.updateSelectAll(), n.updateToolbarData();
                            },
                        });
                    },
                    previewFile: function (e) {
                        if (constInfo.productCanPreview())
                            return (
                                a.trigger("component:show", {
                                    moduleId: "doc/download/index",
                                    datas: [{ fileType: 2, id: e.id }],
                                    message: "",
                                    moduleName: "",
                                }),
                                !1
                            );
                        if ((e.perm & u.preview) !== u.preview)
                            return h.msg.alert(t.publish_tip), !1;
                        var o = constInfo.systemInfo.previewUrl,
                            n = s.format(
                                o + "?fileid={0}&ispublish=true&code={1}",
                                e.id,
                                d.getCode()
                            );
                        return window.open(n), !0;
                    },
                    formatColumnTitleList: function (t) {
                        return (
                            i.each(t, function (t, o, n) {
                                switch (
                                ((t.Title = e[t.Name] || t.Title),
                                    (void 0 != t.SortDesc && null != t.SortDesc) ||
                                    (t.SortDesc = !0),
                                    (void 0 != t.isActive && null != t.isActive) ||
                                    (t.isActive = !1),
                                    (t.minWidth = 100),
                                    t.DataType)
                                ) {
                                    case "docName":
                                        t.Width = t.Width || 300;
                                        break;
                                    case "string":
                                    case "datetime":
                                        t.Width = t.Width || 150;
                                        break;
                                    case "fileSize":
                                    case "version":
                                        t.Width = t.Width || 120;
                                        break;
                                    case "remark":
                                        t.Width = t.Width || 200;
                                        break;
                                    default:
                                        t.Width = t.Width || 200;
                                }
                            }),
                            n.fromJS(t)()
                        );
                    },
                    updateSortStatus: function () {
                        var e = this,
                            t = e.parent.vm,
                            o = e.vm;
                        i.find(o.columnTitleList(), function (e) {
                            return e.Name() === t.sortField();
                        }).SortDesc(t.sortDesc.peek());
                    },
                    refreshView: function (e, t) {
                        var o = this,
                            n = o.vm;
                        if ((o.initData(), 0 === n.columnTitleList().length)) {
                            var i = o.formatColumnTitleList(y);
                            n.columnTitleList(i);
                        }
                        if (
                            (n.fileList(e.fileList), n.folderList(e.folderList), o.parent)
                        ) {
                            o.vm.showPaging(o.parent.vm.totalCount() > 10),
                                o.updateSortStatus(),
                                o.updateToolbarData();
                            var a = "." + o.parent.vm.viewName() + " .document-list-body";
                            s(a).perfectScrollbar("update");
                        }
                        o.updateSelectAll();
                    },
                },
                T = {
                    isSelectAll: function () {
                        var e = this,
                            t = e.vm;
                        return (
                            (0 !== t.selectedList().length ||
                                t.folderList().length + t.fileList().length !== 0) &&
                            t.selectedList().length ===
                            t.folderList().length + t.fileList().length
                        );
                    },
                    updateSelectAll: function () {
                        var e = this;
                        e.vm.isSelectAll(e.isSelectAll());
                    },
                    clearSelectedList: function () {
                        var e = this,
                            t = e.vm;
                        i.each(t.selectedList(), function (e, t, o) {
                            e.isSelected(!1);
                        }),
                            t.selectedList([]);
                    },
                    selectAllOrNot: function () {
                        var e = this,
                            t = e.vm;
                        e.isSelectAll()
                            ? e.clearSelectedList()
                            : (t.selectedList([]),
                                i.each(t.folderList(), function (e, o, n) {
                                    e.isSelected(!0), t.selectedList.push(e);
                                }),
                                i.each(t.fileList(), function (e, o, n) {
                                    e.isSelected(!0), t.selectedList.push(e);
                                })),
                            e.updateSelectAll();
                    },
                },
                I = null,
                k = {
                    onCheckboxSelectAllClick: function (e, t, o) {
                        if (!h.isRightClick(o)) {
                            var n = t;
                            n.selectAllOrNot(), n.updateToolbarData();
                        }
                    },
                    onItemSelectClick: function (e, t, n) {
                        if (!h.isRightClick(n)) {
                            var i = o.contextFor(n.target).$root,
                                a = i.vm;
                            n.stopPropagation(),
                                t.isSelected()
                                    ? a.selectedList.push(t)
                                    : a.selectedList.remove(t),
                                i.updateSelectAll(),
                                i.updateToolbarData();
                        }
                    },
                    onFolderClick: function (e, t) {
                        if (!h.isRightClick(t)) {
                            t.stopPropagation();
                            var n = o.contextFor(t.target).$parent,
                                i = o.contextFor(t.target).$root,
                                a = n.data;
                            i.parent.vm.pageNumber(1), i.parent.loadData(a.id);
                        }
                    },
                    onFileClick: function (e, n) {
                        if (!h.isRightClick(n)) {
                            var i = o.contextFor(n.target).$parent,
                                r = o.contextFor(n.target).$root;
                            n.stopPropagation();
                            var s = i.data,
                                d = null;
                            if (s.isDeleted)
                                return void a.trigger("message:show", {
                                    type: "error",
                                    message: t.fileDeleted,
                                });
                            if (s.isMorePreviewTimes)
                                return void a.trigger("message:show", {
                                    type: "error",
                                    message: t.morePreviewTime,
                                });
                            if (s.fileType === g.shortCut) {
                                var l = s.shortcut;
                                if (
                                    ((d = {
                                        id: l.entryId,
                                        type: l.entryType,
                                        name: l.entryName,
                                        path: l.entryPath,
                                        perm: l.entryPermission,
                                        data: s,
                                    }),
                                        l.entryType === g.folder)
                                ) {
                                    if ((d.perm & u.display) !== u.display)
                                        return void h.msg.alert(t.publish_tip3);
                                    r.parent.loadData(d.id);
                                } else r.previewFile(d);
                            } else
                                (d = {
                                    id: s.id,
                                    type: s.fileType,
                                    name: s.name,
                                    path: s.path,
                                    perm: s.permission,
                                    data: s,
                                }),
                                    r.previewFile(d);
                        }
                    },
                    onItemContextClick: function (e, t) {
                        var n = o.contextFor(t.target).$root,
                            a = n.vm;
                        n.parent;
                        t.stopPropagation();
                        var r = a.selectedList();
                        i.contains(r, e) ||
                            (0 !== r.length && n.clearSelectedList(),
                                e.isSelected(!0),
                                a.selectedList.push(e)),
                            n.updateSelectAll(),
                            n.updateToolbarData({
                                showContextMenu: !0,
                                pageX: t.pageX - 60,
                                pageY: t.pageY - 10,
                            });
                    },
                    onSpaceContextClick: function (e, t) {
                        var n = o.contextFor(t.target).$root;
                        n.vm;
                        n.parent.vm.publishType() !== v.file &&
                            (n.clearSelectedList(),
                                n.updateSelectAll(),
                                n.updateToolbarData({
                                    showContextMenu: !0,
                                    pageX: t.pageX - 60,
                                    pageY: t.pageY - 10,
                                }));
                    },
                    onSpaceClick: function (e, t) {
                        if (!h.isRightClick(t)) {
                            var n = o.contextFor(t.target).$root;
                            n.clearSelectedList(), n.updateSelectAll(), n.updateToolbarData();
                        }
                    },
                    onColumnTitleStartResize: function (e) {
                        var t = e.target;
                        I = t;
                        var n = o.contextFor(t).$root;
                        n.parent &&
                            s("." + n.parent.vm.viewName() + " .document-list-header th").css(
                                "cursor",
                                "e-resize"
                            );
                    },
                    onColumnTitleStopResize: function (e) {
                        var t = e.target,
                            n = o.contextFor(t).$root,
                            i = s(t).attr("index");
                        i ||
                            ((t = I), (n = o.contextFor(t).$root), (i = s(t).attr("index")));
                        var a = s(t).width();
                        n.vm.columnTitleList()[i].Width(a),
                            n.vm.isTriggerColumnTitleStopResize(!0),
                            n.parent &&
                            s(
                                "." + n.parent.vm.viewName() + " .document-list-header th"
                            ).css("cursor", "pointer");
                    },
                    onColumnTitleClick: function (e, t) {
                        if (
                            "basic:downloadTime" != e.Name() &&
                            "basic:previewTimes" != e.Name() &&
                            !h.isRightClick(t)
                        ) {
                            var n = o.contextFor(t.target).$root,
                                r = n.vm;
                            if (r.isTriggerColumnTitleStopResize())
                                return void r.isTriggerColumnTitleStopResize(!1);
                            i.each(n.vm.columnTitleList(), function (e, t, o) {
                                e.isActive(!1);
                            }),
                                e.isActive(!0),
                                e.SortDesc(!e.SortDesc());
                            var s = n.parent,
                                d = s.vm;
                            d.sortField(e.Name()),
                                d.sortDesc(e.SortDesc.peek()),
                                d.currentFolder()
                                    ? a.trigger("folder-publish:load", {
                                        text: "pagination",
                                        id: d.currentFolder().id,
                                    })
                                    : n.parent.loadData();
                        }
                    },
                    onGridRowClick: function (e, t) {
                        if (!h.isRightClick(t)) {
                            e.data && e.data.fileType && (e.data.type = e.data.fileType),
                                e.data &&
                                e.data.folderType &&
                                (e.data.type = e.data.folderType),
                                t.stopPropagation();
                            var n = o.contextFor(t.target).$root,
                                i = n.vm;
                            n.clearSelectedList(),
                                e.isSelected(!0),
                                i.selectedList.push(e),
                                n.updateSelectAll(),
                                n.updateToolbarData();
                        }
                    },
                },
                S = {
                    attached: function (e, t, o) {
                        var n = o.bindingContext.$data,
                            r = this;
                        (r.parent = n),
                            (r.vm.message = n.vm.viewName() + ":reload"),
                            r.vm.showPaging(n.vm.totalCount() > 10),
                            r.updateToolbarData();
                        var d = s(e)
                            .find(".v5-pagination")
                            .pagination({
                                context: r,
                                showPageList: !0,
                                pageList: [10, 20, 30, 40, 50],
                                total: n.vm.totalCount(),
                                pageNumber: n.vm.pageNumber(),
                                onSelectPage: function (e, t) {
                                    var o = s(this).pagination("options"),
                                        n = o.context;
                                    n.parent.vm.pageNumber(e), n.parent.vm.pageSize(t);
                                    n.parent.vm.currentFolder()
                                        ? a.trigger("folder-publish:load", {
                                            text: "pagination",
                                            id: n.parent.vm.currentFolder().id,
                                        })
                                        : n.parent.loadData();
                                },
                            });
                        r.pager = d;
                        var l = "." + n.vm.viewName() + " .document-list-body";
                        r.initSelectable(l, ".document-list-item"), s(l).perfectScrollbar();
                        var c = i.throttle(function () {
                            s(l).selectable("refresh");
                        }, 250),
                            u = i.throttle(function () {
                                var e = s(l + " table").width();
                                s("." + n.vm.viewName() + " .v5-pagination").css(
                                    "width",
                                    e + "px"
                                );
                                var t = s(l).get(0);
                                s("." + n.vm.viewName() + " .document-list-header table").css(
                                    "left",
                                    -t.scrollLeft + "px"
                                );
                            }, 10),
                            p = i.debounce(function () {
                                s(l).perfectScrollbar("update");
                            }, 150);
                        s(l).off("ps-scroll-y").on("ps-scroll-y", c),
                            s(l).off("ps-scroll-x").on("ps-scroll-x", u),
                            s(window).off("resize.docView").on("resize.docView", p);
                    },
                };
            return s.extend(m.prototype, x, S, T), m;
        }
    ),
    define(
        "outpublish/plugins/publishView/DocView",
        [
            commLang(),
            lang(),
            "knockout",
            "jquery",
            "underscore",
            "../../service",
            "durandal/app",
            "./list/List",
            "header/userinfo/constinfo",
            "edoc2ErrorCode",
            "plugins/router",
        ],
        function (e, t, o, n, i, a, r, s, d, l, c) {
            function u(e) {
                var t = e.name;
                32 == e.fileType && (t = e.shortcut.entryName);
                var o = !0;
                return (
                    constInfo.systemInfo.instanceConfigInfo.grayFileCanNotPreview &&
                    !constInfo.checkExtCanPreview(t) &&
                    (o = !1),
                    o
                );
            }
            function p(e, n) {
                function a(e) {
                    var n = { data: e };
                    return (
                        i.each(r, function (i, a, r) {
                            if (void 0 != e[i]) {
                                switch (i) {
                                    case "createTime":
                                    case "modifyTime":
                                        n[i] = constInfo.getDateInterval(e[i]);
                                        break;
                                    case "archiveTime":
                                    case "effectiveTime":
                                    case "expirationTime":
                                        (n[i] = constInfo.getDateInterval(e.effectiveTime)),
                                            0 === n[i].indexOf("1-") && (n[i] = "");
                                        break;
                                    case "state":
                                        n[i] = t["DocState" + e[i]];
                                        break;
                                    default:
                                        n[i] = e[i];
                                }
                                void 0 != e.folderType && 1 == e.folderType
                                    ? (n.size = "-")
                                    : "0" === n.size
                                        ? (n.size = "")
                                        : (n.size = constInfo.formatSize(parseInt(e.size)));
                            } else
                                switch (i) {
                                    case "creator":
                                        n[i] = e.creatorName;
                                        break;
                                    case "editor":
                                        n[i] = e.editorName;
                                        break;
                                    case "downloadTime":
                                        var s = e.nowDownloadCount;
                                        n[i] = o.observable(void 0 !== s ? s : "-");
                                        break;
                                    case "version":
                                        n[i] = void 0 === e.lastVerNumStr ? "-" : e.lastVerNumStr;
                                        break;
                                    case "previewTimes":
                                        var d = e.nowPreviewCount;
                                        n[i] = o.observable(void 0 !== d ? d : "-");
                                }
                        }),
                        (n.isSelected = o.observable(!1)),
                        n
                    );
                }
                var r = i.map(b, function (e) {
                    return e.Name.split(":")[1];
                }),
                    s = e.FilesInfo,
                    d = e.FoldersInfo;
                return (
                    (d = i.map(d, function (e) {
                        return a(e);
                    })),
                    (s = i.map(s, function (e) {
                        var t = a(e),
                            n = "";
                        if (
                            ((t.iconUrl = o.observable()),
                                e.fileType === v.shortcut && e.shortcut)
                        ) {
                            n =
                                e.shortcut.entryType === v.folder
                                    ? y.getFolderIcon()
                                    : y.getFileListIcon(e.shortcut.entryName);
                            var i = t.name.lastIndexOf(".link");
                            i > -1 && (t.name = t.name.substring(0, i));
                        } else n = y.getFileListIcon(t.name);
                        t.iconUrl(n);
                        var r = u(e);
                        return (t.canPreview = o.observable(r)), t;
                    })),
                    { fileList: s, folderList: d }
                );
            }
            function f(e) {
                (this.activeView = o.observable()),
                    (this.code = o.observable()),
                    (this.publishInfo = o.observable()),
                    (this.publishType = o.observable()),
                    (this.currentFolder = o.observable(null)),
                    (this.publishPermission = o.observable()),
                    (this.currentSubViewType = o.observable(h.list)),
                    (this.viewName = o.observable(e)),
                    (this.sortDesc = o.observable(!1)),
                    (this.sortField = o.observable("basic:name")),
                    (this.pageSize = o.observable(10)),
                    (this.pageNumber = o.observable(1)),
                    (this.totalCount = o.observable(1)),
                    (this.navPathList = o.observableArray([
                        { id: -1, text: t.publish_list },
                    ])),
                    (this.downloadTime = o.observable(0)),
                    (this.verifyCode = o.observable());
            }
            function m(e) {
                var t = this;
                (this.viewName = e), (t.vm = new f(e)), (t.list = new s(e, this));
            }
            var h = { thumbnail: "thumbnail", list: "list" },
                g = { file: "file", folder: "folder" },
                v = { folder: 1, file: 2, shortcut: 32 },
                y = a.helper,
                w = a.ajax,
                b = [
                    {
                        Name: "basic:name",
                        Title: t.name,
                        Width: 300,
                        Remark: null,
                        DataType: "docName",
                        SortDesc: !0,
                        isActive: !1,
                        isSort: !0,
                        minWidth: 100,
                    },
                    {
                        Name: "basic:size",
                        Title: t.size,
                        Width: 100,
                        Remark: null,
                        DataType: "fileSize",
                        SortDesc: !0,
                        isActive: !1,
                        isSort: !0,
                        minWidth: 100,
                    },
                    {
                        Name: "basic:creator",
                        Title: t.creator,
                        Width: 100,
                        Remark: null,
                        DataType: "string",
                        SortDesc: !0,
                        isActive: !1,
                        isSort: !0,
                        minWidth: 100,
                    },
                    {
                        Name: "basic:createTime",
                        Title: t.createTime,
                        Width: 100,
                        Remark: null,
                        DataType: "datetime",
                        SortDesc: !0,
                        isActive: !1,
                        isSort: !0,
                        minWidth: 100,
                    },
                    {
                        Name: "basic:editor",
                        Title: t.editor,
                        Width: 150,
                        Remark: null,
                        DataType: "string",
                        SortDesc: !0,
                        isActive: !1,
                        isSort: !0,
                        minWidth: 100,
                    },
                    {
                        Name: "basic:modifyTime",
                        Title: t.modifyTime,
                        Width: 150,
                        Remark: null,
                        DataType: "datetime",
                        SortDesc: !0,
                        isActive: !1,
                        isSort: !0,
                        minWidth: 100,
                    },
                    {
                        Name: "basic:version",
                        Title: t.version,
                        Width: 150,
                        Remark: null,
                        DataType: "version",
                        SortDesc: !0,
                        isActive: !1,
                        isSort: !0,
                        minWidth: 100,
                    },
                    {
                        Name: "basic:downloadTime",
                        Title: t.downloadTime,
                        Width: 100,
                        Remark: null,
                        DataType: "downloadTime",
                        SortDesc: !0,
                        isActive: !1,
                        isSort: !1,
                        minWidth: 100,
                    },
                    {
                        Name: "basic:previewTimes",
                        Title: t.previewTimes,
                        Width: 100,
                        Remark: null,
                        DataType: "previewTimes",
                        SortDesc: !0,
                        isActive: !1,
                        isSort: !1,
                        minWidth: 100,
                    },
                ],
                x = {
                    changeActiveView: function (e) {
                        var t = this,
                            o = t.vm;
                        o.pageNumber(1).currentSubViewType(e),
                            o.currentViewId(o.lastViewId()),
                            t.loadData();
                    },
                    registerEvents: function () {
                        var e = this,
                            t = e.vm;
                        r.on("publish:download:success").then(function () {
                            e.list.updateToolbarData();
                            for (var t = e.list.vm.selectedList(), o = 0; o < t.length; o++)
                                t[o].data.folderType !== v.folder &&
                                    t[o].downloadTime(t[o].downloadTime() + 1);
                        }),
                            r.on("folder-publish:load", function (t) {
                                if (-1 !== t.id) {
                                    var o = e.vm.navPathList(),
                                        n = null;
                                    i.each(o, function (e, o, i) {
                                        e.id === t.id && (n = o);
                                    }),
                                        e.vm.navPathList(o.slice(0, n)),
                                        e.loadData(t.id);
                                }
                            }),
                            r.on("folder-publish:back").then(function () {
                                -1 !== i.last(e.vm.navPathList()).id && e.vm.navPathList.pop();
                                var t = e.vm.navPathList.pop();
                                e.vm.pageNumber(1), e.loadData(t.id);
                            }),
                            r.on(e.viewName + ":reload").then(function () {
                                t.currentFolder()
                                    ? r.trigger("folder-publish:load", {
                                        text: "pagination",
                                        id: t.currentFolder().id,
                                    })
                                    : e.loadData();
                            }),
                            r.on("publish:downloadTime:update", function (e) {
                                t.downloadTime(e);
                            });
                    },
                    refreshSubView: function (e) {
                        var t = this,
                            o = t.vm,
                            n = e.docListInfo;
                        o.currentSubViewType() === h.list
                            ? ((n = p(n, h.list)),
                                o.activeView(t.list),
                                t.list.refreshView(n, e))
                            : o.currentSubViewType() === h.thumbnail &&
                            ((n = p(n, h.thumbnail)),
                                o.activeView(t.thumb),
                                t.thumb.refreshView(n, e));
                    },
                    loadData: function (e) {
                        var o = this,
                            n = o.vm;
                        if ((y.loading.show(), n.publishType() === g.file))
                            w.loadPublishFile({
                                code: n.code(),
                                argsXml: y.getArgXml(
                                    n.pageSize(),
                                    n.pageNumber(),
                                    n.sortField(),
                                    n.sortDesc()
                                ),
                            }).done(function (e) {
                                0 == e.result
                                    ? (o.setPaginationData(e),
                                        o.updatePagination(e),
                                        o.refreshSubView(e),
                                        r.trigger("navigation:init", {
                                            message: "file-publish",
                                            paths: n.navPathList(),
                                        }))
                                    : y.msg.alert(l["ErrorCode" + e.result]),
                                    y.loading.hide();
                            });
                        else if (n.publishType() === g.folder) {
                            var i;
                            (i =
                                null === n.currentFolder()
                                    ? n.publishInfo().publishFolderId
                                    : e),
                                w
                                    .getFolderChildren({
                                        fid: i,
                                        docViewId: 0,
                                        code: n.code(),
                                        argsXml: y.getArgXml(
                                            n.pageSize(),
                                            n.pageNumber(),
                                            n.sortField(),
                                            n.sortDesc()
                                        ),
                                    })
                                    .done(function (e) {
                                        if (0 == e.result) {
                                            var i = e.thisFolder;
                                            e.verifyCode && o.parent.vm.verifyCode(e.verifyCode),
                                                i &&
                                                0 == i.permission &&
                                                r.trigger("message:show", {
                                                    type: "error",
                                                    message: t.publishUserNoPerm,
                                                }),
                                                o.updateNavbar({ id: i.id, text: i.name }),
                                                n.currentFolder(i),
                                                o.setPaginationData(e),
                                                o.updatePagination(e),
                                                o.refreshSubView(e);
                                        } else 1 == e.result ? c.navigate("expire") : y.msg.alert(l["ErrorCode" + e.result]);
                                        y.loading.hide();
                                    });
                        }
                    },
                    setPaginationData: function (e) {
                        var t = this,
                            o = t.vm,
                            n = e.docListInfo.Settings;
                        o.totalCount(n.totalCount);
                    },
                    updateNavbar: function (e) {
                        var t = this,
                            o = t.vm;
                        e && o.navPathList.push(e),
                            r.trigger("navigation:init", {
                                message: "folder-publish:load",
                                paths: o.navPathList(),
                            });
                    },
                    updatePagination: function () {
                        var e = this,
                            t = e.vm;
                        e.list.pager &&
                            e.list.pager.pagination({
                                pageNumber: t.pageNumber(),
                                pageSize: t.pageSize(),
                                total: t.totalCount(),
                            });
                    },
                },
                T = {
                    compositionComplete: function (e, t, o) {
                        var n = o.bindingContext.$data,
                            i = n.vm.publishInfo,
                            r = this;
                        r.parent = n;
                        var s = r.vm;
                        s.pageNumber(1),
                            s.code(a.getCode()),
                            s.publishInfo(i),
                            s.publishType(i.publishType),
                            s.publishPermission(i.publishPermission),
                            s.downloadTime(i.publishDownTime),
                            r.loadData(),
                            r.registerEvents();
                    },
                };
            return n.extend(m.prototype, x, T), m;
        }
    ),
    define(
        "outpublish/view/index",
        [
            "jquery",
            "knockout",
            "../service",
            "header/userinfo/cookie",
            "plugins/router",
            "common/edoc2v5-qrcode",
            "durandal/app",
            "../plugins/publishView/DocView",
            lang(),
            "doc/toolbar/index",
            "header/userinfo/constinfo",
            "md5",
        ],
        function (
            $,
            ko,
            service,
            cookie,
            router,
            qrcodeHandler,
            app,
            DocView,
            lang,
            Toolbar,
            constinfo
        ) {
            function InterceptEvent() { }
            function verifyByCode(e) {
                if (
                    (window.document.getElementsByClassName ||
                        (location.href = constInfo.systemInfo.loginPageUrl),
                        !e)
                )
                    return !1;
                ajax.getPublishBasicInfoByCode({ code: e }).done(function (t) {
                    if (void 0 === t.publishExpired || 1 === t.publishExpired)
                        return void router.navigate("expire");
                    if ((getExpirationTime(), t.authType === authTypeData.needPwd)) {
                        var o = window.unescape(cookie(e) || "");
                        ajax
                            .checkPublishPasswordByCode({ code: e, password: o })
                            .done(function (t) {
                                if (
                                    0 === t.result &&
                                    void 0 != t.pwd &&
                                    t.pwd == $.md5(o + e)
                                ) {
                                    ajax
                                        .GetPublishSystemInfoByCode({ code: e })
                                        .done(function (e) {
                                            if (e.result && 5 == e.result) return !1;
                                            constInfo.systemInfo = e.systemInfo;
                                        }),
                                        vm.isVerifyOk(!0),
                                        setPublishInfo(e);
                                    var n = document.URL;
                                    n && n.indexOf("fileid=") > -1
                                        ? ((n = n.replace("outpublish.html", "preview.html")),
                                            router.navigate(n))
                                        : afterVerifyOk();
                                } else cookie(e, null), router.navigate("authentication");
                            });
                    } else
                        ajax.GetPublishSystemInfoByCode({ code: e }).done(function (e) {
                            if (e.result && 5 == e.result) return !1;
                            constInfo.systemInfo = e.systemInfo;
                        }),
                            setPublishInfo(e),
                            vm.isVerifyOk(!0),
                            afterVerifyOk();
                });
            }
            function setPublishInfo(e) {
                ajax.getPublishInfoByCode({ code: e }).done(function (e) {
                    (vm.publishInfo = e),
                        vm.downloadTime(e.publishDownTime),
                        getExpirationTime();
                });
            }
            function afterVerifyOk() {
                setTimeout(function () {
                    vm.informationbarView("doc/informationbar/index");
                    var e = new DocView("outpublish");
                    vm.activeView(e);
                }, 300);
            }
            function getExpirationTime() {
                ajax.getExpirationTime({ code: code }).done(function (e) {
                    var t = formatDateString(e.publishEndTime);
                    formatDateString(e.currentTime);
                    vm.expireTime(lang.expiryTime + t.split(" ")[0]),
                        countDown(getTimeSpan(e.currentTime, e.publishEndTime));
                });
            }
            function countDown(e) {
                var t = setInterval(function () {
                    var o, n, i, a, r;
                    (o = e),
                        o > 0
                            ? ((n = Math.floor(o / 864e5)),
                                (o -= 864e5 * n),
                                (i = Math.floor(o / 36e5)),
                                (o -= 36e5 * i),
                                (a = Math.floor(o / 6e4)),
                                (o -= 6e4 * a),
                                (r = Math.floor(o / 1e3)),
                                (countDown =
                                    lang.countDown +
                                    n +
                                    lang.day +
                                    fillZero(i) +
                                    lang.hour +
                                    fillZero(a) +
                                    lang.minute +
                                    fillZero(r) +
                                    lang.second),
                                (e -= 1e3),
                                vm.remainTime(countDown))
                            : (vm.remainTime(lang.expired),
                                router.navigate("expire"),
                                clearInterval(t));
                }, 1e3);
            }
            function getTimeSpan(e, t) {
                var o = /\/Date\(([0-9]+)\+([0-9]+)/;
                return (
                    o.exec(e),
                    (e = RegExp.$1),
                    (o.lastIndex = 0),
                    o.exec(t),
                    (t = RegExp.$1),
                    parseInt(t) - parseInt(e)
                );
            }
            function fillZero(e) {
                return (e = parseInt(e)), e < 10 ? "0" + e : e;
            }
            function formatDateString(e) {
                /\/Date\(([0-9]+)\+([0-9]+)/.exec(e);
                var t = RegExp.$1,
                    o = new Date(parseInt(t));
                return (
                    o.getFullYear() +
                    "/" +
                    (o.getMonth() + 1) +
                    "/" +
                    o.getDate() +
                    " " +
                    fillZero(o.getHours()) +
                    ":" +
                    fillZero(o.getMinutes()) +
                    ":" +
                    fillZero(o.getSeconds())
                );
            }
            function registerEvents() {
                switch (
                (app.on("templatelist:reload").then(function (e) {
                    "Refresh" == e && app.trigger("outpublishlist:reload", "");
                }),
                    $("#publishview").mousemove(function (e) {
                        $("#changeIcon").attr("class", "logo-view-up"),
                            $("#isshow-Langer").css("visibility", "visible");
                    }),
                    $("#publishview").mouseout(function (e) {
                        $("#changeIcon").attr("class", "logo-view-down"),
                            $("#isshow-Langer").css("visibility", "hidden");
                    }),
                    $("#Multilingualism").text(lang.Multilingualism),
                    $.cookie("lang"))
                ) {
                    case "zh-cn":
                        $("#changelogo").attr("class", "log-icon-zh-cn"),
                            $("#changelogo").text("简体中文");
                        break;
                    case "en":
                        $("#changelogo").attr("class", "log-icon-en"),
                            $("#changelogo").text("English");
                        break;
                    case "ja":
                        $("#changelogo").attr("class", "log-icon-ja"),
                            $("#changelogo").text("日本語");
                        break;
                    case "zh-tw":
                        $("#changelogo").attr("class", "log-icon-zh-tw"),
                            $("#changelogo").text("繁體中文");
                }
                app.on("component:show").then(function (e) {
                    switch (
                    (datas(e.datas),
                        moduleName(e.moduleName),
                        message(e.message),
                        moduleRemark(e.moduleRemark || ""),
                        (vm.node = e),
                        e.moduleId)
                    ) {
                        case "component/upload/index":
                            (e.datas.showWindow = !0),
                                (e.datas.isOutpublish = !0),
                                app.trigger("upload:show", e.datas);
                            break;
                        default:
                            vm.component(null), vm.component(e.moduleId);
                    }
                }),
                    app.on("publish:downloadTime:update", function (e) {
                        vm.downloadTime(e);
                    });
            }
            function initView() {
                setLogo(), setQrcode(), registerEvents();
            }
            var ajax = service.ajax,
                hp = service.hp,
                datas = ko.observableArray([]),
                message = ko.observable(),
                moduleName = ko.observable(),
                moduleRemark = ko.observable(),
                viewmodel = {
                    activeView: ko.observable(null),
                    code: null,
                    publishInfo: null,
                    productBase64Logo: ko.observable(""),
                    navigationView: ko.observable("outpublish/plugins/navigation/index"),
                    informationbarView: ko.observable(""),
                    toolbarView: Toolbar.createToolbar(Toolbar.createToolbar()),
                    menuView: ko.observable("doc/contextmenu/index"),
                    docSetBarView: ko.observable("outpublish/plugins/docsetbar/index"),
                    isVerifyOk: ko.observable(!1),
                    component: ko.observable(null),
                    upload: ko.observable("component/upload/index"),
                    message: ko.observable("component/message/index"),
                    node: null,
                    expireTime: ko.observable(""),
                    remainTime: ko.observable(""),
                    downloadTime: ko.observable(0),
                    verifyCode: ko.observable(""),
                },
                vm = viewmodel,
                pt = InterceptEvent.prototype;
            (pt.intercept = function () {
                this.bindComputed(),
                    app.on("toolbar:update").then(function (e) {
                        ko.$store.dispatch("setCurrent", e.select, e.module, e.message);
                    }),
                    $(window).on("resize.docpanel", function () {
                        vm.toolbarView.moduleName && vm.toolbarView.reLoadSize();
                    });
            }),
                (pt.bindComputed = function () {
                    ko.computed(function () {
                        var e = ko.$store.state.currentData();
                        e && vm.toolbarView.refreshData(e);
                    });
                });
            var authTypeData = { needPwd: 2, noPwd: 1 },
                setLogo = function () {
                    vm.productBase64Logo(constInfo.productInfo.ProductLogo);
                },
                setQrcode = function () {
                    var e = window.location.href,
                        t =
                            (window.location.protocol,
                                window.location.host,
                                window.location.search,
                                window.location.pathname,
                                $.cookie("tkn"),
                                "");
                    qrcodeHandler.makeHoverQrcode({
                        selector: ".publish-qrcode",
                        width: 150,
                        height: 150,
                        position: "bottom",
                        hideDelay: 200,
                        isOutpublish: !0,
                        getNewContent: function () {
                            return (t = $.getQueryString("code")
                                ? window.location.origin +
                                "/publish.html?code=" +
                                code +
                                "#publish/publish"
                                : e);
                        },
                        onShow: function () {
                            var e = $(this),
                                t = this.getBoundingClientRect();
                            e.tooltip("tip").css({ left: t.left - 78 + "px" }),
                                e
                                    .tooltip("tip")
                                    .unbind()
                                    .bind("mouseenter", function () {
                                        e.tooltip("show");
                                    })
                                    .bind("mouseleave", function () {
                                        e.tooltip("hide");
                                    });
                        },
                    });
                };
            return {
                vm: vm,
                datas: datas,
                moduleName: moduleName,
                message: message,
                lang: lang,
                moduleRemark: moduleRemark,
                binding: function () {
                    return new InterceptEvent().intercept(), { cacheViews: !0 };
                },
                attached: function () {
                    (code = service.getCode()), verifyByCode(code), initView();
                },
                compositionComplete: function (e, t, o) { },
                ChangeLanguage: function () {
                    var theEvent = window.event || arguments.callee.caller.arguments[0],
                        $target = $(theEvent.target),
                        lng = $target.data("lang"),
                        oUrl = location.href.toString(),
                        nUrl = "";
                    if (($.cookie("lang", lng), oUrl.indexOf("lang=") > 0)) {
                        var re = eval("/(lang=)([^&]*)/gi");
                        nUrl = oUrl.replace(re, "lang=" + lng + "#view");
                    } else nUrl = oUrl.replace("#view", "&lang=" + lng + "#view");
                    location.href = nUrl;
                },
                do_about: function (e, t) {
                    app.trigger("component:show", {
                        moduleId: "../header/about/about",
                        moduleName: "about",
                        datas: "",
                        message: "",
                    });
                },
            };
        }
    ),
    define(
        "outpublish/authentication/index",
        [
            "plugins/router",
            "durandal/app",
            "knockout",
            "header/userinfo/cookie",
            lang(),
            "../service",
            "jquery",
            "header/userinfo/constinfo",
            "md5",
        ],
        function (router, app, ko, cookie, lang, service, $, constinfo) {
            var ajax = service.ajax,
                infoHtml = lang.ok + app.title + lang.sendFile,
                userFace = ko.observable();
            constInfo.getLang() &&
                "en" == constInfo.getLang() &&
                (infoHtml = " sent you a file or files ");
            var publishInfoHtml = ko.observable(infoHtml),
                passwordText = ko.observable(""),
                code = "",
                logo = ko.observable(),
                backgroundImage = ko.observable(),
                verifyPassword = function () {
                    var e = passwordText().trim();
                    ajax
                        .checkPublishPasswordByCode({ password: e, code: code })
                        .done(function (t) {
                            0 === t.result && void 0 != t.pwd && t.pwd == $.md5(e + code)
                                ? (cookie(code, window.escape(e)),
                                    router.navigate("view"),
                                    location.reload())
                                : (cookie(code, null),
                                    passwordText(""),
                                    2 == t.result
                                        ? $.messager.alert(
                                            lang.tip,
                                            $.format(lang.authlock_tip, t.locktime),
                                            "warning"
                                        )
                                        : $.messager.alert(lang.tip, lang.auth_tip, "warning"));
                        });
                },
                passwordOnblur = function () {
                    $(".pwd-input").removeClass("focus");
                },
                passwordonFocus = function () {
                    $(".pwd-input").addClass("focus");
                },
                onKeydown = function (e, t) {
                    return 13 === t.keyCode && verifyPassword(), !0;
                },
                getPublishInfo = function (e, t) {
                    return ajax.getPublishBasicInfoByCode({ code: e }).done(function (e) {
                        var t = "/ImageType/GetUserAvatar?&userId=" + e.publishUserId;
                        userFace("url(" + t + ") no-repeat center center transparent"),
                            publishInfoHtml(e.publishUserName + infoHtml),
                            1 === e.authType && router.navigate("view");
                    });
                };
            return {
                activate: function () {
                    var e = $.Deferred();
                    return (
                        !!(code = service.getCode()) &&
                        (cookie(code, null),
                            getPublishInfo(code),
                            logo(constinfo.productInfo.ProductLogo),
                            $.ajax({
                                data: { module: "PublishManager", fun: "GetLoginBackground" },
                            }).done(function (t) {
                                backgroundImage("url(" + t.loginBackground + ")"), e.resolve();
                            }),
                            e.promise())
                    );
                },
                binding: function () {
                    return { cacheViews: !0 };
                },
                compositionComplete: function (e, t, o) {
                    switch (
                    ($(".password").focus(),
                        $("#publishlang").mousemove(function (e) {
                            $("#changeIcon").attr("class", "logo-view-up"),
                                $("#isshow-Langer").css("visibility", "visible");
                        }),
                        $("#publishlang").mouseout(function (e) {
                            $("#changeIcon").attr("class", "logo-view-down"),
                                $("#isshow-Langer").css("visibility", "hidden");
                        }),
                        $("#Multilingualism").text(lang.Multilingualism),
                        $.cookie("lang"))
                    ) {
                        case "zh-cn":
                            $("#changelogo").attr("class", "log-icon-zh-cn"),
                                $("#changelogo").text("简体中文");
                            break;
                        case "en":
                            $("#changelogo").attr("class", "log-icon-en"),
                                $("#changelogo").text("English");
                            break;
                        case "ja":
                            $("#changelogo").attr("class", "log-icon-ja"),
                                $("#changelogo").text("日本語");
                            break;
                        case "zh-tw":
                            $("#changelogo").attr("class", "log-icon-zh-tw"),
                                $("#changelogo").text("繁體中文");
                    }
                },
                passwordText: passwordText,
                verifyPassword: verifyPassword,
                publishInfoHtml: publishInfoHtml,
                passwordOnblur: passwordOnblur,
                passwordonFocus: passwordonFocus,
                logo: logo,
                backgroundImage: backgroundImage,
                userFace: userFace,
                lang: lang,
                onKeydown: onKeydown,
                ChangeLanguage: function () {
                    var theEvent = window.event || arguments.callee.caller.arguments[0],
                        $target = $(theEvent.target),
                        lng = $target.data("lang"),
                        oUrl = location.href.toString(),
                        nUrl = "";
                    if (($.cookie("lang", lng), oUrl.indexOf("lang=") > 0)) {
                        var re = eval("/(lang=)([^&]*)/gi");
                        nUrl = oUrl.replace(re, "lang=" + lng);
                    } else nUrl = oUrl.replace("#authentication", "&lang=" + lng);
                    location.href = nUrl;
                },
            };
        }
    ),
    define(
        "outpublish/expire/index",
        [
            "durandal/app",
            "knockout",
            "../" + lang(),
            "../service",
            "header/userinfo/constinfo",
        ],
        function (e, t, o, n, i) {
            return {
                lang: o,
                logo: t.observable(),
                activate: function (e) { },
                binding: function () {
                    return { cacheViews: !0 };
                },
                compositionComplete: function (e, t, o) {
                    this.logo(constInfo.productInfo.ProductLogo);
                },
            };
        }
    ),
    define("outpublish/plugins/back/index", ["durandal/app"], function (e) {
        return {
            attached: function (t, o) {
                e.trigger("folder-publish:back", "");
            },
        };
    }),
    define(
        "outpublish/plugins/docsetbar/service",
        ["underscore", lang()],
        function (e, t) {
            var o = [
                {
                    id: "toright",
                    command: "toright",
                    perm: 1,
                    title: t.toggleRightBord,
                    text: "",
                    icon: "icon-toright",
                    isShow: !0,
                },
            ];
            return {
                helper: {
                    getMenuItem: function (t, o) {
                        return e.find(t, function (e) {
                            return e.id() === o;
                        });
                    },
                },
                menuConfig: o,
            };
        }
    ),
    define(
        "outpublish/plugins/docsetbar/index",
        [
            "underscore",
            "komapping",
            "header/userinfo/constinfo",
            "knockout",
            "durandal/app",
            "./service",
            lang(),
        ],
        function (e, t, o, n, i, a, r) {
            var s = a.helper,
                d = { menuList: t.fromJS(a.menuConfig), canShow: n.observable(!1) },
                l = d,
                c = {
                    registerEvents: function () {
                        i.on("docsetbar:showinformationbar").then(function (e) {
                            s.getMenuItem(l.menuList(), "toright").isShow(!0);
                        }),
                            i.on("docsetbar:hideinformationbar").then(function (e) {
                                s.getMenuItem(l.menuList(), "toright").isShow(!1),
                                    setTimeout(function () {
                                        i.trigger("informationbar:toggleinformationBar", {
                                            type: 0,
                                        });
                                    }, 10);
                            });
                    },
                },
                u = {
                    doToright: function () {
                        i.trigger("informationbar:toggleinformationBar", {});
                    },
                };
            return {
                vm: l,
                vf: {
                    doBtnClick: function (e, t) {
                        var o = n.contextFor(t.target).$root,
                            i = e.command();
                        (i = "do" + i.substr(0, 1).toUpperCase() + i.substring(1)),
                            u[i].call(o, e, t);
                    },
                },
                lang: r,
                compositionComplete: function () {
                    setTimeout(function () {
                        o &&
                            o.systemInfo &&
                            o.systemInfo.instanceConfigInfo &&
                            l.canShow(o.systemInfo.instanceConfigInfo.publishViewInforBar);
                    }, 1e3),
                        c.registerEvents();
                },
            };
        }
    ),
    define(
        "outpublish/plugins/download/index",
        [
            "knockout",
            "durandal/app",
            "../../service",
            lang(),
            "edoc2ErrorCode",
            "header/userinfo/constinfo",
        ],
        function (e, t, o, n, i, a) {
            function r() {
                var e = navigator.userAgent,
                    t = e.indexOf("compatible") > -1 && e.indexOf("MSIE") > -1,
                    o = e.indexOf("Edge") > -1 && !t,
                    n = e.indexOf("Trident") > -1 && e.indexOf("rv:11.0") > -1;
                return !!(t || o || n);
            }
            function s(e, o, i, a) {
                var r = {},
                    d = i + "WebCore/Index";
                (r.url = d),
                    (r.data = { module: "WebClient", fun: "GetZipProgress", pTaskId: e });
                var l = a;
                $.ajax(r).done(function (e) {
                    if (0 == e.result) {
                        if ("Error" != e.status && "Complete" != e.status) {
                            "Ziping" == e.status || e.status;
                            var a = e.currentFileName;
                            a.length > 20 &&
                                (a = a.substring(0, 10) + ".." + a.substring(a.length - 9));
                            var r = -1 == e.remainTime ? "00:00:00" : e.remainTime,
                                d =
                                    n.compressedFile + "'" + a + "'," + n.remainingTime + ":" + r;
                            w("loading"),
                                y(d),
                                $(".publishDownload-progressbar-value").css(
                                    "width",
                                    "" + e.percent
                                ),
                                setTimeout(function () {
                                    s(e.pTaskId, o, i, l);
                                }, 500);
                        } else if ("Complete" == e.status) {
                            if (
                                (w("loading"),
                                    y(n.download_tip),
                                    $(".publishDownload-progressbar-value").css("width", "100%"),
                                    $(".downloadBox").hide(),
                                    l)
                            ) {
                                var c = l.replace("etc..", n.etc) + n.download_tip3;
                                t.trigger("message:show", {
                                    type: "warning",
                                    message: c,
                                    delay: 5e3,
                                });
                            } else
                                t.trigger("message:show", {
                                    type: "success",
                                    message: n.download_ok,
                                });
                            var u = "downLoad/GetFile?fileName=" + e.zipName;
                            (u = i + u), $(".download-frame").eq(0).attr("src", u);
                        } else if ("Error" == e.status) {
                            setTimeout(function () {
                                if (
                                    (w("loaded"),
                                        $(".downloadBox").hide(),
                                        "ErrorCode601" == e.ex)
                                ) {
                                    var o = e.currentFileName;
                                    o.length > 20 &&
                                        (o = o.substring(0, 10) + ".." + o.substring(o.length - 9));
                                    var i = o;
                                    t.trigger("message:show", {
                                        type: "error",
                                        message: i,
                                        delay: 3e3,
                                    });
                                } else "ErrorCode632" == e.ex ? t.trigger("message:show", { type: "error", message: n.zipFail + "：" + n.outBatchDownoadCountLimit, delay: 3e3 }) : "ErrorCode8" == e.ex ? t.trigger("message:show", { type: "error", message: n.zipFail + "：" + n.download_tip1, delay: 3e3 }) : "ErrorCode631" == e.ex ? t.trigger("message:show", { type: "error", message: n.zipFail + "：" + n.outBatchDownoadSizeLimit, delay: 3e3 }) : "ErrorCode634" == e.ex ? ($(".downloadBox").hide(), t.trigger("message:show", { type: "error", message: n.zipFail + "：" + n.diffRegion, delay: 3e3 })) : t.trigger("message:show", { type: "error", message: n.zipFail + "：" + e.currentFileName, delay: 3e3 });
                            }, 200);
                        }
                    } else
                        -2 == e.result &&
                            setTimeout(function () {
                                s(e.pTaskId, o, i, l);
                            }, 2e3);
                });
            }
            function d(e, t) {
                return e.replace(new RegExp((t || " ") + "$"), "");
            }
            function l(e) {
                (c = ""),
                    (u = ""),
                    (h = 0),
                    (m = !1),
                    $.each(e, function (e, t) {
                        var o;
                        (o = t.data ? (t.data.data ? t.data.data : t.data) : t),
                            o.folderType
                                ? (c += o.id + ",")
                                : o.fileType && ((u += o.id + ","), h++);
                    }),
                    1 == h && "" == c && (m = !0),
                    (c = d(c, ",")),
                    (u = d(u, ","));
            }
            var c = "",
                u = "",
                p = !1,
                f = e.observable(),
                m = !1,
                h = 0,
                g = "",
                v = "",
                y = e.observable(),
                w = e.observable(),
                b = e.observable(!1),
                x = function (e) {
                    var t = e.RegionUrl;
                    e.RegionId, e.RegionType;
                    return t.lastIndexOf("/") === t.length - 1 ? t : t + "/";
                },
                T = function (e, o) {
                    "4127" == e
                        ? t.trigger("message:show", {
                            type: "error",
                            message: n.fileStorageInfoNotFound,
                            delay: o,
                        })
                        : "4215" == e
                            ? t.trigger("message:show", {
                                type: "error",
                                message: n.ruleParserFailed,
                                delay: o,
                            })
                            : "8" == e
                                ? t.trigger("message:show", {
                                    type: "error",
                                    message: n.download_tip1,
                                    delay: o,
                                })
                                : 634 == e
                                    ? t.trigger("message:show", {
                                        type: "error",
                                        message: n.zipFail + "：" + n.diffRegion,
                                        delay: o,
                                    })
                                    : 632 === e
                                        ? t.trigger("message:show", {
                                            type: "error",
                                            message: n.zipFail + "：" + n.outBatchDownoadCountLimit,
                                        })
                                        : 631 == e
                                            ? t.trigger("message:show", {
                                                type: "error",
                                                message: n.zipFail + "：" + n.outBatchDownoadSizeLimit,
                                            })
                                            : 633 == e
                                                ? t.trigger("message:show", {
                                                    type: "error",
                                                    message: n.regionHashInvalid,
                                                    delay: o,
                                                })
                                                : 653 == e
                                                    ? t.trigger("message:show", {
                                                        type: "error",
                                                        message: n.downloadToEncrypt,
                                                    })
                                                    : 654 == e
                                                        ? t.trigger("message:show", {
                                                            type: "error",
                                                            message: n.downloadFileShouldBeEncrypted,
                                                        })
                                                        : 655 == e
                                                            ? t.trigger("message:show", {
                                                                type: "error",
                                                                message: n.downloadFileCannotBeEncryptedFailed,
                                                            })
                                                            : 5709 == e
                                                                ? t.trigger("message:show", {
                                                                    type: "error",
                                                                    message: n.securityscanNotAllowDownload,
                                                                })
                                                                : t.trigger("message:show", {
                                                                    type: "error",
                                                                    message: a.getedoc2ErrorCodeLang()["ErrorCode" + e],
                                                                    delay: o,
                                                                });
                };
            return {
                lang: n,
                content: y,
                type: w,
                compositionComplete: function (i, a) {
                    function d() {
                        $(".messageBox").hide(),
                            $(".downloadBox")
                                .hide()
                                .parent()
                                .parent()
                                .css("display", "block"),
                            (p = !!I[0].fileVerId && I[0].fileVerId != I[0].curVerId),
                            p && f(I[0].fileVerId),
                            l(h.datas()),
                            y(n.download_tip2);
                        var e = window.parseInt(100 * Math.random());
                        $(".publishDownload-progressbar-value").css("width", e + "%"),
                            $(".downloadBox").show(),
                            w("loading");
                        $.getQueryString("code");
                        if ((b(!0), window.DMSClientCommObj))
                            $(".downloadBox").hide(),
                                t.trigger("message:show", {
                                    type: "success",
                                    message: n.download_tip4,
                                }),
                                m
                                    ? window.DMSClientCommObj.DownloadFile(
                                        u,
                                        isDoloadFileVer ? f() : 0
                                    )
                                    : window.DMSClientCommObj.DownloadFilesFolders(u, c);
                        else {
                            var o = "downLoad/DownLoadCheck",
                                i = "",
                                a = {};
                            if (m) {
                                u = parseInt(u);
                                var d = "";
                                v && (d = "&verify=" + v),
                                    (i =
                                        "fileIds=" +
                                        u +
                                        k +
                                        d +
                                        "&r=" +
                                        Math.floor(1e5 * Math.random())),
                                    p &&
                                    (i =
                                        "ver_id=" +
                                        f() +
                                        k +
                                        d +
                                        "&r=" +
                                        Math.floor(1e5 * Math.random())),
                                    S &&
                                    (i =
                                        "ver_id=" +
                                        f() +
                                        "&r=" +
                                        Math.floor(1e5 * Math.random()));
                                var P = r();
                                o += "?" + i + "&isIe=" + P;
                            } else
                                (o += "?r=" + Math.floor(1e5 * Math.random())),
                                    (a = { folderIds: c, fileIds: u, code: g, async: !0 }),
                                    v && (a.verify = v);
                            $.ajax({
                                type: "GET",
                                url: o,
                                contentType: !1,
                                data: a,
                                success: function (e) {
                                    if (0 !== e.nResult)
                                        return $(".downloadBox").hide(), void T(e.nResult);
                                    var t = e.RegionType,
                                        o = x(e),
                                        r = o + "downLoad/index";
                                    if (
                                        ((r += i
                                            ? "?" + i + "&regionHash=" + e.RegionHash
                                            : "?regionHash=" + e.RegionHash),
                                            m)
                                    ) {
                                        $(".publishDownload-progressbar-value").css(
                                            "width",
                                            "100%"
                                        ),
                                            setTimeout(function () {
                                                $(".downloadBox").hide(),
                                                    "none" == $(".messageBox").css("display") &&
                                                    $(".messageBox").show();
                                            }, 200);
                                        var d = $(".download-frame")
                                            .eq(0)
                                            .unbind("load")
                                            .load(function () {
                                                var e = d[0].contentWindow;
                                                if (e) {
                                                    var t = e.document.getElementsByTagName("body"),
                                                        o = t[0].innerText;
                                                    if (
                                                        (o ||
                                                            (o =
                                                                e.document.getElementsByTagName("pre")[0]
                                                                    .innerHTML),
                                                            o)
                                                    ) {
                                                        var n = $.parseJSON(o).nResult;
                                                        setTimeout(function () {
                                                            if ("0" != n) {
                                                                $(".downloadBox").hide();
                                                                T(n, 4e3);
                                                            }
                                                        }, 200);
                                                    }
                                                }
                                            })
                                            .attr("src", r);
                                    } else
                                        w("loading"),
                                            y(n.download_tip6),
                                            $(".publishDownload-progressbar-value").css(
                                                "width",
                                                "1%"
                                            ),
                                            $.ajax({
                                                type: "POST",
                                                url: r,
                                                data: a,
                                                success: function (n) {
                                                    if (0 == n.nResult) s(n.pTaskId, t, o, e.msg);
                                                    else {
                                                        var i = n.nResult;
                                                        setTimeout(function () {
                                                            $(".downloadBox").hide(), T(i, 4e3);
                                                        }, 200);
                                                    }
                                                },
                                            }).fail(function (e) {
                                                $(".downloadBox").hide();
                                            });
                                },
                            });
                        }
                    }
                    t.trigger("message:hide");
                    var h = e.dataFor(a),
                        I = h.datas();
                    void 0 != window.ImagePerviewCurData &&
                        ((I = window.ImagePerviewCurData), h.datas(I)),
                        (g = o.getCode()),
                        !(v = h.datas()[0].data.verifyCode) &&
                        h.vm &&
                        h.vm.verifyCode &&
                        (v = h.vm.verifyCode());
                    var k = o.generalCodeParam(),
                        S = I[0].isAttach;
                    null !== g && g.length > 0 && !S
                        ? o.ajax.getPublishInfoByCode({ code: g }).done(function (e) {
                            d();
                        })
                        : d();
                },
                cancelBox: function () {
                    $(".downloadBox").hide();
                },
                canDownload: b
            };
        }
    ),
    define("outpublish/plugins/decryptdownload/index",["durandal/app","knockout","header/userinfo/constinfo"],function (e, t, o) {
        var r = t.observable(1),
            d = t.observableArray(),
            l = t.observable(1),
            c = t.observable(1),
            u = t.observable(10),
            p = t.observable(0),
            f = t.observableArray(),
            m = t.observable("today"),
            h = t.observableArray(),
            y = t.observableArray([
                { value: "10" },
                { value: "20" },
                { value: "30" },
            ]);
        return {
            lang: {
                zhcn: "解密下载",
                zhtw: "解密下載",
                en: "Decrypt download",
                jp: "ダウンロードの復号化",
            },
            nowpagesize: t.observable(10),
            pagesizes: y(),
            showWindow: r,
            optLogList: d,
            totalPages: c,
            currentPage: l,
            pageSize: u,
            totalCount: p,
            constInfo: o,
            optTimeType: f,
            selectOptTime: m,
            optClass: h,
            attached: function (e, n) {
                var i = t.dataFor(n),
                    d = i.datas();
                debugger;
                var ids = d.map(y=>{return y.data.id});
                var fileIds = ids.join(",");
                if (fileIds == "") {
                    $.messager.alert("提示", "请选择要下载的文件")
                }
                let $container = $(`<div style="display:none;"></div>`);
                let $form = $('<form action="http://testpan.sokon.com/udcmgt/service/ystdecryption/IpgaurdDecryption/DownloadAndDecrypt" method="post"></form>');
                $form.appendTo($container);
                $form.append(`<input type="hidden" name = "IntegrationKey" value="7438abb4-9b3a-4b00-b898-ca08f2ef85a2">`);
                $form.append(`<input type="hidden" name = "FileId" value="${fileIds}">`);
                $form.append(`<input type="hidden" name = "FolderIds" value="">`);
                $("body").append($container);
                $form.submit();
                $form.remove();
            },
        };
    }),
    define(
        "outpublish/plugins/navigation/index",
        ["knockout", "durandal/app", "underscore"],
        function (e, t, o) {
            var n,
                i,
                a,
                r = e.observableArray(),
                s = e.observable(1),
                d = null,
                l = { id: -2, text: "......" };
            return {
                compositionComplete: function (e) {
                    n = t.on("navigation:init").then(function (e) {
                        i = e;
                        var t = e.paths;
                        if (((d = o.clone(t)), t.length >= 6)) {
                            var n = t.slice(0, 2),
                                c = t.slice(-3);
                            t = n.concat(l).concat(c);
                        }
                        r(t), (a = d[d.length - 1]), s(a);
                    });
                },
                currentNode: s,
                pathNodes: r,
                gotoPath: function (e) {
                    -2 != e.id && (s(e), t.trigger(i.message, e));
                },
                refresh: function () {
                    (a = r()), s(a[a.length - 1]), t.trigger(i.message, s(), !0);
                },
            };
        }
    ),
    define("outpublish/plugins/outpublishlog/opttype", [lang()], function (e) {
        return e;
    }),
    define("outpublish/plugins/outpublishlog/index",["durandal/app","knockout","header/userinfo/constinfo","./opttype",lang()],function (e, t, o, n, i) {
            function a(e) {
                $.mask.show();
                var t = {
                    data: {
                        module: "LogOperationManager",
                        fun: "LoadLogOperationByCondition",
                        entryType: "-1",
                        optUserIdstr: "",
                        pageNum: l(),
                        pageSize: u(),
                        destName: v,
                        OptSourceName: "",
                        optTimeStartStr: "",
                        optTimeEndStr: "",
                        sourceId: "",
                        userRealName: "",
                        userIdArray: "-1",
                        optType: "",
                        messageFrom: "1",
                    },
                };
                window.location.href.toLowerCase().indexOf("outpublish.html") > -1 &&
                    (t.data.token = $.cookie("token-publish")),
                    $.ajax({ async: !1, data: t.data }).done(function (t) {
                        $.mask.hide();
                        var i = t.logOpteration;
                        $.each(i, function (e, t) {
                            (t.OptTime = o.getDateInterval(t.OptTime)),
                                (t.OptTypeExt = n["optTypeName_" + t.OptType] || t.OptType),
                                (t.OptTypeExt += "  " + t.OptSourceName),
                                (t.OptIp = t.IP),
                                (t.EntryIcon = ""),
                                (t.Remarks =
                                    t.OptIp +
                                    " " +
                                    (n["optTypeName_" + t.OptType] || t.OptType) +
                                    " " +
                                    t.OptSourceName);
                        }),
                            d(i),
                            p(t.totalCount);
                        var a = Math.ceil(p() / u());
                        c(a), e && e();
                    });
            }
            var r = t.observable(1),
                s = t.observable(),
                d = t.observableArray(),
                l = t.observable(1),
                c = t.observable(1),
                u = t.observable(10),
                p = t.observable(0),
                f = t.observableArray(),
                m = t.observable("today"),
                h = t.observableArray(),
                g = (t.observable("0"), t.observable("'3640'")),
                v = null,
                y = t.observableArray([
                    { value: "10" },
                    { value: "20" },
                    { value: "30" },
                ]);
            return {
                lang: i,
                nowpagesize: t.observable(10),
                pagesizes: y(),
                showWindow: r,
                optLogList: d,
                totalPages: c,
                currentPage: l,
                pageSize: u,
                totalCount: p,
                constInfo: o,
                optTimeType: f,
                selectOptTime: m,
                optClass: h,
                attached: function (e, n) {
                    var i = t.dataFor(n),
                        d = i.datas();
                    v =
                        d[0].data && d[0].data.Publish_Code
                            ? d[0].data.Publish_Code
                            : $.getQueryString(
                                window.decodeURIComponent(window.location.href),
                                "code"
                            );
                    var f = "";
                    for (var m in d)
                        m < d.length - 1
                            ? (f += "'" + d[m].data.id + "',")
                            : (f += "'" + d[m].data.id + "'");
                    g(f),
                        s("folder" == o.getObjType(i.datas()[0]) ? 1 : 2),
                        l(1),
                        c(1),
                        u(10),
                        p(0),
                        r(!1),
                        $(".outloglist-box").perfectScrollbar(),
                        $(".optloglist-pager .v5-pagination").pagination({
                            total: p(),
                            pageSize: u(),
                            pageList: [10, 20, 30, 40, 50],
                            pageNumber: l(),
                            type: "small",
                            onSelectPage: function (e, t) {
                                l(e),
                                    u(t),
                                    a(function () {
                                        $(".outloglist-box").perfectScrollbar("update"),
                                            ($(".outloglist-box").get(0).scrollTop = 0);
                                    });
                            },
                            showPageList: !0,
                        }),
                        a(function () {
                            var e = $(".optloglist-pager .v5-pagination").pagination(
                                "options"
                            );
                            $(".optloglist-pager .v5-pagination").pagination(
                                $.extend(e, { total: p(), pageSize: u(), pageNumber: l() })
                            );
                        });
                },
            };
        }
    ),
    define("outpublish/plugins/publishView/lang/zh-cn", {
        DocState0: "正常",
        DocState2: "正在上传",
        DocState4: "已锁定",
        DocState8: "正在更新",
        DocState16: "正在审核",
        DocState32: "被锁定",
        DocState64: "已归档",
        DocState512: "编辑中",
        name: "名称",
        size: "大小",
        creator: "创建人",
        createTime: "创建时间",
        editor: "修改人",
        modifyTime: "修改时间",
        version: "版本",
        downloadTime: "已下载次数",
        publish_tip: "您没有预览该文件的权限",
        publish_tip1: "这种类型的文件无法预览",
        publish_tip2: "文件预览个数超过系统限制, 不能预览",
        publish_tip3: "您没有访问该文件夹的权限",
        publish_tip4: "文件预览个数超过系统限制,不能预览",
        publish_list: "外发列表",
        fileDeleted: "文件已删除",
        previewTimes: "已预览次数",
        morePreviewTime: "预览次数超出限制，请联系外发用户",
        publishUserNoPerm: "外发人已无该文档权限",
    }),
    define("outpublish/lang/zh-cn", [], function () {
        return {
            enterPassword: "请输入密码",
            determine: "确定",
            prompt: "提示",
            verifyPasswordfailed: "验证密码失败.",
            downloadProgress: "下载进度",
            compressedFile: "正在压缩文件",
            fileCompressing: "文件压缩完成",
            StartTransmission: "即将开始传输",
            remainingTime: "剩余时间",
            compressionFailure: "压缩失败",
            filePreparation: "文件准备完成",
            outpublishExpiredOrNoNumber: "外发已过期或无此外发编号",
            urlCode: "访问地址没有code参数",
            publish: "外发",
            vali: "验证",
            expire: "外发过期",
        };
    }),
    define("outpublish/plugins/docsetbar/lang/zh-cn", {
        teamContentBase: "团队内容库",
        enterpriseContentBase: "企业内容库",
        personalContentBase: "个人内容库",
        teamRecycle: "团队回收站",
        recycle: "回收站",
        listView: "列表视图",
        thumbnail: "缩略图视图",
        viewSet: "视图设置",
        toggleLeftBord: "收缩展开左侧面板",
        toggleRightBord: "收缩展开右侧面板",
    }),
    define("outpublish/view/lang/zh-cn", {
        expiryTime: "到期时间：",
        countDown: "倒计时：",
        about: "关于",
        day: "天",
        hour: "小时",
        minute: "分钟",
        second: "秒",
        expired: "已过期",
        Multilingualism: "多语言",
    });
