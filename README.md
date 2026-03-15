# egmapjs
Leafletjs x 国土地理院地図 (GSIMAP)

## Demo
Kyoto Stone Monument Map  
https://code4fukui.github.io/kyotoishibumi/

## Features
- Display maps using Leafletjs and GSIMAP
- Add icons and markers to the map
- Integrate with SPARQL API to display data on the map

## Requirements
None. Works in modern web browsers.

## Usage
Include the required JavaScript and CSS files in your HTML:

```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet@1.4.0/dist/leaflet.js"></script>
<script src="https://code4fukui.github.io/egmapjs/egmap.js"></script>
```

Then, create a map in your JavaScript code:

```javascript
var map = initMap('mapid');
map.setZoom(16);
map.panTo([35.943560, 136.188917]); // Sabae Station
map.addIcon(35.944571, 136.186228, "Hana Dojo", "icon/hanadojo.png", 64);
```

## Data / API
The project uses the GSIMAP (国土地理院地図) tile service provided by the Geospatial Information Authority of Japan.

## License
The project is released under the CC BY license.