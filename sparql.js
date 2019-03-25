var endpoint = "https://sparql.opendata.cc/data/sparql"
var setSPARQLEndpoint = function(s) {
	endpoint = s
}

// odp
var querySPARQL = function(q, callback) {
	var url = endpoint + "?query=" + encodeURIComponent(q) + "&output=json";
	url += "&callback=" + getCallbackMethod(callback);
	jsonp(url);
};
var queryItemSPARQL = function(uri, callback) {
	querySPARQL("select * { <" + uri + "> ?p ?o }", callback);
};
var queryKeyword = function(items, keyword) {
	var res = [];
	for (var i = 0; i < items.length; i++) {
		var item = items[i];
		var b = false;
		for (var name in item) {
			if (item[name].indexOf(keyword) != -1) {
				b = true;
			}
		}
		if (b) {
			res.push(item);
		}
	}
	return res;
};
var getOpenDataCivicFacility = function(ll, dll, callback) {
	getOpenDataByArea("http://purl.org/jrrk#CivicFacility", ll, dll, callback);
};
var getOpenDataEmergencyFacility = function(ll, dll, callback) {
	getOpenDataByArea("http://purl.org/jrrk#EmergencyFacility", ll, dll, callback);
};
var getOpenDataPOI = function(ll, dll, callback) {
	getOpenDataByArea("http://purl.org/jrrk#CivicPOI", ll, dll, callback);
};
var getOpenDataByArea = function(type, ll, dll, callback) {
	var lat = ll.lat();
	var lng = ll.lng();
	var latmin = lat - dll;
	var latmax = lat + dll;
	var lngmin = lng - dll;
	var lngmax = lng + dll;
	var q =
		"PREFIX jrrk: <http://purl.org/jrrk#>\n" +
		"PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>\n" +
		"PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
		"PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n" +
		"PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n" +
		"select ?uri ?name ?type ?notes ?lat ?lng ?adr ?desc {\n" + 
		"?uri rdf:type <" + type + ">;\n" +
		"jrrk:address ?adr;\n" +
		"geo:lat ?lat;\n" +
		"geo:long ?lng;\n" +
		"rdfs:label ?name.\n" +
		"optional { ?uri <http://imi.ipa.go.jp/ns/core/rdf#種別> ?type }.\n" +
		"optional { ?uri <http://purl.org/jrrk#notes> ?notes.}\n" +
		"optional { ?uri <http://schema.org/description> ?desc.}\n" +
		" filter(xsd:float(?lat) < " + latmax + " && xsd:float(?lat) > " + latmin + " && xsd:float(?lng) < " + lngmax + " && xsd:float(?lng) > " + lngmin + ")" +
		"}";
//		alert(q);
	querySPARQL(q, function(data) {
//		dump(data);
		var items = data.results.bindings;
		var dd = [];
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			var d = {};
			for (var name in item) {
				d[name] = item[name].value;
			}
			dd.push(d);
		}
//		dump(dd);
		callback(dd);
	});
};
var getOpenDataList = function(type, callback) {
	var q =
		"PREFIX jrrk: <http://purl.org/jrrk#>\n" +
		"PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>\n" +
		"PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
		"PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n" +
		"PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n" +
		"select ?uri ?name ?type ?notes ?lat ?lng ?adr ?desc {\n" + 
		"?uri rdf:type <" + type + ">;\n" +
		"jrrk:address ?adr;\n" +
		"geo:lat ?lat;\n" +
		"geo:long ?lng;\n" +
		"rdfs:label ?name.\n" +
		"optional { ?uri <http://imi.ipa.go.jp/ns/core/rdf#種別> ?type }.\n" +
		"optional { ?uri <http://purl.org/jrrk#notes> ?notes.}\n" +
		"optional { ?uri <http://schema.org/description> ?desc.}\n" +
//		"} limit 100";
		"}";
//		alert(q);
	querySPARQL(q, function(data) {
//		dump(data);
		var items = data.results.bindings;
		var dd = [];
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			var d = {};
			for (var name in item) {
				d[name] = item[name].value;
			}
			dd.push(d);
		}
//		dump(dd);
		callback(dd);
	});
};
var getOpenDataDetail = function(uri, callback) {
	var q =
//		"select ?p ?o ?o2 {\n" + 
		"select ?p ?o ?g { graph ?g {\n" + 
		"<" + uri + "> ?p ?o.\n" +
//		"optional { ?p ?o ?o2 }.\n" +
		"} }";
//		alert(q);
	querySPARQL(q, function(data) {
//		dump(data);
		var items = data.results.bindings;
		var dd = [];
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			var d = {};
			for (var name in item) {
				d[name] = item[name].value;
			}
			dd.push(d);
		}
//		dump(dd);
		var d3 = {};
		var graph = null;
		for (var i = 0; i < dd.length; i++) {
			var p = dd[i].p;
			var o = dd[i].o;
			graph = dd[i].g;
			if (d3[p]) {
				if (typeof d3[p] == "string") {
					d3[p] = [ d3[p], o ];
				} else {
					d3[p].push(o);
				}
			} else {
				d3[p] = o;
			}
		}
		if (graph)
			d3.graph = graph;
//		dump(d3);
		callback(d3);
	});
};
