/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/treetable'
], function ($, _, Backbone, JST, TreetableView) {
    'use strict';

    var HomeView = Backbone.View.extend({
        template: JST['app/scripts/templates/home.ejs'],

        render: function () {

          var testData = new Backbone.Collection([
              new Backbone.Model({id: 1, value: '{', children:[]}),
              new Backbone.Model({
                id: 2, 
                value: 'key1', 
                children: [{
                  id: 3,
                  value: 'hello',
                  parent: 2, 
                  children: []
                }]
              }),
              new Backbone.Model({id: 4, value: '}', children:[]})
            ]),
            treetable = new TreetableView({
            collection: testData
          });

          this.$el.html(treetable.render().$el);
          return this;
      }
    });

    return HomeView;
});
