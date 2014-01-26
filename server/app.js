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

app.get('/:root/:action', function (req, res, next) {
    var obj;

    switch(req.params.action){
        case 'tables.jsp':
            obj = {
                shop: {
                    name: '屠屠餐厅'
                },

                tables: [
                    {
                        name: 'A',
                        num: random(10),
                        time: 10 
                    },

                    {
                        name: 'B',
                        num: random(10),
                        time: 4
                    }
                ]
            };

            if ( random(10) > 5 ) {
                obj.my = {
                    table: 'A',
                    num: random(10),
                    left: 3
                };
            }

            break;

        case 'take.jsp':
            obj = {

            };
            break;

        case 'admin.jsp':
            obj = {

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