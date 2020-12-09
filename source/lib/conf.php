<?php

/* ---------------------------------
 * Kintone
 * --------------------------------- */
/// Kintone URL
define('KINTONE_ROOT_URL', 'https://example.cybozu.com/k/v1/');
/// Kintone USER
define('KINTONE_AUTH_USER', 'kintoneログイン名');
/// Kintone PASSWORD
define('KINTONE_AUTH_PASS', 'kintoneパスワード');

/* ---------------------------------
 * Kintone API
 * --------------------------------- */
/// API
define('API_PROC_UPPER_LIMIT', 100);

/* ---------------------------------
 * Kintone APP
 * --------------------------------- */
/// example
define('APP_EXAMPLE', 'example');

/* ---------------------------------
 * Project settings
 * --------------------------------- */
// Root directory
define('CURRENT_DIR', realpath(dirname(__DIR__)));

// Working directory
define('TMP_DIR', CURRENT_DIR . '/' . 'tmp');
