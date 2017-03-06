"use strict";

var React = require('react');
var CustomerList = require('./../customer/customerList');
var AdList = require('../ad/adList');

var AdApi = require('../../api/ad/adApi');
var CheckoutApi = require('../../api/checkout/checkoutApi')
var DiscountApi = require('../../api/discount/discountApi');


var Checkout = React.createClass({
	getInitialState: function() {
		return {
			ads: AdApi
				.getAllAds()
				.map(ad => {
					ad.quantity = 0;
					ad.subTotalPrice = 0;
					return ad;
				}),
			discounts: [],
			isShowCustomer: true,
			isShowOffers: false,
			isShowAds: false,
			selectedCustomerId: null
		};
	},
	customerSelectionHasChanged: function(customer) {
		this.setState({
			discounts: customer === null ? [] : DiscountApi.getDiscountByCustomerId(customer.id),
			isShowCustomer: (customer === null),
			isShowOffers: (customer !== null),
			isShowAds: (customer !== null),
			selectedCustomerId: customer ? customer.id : null
		});
	},
	render: function() {
		var showAvailableOffers = function(customerId) {
			if(this.state.isShowOffers === true) {
				return (
					<div>
						<AdList customerId={customerId} ads={this.state.ads} discounts={this.state.discounts} />
					</div>
				);
			}
		}
		var showCustomerList = function() {
			return (
				<div className="row">
					<CustomerList ref="customerList" onCustomerSelectionChanged={this.customerSelectionHasChanged}/>
				</div>
			);
		}
		return (
			<div>
				{showCustomerList.bind(this)()}
				{showAvailableOffers.bind(this)(this.state.selectedCustomerId)}
			</div>
		);
	}
});

module.exports = Checkout;