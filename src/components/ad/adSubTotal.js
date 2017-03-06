"use strict";

var React = require('react')

var AdItem = React.createClass({
	render: function() {
		return (
			<div key={'ad_subtot_div_' + this.props.ad.id} className="col-xs-4">
				Sub total: ${ this.props.ad.subTotalPrice }
			</div>
		)
	},
	propTypes: {
		ad: React.PropTypes.object.isRequired
	}
});

module.exports = AdItem;