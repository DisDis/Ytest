"use strict";
var issue2 = require('js/modules/issue2');
var compareFormsUI = issue2.compareFormsUI;
var generateForm = issue2.generateForm;
var changeForm = issue2.changeForm;
var formToParams = issue2.formToParams;

$(function() {
    console.log('Run 2');
    var $form1Place = $('<div style="float:left">Form1<form/></div>').appendTo(document.body);
    var $form2Place = $('<div style="float:left">Form2</div>').appendTo(document.body);
    var $form1 = $('form', $form1Place);
    generateForm($form1);
    $form2Place.append($form1.clone());
    var $form2 = $('form', $form2Place);
    $('<button>Compare</button>').appendTo(document.body).on('click', function() {
        compareFormsUI($form1, $form2);
    });

    $('<button>Shuffle</button>').appendTo(document.body).on('click', function() {
        changeForm(formToParams($form1), $form2);
    });
    compareFormsUI($form1, $form2);
});