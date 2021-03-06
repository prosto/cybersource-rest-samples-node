'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function DecisionManagerWithDeviceInformation(callback) {
	try {
		var configObject = new configuration();
		var instance = new cybersourceRestApi.DecisionManagerApi(configObject);

		var clientReferenceInformation = new cybersourceRestApi.Riskv1decisionsClientReferenceInformation();
		clientReferenceInformation.code = '54323007';

		var card = new cybersourceRestApi.Riskv1decisionsPaymentInformationCard();
	    card.number = '4444444444444448';
	    card.expirationMonth = '12';
	    card.expirationYear = '2020';
	    
	    var paymentInformation = new cybersourceRestApi.Riskv1decisionsPaymentInformation();
	    paymentInformation.card = card;

	    var amountDetails = new cybersourceRestApi.Riskv1decisionsOrderInformationAmountDetails();
	    amountDetails.currency = 'USD';
	    amountDetails.totalAmount = '144.14';


	    var billTo = new cybersourceRestApi.Riskv1decisionsOrderInformationBillTo();
	    billTo.address1 = '96, powers street';
	    billTo.administrativeArea = 'NH';
	    billTo.country = 'US';
	    billTo.locality = 'Clearwater milford';
	    billTo.firstName = 'James';
	    billTo.lastName = 'Smith';
	    billTo.phoneNumber = '7606160717';
	    billTo.email = 'test@visa.com';
	    billTo.postalCode = '03055';    

	    var orderInformation = new cybersourceRestApi.Riskv1decisionsOrderInformation();
	    orderInformation.amountDetails = amountDetails;
	    orderInformation.billTo = billTo;

        
        var deviceInformation = new cybersourceRestApi.Riskv1decisionsDeviceInformation();
        deviceInformation.cookiesAccepted = "yes";
        deviceInformation.ipAddress = "64.124.61.215";
        deviceInformation.hostName = "host.com";
        deviceInformation.httpBrowserEmail = "xyz@gmail.com";
        deviceInformation.userAgent = "Chrome";
        

	    var request = new cybersourceRestApi.CreateDecisionManagerCaseRequest();
	    request.clientReferenceInformation = clientReferenceInformation;
	    request.paymentInformation = paymentInformation;
	    request.orderInformation =orderInformation;
	    request.deviceInformation = deviceInformation;

	    console.log('\n*************** DecisionManagerWithDeviceInformation ********************* ');

			instance.createDecisionManagerCase(request, function (error, data, response) {
				if (error) {
					console.log('\nError in DecisionManagerWithDeviceInformation : ' + JSON.stringify(error));
				}
				else if (data) {
					console.log('\nData of DecisionManagerWithDeviceInformation : ' + JSON.stringify(data));
				}
				console.log('\nResponse of DecisionManagerWithDeviceInformation : ' + JSON.stringify(response));
				console.log('\nResponse Code of DecisionManagerWithDeviceInformation : ' + JSON.stringify(response['status']));
				callback(error, data);
			});
		} catch (error) {
			console.log(error);
		}
}

if (require.main === module) {
	DecisionManagerWithDeviceInformation(function () {
		console.log('\DecisionManagerWithDeviceInformation end.');
	}, false);
}
module.exports.DecisionManagerWithDeviceInformation = DecisionManagerWithDeviceInformation;