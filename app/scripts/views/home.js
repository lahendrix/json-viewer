/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var HomeView = Backbone.View.extend({
        template: JST['app/scripts/templates/home.ejs'],

        render: function () {
          this.$el.html(this.template({name: "Larry"}))
          return this;
      }
    });

    return HomeView;
});
