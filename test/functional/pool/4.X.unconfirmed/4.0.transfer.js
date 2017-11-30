'use strict';

require('../../functional.js');

var lisk = require('lisk-js');
var expect = require('chai').expect;

var shared = require('../../shared');
var localShared = require('./shared');

var sendTransactionPromise = require('../../../common/apiHelpers').sendTransactionPromise;

var randomUtil = require('../../../common/utils/random');

describe('POST /api/transactions (unconfirmed type 0 on top of type 4)', function () {

	var scenarios = {
		'regular': new shared.MultisigScenario()
	};

	var transaction;
	var badTransactions = [];
	var goodTransactions = [];

	localShared.beforeValidationPhase(scenarios);

	describe('sending funds', function () {

		it('regular scenario should be ok', function () {
			transaction = lisk.transaction.createTransaction(randomUtil.account().address, 1, scenarios.regular.account.password);

			return sendTransactionPromise(transaction).then(function (res) {
				expect(res).to.have.property('status').to.equal(200);
				expect(res).to.have.nested.property('body.status').to.equal('Transaction(s) accepted');
				goodTransactions.push(transaction);
			});
		});
	});

	describe('confirmation', function () {

		shared.confirmationPhase(goodTransactions, badTransactions);
	});
});
