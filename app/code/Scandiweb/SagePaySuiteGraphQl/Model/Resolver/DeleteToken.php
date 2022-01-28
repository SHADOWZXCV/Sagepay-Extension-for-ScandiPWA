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
use Ebizmarts\SagePaySuite\Model\Token;


class DeleteToken implements ResolverInterface {

    private $_token;

    public function __construct(
        Token $token
    )
    {
        $this->_token = $token;
    }


    public function resolve(Field $field, $context, ResolveInfo $info, array $value = null, array $args = null)
    {
            $isTokenDefined = $this->_token->loadToken($args['token_id'])->deleteToken();
            return [
                'TokenRemovalStatus' => $isTokenDefined ? false : true
            ];
    }
}