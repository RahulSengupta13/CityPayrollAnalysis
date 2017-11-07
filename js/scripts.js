// JavaScript Document
$(document).ready(function(){
	"use strict";
	var queryString1 = '  PREFIX g2: <http://localhost:3030/Payroll/data/PayrollLA>'+
	'PREFIX g1: <http://localhost:3030/Payroll/data/PayrollNY>'+
	'prefix p1:<https://data.cityofnewyork.us/resource/k397-673e/> '+
	'prefix p2:<https://controllerdata.lacity.org/resource/qjfm-3srk/>'+
						'prefix xsd: <http://www.w3.org/2001/XMLSchema#> '+
						'SELECT ?o (avg(xsd:decimal(?hrate)) AS ?avgSal) '+
						'WHERE { '+
						  'GRAPH g2:{ '+
							'?s p2:department_title ?o . '+
							'?s p2:hourly_or_event_rate ?hrate '+
						  '} '+
						'} '+
						'GROUP BY ?o ';
	var queryUrl1 = 'http://localhost:3030/Payroll/query?output=xml&' +
				'query=' + encodeURIComponent(queryString1);
});

var sample_json;

function barChart(data)
{
console.log("bar chart called");
var svg = d3.select("#lavsny").append("svg"),
margin = {top: 10, right: 10, bottom: 80, left: 100},
width = 400 - margin.left - margin.right,
height = 200 - margin.top - margin.bottom;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
y = d3.scaleLinear().rangeRound([height, 0]);



var g = svg.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data/data.tsv", function(d) {
d.frequency = +d.frequency;
return d;
}, function(error, data) {
if (error) throw error;

x.domain(data.map(function(d) { return d.letter; }));
y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

g.append("g")
	.attr("class", "axis axis--x")
	.attr("transform", "translate(0," + height + ")")
	.call(d3.axisBottom(x));

g.append("g")
	.attr("class", "axis axis--y")
	.call(d3.axisLeft(y).ticks(10, "%"))
.append("text")
	.attr("transform", "rotate(-90)")
	.attr("y", 6)
	.attr("dy", "0.71em")
	.attr("text-anchor", "end")
	.text("Frequency");

g.selectAll(".bar")
.data(data)
.enter().append("rect")
	.attr("class", "bar")
	.attr("x", function(d) { return x(d.letter); 
	console.log("letter:"+x(d.letter))
	})
	.attr("y", function(d) { return y(d.frequency); 
		console.log("letter:"+y(d.letter))})
	.attr("width", x.bandwidth())
	.attr("height", function(d) { return height - y(d.frequency); });
});

}