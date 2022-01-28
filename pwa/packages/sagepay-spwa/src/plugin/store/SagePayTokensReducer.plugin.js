/**
 * @category  ScandiPWA
 * @author    ScandiWeb Team <info@scandiweb.com>
 * @package   @scandipwa/sagepay-spwa
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import { SagePayServerTokensReducer } from '../../store/SagePayServerTokens';

export class SagePayTokensReducerPlugin {
     /**
      * Get static reducers
      * @param args
      * @param callback
      * @param instance
      * @returns {*}
      */
     getStaticReducers = (args, callback, instance) => ({
         ...callback.apply(instance, args),
         SagePayServerTokensReducer
     });
}

const { getStaticReducers } = new SagePayTokensReducerPlugin();

export const config = {
    'Store/Index/getStaticReducers': {
        function: [
            {
                position: 10,
                implementation: getStaticReducers
            }
        ]
    }
};

export default config;
