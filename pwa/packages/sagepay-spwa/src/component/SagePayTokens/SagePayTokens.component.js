/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/boolean-prop-naming */
/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-conditional */
/* eslint-disable no-nested-ternary */
/**
 * @category  ScandiPWA
 * @author    ScandiWeb Team <info@scandiweb.com>
 * @package   @scandipwa/sagepay-spwa
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import FIELD_TYPE from 'Component/Field/Field.config';
import Field from 'SourceComponent/Field';
import Loader from 'SourceComponent/Loader';
import { isSignedIn } from 'Util/Auth';

import SagePayToken from '../SagePayToken';

import './SagePayTokens.style.scss';

/** @namespace SagepaySpwa/Component/SagePayTokens/Component/SagePayTokensComponent */
export class SagePayTokensComponent extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        tokens_enabled: PropTypes.string.isRequired,
        tokens: PropTypes.arrayOf(Object).isRequired,
        saveCards: PropTypes.bool.isRequired,
        toggleSaveCards: PropTypes.func.isRequired,
        setSelectedCard: PropTypes.func.isRequired,
        deleteToken: PropTypes.func.isRequired,
        selectedCreditCard: PropTypes.string.isRequired,
        tokens_number: PropTypes.number.isRequired
    };

    renderLoader() {
        const { isLoading } = this.props;

        return <Loader isLoading={ isLoading } />;
    }

    renderSagePayTokensContainer() {
        const { tokens, setSelectedCard, toggleSaveCards } = this.props;
        const isCustomerSignedIn = isSignedIn();
        if (!isCustomerSignedIn) {
            setSelectedCard('');
            toggleSaveCards(false);
            return (null);
        }

        return (
            <div id="sagepaysuiteserver-tokens">
                <div id="token-list">
                { (tokens.length > 0) ? this.renderSagePayTokens() : this.renderWishToSaveCards() }
                </div>
            </div>
        );
    }

    renderSagePayTokens() {
        const {
            saveCards
        } = this.props;

        return (saveCards ? this.renderUseExistingCardButton() : this.renderTokensAndAddNewCard());
    }

    renderUseExistingCardButton() {
        const {
            toggleSaveCards
        } = this.props;

        return (
            <button
              block="sagepayserver"
              elem="token-add Button"
              type={ FIELD_TYPE.button }
              mods={ { isHollow: true, isWithoutBorder: true } }
              onClick={ () => (toggleSaveCards(false)) }
            >
               { __('Use Saved Card') }
            </button>
        );
    }

    renderTokensAndAddNewCard() {
        const {
            tokens,
            toggleSaveCards,
            setSelectedCard
        } = this.props;

        return (
            <>
                { tokens.map((token, key) => this.renderSagePayToken(token, key)) }
                <button
                  block="sagepayserver"
                  elem="token-add Button"
                  type={ FIELD_TYPE.button }
                  mods={ { isHollow: true, isWithoutBorder: true } }
                  onClick={ () => {
                      toggleSaveCards(true);
                      setSelectedCard('');
                  } }
                >
                    { __('Add new Card') }
                </button>
            </>
        );
    }

    renderSagePayToken(token, key) {
        const { setSelectedCard, selectedCreditCard, deleteToken } = this.props;

        return (
            <SagePayToken
              token={ token }
              key={ key }
              selectedCreditCard={ selectedCreditCard }
              setSelectedCard={ () => (setSelectedCard(token.id)) }
              deleteToken={ deleteToken }
            />
        );
    }

    renderWishToSaveCards() {
        const { toggleSaveCards, saveCards } = this.props;

        return (
            <Field
              type="checkbox"
              value="save_cards"
              label={ __('Do you wish to have your credit card details remembered for faster checkout next time?') }
              id="save_cards"
              mix={ { block: 'SagePay', elem: 'Checkbox' } }
              name="save_cards"
              attr={ {
                  checked: saveCards
              } }
              events={ {
                  onChange: () => toggleSaveCards(!saveCards)
              } }
              checked={ saveCards }
            />
        );
    }

    renderIframeNoticeMessage() {
        return (
            <h4 id="sagepay-server-notice-iframe">
                <b>
                A secure Sage Pay iframe will open for you to input credit card details.
                </b>
            </h4>
        );
    }

    renderCreditCardsNotice() {
        const { saveCards } = this.props;

        return (
            <h4>
            You will
                { !saveCards ? ' proceed payment with your selected card' : ' be using a new credit card' }
            </h4>
        );
    }

    render() {
        const {
            tokens_enabled,
            tokens_number
        } = this.props;

        return (
            <>
            { this.renderLoader() }
            { tokens_enabled && this.renderSagePayTokensContainer() }
            { this.renderIframeNoticeMessage() }
            { tokens_number > 0 ? this.renderCreditCardsNotice() : '' }
            </>
        );
    }
}

export default SagePayTokensComponent;
