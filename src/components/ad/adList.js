"use strict";

var React = require('react');
var _ = require('lodash');

var AdItem = require('./adItem');
var DiscountApi = require('../../api/discount/discountApi');
var CheckoutApi = require('../../api/checkout/checkoutApi')

var AdList = React.createClass({
	propTypes: {
		ads: React.PropTypes.array.isRequired,
		discounts: React.PropTypes.array.isRequired
	},
	getInitialState: function() {
		return {
			lookupAd: [],
		}
	},
	componentDidMount: function() {
		var lookupAd = {};
		var tmpAds = this.props.ads
				.map(function(ad) {
					ad.quantity = 0;
					ad.subTotalPrice = 0;
					return ad;
				});
		tmpAds.forEach(function(ad) { lookupAd[ad.id] = tmpAds.indexOf(ad) });

		this.setState({
			lookupAd: lookupAd
		});
	},
	updateQuantity: function (event) {
		var id = parseInt(event.target.attributes.getNamedItem('data-id').value, 0)
		var ads = this.props.ads
		var quantity = event.target.value
		var newPrice = CheckoutApi.calculate(id, this.props.customerId, quantity);

		ads[this.state.lookupAd[id]].quantity = quantity
		ads[this.state.lookupAd[id]].subTotalPrice = Math.round(newPrice * 100) / 100;
		this.setState({
			ads: ads
		});
	},
	render: function() {
		var getDiscountInfo = function(discount) {
			return (
				<div><h4 key={'discounts_' + discount.id }>Special offer: { discount.description }</h4></div>
			);
		};
		var createAdItem = function(ad) {
			return (
				<div key={'ad_container_' + ad.id}>
					<div className="col-xs-12" key={'desc_' + ad.id}>
						<AdItem key={'ad_item_' + ad.id} ad={ad} updateQuantity={this.updateQuantity} />
					</div>
				</div>
			)
		};
		return (
			<div>
				<div className="col-md-12">
					{ _.map(this.props.discounts, getDiscountInfo.bind(this)) }
					{_.map(this.props.ads, createAdItem.bind(this))}
				</div>
				<div className="col-md-12">
					<h3 className="pull-right">
						Total: $ { parseInt(_.sumBy(this.props.ads, 'subTotalPrice')* 100) / 100 }
					</h3>
				</div>
			</div>
		)
	},
	
});

module.exports = AdList;