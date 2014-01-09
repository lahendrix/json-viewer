define([
    'jquery',
    'backbone',
    'templates'
], function(
    $,
    Backbone,
    JST
){
    "use strict";

    var RowView = Backbone.View.extend({
      tagName: 'tr',

      template: JST['app/scripts/templates/treetable_row.ejs'],

      events: {
        'dblclick': 'editRow'
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
        
        this.listenTo(this.model, 'change:value', this.changeValue, this);
      },

      render: function() {
        this.$el.html(this.template({
          value: this.model.get('value'),
          label: this.model.get('label')
        }));
        
        return this;
      },

      hasChildren: function () {
        return this.model.get('children')? this.model.get('children').length > 0: false; // TODO: implement
      },

      changeValue: function (model, newValue) {
        this.$('.value').html(newValue);
      },

      editRow: function () {
        var self = this,
          tpl = JST['app/scripts/templates/edit_field.ejs'];

        $(tpl()).dialog({
          autoOpen: true,
          modal: true,
          title: 'Edit: ' + self.model.get('value'),
          buttons: {
            Save: function () {
              var val = $(this).find('.edit-field').val();
              self.model.set('value', val);
              $(this).dialog('destroy');
            },

            Cancel: function () {
              $(this).dialog('destroy');
            }
          }
        });
      }
      
    });

    return RowView;
});
