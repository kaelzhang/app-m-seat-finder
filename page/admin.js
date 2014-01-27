'use strict';

var $ = require('jquery');
var Ajax = require('request').Ajax;
var tpl = require('tpl');
var util = require('util');
var EE = require('events');

var template = require('../view/admin');
var templateFn = tpl.compile(template);

var order = exports;

order.render = function (query) {
    order.query = query;

    $('#header').text('排位管理');

    order._render();
    setInterval(order._render, 3000);
};


order._render = function () {
    order._getData(order.query.usertoken, function (json) {
        if ( order._paused ) {
            return;
        }

        order._applyData(json);
        order._bindEvents({
            usertoken: order.query.usertoken
        });
    });
}


order.pause = function () {
    order._paused = true;
};


order.resume = function () {
    order._paused = false;
};


order._applyData = function (json) {
    $('#wrap').empty().html(templateFn(json));
};


order._getData = function (token, callback) {
    function random (max, min) {
        min = min || 0;
        return parseInt( Math.random() * (max - min) + min );
    }
    

    if ( window._debug ) {
        callback({
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
        });

    } else {
        new Ajax({
            url: 'tables.jsp',
            method: 'get'

        }).on('success', callback).send();
    }
};


order._takeTable = function (name, token, callback) {
    if ( window._debug ) {
        callback({})
    } else {
        new Ajax({
            url: "admin.jsp",
            data: {
                table: name
            }
        
        }).on('success', callback).send();
    }
};


order._bindEvents = function (query) {
    new Tables(query);
};



function Tables (query) {
    this.tables = $('.table');
    this.query = query;
    this._init();
}


Tables.prototype._init = function() {
    var controllers = [];
    var self = this;

    this.tables.each(function(i, table){
        controllers.push( self._initTable( $(table) ) );
    });

    this._tables = controllers;
};


Tables.prototype._initTable = function(table) {
    var self = this;

    var controller = 
    new Table(table, this.query)
    .on('select', function () {
        order.pause();

        self._tables.forEach(function (table) {
            order.resume();
            table.lock();
        });
    })
    .on('complete', function () {
        order.resume();
        order._render();
    });

    return controller;
};


function Table (table, query) {
    this.table = table;
    this.query = query;
    this.name = this.table.attr('data-table');
    this.add = this.table.find('.add');

    this._bind();
}

util.inherits(Table, EE);


Table.prototype._bind = function() {
    var self = this;

    this.add.on('click', function (e) {
        e.preventDefault();

        if ( !self.isDisabled() ) {
            self.pending(function () {
                self.emit('select');
                self.lock();
                self._takeTable(function(){
                    self.unlock();
                    self.emit('complete');
                });
            });
        }
    });
};


Table.prototype.pending = function(callback) {
    this._setStatus('table-pending', callback);
};


Table.prototype.disable = function() {
    this._setStatus('table-disabled');
};


Table.prototype.select = function() {
    var self = this;

    this._setStatus('table-selected', function () {
        self.emit('select');
        self.lock();
        self._takeTable(function(){
            self.emit('complete');
        });
    } );
};


Table.prototype._takeTable = function(callback) {
    order._takeTable(this.name, this.query.usertoken, callback);
};


Table.prototype._setStatus = function(status, callback) {
    if ( !this.locked ) {
        this._removeStatus();
        this.table.addClass(status);
        callback && callback();
    }
};


Table.prototype._removeStatus = function() {
    this.table.removeClass('table-pending').removeClass('table-disable').removeClass('table-selected');
};


Table.prototype.isPending = function() {
    return this.table.hasClass('table-pending');
};


Table.prototype.isSelected = function() {
    return this.table.hasClass('table-selected');
};


Table.prototype.isDisabled = function() {
    return this.table.hasClass('table-disabled');
};


Table.prototype.lock = function() {
    this.locked = true;
};


Table.prototype.unlock = function() {
    this.locked = false;
};


