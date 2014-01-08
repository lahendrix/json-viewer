define([
    'jquery',
    'backbone',
    'views/row'
], function(
    $,
    Backbone,
    RowView
){
    "use strict";

    var TreeTableView = Backbone.View.extend({

      tagName: 'table',

      initialize: function () {
        this.allRows = new Backbone.Collection();
        this.rowViews = {}; 
        this.buildAllRowsCollection();
        
      },

      buildAllRowsCollection: function () {
        var self = this,
          len = this.collection.length,
          i, isModel, row;

      for(i = 0; i < len; i++){
        this.traverse(this.collection.at(i), null);
      }
    },

      traverse: function (row, parentId) {

        var self = this,
          j, children, len, isModel;

        isModel = row instanceof Backbone.Model;
        if(!isModel) {
          row = new Backbone.Model(row);
        }

        children = row.get('children') || [];
        len = children.length;
        self.allRows.add(row);

        for(j = 0; j < len; j++){
          this.traverse(children[j], row.get('id'));
        }
      },

      render: function() {
        this.renderRows();
        this.convertToTreeTable();
        return this;
      },

      renderRows: function () {
        var self = this,
          numOfRows = this.allRows.length,
          i, model, rowView;

        // Loop through each row and render the row with the row data
        for(i = 0; i < numOfRows; i++) {
          model = this.allRows.at(i);
          rowView = new RowView({
            model: model,
            treetable: self
          });
          this.$el.append(rowView.render().$el);
          this.rowViews[model.get('id')] = rowView;
        }
      },

      refresh: function () {
        this.buildAllRowsCollection();
        this.render();
      },

      convertToTreeTable: function () {
        var self = this;
            this.$el.treetable({
              expandable: true,
              clickableNodeNames: true
            });
      }

    });



    return TreeTableView;
});
