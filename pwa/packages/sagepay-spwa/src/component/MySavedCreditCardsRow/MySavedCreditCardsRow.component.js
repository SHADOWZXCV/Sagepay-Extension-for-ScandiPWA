/**
 * @category  ScandiPWA
 * @author    ScandiWeb Team <info@scandiweb.com>
 * @package   @scandipwa/sagepay-spwa
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import FIELD_TYPE from 'SourceComponent/PureForm/Field/Field.config';

import './MySavedCreditCardsRow.style.scss';

/** @namespace SagepaySpwa/Component/MySavedCreditCardsRow/Component/MySavedCreditCardsRowComponent */
export class MySavedCreditCardsRowComponent extends PureComponent {
    static propTypes = {
        token: PropTypes.objectOf(String).isRequired,
        deleteToken: PropTypes.func.isRequired
    };

    renderToken() {
        const {
            token: {
                cc_exp_month, cc_exp_year, cc_last_4, cc_type, id
            },
            deleteToken
        } = this.props;

        return (
            <tr block="MyAccountMyCreditCards" elem="Row">
                <td>{ cc_last_4 }</td>
                <td>{ cc_type }</td>
                <td block="hidden-mobile">{ `${cc_exp_month}/${cc_exp_year}` }</td>
                <td>
                <button
                  block="MyAccountMyCreditCards"
                  elem="token-delete Button"
                  type={ FIELD_TYPE.button }
                  mods={ { isHollow: true, isWithoutBorder: true } }
                   // eslint-disable-next-line react/jsx-no-bind
                  onClick={ async () => {
                      deleteToken(id);
                  } }
                >
                    { __('Delete') }
                </button>
                </td>
            </tr>
        );
    }

    render() {
        return (
            <>
            { this.renderToken() }
            </>
        );
    }
}

export default MySavedCreditCardsRowComponent;
