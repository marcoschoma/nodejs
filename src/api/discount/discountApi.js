"use strict";

var discounts = require('./discountData');
var _ = require('lodash');

var _generateId = function() {
	var ids = _.map(discounts, 'id');
	return (_.max(ids) || 0) + 1; 
};

var _clone = function(item) {
	return JSON.parse(JSON.stringify(item));
};

var DiscountApi = {
	getAllDiscounts: function() {
		return _clone(discounts);
	},

	getDiscountById: function(id) {
		var discount = _.find(discounts, {id: id});
		return _clone(discount);
	},

	getDiscountByCustomerId: function(customerId) {
		var discount = _.filter(discounts, {customerId: customerId});
		return _clone(discount);
	},
	getDiscountByAdId: function(adId) {
		var discount = _.filter(discounts, {adId: adId});
		return _clone(discount);
	},
	getDiscountByCustomerAndAdId: function(customerId, adId) {
		var discount = _.filter(discounts, {customerId: customerId, adId: adId});
		return _clone(discount);
	},
	saveDiscount: function(discount) {
		if(discount.id) {
			var existingDiscountIndex = _.indexOf(discounts. _.find(discounts, {id: discount.id}));
			discounts.splice(existingDiscountIndex, 1, discount);
		} else {
			discount.id = _generateId();
			discounts.push(discount);
		}

		return _clone(discount);
	},
	deleteDiscount: function(id) {
		_.remove(discounts, {id: id});
	}
}

module.exports = DiscountApi;