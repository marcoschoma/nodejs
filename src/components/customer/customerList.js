"use strict";

var React = require('react');
var _ = require('lodash');
var CustomerItem = require('./customerItem');
var CustomerApi = require('./../../api/customer/customerApi');
var SelectedCustomer = require('../customer/selectedCustomer');

var CustomerList = React.createClass({
	getInitialState: function() {
		return {
			customers: [],
			selectedCutomer: null
		};
	},
	componentWillMount: function() {
		this.setState({
			customers: CustomerApi.getAllCustomers(),
			selectedCutomer: null
		});
	},
	getSelectedCustomer: function() {
		return this.state.selectedCustomer;
	},
	setSelectedCustomer: function (customer) {
		this.setState({
			selectedCustomer: customer
		});
		if(this.props.onCustomerSelectionChanged)
			this.props.onCustomerSelectionChanged(customer);
	},
	unselectCustomer: function(){
		this.setSelectedCustomer(null);
	},
	render: function() {
		var createCustomerItem = function (customer){
			return (
				<div key={'customerItem_div_'+customer.id} className="col-md-2 text-center">
					<CustomerItem key={'customerItem_btn_'+customer.id}
						customer={customer}
						handleCustomerSelect={this.setSelectedCustomer}/>
				</div>
			)
		};
		var showSelectCustomer = function () {
			return (
				<div className="jumbotron">
					<h2>
						Displaying offers for: {this.state.selectedCustomer.name}
					</h2>
					<a onClick={this.unselectCustomer} role="button" alt="Trocar cliente">change customer</a>
				</div>
			);
		}
		return (
			<div className="col-md-12">
				{
					this.state.selectedCustomer ? 
					showSelectCustomer.bind(this)() : (
					<div className="jumbotron">
						<h2>Welcome to AdStore</h2>
						<p>Please select a customer</p>
					</div>
				)}

				{ !this.state.selectedCustomer ? _.map(this.state.customers, createCustomerItem.bind(this)) : null }
				
			</div>
		);
	},
	propTypes: {
		onCustomerSelectionChanged: React.PropTypes.func
	}
});

module.exports = CustomerList;
//<SelectedCustomer selectedCustomer={this.state.selectedCustomer} />
//<button onClick={this.unselectCustomer} className="btn btn-default" alt="Trocar cliente">{this.state.selectedCustomer.name} </button>