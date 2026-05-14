# egmapjs

[国土地理院 (GSI)](https://maps.gsi.go.jp/development/ichiran.html) の地図タイルと [Leaflet.js](https://leafletjs.com/) を使用して、インタラクティブな地図を簡単に作成できる軽量なJavaScriptライブラリです。

![egmapjs demo screenshot](https://code4fukui.github.io/egmapjs/egmap.jpg)

## 特徴

- **シンプルで軽量**: わずか数行のコードで、インタラクティブな地図をすばやく埋め込むことができます。
- **地理院地図**: 国土地理院が提供する、美しく詳細な地図タイルを利用しています。
- **簡単なマーカー追加**: 1つのヘルパー関数で、カスタムアイコンやポップアップマーカーを追加できます。
- **オープンデータ対応**: SPARQLエンドポイントからデータを取得して表示するためのヘルパー（`sparql.js`）が含まれています。
- **モダンなJavaScript**: ESモジュール（`egmap.mjs`）としても利用可能です。

## クイックスタート

### 1. HTMLへの追加

まず、地図を表示するための `<div>` を作成します。次に、Leaflet と egmapjs の CSS および JavaScript ファイルを読み込みます。

```html
<!-- 1. 地図コンテナを作成 -->
<div id="mapid" style="height: 400px;"></div>

<!-- 2. Leaflet.js を読み込む -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet@1.4.0/dist/leaflet.js"></script>

<!-- 3. egmapjs を読み込む -->
<script src="https://code4fukui.github.io/egmapjs/egmap.js"></script>
```

### 2. 地図の初期化

JavaScriptを使用して地図を初期化し、表示位置を設定してマーカーを追加します。

```javascript
// 'mapid' の div に地図を初期化
const map = initMap('mapid');

// ズームレベルを16に設定し、鯖江駅を表示
map.setZoom(16);
map.panTo([35.943560, 136.188917]);

// 「Hana道場」のカスタムアイコンを追加
map.addIcon(
  35.944571,           // 緯度
  136.186228,          // 経度
  "Hana道場",          // ポップアップテキスト
  "icon/hanadojo.png", // アイコン画像のURL（任意）
  64                   // アイコンの幅（任意）
);
```

## 高度な使い方

### SPARQLによるオープンデータの表示

同梱されている `sparql.js` ヘルパーを使用すると、オープンデータを地図上に簡単にプロットできます。

1. HTMLにスクリプトを読み込みます:
    ```html
    <script src="https://code4fukui.github.io/egmapjs/sparql.js"></script>
    ```

2. SPARQLクエリを記述し、`querySPARQL` を使用して結果を地図に追加します:
    ```javascript
    // 公共WiFiスポットを検索するSPARQLクエリ
    const query = `
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>
      SELECT ?name ?lat ?lng WHERE {
        ?uri a <http://purl.org/jrrk#PublicWIFI>;
             rdfs:label ?name;
             geo:lat ?lat;
             geo:long ?lng.
      } LIMIT 100`;

    querySPARQL(query, (data) => {
      const items = data.results.bindings;
      for (const item of items) {
        map.addIcon(item.lat.value, item.lng.value, item.name.value);
      }
    });
    ```

### ESモジュールの使用

モダンなWeb開発向けに、ESモジュール版も利用可能です。

```javascript
import { initMap, L } from "https://code4fukui.github.io/egmapjs/egmap.mjs";

const map = initMap('mapid');
map.setView([35.94, 136.18], 15);
map.addIcon(35.944, 136.186, "Hana道場");
```

## デモとチュートリアル

egmapjsで実現できることを確認できる、充実したチュートリアルとライブデモを用意しています。

- **[すべてのチュートリアルを見る](https://code4fukui.github.io/egmapjs/tutorial.html)**: 基本的な地図、SPARQL、GPS、経路探索などを網羅しています。
- **ライブデモ**:
    - [京都いしぶみマップ](https://code4fukui.github.io/kyotoishibumi/) ([ソースコード](https://github.com/code4fukui/kyotoishibumi/blob/main/index.html))
    - [舞鶴高専訪問マップ](https://code4fukui.github.io/egmapjs/samples/maizurukosen.html)

## データソースとクレジット

このライブラリは **[国土地理院 (GSI)](https://maps.gsi.go.jp/development/ichiran.html)** の地図タイルを使用しています。利用の際は適切なクレジット表記（出典の明記）を維持してください。

## 関連リソース

- [ブログ記事: 簡単で無料で活用できる地図API、leafletjs x 地理院地図](https://fukuno.jig.jp/2393)

## ライセンス

このプロジェクトは [Creative Commons Attribution 4.0 International License (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/) のもとでライセンスされています。
