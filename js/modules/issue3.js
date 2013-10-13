"use strict";

exports.paramsToUrl = function(params, opt_url) {
    opt_url = opt_url || window.location.href;
    var result = [ /[^#\?]*/.exec(opt_url) ];
    var isFirst = true;
    for ( var name in params) {
        result.push(isFirst ? '?' : "&");
        result.push(encodeURI(name));
        result.push('=');
        result.push(encodeURI(params[name]));
        isFirst = false;
    }
    return result.join('');
};