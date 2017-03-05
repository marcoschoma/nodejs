"use strict";

var React = require('react');

var SelectedCustomer = React.createClass({
	render: function() {
		return (
			<div>Exibindo ofertas para {this.props.selectedCustomer.name}</div>
		)
	},
	propTypes: {
		selectedCustomer: React.PropTypes.object.isRequired
	}
});

module.exports = SelectedCustomer;