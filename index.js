'use strict';

var url = require('url');

var pages = {
    'order' : require('./page/order'),
    'admin' : require('./page/admin'),
    // '404'   : require('./page/404')
};

exports.init = function () {
    var query = url.parse(location.href, true).query;
    console.log('query:', query)

    var controller = pages[query.page] || pages['404'];

    controller.render(query);
};