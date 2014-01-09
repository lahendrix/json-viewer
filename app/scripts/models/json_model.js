/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var JsonModel = Backbone.Model.extend({
        defaults: {
        },

        initialize: function (attributes) {
        	if(this.attributes) {
        		this.parseJson(attributes);
        	}
        	this.on('sync', this.parseJson, this);
        },

        parse: function (response) {
        	// Expecting response to simply be json object
        	return {data: response};
        },

        traverse: function (jsonObject, id, key) {

	        var self = this,
	        	children = [],
	          	len, model, label, key;

	         label = jsonObject instanceof Array? '[] ' : '{} '
	         model = new Backbone.Model ({id: id, value: label + key});

	        for(key in jsonObject){
	        	id += 1;
	        	// If property is a nested array or object, traverse it
	        	if (typeof(jsonObject[key]) == 'object') {
	          		children.push(this.traverse(jsonObject[key], id, key));
	        	} else { // else just record the id and value of the property
	        		children.push(new Backbone.Model({
	        			id: id, 
	        			value: key + ' : ' + jsonObject[key]
	        		}));
	        	}
	        }
	        model.set('children', children);
	        return model;
      	},

        parseJson: function () {
        	var result, model, key, value;
        	result = this.traverse(this.attributes, 0, 'json');
        	this.set('result', result);
        }
    });

    return JsonModel;
});
