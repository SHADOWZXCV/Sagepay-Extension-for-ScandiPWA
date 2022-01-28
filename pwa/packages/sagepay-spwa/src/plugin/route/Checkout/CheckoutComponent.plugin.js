/**
 * @category  ScandiPWA
 * @author    ScandiWeb Team <info@scandiweb.com>
 * @package   @scandipwa/sagepay-spwa
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

export const render = (args, callback, _instance) => (
    <>
              { callback(...args) }
              <div id="sagepay-iframe-container" />
    </>
);

export default {
    'Route/Checkout/Component': {
        'member-function': {
            render
        }
    }
};
