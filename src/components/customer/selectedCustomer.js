"use strict"

var React = require('react')

var SelectedCustomer = React.createClass({
	propTypes: {
		unselectCustomer: React.PropTypes.func.isRequired,
		selectedCustomer: React.PropTypes.object.isRequired
	},
	render: function() {
		console.log('selectedCustomer', selectedCustomer);
		return (
			<div className="jumbotron">
				<h2>
					Displaying offers for: {this.props.selectedCustomer.name}
				</h2>
				<a onClick={this.props.unselectCustomer} role="button" alt="Trocar cliente">change customer</a>
			</div>
		)
	}
})

module.exports = SelectedCustomer