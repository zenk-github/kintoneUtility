# kintoneUtility

[Kintone](https://kintone.cybozu.co.jp/index.html)から特定のデータに対して一括で外部連携処理を行う独自フレームワークの一部です。

###### :warning: 独自フレームワークは今後公開予定

## Features

[KintoneAPI](https://developer.cybozu.io/hc/ja/articles/360000313406)の以下に対応しています。
* [GET](https://developer.cybozu.io/hc/ja/articles/202331474)
* [POST](https://developer.cybozu.io/hc/ja/articles/202166160)
* [PUT](https://developer.cybozu.io/hc/ja/articles/201941784)
* [DELETE](https://developer.cybozu.io/hc/ja/articles/201941794)

## Usage

1. PHPファイルを外部連携サーバへアップロード

#### PHP Setting
```
source/lib/conf.php
```
```php
// Kintone URLを指定
define('KINTONE_ROOT_URL', 'https://example.cybozu.com/k/v1/');
// Kintone ログイン名
define('KINTONE_AUTH_USER', 'kintoneログイン名');
// Kintone パスワード
define('KINTONE_AUTH_PASS', 'kintoneパスワード');
```

2. Kintoneアプリにjs/cssを設定
#### :warning: サンプル版のjsを使用する場合は、[Cybozu CDN](https://developer.cybozu.io/hc/ja/articles/202960194)から以下のjs/cssも追加してください。
* **jQuery**
* **jQuery UI**
* **Spin.js**

#### JS Setting
```
js/config.js
```
####
```js
// Server URL
let serverURL = 'https://example.com/';
```

#### PHP 呼び出し例
```js
$.ajax({
  url: serverURL + 'source/example/insert.php',
  type: 'POST',
  dataType: 'json',
  data: {
    'param1' : 123,
    'param2' : 'value',
    …
  },
})
.done(function(data) {
    // Successful
    …
})
.fail(function() {
    // Failure
    …
});
```

#### Response Sample
```js
{
  status: true,
  result: true, 
  code: "200", 
  message: "OK", 
  procResult: {
    dataCount: 10,
    …
  }
}
```

## PHP レコード取得（GET）
* 条件を指定してのレコードの一括取得を行う

#### Parameter 
| Item | Data type | Required | Description |
| --- | --- | :---: | --- |
| appNumber | Number | 〇 | アプリID |
| fields | Array |   | 検索するフィールド |
| keys | Array |   | 検索のキーと値 |
| where | String |   | 検索条件 |
| order | Array |   | 検索順序 |
| limit | Number |   | レコード取得数 |

#### Parameter Sample
```php
  $instance = new example();

  $instance->fields = array(
    "field1",
    "field2",
  );

  $instance->keys = array(
    "field1" => "value1",
    "field2" => "value2",
  );

  $instance->where = 'field1 = "value1" and field2 = "value2"';

  $instance->order = array(
    "field1 asc",
    "field2 desc",
  );

  $instance->limit = 100;
```

#### Response Sample
```php
Array
(
  [0] => Array
    (
      [id] => 1
      [revision] => 1
      [field] => value
      [dropdown] => Array
        (
          [0] => value
        )
      [table] => Array
        (
          [0] => Array
            (
              [id] => 1
              [column] => value
              …
            ),
        )
        …
    ),
  [1] => Array
    …
  ),
);
```

## PHP レコード登録（POST）
* レコードの一括登録を行う

#### Parameter 
| Item | Data type | Required | Description |
| --- | --- | :---: | --- |
| appNumber | Number | 〇 | アプリID |

#### Parameter Sample
```php
  $records = array(
    0 => array(
      "field1" => "value1",
      "field2" => "value2",
      "table1" => array(
          0 => array(
            "column1" => "value11",
            "column2" => "value12",
          ),
          1 => array(
            …
          ),
          …
      ),
      "table2"   => array(
        …
      ),
      …
    ),
    1 => array(
      …
    ),
  );
```

#### Response Sample
```php
Array
(
  [0] => Array
    (
      [id] => 2
      [revision] => 1
    ),
  [1] => Array
    …
  ),
);
```

## PHP レコード更新（PUT）
* レコードIDを指定してのレコードの一括更新を行う

#### Parameter 
| Item | Data type | Required | Description |
| --- | --- | :---: | --- |
| appNumber | Number | 〇 | アプリID |
| id | Number | 〇 | レコードID |
| revision | Number | 〇 | リビジョン番号 |
| id(table) | Number | 〇 | 行番号 |

#### Parameter Sample
```php
  $records = array(
    0 => array(
      "id" => レコードID,
      "revision" => リビジョン番号,
      "field1" => "value1",
      "field2" => "value2",
      "table1" => array(
        0 => array(
          "id" => "行番号",
          "column1" => "value11",
          "column2" => "value12",
        ),
        1 => array(
          …
        ),
        …
      ),
      "table2"   => array(
        …
      ),
      …
    ),
    1 => array(
      …
    ),
  );
```

#### Response Sample
```php
Array
(
  [0] => Array
    (
      [id] => 1
      [revision] => 2
    ),
  [1] => Array
    …
  ),
);
```

## PHP レコード削除（DELETE）
* レコードIDを指定してのレコードの一括削除を行う

#### Parameter 
| Item | Data type | Required | Description |
| --- | --- | :---: | --- |
| appNumber | Number | 〇 | アプリID |
| id | Number | 〇 | レコードID |
| revision | Number | 〇 | リビジョン番号 |

#### Parameter Sample
```php
  $records = array(
    0 => array(
      "id" => レコードID,
      "revision" => リビジョン番号,
    ),
    1 => array(
      …
    ),
    …
  );
```

#### Response Sample
```php
Array
(
);
```

# Author

* Author
Shuji Matsuo
* Organization
[株式会社ゼンク](https://zenk.co.jp/)

# License
[MIT license](https://en.wikipedia.org/wiki/MIT_License).
