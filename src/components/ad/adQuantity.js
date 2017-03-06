"use strict";

var React = require('react')

var AdQuantity = React.createClass({
	render: function() {
		return (
			<div key={'ad_qtty_div_' + this.props.ad.id} className="col-xs-5">
				Quantity: <input type="number" min="0" max="1000" data-id={this.props.ad.id} onChange={this.props.updateQuantity} />
			</div>
		)
	},
	propTypes: {
		ad: React.PropTypes.object.isRequired,
		updateQuantity: React.PropTypes.func.isRequired
	}
});

module.exports = AdQuantity;