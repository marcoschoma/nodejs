"use strict";

var ads = require('./adData');
var _ = require('lodash');

var _generateId = function() {
	var ids = _.map(ads, 'id');
	return (_.max(ids) || 0) + 1; 
};

var _clone = function(item) {
	return JSON.parse(JSON.stringify(item));
};

var AdApi = {
	getAllAds: function() {
		return _clone(ads);
	},

	getAdById: function(id) {
		var ad = _.find(ads, {id: id});
		return _clone(ad);
	},

	saveAd: function(ad) {
		if(ad.id) {
			var existingAdIndex = _.indexOf(ads. _.find(ads, {id: ad.id}));
			ads.splice(existingAdIndex, 1, ad);
		} else {
			ad.id = _generateId();
			ads.push(ad);
		}

		return _clone(ad);
	},
	deleteAd: function(id) {
		_.remove(ads, {id: id});
	}
}

module.exports = AdApi;