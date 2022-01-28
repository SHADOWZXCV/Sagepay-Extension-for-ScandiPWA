/**
 * @category  ScandiPWA
 * @author    ScandiWeb Team <info@scandiweb.com>
 * @package   @scandipwa/sagepay-spwa
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import { Field } from 'Util/Query';

/** @namespace SagepaySpwa/Query/SagePayConfig/Query/SagePayConfigQuery */
export class SagePayConfigQuery {
    getUserTokensQuery() {
        const tokens = new Field('tokens')
            .addFieldList([
                'id',
                'customer_id',
                'cc_last_4',
                'cc_type',
                'cc_exp_month',
                'cc_exp_year'
            ]);
        const query = new Field('getTokens')
            .addField('tokens_enabled')
            .addField(tokens);

        return query;
    }

    deleteUserTokenMutation(token_id) {
        const query = new Field('deleteToken')
            .addArgument('token_id', 'String', token_id)
            .addField('TokenRemovalStatus');

        return query;
    }
}

export default new SagePayConfigQuery();
