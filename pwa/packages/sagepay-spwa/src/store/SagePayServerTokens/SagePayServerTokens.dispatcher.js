/**
 * @category  ScandiPWA
 * @author    ScandiWeb Team <info@scandiweb.com>
 * @package   @scandipwa/sagepay-spwa
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import { toggleSaveCards, updateSelectedCard, updateTokensAvailable } from './SagePayServerTokens.action';

/** @namespace SagepaySpwa/Store/SagePayServerTokens/Dispatcher/SagePayServerTokensDispatcher */
export class SagePayServerTokensDispatcher {
    toggleSaveCards(dispatch) {
        return dispatch(toggleSaveCards());
    }

    updateSelectedCard(token_id, dispatch) {
        return dispatch(updateSelectedCard(token_id));
    }

    updateTokensAvailable(areThereTokens, dispatch) {
        return dispatch(updateTokensAvailable(areThereTokens));
    }
}

export default new SagePayServerTokensDispatcher();
