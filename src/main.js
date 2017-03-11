$ = jQuery = require('jquery');

var React = require('react');
var ReactDOM = require('react-dom')
var Header = require('./components/header');
var Checkout = require('./components/checkout/checkoutPage');

ReactDOM.render(
	<div><Header /><Checkout /></div>, document.getElementById('app')
);
//module.exports = App;