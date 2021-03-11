import L from "https://code4sabae.github.io/leaflet-mjs/leaflet.mjs";

const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "https://code4sabae.github.io/leaflet-mjs/leaflet.css";
document.body.appendChild(link);
//link.onload = () => this.init();

const addGSILayer = (map) => {
	// set 国土地理院地図 https://maps.gsi.go.jp/development/ichiran.html
	L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png", {
		attribution: '<a href="https://maps.gsi.go.jp/development/ichiran.html">国土地理院</a>"',
		maxZoom: 18,
	}).addTo(map);
};

const initMap = (mapid) => {
	const map = L.map(mapid)
	addGSILayer(map);
	
	// アイコン
	map.iconlayer = L.layerGroup();
	map.iconlayer.addTo(map);
	map.addIcon = function(lat, lng, nameorparam, iconurl, iconwidth, iconheight) {
		var name = null;
		if (typeof nameorparam == "string") {
			name = nameorparam;
		} else if (nameorparam.name) {
			name = nameorparam.name;
		}
		var marker = null;
		if (iconurl) {
			if (!iconwidth) {
				iconwidth = 32;
			}
			if (!iconheight) {
				iconheight = iconwidth;
			}
			var icon = L.icon({
				iconUrl: iconurl,
				iconSize: [ iconwidth, iconheight ],
				iconAnchor: [ iconwidth / 2, iconheight / 2 ]
			});
			marker = L.marker([ lat, lng ], {
				title : name,
				icon : icon,
			});
		} else {
			marker = L.marker([ lat, lng ], { title: name });
		}
		if (typeof nameorparam == "function") {
			marker.on("click", function(e) {
				nameorparam(e, name)
			});
		} else {
			marker.bindPopup(
				"<h2>" + name + "</h2>",
				{
					maxWidth: 500
				}
			);
			marker.on("click", function(e) {
				if (nameorparam && nameorparam.callback)
					nameorparam.callback(e, name)
			});
		}
		this.iconlayer.addLayer(marker);
		return marker;
	}
	return map;
};

const convertDMS2D = function(lat, lng) {
	const floor = Math.floor;
	const dms2d = (dms) => (floor(dms) + floor(dms * 100) % 100 / 60 + floor(dms * 10000) % 100 / (60 * 60) + floor(dms * 1000000) % 100 / (60 * 60 * 100)).toFixed(6);
	return [dms2d(lat), dms2d(lng)];
};
let watchid = null;
const showHere = (map) => {
	if (watchid)  {
		navigator.geolocation.clearWatch(watchid);
	}
	watchid = navigator.geolocation.watchPosition((gpos) => {
		const pos = [ gpos.coords.latitude, gpos.coords.longitude ];
		console.log(pos);
		map.panTo(pos);
		navigator.geolocation.clearWatch(watchid);
		watchid = null;
	}, (e) => {
		alert("現在位置に取得に失敗！");
	});
};

export { initMap, L, addGSILayer, convertDMS2D, showHere };
