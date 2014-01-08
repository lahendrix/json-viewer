define([
    'jquery',
    'backbone'
], function(
    $,
    Backbone
){
    "use strict";

    var RowView = Backbone.View.extend({
      tagName: 'tr',

      template: _.template("<td><%=value%></td>"),

      events: {
      },

      initialize: function () {

        this.rowId = this.model.get('id');        

        // Reference to the treetable_view that holds this row
        this.treetableParent = this.options.treetable;
        this.$el.attr({
          'data-tt-id': this.model.get('id'),
          'data-tt-parent-id': this.model.get('parent'),
          'data-row_id': this.model.get('id')
        });

        if(this.hasChildren()){
          this.$el.data('ttBranch', true);
        }

        this.$el.data({
          'data-tt-id': this.model.get(this.rowId),
          'data-tt-parent-id': this.model.get('parent'),
          'data-row_id': this.model.get(this.rowId)
        });        
        
        this.listenTo(this.model, 'change', function(options){this.render();});
      },

      /**
        Renders the row using it's model
        @method render
      */
      render: function() {
        this.$el.empty();
        this.$el.html(this.template({value: this.model.get('value')}));
        
        return this;
      },
      hasChildren: function () {
        return true; // TODO: implement
      }

      

    });

    return RowView;
});
