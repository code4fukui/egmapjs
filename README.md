# egmapjs

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A lightweight JavaScript library for easily creating interactive maps using [Leaflet.js](https://leafletjs.com/) and map tiles from the [Geospatial Information Authority of Japan (GSI)](https://maps.gsi.go.jp/development/ichiran.html).


![egmapjs demo screenshot](https://code4fukui.github.io/egmapjs/egmap.jpg)


## Features

-   **Simple & Lightweight**: Quickly embed interactive maps with just a few lines of code.
-   **GSI Maps**: Utilizes beautiful and detailed map tiles from the Geospatial Information Authority of Japan.
-   **Easy Markers**: Add custom icons and pop-up markers with a single helper function.
-   **Open Data Ready**: Includes a helper (`sparql.js`) to fetch and display data from SPARQL endpoints.
-   **Modern JavaScript**: Also available as an ES Module (`egmap.mjs`).

## Quick Start

### 1. Add to your HTML

First, create a `<div>` for your map. Then, include the CSS and JavaScript files for Leaflet and egmapjs.

```html
<!-- 1. Create a map container -->
<div id="mapid" style="height: 400px;"></div>

<!-- 2. Include Leaflet.js -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet@1.4.0/dist/leaflet.js"></script>

<!-- 3. Include egmapjs -->
<script src="https://code4fukui.github.io/egmapjs/egmap.js"></script>
```

### 2. Initialize the Map

Use JavaScript to initialize the map, set its view, and add markers.

```javascript
// Initialize the map in the 'mapid' div
const map = initMap('mapid');

// Set the view to Sabae Station with a zoom level of 16
map.setZoom(16);
map.panTo([35.943560, 136.188917]);

// Add a custom icon for "Hana道場"
map.addIcon(
  35.944571,          // Latitude
  136.186228,          // Longitude
  "Hana道場",          // Popup text
  "icon/hanadojo.png", // Icon image URL (optional)
  64                   // Icon width (optional)
);
```

## Advanced Usage

### Displaying Open Data via SPARQL

You can easily plot open data on the map using the included `sparql.js` helper.

1.  Include the script in your HTML:
    ```html
    <script src="https://code4fukui.github.io/egmapjs/sparql.js"></script>
    ```

2.  Write a SPARQL query and use `querySPARQL` to add the results to the map:
    ```javascript
    // SPARQL query to find public WiFi spots
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

### Using ES Modules

For modern web development, you can use the ES Module version.

```javascript
import { initMap, L } from "https://code4fukui.github.io/egmapjs/egmap.mjs";

const map = initMap('mapid');
map.setView([35.94, 136.18], 15);
map.addIcon(35.944, 136.186, "Hana道場");
```

## Demos & Tutorials

Explore our comprehensive tutorials and live demos to see what's possible with egmapjs.

-   **[View All Tutorials](https://code4fukui.github.io/egmapjs/tutorial.html)**: Covers basic maps, SPARQL, GPS, routing, and more.
-   **Live Demos**:
    -   [Kyoto Ishibumi Map](https://code4fukui.github.io/kyotoishibumi/) ([Source Code](https://github.com/code4fukui/kyotoishibumi/blob/main/index.html))
    -   [Maizuru High School Visit Map](https://code4fukui.github.io/egmapjs/samples/maizurukosen.html)

## Data Source & Attribution

This library uses map tiles from the **[Geospatial Information Authority of Japan (GSI)](https://maps.gsi.go.jp/development/ichiran.html)**. Please ensure proper attribution is maintained.

## Related Resources

-   [Blog Post: 簡単で無料で活用できる地図API、leafletjs x 地理院地図](https://fukuno.jig.jp/2393) (in Japanese)

## License

This project is licensed under the [Creative Commons Attribution 4.0 International License (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).