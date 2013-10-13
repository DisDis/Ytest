"use strict";

exports.urlToParams= function (opt_url) {
    //Test Sample: ?p1=1&p2&p3=3&&p4==+=3=1&p5R=Авбавы&pR6=Авбавы&pR6=ТестРусского%20языка&Русский1=345#dfdfdf&ff=3#dds&f3=3
    //?p1=%D0%90%D0%B2%D0%B1%D0%B0%D0%B2%D1%8B&pR6=%D0%A2%D0%B5%D1%81%D1%82%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%BE%D0%B3%D0%BE%20%D1%8F%D0%B7%D1%8B%D0%BA%D0%B0
    opt_url = opt_url || window.location.href;
    var urlParams = opt_url.replace(/#.*/, '').match(/(\?|&)([^&#]*)/g);
    if (urlParams == null || urlParams.length == 0) {
        return {};
    }

    var separateRegExp = /([^&?=]*)=(.*)/;
    var result = {};
    for ( var i = 0; i < urlParams.length; i++) {
        var tmp = separateRegExp.exec(urlParams[i]);
        if (tmp == null) {
            continue;
        }
        result[decodeURI(tmp[1])] = ((tmp[2]!= undefined)?decodeURI(tmp[2]):undefined);
    }
    return result;
};