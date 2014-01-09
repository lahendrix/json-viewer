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

      className: 'table-hover',

      initialize: function () {
        this.allRows = new Backbone.Collection();
        this.rowViews = {}; 
        this.buildAllRowsCollection();
        
      },

      buildAllRowsCollection: function () {
        var len = this.collection.length,
          i;

        for(i = 0; i < len; i++){
          this.traverse(this.collection.at(i), null);
        }
    },

      traverse: function (row, parentId) {
        var j, children, len;

        if(parentId) {
          row.set('parent', parentId);
        }
        children = row.get('children') || [];
        len = children.length;
        this.allRows.add(row);

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
        this.$el.treetable({
          expandable: true,
          expanderTemplate: '<span class="ui-icon ui-icon-triangle-1-e"></span>',
          onNodeExpand: function (node) {
            this.expander.removeClass('ui-icon-triangle-1-e').addClass('ui-icon-triangle-1-s');
          },
          onNodeCollapse: function (node) {
            this.expander.removeClass('ui-icon-triangle-1-s').addClass('ui-icon-triangle-1-e');
          }
        });
      }

    });



    return TreeTableView;
});
