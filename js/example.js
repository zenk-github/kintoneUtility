/*******************************************************************************
 * Example
 *******************************************************************************/

jQuery(function($) {
  'use strict';

  /**************************************
   * List screen
   **************************************/
  kintone.events.on('app.record.index.show', function(event) {
    // Add custom button
    event = addCustomBtn();
    return event;
  });

  /**************************************
   * Custom Button
   **************************************/
  let addCustomBtn = function() {
    /// Bug avoidance
    if (document.getElementById('custom_button') != null) {
      return;
    }
    /// Button
    let customButton = document.createElement('button');
    customButton.id = 'custom_button';
    customButton.innerHTML = 'Example';
    customButton.className = 'kintoneplugin-button-normal';
    /// Event
    customButton.onclick = function() {
      // 処理タイトル
      let procTitle = 'Example';
      // 処理用id
      let procId = 'Example';
      // ダイアログ要素
      let divId = createDialog(procId, procTitle);
      // ダイアログ表示内容
      let dialogId = dialogContents(divId, procId);
      // ダイアログ表示
      $('#' + dialogId).dialog({
        modal: true,
        width: 750,
        closeOnEscape: false,
        dialogClass: 'no-close',
        buttons: {
          '一括登録（10件）': function(event) {
            // ローディング表示
            showSpinner();
            $.ajax({
              type: 'POST',
              url: serverURL + 'example/insert.php',
              dataType: 'json',
              data: {},
            }).then(
              function(data, status, xhr) {
                // 通信成功時の処理
                // ローディング非表示
                hideSpinner();
                if (data.status) {
                  // 正常終了
                  if (data.procResult.dataCount > 0) {
                    // 処理用id
                    let procNoticeSuccessId1 = procId + '_success';
                    // ダイアログ要素
                    let divNoticeSuccessId1 = createDialog(procNoticeSuccessId1, procTitle);
                    // 表示内容作成
                    let dialogNoticeSuccessId1 = dialogSuccess(divNoticeSuccessId1, procTitle + '(Insert)', data.procResult.dataCount);
                    // ダイアログ表示
                    $('#' + dialogNoticeSuccessId1).dialog({
                      modal: true,
                      width: 400,
                      closeOnEscape: false,
                      dialogClass: 'no-close',
                      buttons: {
                        'Exit': function() {
                          dialogClose(dialogNoticeSuccessId1);
                          dialogClose(dialogId);
                        }
                      },
                      open: function() {
                        $(this).find('input, textarea').blur();
                      }
                    });
                  } else {
                    // 処理用id
                    let procNoticeSuccessId1 = procId + '_success';
                    // ダイアログ要素
                    let divNoticeSuccessId1 = createDialog(procNoticeSuccessId1, procTitle);
                    // 表示内容作成
                    let dialogNoticeSuccessId1 = dialogOther(divNoticeSuccessId1, 'データがありません。');
                    // ダイアログ表示
                    $('#' + dialogNoticeSuccessId1).dialog({
                      modal: true,
                      width: 350,
                      closeOnEscape: false,
                      dialogClass: 'no-close',
                      buttons: {
                        'Exit': function() {
                          dialogClose(dialogNoticeSuccessId1);
                          dialogClose(dialogId);
                        }
                      },
                      open: function() {
                        $(this).find('input, textarea').blur();
                      }
                    });
                  }
                } else {
                  // 異常終了
                  // 処理用id
                  let procExtErrorId1 = procId + '_external_error';
                  // ダイアログ要素
                  let divExtErrorId1 = createDialog(procExtErrorId1, procTitle);
                  // ダイアログ要素
                  let dialogExtErrorId1 = dialogExternalError(divExtErrorId1, procTitle, data);
                  // ダイアログ表示
                  $('#' + dialogExtErrorId1).dialog({
                    modal: true,
                    width: 450,
                    closeOnEscape: false,
                    dialogClass: 'no-close',
                    buttons: {
                      'Exit': function() {
                        dialogClose(dialogExtErrorId1);
                        dialogClose(dialogId);
                      }
                    },
                    open: function() {
                      $(this).find('input, textarea').blur();
                    }
                  });
                }
              },
              function(xhr, status, error) {
                // 通信失敗時の処理
                // ローディング非表示
                hideSpinner();
                // 処理用id
                let procErrorId1 = procId + '_error';
                // ダイアログ要素
                let divNoticeErrorId1 = createDialog(procErrorId1, procTitle);
                // 表示内容作成
                let dialogNoticeAjaxErrorId1 = dialogAjaxError(divNoticeErrorId1, procTitle);
                // ダイアログ表示
                $('#' + dialogNoticeAjaxErrorId1).dialog({
                  modal: true,
                  closeOnEscape: false,
                  dialogClass: 'no-close',
                  buttons: {
                    'Exit': function() {
                      dialogClose(dialogNoticeAjaxErrorId1);
                      dialogClose(dialogId);
                    }
                  },
                  open: function() {
                    $(this).find('input, textarea').blur();
                  }
                });
              }
            );
          },
          '一括更新（全件）': function(event) {
            // ローディング表示
            showSpinner();
            $.ajax({
              type: 'POST',
              url: serverURL + 'example/update.php',
              dataType: 'json',
              data: {},
            }).then(
              function(data, status, xhr) {
                // 通信成功時の処理
                // ローディング非表示
                hideSpinner();
                if (data.status) {
                  // 正常終了
                  if (data.procResult.dataCount > 0) {
                    // 処理用id
                    let procNoticeSuccessId1 = procId + '_success';
                    // ダイアログ要素
                    let divNoticeSuccessId1 = createDialog(procNoticeSuccessId1, procTitle);
                    // 表示内容作成
                    let dialogNoticeSuccessId1 = dialogSuccess(divNoticeSuccessId1, procTitle + '(Update)', data.procResult.dataCount);
                    // ダイアログ表示
                    $('#' + dialogNoticeSuccessId1).dialog({
                      modal: true,
                      width: 400,
                      closeOnEscape: false,
                      dialogClass: 'no-close',
                      buttons: {
                        'Exit': function() {
                          dialogClose(dialogNoticeSuccessId1);
                          dialogClose(dialogId);
                        }
                      },
                      open: function() {
                        $(this).find('input, textarea').blur();
                      }
                    });
                  } else {
                    // 処理用id
                    let procNoticeSuccessId1 = procId + '_success';
                    // ダイアログ要素
                    let divNoticeSuccessId1 = createDialog(procNoticeSuccessId1, procTitle);
                    // 表示内容作成
                    let dialogNoticeSuccessId1 = dialogOther(divNoticeSuccessId1, 'データがありません。');
                    // ダイアログ表示
                    $('#' + dialogNoticeSuccessId1).dialog({
                      modal: true,
                      width: 350,
                      closeOnEscape: false,
                      dialogClass: 'no-close',
                      buttons: {
                        'Exit': function() {
                          dialogClose(dialogNoticeSuccessId1);
                          dialogClose(dialogId);
                        }
                      },
                      open: function() {
                        $(this).find('input, textarea').blur();
                      }
                    });
                  }
                } else {
                  // 異常終了
                  // 処理用id
                  let procExtErrorId1 = procId + '_external_error';
                  // ダイアログ要素
                  let divExtErrorId1 = createDialog(procExtErrorId1, procTitle);
                  // ダイアログ要素
                  let dialogExtErrorId1 = dialogExternalError(divExtErrorId1, procTitle, data);
                  // ダイアログ表示
                  $('#' + dialogExtErrorId1).dialog({
                    modal: true,
                    width: 450,
                    closeOnEscape: false,
                    dialogClass: 'no-close',
                    buttons: {
                      'Exit': function() {
                        dialogClose(dialogExtErrorId1);
                        dialogClose(dialogId);
                      }
                    },
                    open: function() {
                      $(this).find('input, textarea').blur();
                    }
                  });
                }
              },
              function(xhr, status, error) {
                // 通信失敗時の処理
                // ローディング非表示
                hideSpinner();
                // 処理用id
                let procErrorId1 = procId + '_error';
                // ダイアログ要素
                let divNoticeErrorId1 = createDialog(procErrorId1, procTitle);
                // 表示内容作成
                let dialogNoticeAjaxErrorId1 = dialogAjaxError(divNoticeErrorId1, procTitle);
                // ダイアログ表示
                $('#' + dialogNoticeAjaxErrorId1).dialog({
                  modal: true,
                  closeOnEscape: false,
                  dialogClass: 'no-close',
                  buttons: {
                    'Exit': function() {
                      dialogClose(dialogNoticeAjaxErrorId1);
                      dialogClose(dialogId);
                    }
                  },
                  open: function() {
                    $(this).find('input, textarea').blur();
                  }
                });
              }
            );
          },
          '一括削除（最大10件）': function(event) {
            // ローディング表示
            showSpinner();
            $.ajax({
              type: 'POST',
              url: serverURL + 'example/delete.php',
              dataType: 'json',
              data: {},
            }).then(
              function(data, status, xhr) {
                // 通信成功時の処理
                // ローディング非表示
                hideSpinner();
                if (data.status) {
                  // 正常終了
                  if (data.procResult.dataCount > 0) {
                    // 処理用id
                    let procNoticeSuccessId1 = procId + '_success';
                    // ダイアログ要素
                    let divNoticeSuccessId1 = createDialog(procNoticeSuccessId1, procTitle);
                    // 表示内容作成
                    let dialogNoticeSuccessId1 = dialogSuccess(divNoticeSuccessId1, procTitle + '(Delete)', data.procResult.dataCount);
                    // ダイアログ表示
                    $('#' + dialogNoticeSuccessId1).dialog({
                      modal: true,
                      width: 400,
                      closeOnEscape: false,
                      dialogClass: 'no-close',
                      buttons: {
                        'Exit': function() {
                          dialogClose(dialogNoticeSuccessId1);
                          dialogClose(dialogId);
                        }
                      },
                      open: function() {
                        $(this).find('input, textarea').blur();
                      }
                    });
                  } else {
                    // 処理用id
                    let procNoticeSuccessId1 = procId + '_success';
                    // ダイアログ要素
                    let divNoticeSuccessId1 = createDialog(procNoticeSuccessId1, procTitle);
                    // 表示内容作成
                    let dialogNoticeSuccessId1 = dialogOther(divNoticeSuccessId1, 'データがありません。');
                    // ダイアログ表示
                    $('#' + dialogNoticeSuccessId1).dialog({
                      modal: true,
                      width: 350,
                      closeOnEscape: false,
                      dialogClass: 'no-close',
                      buttons: {
                        'Exit': function() {
                          dialogClose(dialogNoticeSuccessId1);
                          dialogClose(dialogId);
                        }
                      },
                      open: function() {
                        $(this).find('input, textarea').blur();
                      }
                    });
                  }
                } else {
                  // 異常終了
                  // 処理用id
                  let procExtErrorId1 = procId + '_external_error';
                  // ダイアログ要素
                  let divExtErrorId1 = createDialog(procExtErrorId1, procTitle);
                  // ダイアログ要素
                  let dialogExtErrorId1 = dialogExternalError(divExtErrorId1, procTitle, data);
                  // ダイアログ表示
                  $('#' + dialogExtErrorId1).dialog({
                    modal: true,
                    width: 450,
                    closeOnEscape: false,
                    dialogClass: 'no-close',
                    buttons: {
                      'Exit': function() {
                        dialogClose(dialogExtErrorId1);
                        dialogClose(dialogId);
                      }
                    },
                    open: function() {
                      $(this).find('input, textarea').blur();
                    }
                  });
                }
              },
              function(xhr, status, error) {
                // 通信失敗時の処理
                // ローディング非表示
                hideSpinner();
                // 処理用id
                let procErrorId1 = procId + '_error';
                // ダイアログ要素
                let divNoticeErrorId1 = createDialog(procErrorId1, procTitle);
                // 表示内容作成
                let dialogNoticeAjaxErrorId1 = dialogAjaxError(divNoticeErrorId1, procTitle);
                // ダイアログ表示
                $('#' + dialogNoticeAjaxErrorId1).dialog({
                  modal: true,
                  closeOnEscape: false,
                  dialogClass: 'no-close',
                  buttons: {
                    'Exit': function() {
                      dialogClose(dialogNoticeAjaxErrorId1);
                      dialogClose(dialogId);
                    }
                  },
                  open: function() {
                    $(this).find('input, textarea').blur();
                  }
                });
              }
            );
          },
          'Exit': function() {
            dialogClose(dialogId);
          },
        },
        open: function() {
          $(this).find('input, textarea').blur();
        }
      });
    }
    /// Add element
    kintone.app.getHeaderMenuSpaceElement().appendChild(customButton);
  }

  /**************************************
   * ダイアログ表示内容
   **************************************/
  let dialogContents = function(divId, procId) {
    new kintone.Promise(function(resolve, reject) {
      let params = {
        'app': kintone.app.getId(),
        'query': ' limit 1',
        'totalCount': true
      };
      kintone.api(kintone.api.url('/k/v1/records', true), 'GET', params, function(resp) {
        resolve(resp);
        return;
      }, function(err) {
        reject(err);
        return;
      });
    }).then(function(success) {
      let contentsForm = $('<form>')
        .attr('id', procId + '-form')
        .attr('method', 'post');
      let notes = $('<div>')
        .attr('id', 'notes');
      let notesD1 = $('<div>')
        .attr('id', 'notesD1')
        .text('ここでは引数等の項目を設定します。');
      let notesD2 = $('<div>')
        .attr('id', 'notesD2')
        .text('現在このアプリには、' + success.totalCount + '件のレコードが存在しています。');
      notes.append(notesD1).append(notesD2);
      contentsForm.append(notes)
        .appendTo('#' + divId);
    }).catch(function(err) {});
    return divId;
  }
});
