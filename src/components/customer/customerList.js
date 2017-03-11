"use strict";

var React = require('react');
var _ = require('lodash');
var CustomerItem = require('./customerItem');

var CustomerList = React.createClass({
	propTypes: {
		onCustomerSelectionChanged: React.PropTypes.func.isRequired,
		customers: React.PropTypes.array.isRequired
	},
	createCustomerItem: function (customer){
		return (
			<div key={'customerItem_div_'+customer.id} className="col-xs-2 text-center">
				<CustomerItem key={'customerItem_btn_'+customer.id}
					customer={customer}
					handleCustomerSelect={this.props.onCustomerSelectionChanged}/>
			</div>
		)
	},
	render: function() {
		console.log('rendering');
		return (
			<div className="col-sx-12">
				{ _.map(this.props.customers, this.createCustomerItem) }
			</div>
		);
	}
});

module.exports = CustomerList;
//<SelectedCustomer selectedCustomer={this.state.selectedCustomer} />
//<button onClick={this.unselectCustomer} className="btn btn-default" alt="Trocar cliente">{this.state.selectedCustomer.name} </button>