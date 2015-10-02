// Get Billers
// URL: http: //pwcproduction.com/api/v1/qt/billers
//   METHOD: GET
// PARAMETERS: none

// Get BillerPayItems
// URL: http: //pwcproduction.com/api/v1/qt/billers/{biller}/payitems
//   METHOD: GET
// PARAMETERS:
//   biller: the Biller Id of the merchant as returned from interswitch

// Airtime Recharge
// URL: http: //pwcproduction.com/api/v1/qt/recharge
//   METHOD: POST
// PARAMETERS:
//   amount: (required) the amount to recharge
// phone: (required) the receipient 's phone number
// email: (required) the customers email address
// paymentcode: (required) the paymentcode of the sunscriber network as returned from the GetBillerPaymentItems response from interswitch

// Bills Payment
// URL: http: //pwcproduction.com/api/v1/qt/bills/pay
//   METHOD: POST
// PARAMETERS:
//   amount: (required) the bill amount to pay
// phone: (required) the customer / user 's phone number
// email: (required) the customer / user 's email address
// paymentcode: (required) the paymentcode of the sunscriber network as returned from the GetBillerPaymentItems response from interswitch
// customerid: (required) the customer Id of the receiving merchant as returned from Interswitch
