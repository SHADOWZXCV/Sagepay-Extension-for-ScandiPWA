/**
 * @category  ScandiPWA
 * @author    ScandiWeb Team <info@scandiweb.com>
 * @package   @scandipwa/sagepay-spwa
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import SagePayTokens from '../../../component/SagePayTokens';
import { SAGEPAY_SERVER } from './CheckoutPayments.config';

export const renderSagePayServer = () => <SagePayTokens />;

export const paymentRenderMap = (member, _instance) => ({
    ...member,
    [SAGEPAY_SERVER]: renderSagePayServer
});

export default {
    'Component/CheckoutPayments/Component': {
        'member-property': {
            paymentRenderMap
        }
    }
};
