<?php 
// APPID (开户邮件中可查看)
define("APP_ID",  "YOUR_APP_ID");

// 商户号 (开户邮件中可查看)
define("MCH_ID",  "YOUR_MCH_ID");

// 商户支付密钥 (https://pay.weixin.qq.com/index.php/account/api_cert)
define("APP_KEY", "YOUR_APP_KEY");

// get prepay id
$prepay_id = generatePrepayId(APP_ID, MCH_ID);

// re-sign it
$response = array(
    'appid'     => APP_ID,
    'partnerid' => MCH_ID,
    'prepayid'  => $prepay_id,
    'package'   => 'Sign=WXPay',
    'noncestr'  => generateNonce(),
    'timestamp' => time(),
);
$response['sign'] = calculateSign($response, APP_KEY);

// send it to APP
echo json_encode($response);

/**
 * Generate a nonce string
 *
 * @link https://pay.weixin.qq.com/wiki/doc/api/app.php?chapter=4_3
 */
function generateNonce()
{
    return md5(uniqid('', true));
}

/**
 * Get a sign string from array using app key
 *
 * @link https://pay.weixin.qq.com/wiki/doc/api/app.php?chapter=4_3
 */
function calculateSign($arr, $key)
{
    ksort($arr);

    $buff = "";
    foreach ($arr as $k => $v) {
        if ($k != "sign" && $k != "key" && $v != "" && !is_array($v)){
            $buff .= $k . "=" . $v . "&";
        }
    }

    $buff = trim($buff, "&");

    return strtoupper(md5($buff . "&key=" . $key));
}

/**
 * Get xml from array
 */
function getXMLFromArray($arr)
{
    $xml = "<xml>";
    foreach ($arr as $key => $val) {
        if (is_numeric($val)) {
            $xml .= sprintf("<%s>%s</%s>", $key, $val, $key);
        } else {
            $xml .= sprintf("<%s><![CDATA[%s]]></%s>", $key, $val, $key);
        }
    }

    $xml .= "</xml>";

    return $xml;
}

/**
 * Generate a prepay id
 *
 * @link https://pay.weixin.qq.com/wiki/doc/api/app.php?chapter=9_1
 */
function generatePrepayId($app_id, $mch_id)
{
    $params = array(
        'appid'            => $app_id,
        'mch_id'           => $mch_id,
        'nonce_str'        => generateNonce(),
        'body'             => 'Test product name',
        'out_trade_no'     => time(),
        'total_fee'        => 1,
        'spbill_create_ip' => '8.8.8.8',
        'notify_url'       => 'http://localhost',
        'trade_type'       => 'APP',
    );

    // add sign
    $params['sign'] = calculateSign($params, APP_KEY);

    // create xml
    $xml = getXMLFromArray($params);

    // send request
    $ch = curl_init();

    curl_setopt_array($ch, array(
        CURLOPT_URL            => "https://api.mch.weixin.qq.com/pay/unifiedorder",
        CURLOPT_POST           => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER     => array('Content-Type: text/xml'),
        CURLOPT_POSTFIELDS     => $xml,
    ));

    $result = curl_exec($ch);
    curl_close($ch);

    // get the prepay id from response
    $xml = simplexml_load_string($result);
    return (string)$xml->prepay_id;
}
