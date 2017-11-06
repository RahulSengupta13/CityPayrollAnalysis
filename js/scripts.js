// JavaScript Document
$(document).ready(function(){
	"use strict";
	var queryString1 = 'prefix g1:<http://localhost:3030/payrolls/data/nyc> '+
						'prefix g2:<http://localhost:3030/payrolls/data/lacity> '+
						'prefix p1:<https://data.cityofnewyork.us/resource/k397-673e/> '+
						'prefix p2:<https://controllerdata.lacity.org/resource/qjfm-3srk/> '+
						'prefix xsd: <http://www.w3.org/2001/XMLSchema#> '+
						'SELECT ?o (avg(xsd:decimal(?hrate)) AS ?avgSal) '+
						'WHERE { '+
						  'GRAPH g2:{ '+
							'?s p2:department_title ?o . '+
							'?s p2:hourly_or_event_rate ?hrate '+
						  '} '+
						'} '+
						'GROUP BY ?o ';
	var queryUrl1 = 'http://localhost:3030/payrolls/query?output=xml&' +
				'query=' + encodeURIComponent(queryString1);
	var xmlquery1 = new XMLHttpRequest();
	xmlquery1.open ('GET', queryUrl1, false);
	xmlquery1.setRequestHeader ('Content-type', 'application/x-www-form-urlencoded');
	xmlquery1.setRequestHeader ("Accept", "application/sparql-results+xml");
	xmlquery1.onreadystatechange = function () {
			if (xmlquery1.readyState === 4) {
				if (xmlquery1.status === 200) {
					console.log(xmlquery1.responseXML);
					var xmlstr = (new XMLSerializer()).serializeToString(xmlquery1.responseXML);
					$("#query1").text(xmlstr);
				}
				else {
					alert("Sparql query error: " + xmlquery1.status + " " + xmlquery1.responseText);
				}
			}
		};
		// Send the query to the endpoint.
	xmlquery1.send();        
	
});