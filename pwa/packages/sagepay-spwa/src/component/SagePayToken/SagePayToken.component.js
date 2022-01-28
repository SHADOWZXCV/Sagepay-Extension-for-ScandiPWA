/* eslint-disable react/jsx-no-bind */
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
import Image from 'SourceComponent/Image';

import './SagePayToken.style.scss';

/** @namespace SagepaySpwa/Component/SagePayToken/Component/SagePayTokenComponent */
export class SagePayTokenComponent extends PureComponent {
    static propTypes = {
        token: PropTypes.objectOf(String).isRequired,
        getImgSrcByType: PropTypes.func.isRequired,
        setSelectedCard: PropTypes.func.isRequired,
        selectedCreditCard: PropTypes.string.isRequired,
        key: PropTypes.number,
        deleteToken: PropTypes.func.isRequired
    };

    static defaultProps = {
        key: 0
    };

    renderSagePayToken() {
        const {
            token: {
                cc_last_4,
                cc_type,
                id
            },
            key,
            selectedCreditCard,
            deleteToken,
            getImgSrcByType,
            setSelectedCard
        } = this.props;

        return (
            <button
              mix={ { block: 'sagepayserver', elem: 'token' } }
              id={ `sagepayserver-token-${id}` }
              type={ FIELD_TYPE.button }
              onClick={ () => {
                  setSelectedCard(id);
              } }
            >
                <Field
                  type={ FIELD_TYPE.radio }
                  key={ key }
                  attr={ {
                      id: `sagepayserver-token-${id}`,
                      name: `sagepayserver-token-${id}`,
                      checked: (selectedCreditCard === id)
                  } }
                  placeholder={ __('SagePay Token') }
                  mix={ { block: 'SagePay', elem: 'Token' } }
                  aria-label={ __('Your SagePay Credit Card Token') }
                />

                <Image
                  ratio="custom-sagepay-card"
                  src={ getImgSrcByType(cc_type) }
                  alt={ cc_type }
                  isPlaceholder={ !id }
                />

                <p block="sagepayserver" elem="token-p">
                    { `**********${cc_last_4}` }
                </p>

                <button
                  block="sagepayserver"
                  elem="token-delete Button"
                  type={ FIELD_TYPE.button }
                  mods={ { isHollow: true, isWithoutBorder: true } }
                  onClick={ async () => {
                      deleteToken(id);
                  } }
                >
                    { __('Delete') }
                </button>
            </button>
        );
    }

    render() {
        return (
            <>
            { this.renderSagePayToken() }
            </>
        );
    }
}

export default SagePayTokenComponent;
