<?php
/**
 * Examples - Update.
 *
 * Update Example
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
$procTitle = 'Example - Update ';

if ($logEcho) {
    stamessage($procTitle);
}

if ($logOutput) {
    putLog(__FILE__, __LINE__, $procTitle . 'Start the process.');
}

$utility = new Utility();

// --------------------------------------------------------------------
// Update
// --------------------------------------------------------------------
$selRec = [];
$selConditions = null;

if ($logOutput) {
    putLog(__FILE__, __LINE__, 'Step : Search');
}

$selOptions = [
//    'field' => [
//    ],
];

if ($selConditions !== null) {
    $selOptions['where'] = $selConditions;
}

$selRec = $utility->apiSelect(APP_EXAMPLE, $selOptions);

if ($logOutput) {
    putLog(__FILE__, __LINE__, '"' . count($selRec) . '" applicable data.');

    if ($debug) {
        print_r($selRec);
    }
}

$updData = [];

foreach ($selRec as $key => $val) {
    $updData[] = [
        'id' => $val['id'],
        'revision' => $val['revision'],
        '更新回数' => (int) ($val['更新回数']) + 1,
    ];
}

$res = $utility->apiUpdate(APP_EXAMPLE, $updData);

if ($logOutput) {
    putLog(__FILE__, __LINE__, '"' . count($updData) . '" applicable data.');

    if ($debug) {
        print_r($updData);
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
        'dataCount' => count($updData),
    ];
    $utility->apiReturn(true, true, '200', $_POST, [], $ajaxReturn);
}

exit(0);
