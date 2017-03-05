"use strict";

var React = require('react');
var _ = require('lodash');
var AdApi = require('../../api/ad/adApi');
var DiscountApi = require('../../api/discount/discountApi');
var CheckoutApi = require('../../api/checkout/checkoutApi')

var AdList = React.createClass({
	getInitialState: function() {
		var discounts = DiscountApi.getDiscountByCustomerId(this.props.customerId);
		return {
			ads: null,
			lookupAd: [],
			discounts: discounts
		}
	},
	componentDidMount: function() {
		var data = AdApi.getAllAds();
		var lookupAd = {};

		var tmpAds = data
				.map(ad => {
					ad.quantity = 0;
					ad.subTotalPrice = 0;
					return ad;
				});
		tmpAds.forEach((ad) => lookupAd[ad.id] = tmpAds.indexOf(ad));

		this.setState({
			ads: tmpAds,
			lookupAd: lookupAd
		});
	},
	updateQuantity: function (event) {
		var id = parseInt(event.target.attributes.getNamedItem('data-id').value, 0)
		const ads = this.state.ads
		const quantity = event.target.value

		ads[this.state.lookupAd[id]].quantity = quantity
		this.setState({
			ads: ads
		})

		this.updateSubTotalPrice(id, quantity)
	},
	updateSubTotalPrice: function(adId, quantity) {
		var newPrice = CheckoutApi.calculate(adId, this.props.customerId, quantity);
		const ads = this.state.ads
		ads[this.state.lookupAd[adId]].subTotalPrice = Math.round(newPrice * 100) / 100;
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
				<div>
					<div className="col-xs-9" key={'desc_' + ad.id}>
						<h3>{ad.name}</h3>
						<div className="col-xs-3" key={'price_' + ad.id}>
							Preço: ${ ad.price }
						</div>
						<div className="col-xs-9" key={'qtd_' + ad.id}>
							Quantidade: <input type="number" min="0" max="1000" data-id={ad.id} onChange={this.updateQuantity} />
						</div>
					</div>
					<div className="col-xs-3" key={'subtot_' + ad.id}>
						Sub total: ${ ad.subTotalPrice }
					</div>
				</div>
			)
		};
		return (
			<div>
				<div className="col-md-12">
					{ _.map(this.state.discounts, getDiscountInfo.bind(this)) }
					{_.map(this.state.ads, createAdItem.bind(this))}
				</div>
				<div className="col-md-12">
					<h3 className="pull-right">
						Total: $ { parseInt(_.sumBy(this.state.ads, 'subTotalPrice')* 100) / 100 }
					</h3>
				</div>
			</div>
		)
	},
	
});

module.exports = AdList;