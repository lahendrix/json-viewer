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
          window.treetable = treetable;

          console.log('jsonModel', model);
          this.$el.html(treetable.render().$el);
          return this;
      }
    });

    return HomeView;
});
