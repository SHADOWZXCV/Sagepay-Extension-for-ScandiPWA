/**
 * @category  ScandiPWA
 * @author    ScandiWeb Team <info@scandiweb.com>
 * @package   @scandipwa/sagepay-spwa
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import './SagePayIframe.style.scss';

/** @namespace SagepaySpwa/Component/SagePayIframe/Component/SagePayIframeComponent */
// eslint-disable-next-line react/prop-types
export class SagePayIframeComponent extends PureComponent {
    static propTypes = {
        src: PropTypes.string.isRequired
    };

    render() {
        const { src } = this.props;
        return (
            <div id="sagepay-iframe">
                <iframe src={ src } title="SagePay Server payment" />
            </div>
        );
    }
}

export default SagePayIframeComponent;
