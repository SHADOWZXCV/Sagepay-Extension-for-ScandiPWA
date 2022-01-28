/**
 * @category  ScandiPWA
 * @author    ScandiWeb Team <info@scandiweb.com>
 * @package   @scandipwa/sagepay-spwa
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import { isSignedIn } from 'Util/Auth';
import { getGuestQuoteId } from 'Util/Cart';
import { Field } from 'Util/Query';

/** @namespace SagepaySpwa/Query/SagePayIframe/Query/SagePayIframeQuery */
export class SagePayIframeQuery {
    getSagePayIframeQuery(save_token, token_id) {
        const isUserSignedIn = isSignedIn();
        const nextUrlField = new Field('data')
            .addFieldList([
                'VPSTxId',
                'SecurityKey',
                'NextURL',
                'VendorName'
            ]);
        const nextUrlDataField = new Field('data')
            .addFieldList([
                'status',
                nextUrlField
            ]);
        const query = new Field('getNextUrl')
            .addArgument('cartId', 'String', !isUserSignedIn ? getGuestQuoteId() : '')
            .addArgument('isSignedIn', 'Boolean', isUserSignedIn)
            .addArgument('save_token', 'Boolean', save_token)
            .addArgument('token_id', 'String', token_id)
            .addField(nextUrlDataField)
            .addField('errors');

        return query;
    }
}

export default new SagePayIframeQuery();
