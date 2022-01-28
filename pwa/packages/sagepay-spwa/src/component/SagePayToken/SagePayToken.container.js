/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
/**
 * @category  ScandiPWA
 * @author    ScandiWeb Team <info@scandiweb.com>
 * @package   @scandipwa/sagepay-spwa
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import AMEX from '../../static/images/cc/AMEX.png';
import DC from '../../static/images/cc/dcfornow.png';
import JCB from '../../static/images/cc/JCB.png';
import MAESTRO from '../../static/images/cc/MAESTRO.png';
import MC from '../../static/images/cc/mc.png';
import VI from '../../static/images/cc/vi.png';
import SagePayTokenComponent from './SagePayToken.component';

/** @namespace SagepaySpwa/Component/SagePayToken/Container/SagePayTokenContainer */
export class SagePayTokenContainer extends PureComponent {
    containerFunctions = {
        getImgSrcByType: this.getImgSrcByType.bind(this)
    };

    static propTypes = {
        setSelectedCard: PropTypes.func.isRequired,
        selectedCreditCard: PropTypes.string.isRequired,
        deleteToken: PropTypes.func.isRequired
    };

    getImgSrcByType(type) {
        switch (type) {
        case 'VISA':
        case 'DELTA':
        case 'UKE':
            return VI;
        case 'MC':
        case 'MCDEBIT':
            return MC;
        case 'MAESTRO':
            return MAESTRO;
        case 'AMEX':
            return AMEX;
        case 'JCB':
            return JCB;
        case 'DC':
            return DC;
        default:
            return '';
        }
    }

    render() {
        return (
            <SagePayTokenComponent
              { ...this.props }
              { ...this.containerFunctions }
            />
        );
    }
}

export default SagePayTokenContainer;
