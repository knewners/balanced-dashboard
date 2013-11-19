module('Credits', {
	setup: function() {
		Testing.setupMarketplace();
		Testing.createCredit();
	},
	teardown: function() {}
});

test('can visit page', function(assert) {
	visit(Testing.CREDIT_ROUTE).then(function() {
		assert.notEqual($('#content h1').text().indexOf('Credit'), -1, 'Title is not correct');
		assert.equal($(".credit .transaction-description").text().trim(), 'Succeeded: $100.00');
	});
});

test('can edit credit', function(assert) {
	var spy = sinon.spy(Balanced.Adapter, "update");

	visit(Testing.CREDIT_ROUTE)
		.click('.credit .transaction-info a.edit')
		.fillIn('.edit-transaction.in .modal-body input[name="description"]', "changing desc")
		.click('.edit-transaction.in .modal-footer button[name="modal-submit"]')
		.then(function() {
			assert.ok(spy.calledOnce);
			assert.ok(spy.calledWith(Balanced.Credit));
			assert.equal(spy.getCall(0).args[2].description, "changing desc");
		});
});
