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
    // window.SomeCollection = Backbone.Collection.extend({

    //   localStorage: new Backbone.LocalStorage("SomeCollection"), // Unique name within your app.

    //   // ... everything else is normal.

    // });
    Backbone.history.start();
    
});
