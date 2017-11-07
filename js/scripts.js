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
	var queryUrl1 = 'http://localhost:3030/payrolls/query?output=json&' +
				'query=' + encodeURIComponent(queryString1);
	$.ajax({
	  type: 'GET',
	  url: queryUrl1,
	  async: false,
	  beforeSend: function (xhr) {
		if (xhr && xhr.overrideMimeType) {
		  xhr.overrideMimeType('application/json;charset=utf-8');
		}
	  },
	  dataType: 'json',
	  success: function (data) {
		  console.log(data);
	  }
	});
});