"use strict";

var customers = require('./customerData');
var _ = require('lodash');

var _generateId = function() {
	var ids = _.map(customers, 'id');
	return (_.max(ids) || 0) + 1; 
};

var _clone = function(item) {
	return JSON.parse(JSON.stringify(item));
};

var CustomerApi = {
	getAllCustomers: function() {
		return _clone(customers);
	},

	getCustomerById: function(id) {
		var customer = _.find(customers, {id: id});
		return _clone(customer);
	},

	saveCustomer: function(customer) {
		if(customer.id) {
			var existingCustomerIndex = _.indexOf(customers. _.find(customers, {id: customer.id}));
			customers.splice(existingCustomerIndex, 1, customer);
		} else {
			customer.id = _generateId();
			customers.push(customer);
		}

		return _clone(customer);
	},
	deleteCustomer: function(id) {
		_.remove(customers, {id: id});
	}
}

module.exports = CustomerApi;