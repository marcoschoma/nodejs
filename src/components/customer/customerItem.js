"use strict";

var React = require('react');

var CustomerItem = React.createClass({
	propTypes: {
		customer: React.PropTypes.object.isRequired,
		handleCustomerSelect: React.PropTypes.func.isRequired
	},
	render: function(){
		return (
			<button key={this.props.customer.id}
				className='btn btn-default'
				onClick={this.props.handleCustomerSelect}
				>{this.props.customer.name}</button>
		)
	}
});

module.exports = CustomerItem;