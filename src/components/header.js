"use strict";

var React = require('react');

var Header = React.createClass({
	render: function() {
		return (
			<div className="navbar">
				<h1>AdStore</h1>
			</div>
		);
	}
});

module.exports = Header;