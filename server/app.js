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


var users = {};
var tables = {
    a: {
        // 
        current: 0,
        max: 0
    },

    b: {
        current: 0,
        max: 0
    },

    c: {
        current: 0,
        max: 0
    }
};


function getTables () {
    return Object.keys(tables).map(function (name) {
        var table = tables[name];

        return {
            name: name,
            num: table.current,
            time: random(30)
        };
    });
}


function getUser (usertoken) {
    var user = users[usertoken];

    if ( !user ) {
        return null;
    }

    var tableName = user.table;
    var table = tables[tableName];

    return {
        table: tableName,
        num: user.num,
        left: user.num - table.current
    };
}


function takeTable (usertoken, tableName) {
    var user = getUser(usertoken);
    var table = tables[tableName];

    if ( !table ) {
        return {
            error: 'table "' + tableName + '" not found'
        };
    }

    if ( !user ) {
        users[usertoken] = {
            table: tableName,
            num: ++ table.max
        };

        return {
            ok: true
        }

    } else {
        if ( user.table === tableName ) {
            return {
                error: 'user "' + usertoken + '" already has a table'
            }
        } else {
            return {
                error: 'Your can not order more than one table'
            }
        }
    }
}


function manageTable (tableName) {
    var table = tables[tableName];

    if ( table ) {
        if ( table.max > table.current ) {
            table.current ++;
            return {
                ok: true
            }
        } else {
            return {
                error: 'there is no more tables'
            }
        }

    } else {
        return {
            error: 'table "' + tableName + '" not found'

        }
    }
}


app.get('/:action', function (req, res, next) {
    var obj;

    var usertoken = req.query.usertoken;
    var tableName = req.query.table;

    switch(req.params.action){
        case 'tables.jsp':

            obj = {
                tables: getTables()
            };

            if ( usertoken ) {
                var user = getUser(usertoken);

                if ( user ) {
                    obj.my = user;
                }
            }            

            break;

        case 'take.jsp':
            if ( usertoken && tableName ) {
                obj = takeTable(usertoken, tableName);
            }

            break;

        case 'admin.jsp':
            if ( tableName ) {
                obj = manageTable(tableName);
            }

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

