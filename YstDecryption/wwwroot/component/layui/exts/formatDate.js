var myDate = new Date();
var year = myDate.getFullYear(); //获取当前年
var month = myDate.getMonth() + 1; //获取当前月
var day = myDate.getDate(); //获取当前日
//var currentYear = new Date().getFullYear();
var currentMonth = new Date().getMonth();
startDate= function (type) {
    if (type == "昨天") {
        return new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toLocaleDateString();
    }
    if (type == "本周") {
        var thisWeekStart;//本周周一的时间
        if (new Date().getDay() == 0) {  //周天的情况；
            thisWeekStart = (new Date(year + '/' + month + '/' + day)).getTime() - ((new Date().getDay()) + 6) * 86400000;
        } else {
            thisWeekStart = (new Date(year + '/' + month + '/' + day)).getTime() - ((new Date().getDay()) - 1) * 86400000;
        }
        //var weekStartDate = dateFormatConversion(new Date(thisWeekStart));
        return dateFormatConversion(new Date(thisWeekStart));
    }
    if (type == "本月") {
        return dateFormatConversion(new Date(year, currentMonth, 1));
    }
    if (type == "上月") {
        var lastmonthFirstDay = dateFormatConversion(new Date(year, myDate.getMonth()-1, 1));
        console.log("上个月第一天：" + lastmonthFirstDay);
        return lastmonthFirstDay;
    }
       
    return new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toLocaleDateString();
};
endDate=function (type) {
    if (type == "昨天") {
        return year + "-" + month + "-" + day + " 00:00:00";
    }
    if (type == "本周") {
        return dateFormatConversion(new Date());
    }
    if (type == "本月") {
        return dateFormatConversion(new Date());
    }
    if (type == "上月") {
        //var lastmonthday = new Date(year + '-' + myDate.getMonth() + '-' + date.setDate(0)).format('yyyy-MM-dd hh:mm:ss');

        var data = new Date(year, month, 0);
        var endDate = year + '-' + myDate.getMonth() + '-' + data.getDate() + ' 23:59:00';//上个月最后一天
        console.log("上个月最后一天：" + endDate);
        return endDate;
    }
    return year + "-" + month + "-" + day + " 00:00:00";
};
dateFormatConversion = function (inputTime) {
    var myDate = new Date(inputTime);
    var y = myDate.getFullYear(); //获取当前年
    var m = myDate.getMonth() + 1; //获取当前月
    m = m < 10 ? ('0' + m) : m;
    var d = myDate.getDate(); //获取当前日
    d = d < 10 ? ('0' + d) : d;
    var h = myDate.getHours();//获取当前小时数(0-23)
    h = h < 10 ? ('0' + h) : h;
    var minute = myDate.getMinutes();//获取当前分钟数(0-59)
    minute = minute < 10 ? ('0' + minute) : minute;
    var second = myDate.getSeconds();//获取当前秒
    second = second < 10 ? ('0' + second) : second;
    return y + "-" + m + "-" + d + ' ' + h + ":" + minute + ":" + second;
};


