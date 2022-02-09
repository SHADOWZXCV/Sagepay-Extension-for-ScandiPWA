/**
 * @category  ScandiPWA
 * @author    ScandiWeb Team <info@scandiweb.com>
 * @package   @scandipwa/sagepay-spwa
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

export const TOGGLE_SAVE_CARDS = 'TOGGLE_SAVE_CARDS';
export const UPDATE_SELECTED_CARD = 'UPDATE_SELECTED_CARD';
export const UPDATE_TOKENS_AVAILABLE = 'UPDATE_TOKENS_AVAILABLE';

/** @namespace SagepaySpwa/Store/SagePayServerTokens/Action/toggleSaveCards */
export const toggleSaveCards = (saveCards) => ({
    type: TOGGLE_SAVE_CARDS,
    saveCards
});

/** @namespace SagepaySpwa/Store/SagePayServerTokens/Action/updateSelectedCard */
export const updateSelectedCard = (selectedCreditCard) => ({
    type: UPDATE_SELECTED_CARD,
    selectedCreditCard
});

/** @namespace SagepaySpwa/Store/SagePayServerTokens/Action/updateTokensAvailable */
export const updateTokensAvailable = (areThereTokens) => ({
    type: UPDATE_TOKENS_AVAILABLE,
    areThereTokens
});
