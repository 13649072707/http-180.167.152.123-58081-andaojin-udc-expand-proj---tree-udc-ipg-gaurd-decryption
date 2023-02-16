!function (window, document) {
    function d(a) {
        var u = a.baseUrl? a.baseUrl: "https://login.welink.huaweicloud.com"
        var e, c = document.createElement("iframe"),
        d = u + "/sso-proxy-front/public/qrcode/0.0.1/qrcode.html?redirect_uri=" + encodeURIComponent(a.redirect_uri) + "&client_id=" + a.client_id;
        d += "&response_type=" + ( a.response_type ? a.response_type : "code" ),
        d += "&scope=" + ( a.scope ? a.scope : "snsapi_login" ),
        d += a.state ? "&state=" + a.state : "",
        d += a.style ? "&style=" + encodeURIComponent(a.style) : "",
        d += "&self_redirect=" + ( a.self_redirect ? a.self_redirect : "false" ),
        d += "&lang=" + ( a.lang ? a.lang : "cn" ),
        d += a.nameCN ? "&nameCN=" + encodeURIComponent(a.nameCN) : "",
        d += a.nameEN ? "&nameEN=" + encodeURIComponent(a.nameEN) : "",
        d += a.isHideName ? "&isHideName=true" : ""

            c.src = d,
            c.frameBorder = "0",
            c.allowTransparency = "true",
            c.scrolling = "no",
            c.width =  a.width ? a.width + 'px' : "365px",
            c.height = a.height ? a.height + 'px' : "400px",
            e = document.getElementById(a.id),
            e.innerHTML = "",
            e.appendChild(c);
    }
    window.wlQrcodeLogin = d;
}(window, document);