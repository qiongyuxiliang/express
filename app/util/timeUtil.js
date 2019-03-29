/*日期格式化*/
exports.getFormatDate =  function(date) {
    var year = date.getFullYear().toString(),
        month = (date.getMonth() + 1).toString(),
        dat = date.getDate().toString();
    return year + '-' + addZero(month) + '-' + addZero(dat);
}
exports.addZero = function (num) {
    if (num < 10) {
        return '0' + num;
    }
    return num;
}
