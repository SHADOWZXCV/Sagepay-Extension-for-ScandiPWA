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
import { MySavedCreditCardsComponent } from './MySavedCreditCards.component';

/** @namespace SagepaySpwa/Component/MySavedCreditCards/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    showNotification: (type, message) => dispatch(showNotification(type, message))

});

/** @namespace SagepaySpwa/Component/MySavedCreditCards/Container/mapStateToProps */
export const mapStateToProps = (_sstate) => ({});

/** @namespace SagepaySpwa/Component/MySavedCreditCards/Container/MySavedCreditCardsContainer */
export class MySavedCreditCardsContainer extends PureComponent {
    static propTypes = {
        showNotification: PropTypes.func.isRequired
    };

    containerFunctions = {
        deleteToken: this.deleteToken.bind(this)
    };

    state = {
        isLoading: true,
        tokens_enabled: false,
        tokens: []
    };

    async componentDidMount() {
        await this.fetchTokens();
        this.setState({ isLoading: false });
    }

    async fetchTokens() {
        await fetchQuery(SagePayConfigQuery.getUserTokensQuery()).then(
            /** @namespace SagepaySpwa/Component/MySavedCreditCards/Container/fetchQuery/then */
            (data) => {
                const {
                    getTokens: {
                        tokens, tokens_enabled
                    }
                } = data;

                this.setState({
                    tokens_enabled,
                    tokens,
                    isLoading: false
                });
            }
        ).catch(
            /** @namespace SagepaySpwa/Component/MySavedCreditCards/Container/fetchQuery/then/catch */
            (error) => {
                showNotification('error', error);
                this.setState({
                    isLoading: false
                });
            }
        );
    }

    deleteToken(token_id) {
        const { showNotification } = this.props;
        this.setState({ isLoading: true });
        fetchMutation(SagePayConfigQuery.deleteUserTokenMutation(token_id))
            .then(
            /** @namespace SagepaySpwa/Component/MySavedCreditCards/Container/fetchMutation/then */
                async ({ deleteToken }) => {
                    const { TokenRemovalStatus } = deleteToken;
                    if (TokenRemovalStatus) {
                        showNotification('success', `Credit Card with ID ${token_id} is removed!`);
                        this.fetchTokens();
                    }
                }
            ).catch(
                /** @namespace SagepaySpwa/Component/MySavedCreditCards/Container/fetchMutation/then/catch */
                (error) => {
                    showNotification('error', error);
                }
            );
    }

    render() {
        return (
            <MySavedCreditCardsComponent
              { ...this.state }
              { ...this.props }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MySavedCreditCardsContainer);
