/**
 * @category  ScandiPWA
 * @author    ScandiWeb Team <info@scandiweb.com>
 * @package   @scandipwa/sagepay-spwa
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import Loader from 'SourceComponent/Loader';

import MySavedCreditCardsRow from '../MySavedCreditCardsRow';

import './MySavedMyCreditCards.style.scss';
/** @namespace SagepaySpwa/Component/MySavedCreditCards/Component/MySavedCreditCardsComponent */
export class MySavedCreditCardsComponent extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        tokens: PropTypes.arrayOf(Object).isRequired,
        deleteToken: PropTypes.func.isRequired
    };

    renderLoader() {
        const { isLoading } = this.props;
        return <Loader isLoading={ isLoading } />;
    }

    renderTable() {
        const { tokens } = this.props;

        if (!tokens.length) {
            return this.renderNoReturns();
        }

        return (
            <table block="MyAccountMyCreditCards" elem="Table">
                <thead>
                <tr>
                    <th>{ __('CC Last 4 Digits') }</th>
                    <th>{ __('CC Type') }</th>
                    <th block="hidden-mobile">{ __('Expiration Date') }</th>
                    <th>{ __('') }</th>
                </tr>
                </thead>
                <tbody>
                { this.renderCreditCardsList() }
                </tbody>
            </table>
        );
    }

    renderCreditCardsList() {
        const { tokens, deleteToken } = this.props;
        return tokens.map(
            // eslint-disable-next-line react/no-array-index-key
            (token, key) => <MySavedCreditCardsRow key={ key } token={ token } deleteToken={ deleteToken } />
        );
    }

    renderNoReturns() {
        return (
            <div block="MyAccountMyCreditCards" elem="NoReturns">
                { __('You have not saved any credit card tokens yet.') }
            </div>
        );
    }

    render() {
        return (
            <div block="MyAccountMyCreditCards">
            { this.renderLoader() }
            { this.renderTable() }
            </div>
        );
    }
}

export default MySavedCreditCardsComponent;
