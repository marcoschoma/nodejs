"use strict";

var React = require('react');
var CustomerList = require('../customer/customerList');
var SelectedCustomer = require('../customer/selectedCustomer');
var AdList = require('../ad/adList');

var AdApi = require('../../api/ad/adApi');
var CheckoutApi = require('../../api/checkout/checkoutApi');
var CustomerApi = require('../../api/customer/customerApi');
var DiscountApi = require('../../api/discount/discountApi');

var Checkout = React.createClass({
	getInitialState: function() {
		return {
			ads: AdApi
				.getAllAds()
				.map(function(ad) {
					ad.quantity = 0;
					ad.subTotalPrice = 0;
					return ad;
				}),
			customers: CustomerApi.getAllCustomers(),
			discounts: [],
			isShowCustomers: true,
			isShowDiscounts: false,
			isShowAds: false,
			selectedCustomer: null
		};
	},
	render: function() {
		return (
			<div>
				{ this.showCustomerSelectionMessage() }
				{ this.showCustomerList() }
				{ this.showSelectedCustomer() }
				{ this.showAvailableOffers() }
			</div>
		);
	},
	customerSelectionHasChanged: function(event, customer) {
		this.setState({
			discounts: !customer ? [] : DiscountApi.getDiscountByCustomerId(customer.id),
			isShowCustomers: (customer === undefined),
			isShowDiscounts: (customer !== undefined),
			isShowAds: (customer !== undefined),
			isShowSelectedCustomer: (customer !== undefined),
			selectedCustomer: customer,
		});
	},
	unselectCustomer: function(){
		this.customerSelectionHasChanged(null);
	},
	showCustomerSelectionMessage: function () {
		if(this.state.isShowCustomers === true) {
			return <div className="jumbotron">
				<h2>Welcome to AdStore</h2>
				<p>Please select a customer</p>
			</div>
		}
	},
	showCustomerList: function() {
		if(this.state.isShowCustomers === true) {
			return (
				<div className="row">
					<CustomerList customers={ this.state.customers }
						onCustomerSelectionChanged={this.customerSelectionHasChanged}/>
				</div>
			);
		}
	},
	showSelectedCustomer: function () {
		if(this.state.isShowSelectedCustomer) {
			return (
				<SelectedCustomer selectedCustomer={this.state.selectedCustomer} unselectCustomer={this.unselectCustomer} />
			);
		}
	},
	showAvailableOffers: function() {
		if(this.state.isShowDiscounts === true) {
			return (
				<AdList customerId={this.state.selectedCustomer.id} ads={this.state.ads} discounts={this.state.discounts} />
			);
		}
	},
});

module.exports = Checkout;