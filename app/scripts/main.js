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
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        'jquery-treetable': {
            deps: ['jquery'],
            exports: 'jquery-treetable'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap',
        'jquery-treetable': '../bower_components/jquery-treetable/javascripts/src/jquery.treetable'
    }
});

require([
    'backbone',
    'routes/home',
    'jquery-treetable'
], function (Backbone, Router) {
    
    var router = new Router();
    router.navigate('home', {trigger: true});
    Backbone.history.start();
    
});
