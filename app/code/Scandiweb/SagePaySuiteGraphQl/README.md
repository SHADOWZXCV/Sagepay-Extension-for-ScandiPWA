# Scandiweb_SagePaySuiteGraphQl version:1.0.0
This module provides compatibility with SagePay server integration payment method.
Features are:
- Can make a purchase by entering credit card details, using Opayo server integration.
- Can see saved credit cards details on the account settings ( for signed-in customers )
- Can make a purchase with saved credit cards for signed-in customers.

### Created as support for Ebizmarts/SagePaySuite Version: 1.2.8

#### Tested on:
* Magento2:`2.4.3`
* ScandiPWA:`5.1.1`
* ScandiPWA Extension: `@scandipwa/sagepay-spwa:1.0.0`

## How to install
1. install the required modules using composer ( or get it from your PM ) for the extension to function properly.
2. Configuration part:
   1. Make sure base currency is set to `British Pound`, as no other currency is going to work with the extension.
   2. Make sure to enter the following credentials on sagepay basic settings on the admin panel:
      1. License Key
      2. Vendorname
      3. Set appropriate mode.
      4. Save Credit Card Tokens ( for credit cards saving functionality )
      5. Reporting API User
      6. Reporting API Password
   3. Make sure to enable sagepay server integration from `Opayo SERVER Integration` menu.
