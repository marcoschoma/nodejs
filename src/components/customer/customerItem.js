"use strict";

var React = require('react');

var CustomerItem = React.createClass({
	propTypes: {
		customer: React.PropTypes.object.isRequired,
		handleCustomerSelect: React.PropTypes.func.isRequired
	},
	onButtonClick: function() {
		this.props.handleCustomerSelect(this.props.customer);
	},
	render: function(){
		return (
			<button key={this.props.customer.id}
				className='btn btn-default'
				onClick={this.onButtonClick}
				>{this.props.customer.name}</button>
		)
	}
});

module.exports = CustomerItem;