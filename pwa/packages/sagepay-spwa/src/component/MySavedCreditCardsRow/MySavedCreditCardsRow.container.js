/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
/**
 * @category  ScandiPWA
 * @author    ScandiWeb Team <info@scandiweb.com>
 * @package   @scandipwa/sagepay-spwa
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { MySavedCreditCardsRowComponent } from './MySavedCreditCardsRow.component';

/** @namespace SagepaySpwa/Component/MySavedCreditCardsRow/Container/MySavedCreditCardsRowContainer */
export class MySavedCreditCardsRowContainer extends PureComponent {
    static propTypes = {
        deleteToken: PropTypes.func.isRequired
    };

    render() {
        return (
            <MySavedCreditCardsRowComponent
              { ...this.props }
            />
        );
    }
}

export default MySavedCreditCardsRowContainer;
