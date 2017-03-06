"use strict";

var React = require('react')
var AdQuantity = require('./adQuantity');
var AdSubTotal = require('./adSubTotal');

var AdItem = React.createClass({
	render: function() {
		return (
			<div key={'ad_item_div_' + this.props.ad.id}>
				<h3 key={'ad_item_name_' + this.props.ad.id}>{this.props.ad.name}</h3>
				<div className="col-xs-3" key={'ad_item_' + this.props.ad.id + '_price_' + this.props.ad.id}>
					Price: ${ this.props.ad.price }
				</div>
				<AdQuantity key={'ad_qtty_' + this.props.ad.id} ad={this.props.ad} updateQuantity={this.props.updateQuantity} />
				<AdSubTotal key={'ad_suttot_' + this.props.ad.id} ad={this.props.ad} />
			</div>
		)
	},
	propTypes: {
		ad: React.PropTypes.object.isRequired,
		updateQuantity: React.PropTypes.func.isRequired
	}
});

module.exports = AdItem;