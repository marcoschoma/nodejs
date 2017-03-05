"use strict";

module.exports = [
	{
		id: 1,
		customerId: 1,
		adId: 1,
		discountValue: 269.99,
		minItems: 3,
		applyForEveryItem: false,
		description: 'Gets a for 3 for 2 deal on Classic Ads'
	},
	{
		id: 2,
		customerId: 4,
		adId: 3,
		discountValue: (394.99-389.99),
		minItems: 3,
		applyForEveryItem: true,
		description: 'Gets a discount on Premium Ads when 3 or more​are purchased. The price drops to $389.99 per ad'
	},
	{
		id: 3,
		customerId: 4,
		adId: 2,
		discountValue: (322.99-309.99),
		minItems: 1,
		applyForEveryItem: true,
		description: 'Gets a discount on Standout Ads where the price drops to $309.99 per ad'
	},
	{
		id: 4,
		customerId: 4,
		adId: 1,
		discountValue: 269.99,
		minItems: 5,
		applyForEveryItem: false,
		description: 'Gets a 5 for 4 deal on Classic Ads'
	},
	{
		id: 5,
		customerId: 3,
		adId: 3,
		discountValue: (394.99-379.99),
		minItems: 4,
		applyForEveryItem: true,
		description: 'Gets a discount on Premium Ads when 4 or more​ are purchased. The price drops to $379.99 per ad'
	},
	{
		id: 6,
		customerId: 2,
		adId: 2,
		discountValue: (322.99-299.99),
		minItems: 1,
		applyForEveryItem: true,
		description: 'Gets a discount on Standout Ads where the price drops to $299.99 per ad'
	}
];