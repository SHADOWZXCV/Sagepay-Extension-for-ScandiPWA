<?php
/**
 * @category    ScandiWeb
 * @author      ScandiWeb Team <info@scandiweb.com>
 * @package     ScandiWeb_SagePaySuiteGraphQl
 * @copyright   Copyright (c) 2022 Scandiweb, Ltd (https://scandiweb.com)
 */

namespace Scandiweb\SagePaySuiteGraphQl\Model\Resolver;

use Exception;
use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Query\Resolver\ContextInterface;
use Magento\Framework\GraphQl\Query\Resolver\Value;
use Magento\Framework\GraphQl\Query\ResolverInterface;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;
use Ebizmarts\SagePaySuite\Api;
use Ebizmarts\SagePaySuite\Model\Token;
use Magento\Quote\Api\CartManagementInterface;

class GetNextUrl implements ResolverInterface {

    private $customerCartId;
    /**
     * @var \Ebizmarts\SagePaySuite\Api\ServerManagementInterface
     */
    protected $serverRequestManagement;

    /**
     * @var \Ebizmarts\SagePaySuite\Api\GuestServerManagementInterface
     */
    protected $guestServerRequestManagement;

    protected $iframeResponse;

    protected $cartManagementInterface;

    private $_config;

    private $_token;

    public function __construct(
        CartManagementInterface $cartManagementInterface,
        \Ebizmarts\SagePaySuite\Api\ServerManagementInterface $serverRequestManagement,
        \Ebizmarts\SagePaySuite\Api\GuestServerManagementInterface $guestServerRequestManagement,
        \Ebizmarts\SagePaySuite\Model\Config $config,
        Token $token
    )
    {
        $this->cartManagementInterface = $cartManagementInterface;
        $this->serverRequestManagement = $serverRequestManagement;
        $this->guestServerRequestManagement = $guestServerRequestManagement;
        $this->_config = $config;
        $this->_token = $token;
    }


    public function resolve(Field $field, $context, ResolveInfo $info, array $value = null, array $args = null)
    {
        $storeScope = \Magento\Store\Model\ScopeInterface::SCOPE_STORE;
        if($args['isSignedIn']){
            $token = ($args['token_id'] !== '') ? $this->_token->loadToken($args['token_id'])->getToken() : '';
            $this->customerCartId = (int)$this->cartManagementInterface->getCartForCustomer($context->getUserId())->getId();
            $this->iframeResponse = $this->serverRequestManagement->savePaymentInformationAndPlaceOrder($this->customerCartId, $args['save_token'], $token);
        } else {
            $this->iframeResponse = $this->guestServerRequestManagement->savePaymentInformationAndPlaceOrder($args['cartId'], false, '');
        }
        $this->iframeResponse = ['nextUrlDetails' => $this->iframeResponse->getResponse(), 'errors' => $this->iframeResponse->getErrorMessage()];
        if($this->iframeResponse['errors']){
            return [
                'data' => [
                    'status' => 500,
                    'data' => [
                        'VPSTxId' => null,
                        'SecurityKey' => null,
                        'NextURL' => null,
                        'VendorName'=> null
                    ]
                ],
                'errors' => $this->iframeResponse['errors']
            ];
        }
        return [
            'data' => [
                'status' => $this->iframeResponse['nextUrlDetails']['status'],
                'data' => [
                    'VPSTxId' => $this->iframeResponse['nextUrlDetails']['data']['VPSTxId'],
                    'SecurityKey' => $this->iframeResponse['nextUrlDetails']['data']['SecurityKey'],
                    'NextURL' => $this->iframeResponse['nextUrlDetails']['data']['NextURL'],
                    'VendorName'=> $this->_config->getVendorname()
                ]
            ],
            'errors' => null
        ];

    }
}