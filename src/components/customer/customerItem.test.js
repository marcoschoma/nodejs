"use strict";

var React = require('react');
var CustomerItem = require('./CustomerItem');
var enzyme = require('enzyme');
var expect = require('expect');
var Mocha = require('mocha');

function setup() {
	var customerItem = {
		id: 1,
		name: 'test'
	};
	var handleCustomerSelect = function () { console.log('handle!'); }

	return {
		component: enzyme.shallow(<CustomerItem customer={customerItem} handleCustomerSelect={handleCustomerSelect} />),
		data: customerItem,
		events: {handleCustomerSelect}
	};
}

describe('Testing CustomerItem', function () {
	it('renders CustomerItem', function() {
		var wrapper = setup();
		expect(wrapper.component.find('button').length).toBe(1);
	});
	it('CustomerItem key has customer id', function() {
		var wrapper = setup();
		expect(wrapper.component.find('button').key()).toBe('' + wrapper.data.id);
	});
	/* ainda não funciona como esperado.
	it('onClick calls handleCustomerSelect', function() {
		var wrapper = setup();
		//console.log(wrapper.component.find('button').onClick);
		//console.log(wrapper.events.handleCustomerSelect);
		var spy = expect.spyOn(wrapper.component.props(), 'onClick');
		wrapper.component.find('button').simulate('click');
		//expect(wrapper.events.handleCustomerSelect.calledOnce).toBe(true);
		expect(wrapper.events.handleCustomerSelect).toHaveBeenCalled();
		//expect(wrapper.component.find('button').onClick()).toBe(1);
	});*/
});