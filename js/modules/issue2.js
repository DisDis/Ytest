"use strict";
/**
 * @enum {String}
 */
window.GeneratorElementType = {
    INPUT : "input",
    TEXTAREA : "text",
    SELECT : "select",
    CHECKBOX : "checkbox",
};

function generateDomElement(name, type, defaultValue) {
    var $elem;
    switch (type) {
    case GeneratorElementType.CHECKBOX:
        $elem = $('<input name="' + name + '" type="checkbox"/>').val(defaultValue);
        break;
    case GeneratorElementType.SELECT:
        $elem = $('<select name="' + name + '"/>');
        for ( var i = 0; i < 5; i++) {
            $('<option value="' + i + '">Пункт ' + i + '</option>').appendTo($elem);
        }
        break;
    case GeneratorElementType.TEXTAREA:
        $elem = $('<textarea name="' + name + '"/>').val(defaultValue);
        break;
    case GeneratorElementType.INPUT:
    default:
        $elem = $('<input name="' + name + '"/>').val(defaultValue);
        break;
    }
    return $elem;
}

function isArray(value) {
    // IE improperly marshals tyepof across execution contexts, but a
    // cross-context object will still return false for "instanceof
    // Object".
    // if (value instanceof Array)
    return value != undefined && value.push != undefined;
}

function getElementValue($input) {
    if ($input.attr('type') == 'checkbox') {
        return $input.prop('checked');
    } else
        return $input.val();
}

function compareForms($form1, $form2) {
    var f1Params = formToParams($form1);
    var f2Params = formToParams($form2);
    var result = [];
    for ( var key in f1Params) {
        var value1 = f1Params[key];
        var value2 = f2Params[key];
        if (isArray(value1)) {
            if (value1.length == value2.length) {
                for ( var i = 0; i < value1.length; i++) {
                    if (value1[i] != value2[i]) {
                        result.push({
                            key : key,
                            index : i,
                            'old' : value1[i],
                            'new' : value2[i]
                        });
                    }
                }
            }
        } else {
            if (value1 != value2) {
                result.push({
                    key : key,
                    'old' : value1,
                    'new' : value2
                });
            }
        }
    }
    return result;
}

function changeParamValue(params) {
    var result = {};
    for ( var key in params) {
        var value = params[key];
        if (isArray(value)) {
            for ( var i = 0; i < value.length; i++) {
                value[i] = ((Math.random() >= 0.5) ? "!_" + value[i] : value[i]);
            }
            result[key] = value;
        } else {
            if (Math.random() >= 0.5) {
                result[key] = "!_" + value;
            } else {
                result[key] = value;
            }
        }
    }
    return result;
}

function paramsToForm(params, $form) {
    for ( var key in params) {
        var value = params[key];
        var $target = $('[name="' + key + '"]', $form);
        if (isArray(value)) {
            if ($target.length == value.length) {
                for ( var i = 0; i < value.length; i++) {
                    $($target.get(i)).val(value[i]);
                }
            }
        } else {
            $target.val(value);
        }
    }
}

exports.changeForm = function(params, $form) {
    params = changeParamValue(params);
    paramsToForm(params, $form);
};

exports.compareFormsUI = function($form1, $form2) {
    console.log('------------');
    var result = compareForms($form1, $form2);
    var $inputs = $('[name]', $form2);
    $inputs.removeClass('changed-field');
    for ( var i = 0; i < result.length; i++) {
        var item = result[i];
        console.log('"' + item.key + '"' + ((item.index != undefined) ? '(' + item.index + '):' : ':') + item.old
                + ' -> ' + item["new"]);
        var $keyInputs = $('[name="' + item.key + '"]', $form2);
        if (item.index != undefined) {
            $($keyInputs[item.index]).addClass('changed-field');
        } else {
            $keyInputs.addClass('changed-field');
        }
    }
};

exports.formToParams = function($form) {
    var $inputs = $('[name]', $form);
    var result = {};

    for ( var i = 0; i < $inputs.length; i++) {
        var $input = $($inputs[i]);
        var name = $input.attr('name');
        if (result.hasOwnProperty(name)) {
            var tmp = result[name];
            if (!isArray(tmp)) {
                tmp = [ tmp ];
                result[name] = tmp;
            }
            tmp.push(getElementValue($input));
        } else {
            result[name] = getElementValue($input);
        }
    }
    return result;
};

exports.generateForm = function($place) {
    var count = 0;
    function genValue() {
        return count + "_" + new Date().valueOf();
    }

    var formSample = [ {
        name : "p1",
        type : GeneratorElementType.INPUT
    }, {
        name : "p2",
        type : GeneratorElementType.SELECT
    }, {
        name : "p3",
        type : GeneratorElementType.INPUT
    }, {
        name : "p1",
        type : GeneratorElementType.INPUT
    }, {
        name : "p4",
        type : GeneratorElementType.TEXTAREA
    }, {
        name : "p5",
        type : GeneratorElementType.CHECKBOX
    } ];

    for ( var i = 0; i < formSample.length; i++) {
        var item = formSample[i];
        var $elem = generateDomElement(item.name, item.type, genValue());
        $('<div>' + item.name + ':</div>').appendTo($place).append($elem);
        count++;
    }
    return $place;
};