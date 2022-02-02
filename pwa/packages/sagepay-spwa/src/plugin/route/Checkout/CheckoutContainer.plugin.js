/* eslint-disable consistent-return */
/**
 * @category  ScandiPWA
 * @author    ScandiWeb Team <info@scandiweb.com>
 * @package   @scandipwa/sagepay-spwa
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */
import { render } from 'react-dom';

import { isSignedIn } from 'Util/Auth';
import { getGuestQuoteId } from 'Util/Cart';
import history from 'Util/History';
import {
    fetchQuery
} from 'Util/Request';
import {
    appendWithStoreCode,
    convertQueryStringToKeyValuePairs
} from 'Util/Url';

import Iframe from '../../../component/SagePayIframe/SagePayIframe.component';
import SagePayIframeQuery from '../../../query/SagePayIframe.query';
import { SAGEPAY_SERVER } from '../../component/CheckoutPayments/CheckoutPayments.config';
import {
    CART,
    SAGEPAY_SERVER_QUERY_STRING
} from './Checkout.config';

class CheckoutContainerPlugin {
        mapStateToProps = (args, callback, _instance) => ({
            ...callback(...args),
            sagePayServerSelectedCreditCard: args[0].SagePayServerTokensReducer.selectedCreditCard,
            sagePayServerSaveCards: args[0].SagePayServerTokensReducer.saveCards,
            sagePayServerAreThereTokens: args[0].SagePayServerTokensReducer.areThereTokens
        });

     savePaymentMethodAndPlaceOrder = (args, callback, instance) => {
         const [paymentInformation] = args;

         const { paymentMethod: { code } } = paymentInformation;
         if (code !== SAGEPAY_SERVER) {
             return callback.apply(instance, args);
         }

         const isCustomerSignedIn = isSignedIn();
         const guest_cart_id = !isCustomerSignedIn ? getGuestQuoteId() : '';

         if (!isCustomerSignedIn && !guest_cart_id) {
             return (null);
         }

         try {
             const {
                 sagePayServerAreThereTokens,
                 sagePayServerSelectedCreditCard,
                 sagePayServerSaveCards,
                 showErrorNotification
             } = instance.props;

             // show an error if a signed-in customer tries to complete payment without choosing
             // a credit card, nor checked enter a new payment ( only if are tokens already ).

             if (isCustomerSignedIn
                 && !sagePayServerSaveCards
                 && sagePayServerAreThereTokens
                 && sagePayServerSelectedCreditCard === '') {
                 instance.setState({
                     isLoading: false
                 });

                 return showErrorNotification('Please choose a credit card to pay with.');
             }

             fetchQuery(
                 SagePayIframeQuery
                     .getSagePayIframeQuery(sagePayServerSaveCards, sagePayServerSelectedCreditCard)
             ).then(
                 async ({ getNextUrl }) => {
                     const { errors, data } = getNextUrl;
                     if (errors) {
                         instance.setState({
                             isLoading: false
                         });

                         return showErrorNotification(errors);
                     }

                     return render(
                         <Iframe src={ data.data.NextURL } />,
                         document.getElementById('sagepay-iframe-container')
                     );
                 }
             );
         } catch (e) {
             const { showErrorNotification } = instance.props;
             showErrorNotification(e);
             instance._handleError(e);
         }
     };

    componentDidMount = (args, callback, instance) => {
        const { match: { params: { step: urlStep } } } = instance.props;

        if (/success/.test(urlStep)) {
            const { location: { search } } = instance.props;
            const parameters = convertQueryStringToKeyValuePairs(search);
            if (SAGEPAY_SERVER_QUERY_STRING in parameters) {
                instance.setDetailsStep(parameters[SAGEPAY_SERVER_QUERY_STRING]);
                const { updateMeta } = instance.props;
                return updateMeta({ title: __('Checkout') });
            }
        }
        if (/cancel/.test(urlStep)) {
            const { resetGuestCart, showInfoNotification } = instance.props;
            resetGuestCart();
            history.push(appendWithStoreCode(`/${ CART }`));
            showInfoNotification('You have cancelled the order.');
        }

        return callback(...args);
    };
}

const {
    mapStateToProps,
    savePaymentMethodAndPlaceOrder,
    componentDidMount
} = new CheckoutContainerPlugin();

export default {
    'Route/Checkout/Container/mapStateToProps': {
        function: mapStateToProps
    },
    'Route/Checkout/Container': {
        'member-function': {
            savePaymentMethodAndPlaceOrder,
            componentDidMount
        }
    }
};
