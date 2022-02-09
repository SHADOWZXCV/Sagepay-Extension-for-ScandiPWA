/* eslint-disable react/boolean-prop-naming */
/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
/**
 * @category  ScandiPWA
 * @author    ScandiWeb Team <info@scandiweb.com>
 * @package   @scandipwa/sagepay-spwa
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { showNotification } from 'Store/Notification/Notification.action';
import { fetchMutation, fetchQuery } from 'Util/Request';

import SagePayConfigQuery from '../../query/SagePayConfig.query';
import { toggleSaveCards, updateSelectedCard, updateTokensAvailable } from '../../store/SagePayServerTokens';
import SagePayTokensComponent from './SagePayTokens.component';

/** @namespace SagepaySpwa/Component/SagePayTokens/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    selectedCreditCard: state.SagePayServerTokensReducer.selectedCreditCard,
    saveCards: state.SagePayServerTokensReducer.saveCards
});

/** @namespace SagepaySpwa/Component/SagePayTokens/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    setSelectedCard: (selectedCard) => dispatch(updateSelectedCard(selectedCard)),
    toggleSaveCards: (saveCards) => dispatch(toggleSaveCards(saveCards)),
    showNotification: (type, message) => dispatch(showNotification(type, message)),
    updateAreThereTokens: (areThereTokens) => dispatch(updateTokensAvailable(areThereTokens))
});

/** @namespace SagepaySpwa/Component/SagePayTokens/Container/SagePayTokensContainer */
export class SagePayTokensContainer extends PureComponent {
    static propTypes = {
        showNotification: PropTypes.func.isRequired,
        setSelectedCard: PropTypes.func.isRequired,
        toggleSaveCards: PropTypes.func.isRequired,
        updateAreThereTokens: PropTypes.func.isRequired,
        saveCards: PropTypes.bool.isRequired
    };

    state = {
        isLoading: true,
        tokens_enabled: false,
        tokens: [],
        tokens_number: 0
    };

    containerFunctions = {
        deleteToken: this.deleteToken.bind(this)
    };

    componentDidMount() {
        return this.fetchTokens().then(
            /** @namespace SagepaySpwa/Component/SagePayTokens/Container/fetchTokens/then */
            (_data) => {
                this.setState({ isLoading: false });
            }
        );
    }

    async fetchTokens() {
        await fetchQuery(SagePayConfigQuery.getUserTokensQuery()).then(
            /** @namespace SagepaySpwa/Component/SagePayTokens/Container/fetchQuery/then */
            (data) => {
                const {
                    getTokens: {
                        tokens, tokens_enabled
                    }
                } = data;

                this.setState({
                    tokens_enabled,
                    tokens,
                    isLoading: !tokens_enabled,
                    tokens_number: tokens.length
                }, () => {
                    const { toggleSaveCards, saveCards, updateAreThereTokens } = this.props;
                    const { tokens_number } = this.state;

                    if (tokens_number > 0) {
                        updateAreThereTokens(true);
                    }
                    if (!saveCards && tokens_number <= 0) {
                        toggleSaveCards(true);
                        updateAreThereTokens(false);
                    } else if (saveCards && tokens_number > 0) {
                        toggleSaveCards(false);
                    }
                });
            }
        ).catch(
            /** @namespace SagepaySpwa/Component/SagePayTokens/Container/fetchQuery/then/catch */
            (error) => {
                showNotification('error', error);
            }
        );
    }

    deleteToken(token_id) {
        const { showNotification, setSelectedCard } = this.props;
        this.setState({ isLoading: true });
        fetchMutation(SagePayConfigQuery.deleteUserTokenMutation(token_id))
            .then(
            /** @namespace SagepaySpwa/Component/SagePayTokens/Container/fetchMutation/then */
                async ({ deleteToken }) => {
                    const { TokenRemovalStatus } = deleteToken;
                    if (TokenRemovalStatus) {
                        setSelectedCard('');
                        showNotification('success', `Token with ID ${token_id} is removed!`);
                        await this.fetchTokens();
                        this.setState({ isLoading: false });
                    }
                }
            ).catch(
                /** @namespace SagepaySpwa/Component/SagePayTokens/Container/fetchMutation/then/catch */
                (error) => {
                    showNotification('error', error);
                }
            );
    }

    render() {
        return (
            <SagePayTokensComponent
              { ...this.state }
              { ...this.props }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SagePayTokensContainer);
