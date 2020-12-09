//********************************************************************************
//* 共通ＵＲＬ
//********************************************************************************
/// Server URL
var serverURL = 'https://example.com/';

/// URI
var rootURL = '/k/v1/';

/**************************************
 * ダイアログを作成
 **************************************/
let createDialog = function(dialogId, dialogTitle) {
  let divId = 'dialog_' + dialogId;
  $('body').append($('<div id=' + divId + ' title="' + dialogTitle + '" class="display-none">'));
  return divId;
}

/**************************************
 * ダイアログを閉じる
 **************************************/
let dialogClose = function(divId) {
  $('#' + divId).dialog('close');
  $('#' + divId).remove();
  location.reload();
}

/**************************************
 * 確認 - ダイアログ
 **************************************/
let dialogConfirm = function(divId, divTitle) {
  $('#' + divId).append($('<div class="kintoneplugin-label"><p>' + divTitle + 'を実行します。<br>よろしいですか？</p></div>'));
  return divId;
}

/**************************************
 * 正常終了 - ダイアログ
 **************************************/
let dialogSuccess = function(divId, divTitle, divNumberProcess) {
  $('#' + divId).append($('<div class="kintoneplugin-label"><p>' + divTitle + 'は正常に終了しました。</p></div>'));
  $('#' + divId).append($('<div class="kintoneplugin-label"><p>' + divNumberProcess + '件のレコードを処理しました。</p></div>'));
  return divId;
}

/**************************************
 * 外部サーバ異常終了 - ダイアログ
 **************************************/
let dialogExternalError = function(divId, divTitle, resultData) {
  let displayMessage = '<br>Code：' + resultData.code;
  displayMessage += '<br>Message：' + resultData.error;
  $('#' + divId).append($('<div class="kintoneplugin-label"><p>' + divTitle + 'は失敗しました。<br>' + displayMessage + '</p></div>'));
  return divId;
}

/**************************************
 * ajax通信異常終了 - ダイアログ
 **************************************/
let dialogAjaxError = function(divId, divTitle) {
  $('#' + divId).append($('<div class="kintoneplugin-label"><p>' + divTitle + 'は失敗しました。<br>Error:通信失敗</p></div>'));
  return divId;
}

/**************************************
 * その他 - ダイアログ
 **************************************/
let dialogOther = function(divId, content) {
  $('#' + divId).append($('<div class="kintoneplugin-label"><p>' + content + '</p></div>'));
  return divId;
}

/**************************************
 * ローディング表示
 **************************************/
function showSpinner() {
  // 要素作成等初期化処理
  if ($('.kintone-spinner').length == 0) {
    // スピナー設置用要素と背景要素の作成
    var spin_div = $('<div id ="kintone-spin" class="kintone-spinner"></div>');
    var spin_bg_div = $('<div id ="kintone-spin-bg" class="kintone-spinner"></div>');
    // スピナー用要素をbodyにappend
    $(document.body).append(spin_div, spin_bg_div);
    // スピナー動作に伴うスタイル設定
    $(spin_div).css({
      'position': 'fixed',
      'top': '50%',
      'left': '50%',
      'z-index': '510',
      'padding': '26px',
      '-moz-border-radius': '4px',
      '-webkit-border-radius': '4px',
      'border-radius': '4px'
    });
    $(spin_bg_div).css({
      'position': 'absolute',
      'top': '0px',
      'left': '0px',
      'z-index': '500',
      'width': '100%',
      'height': '200%',
      'background-color': '#a9a9a9',
      'opacity': '0.5',
      'filter': 'alpha(opacity=50)',
      '-ms-filter': 'alpha(opacity=50)'
    });
    // スピナーに対するオプション設定
    var opts = {
      'color': '#41abc0',
    };
    // スピナーを作動
    new Spinner(opts).spin(document.getElementById('kintone-spin'));
  }
  // スピナー始動（表示）
  $('.kintone-spinner').show();
}

/**************************************
 * ローディング非表示
 **************************************/
function hideSpinner() {
  // スピナー停止（非表示）
  $('.kintone-spinner').hide();
}
