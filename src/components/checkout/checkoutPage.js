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
			isShowOffers: false,
			isShowAds: false,
			selectedCustomer: null
		};
	},
	customerSelectionHasChanged: function(event, arg) {
		console.log('customerSelectionHasChanged', arg);
		console.log('customerSelectionHasChanged', event.target);
		console.log('customerSelectionHasChanged', event.target.value);
		console.log('customerSelectionHasChanged', event.target.key);
		var customer = CustomerApi.getCustomerById(event.target.key);
		this.setState({
			discounts: customer === null ? [] : DiscountApi.getDiscountByCustomerId(customer.id),
			isShowCustomers: (customer === null),
			isShowOffers: (customer !== null),
			isShowAds: (customer !== null),
			selectedCustomer: customer,
			showSelectedCustomer: (customer !== null)
		});
	},
	unselectCustomer: function(){
		this.customerSelectionHasChanged(null);
	},
	showCustomerList: function() {
		if(this.state.isShowCustomers === true) {
			return (
				<div className="row">
					<CustomerList customers={this.state.customers}
						onCustomerSelectionChanged={this.customerSelectionHasChanged}/>
				</div>
			);
		}
	},
	showCustomerSelectionMessage: function () {
		if(this.state.isShowCustomers === true) {
			return <div className="jumbotron">
				<h2>Welcome to AdStore</h2>
				<p>Please select a customer</p>
			</div>
		}
	},
	showSelectedCustomer: function () {
		if(this.state.showSelectedCustomer) {
			console.log('this.state.selectedCustomer', this.state.selectedCustomer);
			return (
				<SelectedCustomer selectedCustomer={this.state.selectedCustomer} unselectCustomer={this.unselectCustomer} />
			);
		}
	},
	showAvailableOffers: function(customerId) {
		if(this.state.isShowOffers === true) {
			return (
				<AdList customerId={this.state.selectedCustomer.customerId} ads={this.state.ads} discounts={this.state.discounts} />
			);
		}
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
	}
});

module.exports = Checkout;