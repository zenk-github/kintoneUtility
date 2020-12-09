<?php
/**
 * Example - Search.
 *
 * Search Example
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
$procTitle = 'Example - Search ';

if ($logEcho) {
    stamessage($procTitle);
}

if ($logOutput) {
    putLog(__FILE__, __LINE__, $procTitle . 'Start the process.');
}

$utility = new Utility();

// --------------------------------------------------------------------
// Search
// --------------------------------------------------------------------
$selRec = [];
$selConditions = null;

if ($logOutput) {
    putLog(__FILE__, __LINE__, 'Step : Search');
}

$selOptions = [
//    'fields' => [
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
        'dataCount' => count($selRec),
    ];
    $utility->apiReturn(true, true, '200', $_POST, [], $ajaxReturn);
}

exit(0);
