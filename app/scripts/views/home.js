/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/treetable',
    'models/json_model'
], function ($, _, Backbone, JST, TreetableView, JsonModel) {
    'use strict';

    var HomeView = Backbone.View.extend({

        template: JST['app/scripts/templates/home.ejs'],
        events: {
          'click .sort': 'sortTree',
          'click .expand-all': 'expandTree',
          'click .collapse-all': 'collapseTree'
        },

        render: function () {
          var data = {
              key1: 'String',
              key2: {
                  nestedKey: 'hello'
              },
              key3: ['hello', {
                  arrayObject: '1',
                  nestedArray: ['one', {a: 'a', b: 'b', c: 'c', d: 'd'}, 'two', 'three', 'four', {nestedArray: {nestedObject2: {hello: 1}}}]
              }]
          },

          model = new JsonModel(data).get('result'),
          testData = new Backbone.Collection([model]),
          treetable = new TreetableView({collection: testData});
          this.$el.html(this.template());
          this.$('.treetable-container').html(treetable.render().$el);
          this.treetableView = treetable;
          return this;
      },

      sortTree: function () {
        alert("I promise I'll be implemented later.")
      },

      expandTree: function () {
        this.treetableView.$el.treetable('expandAll');
      },

      collapseTree: function () {
        this.treetableView.$el.treetable('collapseAll');
      }
    });

    return HomeView;
});
