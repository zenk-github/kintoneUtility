<?php
/**
 * Example - Insert.
 *
 * Insert Example
 */

// --------------------------------------------------------------------
// Header
// --------------------------------------------------------------------
header('Content-Type: text/html; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

// --------------------------------------------------------------------
// Utility
// --------------------------------------------------------------------
require_once '../lib/Utility.php';

// --------------------------------------------------------------------
// Constant
// --------------------------------------------------------------------
/// Log display : true / false
$logEcho = false;

/// Log output : true / false
$logOutput = false;

/// debug : true / false
$debug = false;

if ($debug) {
    ini_set('display_errors', 'On');
}

/// json Return : true / false
$ajaxFlg = true;

// --------------------------------------------------------------------
// Main Process
// --------------------------------------------------------------------
$procTitle = 'Example - Insert ';

if ($logEcho) {
    stamessage($procTitle);
}

if ($logOutput) {
    putLog(__FILE__, __LINE__, $procTitle . 'Start the process.');
}

$utility = new Utility();

// --------------------------------------------------------------------
// Insert
// --------------------------------------------------------------------
$selRec = [];
$selConditions = null;

if ($logOutput) {
    putLog(__FILE__, __LINE__, 'Step : Insert');
}

$insData = [];

$ts = date('YmdHi00');

for ($i = 0; $i < 10; $i++) {
    $insData[] = [
        '会社名' => 'Example_' . $ts . '_' . $i,
        '顧客ランク' => [chr(mt_rand(65, 67))],
    ];
}

$res = $utility->apiInsert(APP_EXAMPLE, $insData);

if ($logOutput) {
    putLog(__FILE__, __LINE__, '"' . count($insData) . '" applicable data.');

    if ($debug) {
        print_r($insData);
    }
}

//-------------------------------------
// Process Exit
//-------------------------------------
if ($logOutput) {
    putLog(__FILE__, __LINE__, $procTitle . 'End the process.');
}

if ($logEcho) {
    endMessage(true);
}

if ($ajaxFlg) {
    $ajaxReturn = [
        'dataCount' => count($insData),
    ];
    $utility->apiReturn(true, true, '200', $_POST, [], $ajaxReturn);
}

exit(0);
