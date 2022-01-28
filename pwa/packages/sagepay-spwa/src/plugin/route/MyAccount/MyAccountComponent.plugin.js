/**
 * @category  ScandiPWA
 * @author    ScandiWeb Team <info@scandiweb.com>
 * @package   @scandipwa/sagepay-spwa
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import MySavedCreditCards from '../../../component/MySavedCreditCards';
import { MY_SAVED_CREDIT_CARDS } from './MyAccountPlugin.config';

export const renderMap = (originalMember) => ({
    ...originalMember,
    [MY_SAVED_CREDIT_CARDS]: MySavedCreditCards
});

export default {
    'Route/MyAccount/Component': {
        'member-property': {
            renderMap
        }
    }
};
