"use strict";
var urlToParams = require('js/modules/issue1').urlToParams;

$(function() {
    console.log('Run 1');
    var result = urlToParams();
    console.log('-------------');
    $('<a href="'+window.location.href+'?p1=1&p2&p3=3&&p4==+=3=1&p5R=Авбавы&pR6=Авбавы&pR6=ТестРусского%20языка&Русский1=345#dfdfdf&ff=3#dds&f3=3">Test</a>').appendTo(document.body);
    $('<div>-------------</div>').appendTo(document.body);
    for ( var key in result) {
        console.log(key + ":" + result[key]);
        $('<div>'+key + ":" + result[key]+'</div>').appendTo(document.body);
    }
});
