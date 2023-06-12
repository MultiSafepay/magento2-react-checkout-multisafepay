<p align="center">
  <img src="https://camo.githubusercontent.com/517483ae0eaba9884f397e9af1c4adc7bbc231575ac66cc54292e00400edcd10/68747470733a2f2f7777772e6d756c7469736166657061792e636f6d2f66696c6561646d696e2f74656d706c6174652f696d672f6d756c7469736166657061792d6c6f676f2d69636f6e2e737667" width="400px" position="center">
</p>

# MultiSafepay module for the Hyva React Checkout

This is the module of our new Magento 2 Hyva React Checkout integration.

Before you get started with MultiSafepay and the Hyva React Checkout, please read and follow our [installation & configuration manual](https://docs.multisafepay.com/docs/magento-2) first.

## About MultiSafepay ##
MultiSafepay is a collecting payment service provider which means we take care of the agreements, technical details and payment collection required for each payment method. You can start selling online today and manage all your transactions from one place.

## Supported Payment Methods ##
The supported Payment Methods for this module can be found over here: [Payment Methods & Giftcards](https://docs.multisafepay.com/docs/magento-2#payment-methods)

## Requirements
- To use the plugin you need a MultiSafepay account. You can create a test account on https://testmerchant.multisafepay.com/signup
- Magento Open Source version 2.3.x & 2.4.x
- PHP 7.1+

## Installation
This package does not work yet with the MultiSafepay_Graphql module. 
Please disable the module first, if you have it installed.

Add our package to the PaymentMethodsRepo section in the reactapp package.json:

```
"config": {
    "paymentMethodsRepo": {
        "multisafepay": "https://github.com/multisafepay/magento2-react-checkout-multisafepay"
    }
},
```

Install the MultiSafepay package:
```
npm install
```

This module requires several third-party packages:

[react-datepicker](https://www.npmjs.com/package/react-datepicker) - Adds a datepicker component for Date of Birth fields.

[moment.js](https://momentjs.com/) - Parse the dates into a format that is supported by the MultiSafepay API.

[lodash](https://lodash.com/) - Manipulation of objects through different built in modular methods

To install these packages via npm, please run the following commands:
```
npm install --save react-datepicker moment lodash
```

Make sure to rebuild the project with:
```shell
npm run build
```

## Support
You can create issues on our repository. If you need any additional help or support, please contact <a href="mailto:integration@multisafepay.com">integration@multisafepay.com</a>

We are also available on our Magento Slack channel [#multisafepay-payments](https://magentocommeng.slack.com/messages/multisafepay-payments/).
Feel free to start a conversation or provide suggestions as to how we can refine our Hyva React Checkout integration.

## License
[Open Software License (OSL 3.0)](https://github.com/MultiSafepay/Magento2Msp/blob/master/LICENSE.md)

## Want to be part of the team?
Are you a developer interested in working at MultiSafepay? [View](https://www.multisafepay.com/careers/#jobopenings) our job openings and feel free to get in touch with us.
