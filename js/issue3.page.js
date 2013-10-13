var paramsToUrl = require('js/modules/issue3').paramsToUrl;

$(function() {
    console.log('Run 3');
    var $inputURL = $('<input/>').appendTo($('<div/>').appendTo(document.body));
    $inputURL.val(window.location.href);
    var $inputJSON = $('<textarea></textarea>').appendTo($('<div/>').appendTo(document.body));
    $inputJSON.val('{"p1":1,"p2":2,"p3":"str3","p4":"=Текст"}');
    $('<button>Run</button>').appendTo(document.body).on('click', function() {
        // window.location.href = paramsToUrl();
        try {
            var params = JSON.parse($inputJSON.val());
            var result = paramsToUrl(params, $inputURL.val());
            console.log(result);
            $output.text(JSON.stringify(result));
        } catch (e) {
            $output.text(e.message);
        }
    });
    var $output = $('<div/>').appendTo(document.body);
});