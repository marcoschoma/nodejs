"use strict";

var DiscountApi = require('../discount/discountApi');
var AdApi = require('../ad/adApi');

var Checkout = {
	getCustomerDiscount: function(customerId, adId, quantity) {
		return DiscountApi.getDiscountByCustomerAndAdId(customerId, adId).filter(function (d) {
			return d.minItems <= quantity;
		});
	},

	calculate: function (adId, customerId, quantity) {
		var totalPrice = 0;

		var ad = AdApi.getAdById(adId);
		totalPrice = ad.price * quantity;

		var discounts = this.getCustomerDiscount(customerId, adId, quantity);

		var totalDiscount = 0;
		discounts.forEach(function(d) {
			if (d.applyForEveryItem) {
				totalDiscount += d.discountValue * quantity;
			} else {
				totalDiscount += d.discountValue * Math.floor(quantity / d.minItems);
			}
			//totalDiscount += d.discountValue * Math.floor(quantity / d.minItems);
		});
	    return totalPrice - totalDiscount;
	}
}
module.exports = Checkout;