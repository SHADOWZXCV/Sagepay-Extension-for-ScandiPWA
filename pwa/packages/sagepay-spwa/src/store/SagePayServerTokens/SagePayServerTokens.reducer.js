/**
 * @category  ScandiPWA
 * @author    ScandiWeb Team <info@scandiweb.com>
 * @package   @scandipwa/sagepay-spwa
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import { TOGGLE_SAVE_CARDS, UPDATE_SELECTED_CARD, UPDATE_TOKENS_AVAILABLE } from './SagePayServerTokens.action';

/** @namespace SagepaySpwa/Store/SagePayServerTokens/Reducer/getInitialState */
export const getInitialState = () => ({
    saveCards: false,
    selectedCreditCard: '',
    areThereTokens: false
});

/** @namespace SagepaySpwa/Store/SagePayServerTokens/Reducer/SagePayTokensReducer */
export const SagePayTokensReducer = (state = getInitialState(), action) => {
    const { type } = action;

    switch (type) {
    case TOGGLE_SAVE_CARDS:
        const { saveCards } = action;
        return {
            ...state,
            saveCards
        };
    case UPDATE_SELECTED_CARD:
        const { selectedCreditCard } = action;
        return {
            ...state,
            selectedCreditCard
        };
    case UPDATE_TOKENS_AVAILABLE:
        const { areThereTokens } = action;
        return {
            ...state,
            areThereTokens
        };
    default:
        return state;
    }
};

export default SagePayTokensReducer;
