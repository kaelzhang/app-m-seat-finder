'use strict';

var node_path = require('path');
var express = require('express');
var app = express();

var index = node_path.join(__dirname, '..', 'index.html');

app.get('/', function(req, res, next){
    res.sendfile(index);
});

function random (max, min) {
    min = min || 0;
    return parseInt( Math.random() * (max - min) + min );
}

app.get('/:action', function (req, res, next) {
    var obj;

    switch(req.params.action){
        case 'tables':
            obj = {
                shop: {
                    name: '屠屠餐厅'
                },

                tables: [
                    {
                        name: 'A',
                        num: random(10),
                        time_left: 10 
                    },

                    {
                        name: 'B',
                        num: random(10),
                        time_left: 4
                    }
                ],

                my: {
                    table: 'A',
                    num: random(10),
                    left: 3
                }
            };

            break;
    }

    if ( obj ) {
        res.send(obj);
    } else {
        res.send({
            ok: false
        });
    }
});

app.listen(9987, function () {
    console.log('server started at localhost:9987');
});