<?php
/**
 * @category    ScandiWeb
 * @author      ScandiWeb Team <info@scandiweb.com>
 * @package     ScandiWeb_SagePaySuiteGraphQl
 * @copyright   Copyright (c) 2022 Scandiweb, Ltd (https://scandiweb.com)
 */

namespace Scandiweb\SagePaySuiteGraphQl\Model\Resolver;

use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Query\Resolver\ContextInterface;
use Magento\Framework\GraphQl\Query\Resolver\Value;
use Magento\Framework\GraphQl\Query\ResolverInterface;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;
use Ebizmarts\SagePaySuite\Model\Token;
use Magento\Customer\Helper\Session\CurrentCustomer;

class SagePayServerConfig implements ResolverInterface {

    const PATH_SERVER_TOKEN = 'sagepaysuite/global/token';
    const PATH_SERVER_VENDOR_NAME = 'sagepaysuite/global/vendorname';

    protected $scopeConfig;

    private $token;

    private $currentCustomer;

    public function __construct(
        \Magento\Framework\App\Config\ScopeConfigInterface $scopeConfig,
        CurrentCustomer $currentCustomer,
        Token $token
    )
    {
        $this->scopeConfig = $scopeConfig;
        $this->currentCustomer = $currentCustomer;
        $this->token = $token;
    }


    public function resolve(Field $field, $context, ResolveInfo $info, array $value = null, array $args = null)
    {
        $storeScope = \Magento\Store\Model\ScopeInterface::SCOPE_STORE;
        $AreTokensEnabled = $this->scopeConfig->getValue(self::PATH_SERVER_TOKEN, $storeScope);
        $convert_str = ($AreTokensEnabled === '1');
        return [
            'tokens_enabled' => $convert_str,
            'tokens' => $this->token->getCustomerTokens($this->currentCustomer->getCustomerId(), $this->scopeConfig->getValue(self::PATH_SERVER_VENDOR_NAME, $storeScope))
        ];

    }
}