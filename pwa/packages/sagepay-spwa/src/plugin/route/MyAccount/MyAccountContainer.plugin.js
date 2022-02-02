/**
 * @category  ScandiPWA
 * @author    ScandiWeb Team <info@scandiweb.com>
 * @package   @scandipwa/sagepay-spwa
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import { MY_SAVED_CREDIT_CARDS } from './MyAccountPlugin.config';

export const savedCardsTabMap = {
    url: '/saved-credit-cards',
    name: __('My Saved Credit Cards')
};

export const tabMap = (originalMember) => ({
    ...originalMember,
    [MY_SAVED_CREDIT_CARDS]: savedCardsTabMap
});

export default {
    'Route/MyAccount/Container': {
        'static-member': {
            tabMap
        }
    }
};
