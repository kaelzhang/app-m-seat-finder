'use strict';

var $ = require('jquery');
var Ajax = require('request').Ajax;
var tpl = require('tpl');

var template = require('../view/order');
var templateFn = tpl.compile(template);

var order = exports;

order.render = function (query) {
    function start () {
        order._get_data(query.usertoken, function (json) {
            order._apply_data(json);
            // order.
        })
    }

    setInterval(start, 3000);
    start();
};


order._apply_data = function (json) {
    $('#wrap').empty().html(templateFn(json));
};


order._get_data = function (token, callback) {
    new Ajax({
        url: '/tables?token=' + token,
        method: 'get'

    }).on('success', callback).send();
};

