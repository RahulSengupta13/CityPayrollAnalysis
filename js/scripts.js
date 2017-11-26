// JavaScript Document
$(document).ready(function(){

	"use strict";
	var queryToRun = "";
	//query 1 avg hourly rate by department
	var queryString1 = `prefix g2:<http://localhost:3030/payrolls/data/lacity>
						prefix g1:<http://localhost:3030/payrolls/data/nyc>
						prefix p1:<https://data.cityofnewyork.us/resource/k397-673e/>
						prefix p2:<https://controllerdata.lacity.org/resource/qjfm-3srk/>
						prefix xsd: <http://www.w3.org/2001/XMLSchema#>
						SELECT ?o (avg(xsd:decimal(?hrate)) AS ?avgSal)
						WHERE {
						  GRAPH g2:{
							?s p2:department_title ?o .
							?s p2:hourly_or_event_rate ?hrate
						  } 
						} 
						GROUP BY ?o`;
	var queryUrl1 = 'http://localhost:3030/payrolls/query?output=json&' +
				'query=' + encodeURIComponent(queryString1);

	//query 2 compare base la vs nyc
	var queryString2 = `prefix g1:<http://localhost:3030/payrolls/data/nyc>
						prefix g2:<http://localhost:3030/payrolls/data/lacity>
						prefix p1:<https://data.cityofnewyork.us/resource/k397-673e/>
						prefix p2:<https://controllerdata.lacity.org/resource/qjfm-3srk/>
						prefix xsd: <http://www.w3.org/2001/XMLSchema#>
						SELECT ?g ?c (avg(xsd:decimal(?salary)) AS ?average)
						WHERE
						{
						  GRAPH ?g{
						    {
						      ?s p1:agency_name ?c .
						      ?s p1:base_salary ?salary . 
						    }UNION{
						      ?s p2:department_title ?c .
						      ?s p2:base_pay ?salary
						    }
						  }
						}
						GROUP BY ?c ?g`;
	var queryUrl2 = 'http://localhost:3030/payrolls/query?output=json&' +
				'query=' + encodeURIComponent(queryString2);

	//query 3 - compare dept of la
	var queryString3 = `prefix g1:<http://localhost:3030/payrolls/data/nyc>
						prefix g2:<http://localhost:3030/payrolls/data/lacity>
						prefix p1:<https://data.cityofnewyork.us/resource/k397-673e/>
						prefix p2:<https://controllerdata.lacity.org/resource/qjfm-3srk/>
						prefix xsd: <http://www.w3.org/2001/XMLSchema#>
						SELECT ?org (avg(xsd:decimal(?salary)) AS ?avgSal)
						WHERE {
						  GRAPH g2:{
							?s p2:department_title ?org .
						    ?s p2:base_pay ?salary
						  }
						}
						GROUP BY ?org`;
	var queryUrl3 = 'http://localhost:3030/payrolls/query?output=json&' +
				'query=' + encodeURIComponent(queryString3);

	//query 4 - compare hourly dept and job class
	var queryString4 = `prefix g1:<http://localhost:3030/payrolls/data/nyc>
						prefix g2:<http://localhost:3030/payrolls/data/lacity>
						prefix p1:<https://data.cityofnewyork.us/resource/k397-673e/>
						prefix p2:<https://controllerdata.lacity.org/resource/qjfm-3srk/>
						prefix xsd: <http://www.w3.org/2001/XMLSchema#>
						SELECT ?deptTitle ?jobClass (avg(xsd:decimal(?hrate)) AS ?avgSal) 
						WHERE {
						  GRAPH g2:{
							?s p2:department_title ?deptTitle .
						    ?s p2:job_class_title ?jobClass .
						    ?s p2:hourly_or_event_rate ?hrate
						  }
						}
						GROUP BY ?jobClass ?deptTitle `;
	var queryUrl4 = 'http://localhost:3030/payrolls/query?output=json&' +
				'query=' + encodeURIComponent(queryString4);
	
	//query 5 - compare total earnings dept and job class
	var queryString5 = `prefix g1:<http://localhost:3030/payrolls/data/nyc>
						prefix g2:<http://localhost:3030/payrolls/data/lacity>
						prefix p1:<https://data.cityofnewyork.us/resource/k397-673e/>
						prefix p2:<https://controllerdata.lacity.org/resource/qjfm-3srk/>
						prefix xsd: <http://www.w3.org/2001/XMLSchema#>
						SELECT ?deptTitle ?jobClass (avg(xsd:decimal(?tEarnings)) AS ?avgSal) 
						WHERE {
						  GRAPH g2:{
							?s p2:department_title ?deptTitle .
						    ?s p2:job_class_title ?jobClass .
						    ?s p2:actual_earnings_example ?tEarnings
						  }
						}
						GROUP BY ?jobClass ?deptTitle `;
	var queryUrl5 = 'http://localhost:3030/payrolls/query?output=json&' +
				'query=' + encodeURIComponent(queryString5);

	//query 6 - deptVSavgSal
	var queryString6 = `prefix g1:<http://localhost:3030/payrolls/data/nyc>
						prefix g2:<http://localhost:3030/payrolls/data/lacity>
						prefix p1:<https://data.cityofnewyork.us/resource/k397-673e/>
						prefix p2:<https://controllerdata.lacity.org/resource/qjfm-3srk/>
						prefix xsd: <http://www.w3.org/2001/XMLSchema#>

						SELECT ?name (avg(xsd:decimal(?salary)) AS ?salaryCount)
						  WHERE {
						  GRAPH g1:{
						    ?agency p1:agency_name ?name.
						    ?agency p1:base_salary ?salary.
						  }
						}
						GROUP BY ?name`;
	var queryUrl6 = 'http://localhost:3030/payrolls/query?output=json&' +
				'query=' + encodeURIComponent(queryString6);

	//query 7 - department position vs avg ot hours
	var queryString7 = `prefix g1:<http://localhost:3030/payrolls/data/nyc>
						prefix g2:<http://localhost:3030/payrolls/data/lacity>
						prefix p1:<https://data.cityofnewyork.us/resource/k397-673e/>
						prefix p2:<https://controllerdata.lacity.org/resource/qjfm-3srk/>
						prefix xsd: <http://www.w3.org/2001/XMLSchema#>

						SELECT ?name ?title (avg(xsd:decimal(?othours)) AS ?AvgOthours)
  						WHERE {
						  GRAPH g1:{
						    ?agency p1:agency_name ?name.
						    ?agency p1:title_description ?title.
						    ?agency p1:ot_hours ?othours.
							}
						}
						GROUP BY ?name ?title`;
	var queryUrl7 = 'http://localhost:3030/payrolls/query?output=json&' +
				'query=' + encodeURIComponent(queryString7);

	//query 8 - avg ot hours by dept nyc
	var queryString8 = `prefix g1:<http://localhost:3030/payrolls/data/nyc>
						prefix g2:<http://localhost:3030/payrolls/data/lacity>
						prefix p1:<https://data.cityofnewyork.us/resource/k397-673e/>
						prefix p2:<https://controllerdata.lacity.org/resource/qjfm-3srk/>
						prefix xsd: <http://www.w3.org/2001/XMLSchema#>
						SELECT ?name (avg(xsd:decimal(?othours)) AS ?AvgOthours)
					    WHERE {  
						  GRAPH g1:{
							    ?agency p1:agency_name ?name.
							    ?agency p1:ot_hours ?othours.
							}
						}
						GROUP BY ?name`;
	var queryUrl8 = 'http://localhost:3030/payrolls/query?output=json&' +
				'query=' + encodeURIComponent(queryString8);

	var jsonDescription = [
		{
			id:1,
			desc:`<p class="txt-justify">This barchart shows the <strong>average hourly rate</strong> vs <strong>departments of Los Angeles.</strong></p>`
		},
		{
			id:2,
			desc:`<p class="txt-justify">This barchart shows the <strong>average base salary</strong> vs <strong>departments of Los Angeles and NYC</strong></p>`
		},
		{
			id:3,
			desc:`<p class="txt-justify">This barchart shows the <strong>average base salary</strong> vs <strong>departments of Los Angeles</strong></p>`
		},
		{
			id:4,
			desc:`<p class="txt-justify">This barchart shows the <strong>average hourly salary (position wise)</strong> vs <strong>departments</strong> of <strong>Los Angeles</strong></p>`
		},
		{
			id:5,
			desc:`<p class="txt-justify">This barchart shows the <strong>average total earnings (position wise)</strong>vs <strong>departments</strong> of <strong>Los Angeles</strong></p>`
		},
		{
			id:6,
			desc:`<p class="txt-justify">This barchart shows the <strong>average base salary</strong> vs <strong>departments of NYC</strong></p>`
		},
		{
			id:7,
			desc:`<p class="txt-justify">This barchart shows the <strong>average overtime hours (position wise)</strong> vs <strong>departments of Los Angeles and NYC</strong></p>`
		},
		{
			id:8,
			desc:`<p class="txt-justify">This barchart shows the <strong>average overtime hours</strong> vs <strong>departments of NYC</strong></p>`
		}
	];

	$("#drop-menu a").click(function(e){
	    e.preventDefault(); // cancel the link behaviour
		$("#descDiv").html('');
	    var selText = $(this).text();
	    switch(selText){
	    	case 'Average hourly rate by department LA vs NYC':
	    		$("#descDiv").html(jsonDescription[0].desc);
	    		queryToRun = queryUrl1;
	    		$.ajax({
				  type: 'GET',
				  url: queryToRun,
				  async: false,
				  beforeSend: function (xhr) {
					if (xhr && xhr.overrideMimeType) {
					  xhr.overrideMimeType('application/json;charset=utf-8');
					}
				  },
				  dataType: 'json',
				  success: function (data) {
					  console.log(data);
					  barChart(data);
				  }
				});
	    		break;
	    	case 'Compare base salaries LA vs NYC':
	    		$("#descDiv").html(jsonDescription[1].desc);
	    		queryToRun = queryUrl2;
	    		$.ajax({
				  type: 'GET',
				  url: queryToRun,
				  async: false,
				  beforeSend: function (xhr) {
					if (xhr && xhr.overrideMimeType) {
					  xhr.overrideMimeType('application/json;charset=utf-8');
					}
				  },
				  dataType: 'json',
				  success: function (data) {
					  console.log(data);
					  barChart2(data);
				  }
				});
	    		break;
	    	case 'Compare departments of LA':
	    		$("#descDiv").html(jsonDescription[2].desc);
	    		queryToRun = queryUrl3;
	    		$.ajax({
				  type: 'GET',
				  url: queryToRun,
				  async: false,
				  beforeSend: function (xhr) {
					if (xhr && xhr.overrideMimeType) {
					  xhr.overrideMimeType('application/json;charset=utf-8');
					}
				  },
				  dataType: 'json',
				  success: function (data) {
					  console.log(data);
					  barChart3(data);
				  }
				});
	    		break;
	    	case 'Compare Position based LA hourly wages':
	    		$("#descDiv").html(jsonDescription[3].desc);
	    		queryToRun = queryUrl4;
	    		$.ajax({
				  type: 'GET',
				  url: queryToRun,
				  async: false,
				  beforeSend: function (xhr) {
					if (xhr && xhr.overrideMimeType) {
					  xhr.overrideMimeType('application/json;charset=utf-8');
					}
				  },
				  dataType: 'json',
				  success: function (data) {
					  console.log(data);
					  barChart4(data);
				  }
				});
	    		break;
	    	case 'Compare LA total earnings':
	    		$("#descDiv").html(jsonDescription[4].desc);
	    		queryToRun = queryUrl5;
	    		$.ajax({
				  type: 'GET',
				  url: queryToRun,
				  async: false,
				  beforeSend: function (xhr) {
					if (xhr && xhr.overrideMimeType) {
					  xhr.overrideMimeType('application/json;charset=utf-8');
					}
				  },
				  dataType: 'json',
				  success: function (data) {
					  console.log(data);
					  barChart5(data);
				  }
				});
	    		break;
	    	case 'Compare NYC base salaries':
	    		$("#descDiv").html(jsonDescription[5].desc);
	    		queryToRun = queryUrl6;
	    		$.ajax({
				  type: 'GET',
				  url: queryToRun,
				  async: false,
				  beforeSend: function (xhr) {
					if (xhr && xhr.overrideMimeType) {
					  xhr.overrideMimeType('application/json;charset=utf-8');
					}
				  },
				  dataType: 'json',
				  success: function (data) {
					  console.log(data);
					  barChart6(data);
				  }
				});
	    		break;
	    	case 'Compare NYC average overtime hours by position':
	    		$("#descDiv").html(jsonDescription[6].desc);
	    		queryToRun = queryUrl7;
	    		$.ajax({
				  type: 'GET',
				  url: queryToRun,
				  async: false,
				  beforeSend: function (xhr) {
					if (xhr && xhr.overrideMimeType) {
					  xhr.overrideMimeType('application/json;charset=utf-8');
					}
				  },
				  dataType: 'json',
				  success: function (data) {
					  console.log(data);
					  barChart7(data);
				  }
				});
	    		break;
	    	case 'Compare NYC average overtime hours':
	    		$("#descDiv").html(jsonDescription[7].desc);
	    		queryToRun = queryUrl8;
	    		$.ajax({
				  type: 'GET',
				  url: queryToRun,
				  async: false,
				  beforeSend: function (xhr) {
					if (xhr && xhr.overrideMimeType) {
					  xhr.overrideMimeType('application/json;charset=utf-8');
					}
				  },
				  dataType: 'json',
				  success: function (data) {
					  console.log(data);
					  barChart8(data);
				  }
				});
	    		break;
	    }

	    

	});
	
	

});
