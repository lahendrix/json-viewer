/*global define*/

define([
    'jquery',
    'backbone',
    'views/home'
], function ($, Backbone, HomeView) {
    'use strict';

    var HomeRouter = Backbone.Router.extend({
        routes: {
          '': 'showHomeView'
        },

        showHomeView: function () {
            var homeView = new HomeView();
            homeView.render();
            $('#main').html(homeView.$el);

        },

    });

    return HomeRouter;
});
