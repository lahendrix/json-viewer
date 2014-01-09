/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        'jquery-treetable': {
            deps: ['jquery'],
            exports: 'jquery-treetable'
        },

        'jquery-ui': {
            deps: ['jquery'],
            exports: 'jquery-ui'
        },

        localstorage: {
            deps: ['backbone'],
            exports: 'localstorage'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        localstorage: "../bower_components/backbone.localStorage/backbone.localStorage",
        underscore: '../bower_components/underscore/underscore',
        'jquery-treetable': '../bower_components/jquery-treetable/javascripts/src/jquery.treetable',
        'jquery-ui': '../bower_components/jquery-ui/ui/jquery-ui'
    }
});

require([
    'backbone',
    'routes/home',
    'jquery-ui',
    'jquery-treetable'
], function (Backbone, Router) {
    
    var router = new Router();
    router.navigate('home', {trigger: true});
    Backbone.history.start();
    
});
