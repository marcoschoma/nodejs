"use strict";

var React = require('react');
var CustomerList = require('./../customer/customerList');
var AdList = require('../ad/adList');

var Checkout = React.createClass({
	getInitialState: function() {
		return {
			isShowCustomer: true,
			isShowOffers: false,
			isShowAds: false,
			selectedCustomerId: null
		};
	},
	customerSelectionHasChanged: function(customer) {
		this.setState({
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
						<AdList customerId={customerId} />
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