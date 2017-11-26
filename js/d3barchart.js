
function barChart(my_json){
$("#mysvg").html("");
var mydata = [];
for (var i=0; i<my_json.results.bindings.length; i++){
//console.log(my_json.results.bindings[i]);
//  console.log(my_json.results.bindings[i].o.value);
//  console.log(my_json.results.bindings[i].avgSal.value);


  // x_bar.push(my_json.results.bindings[i].o.value);
  // y_bar.push(my_json.results.bindings[i].avgSal.value);
mydata.push({x:my_json.results.bindings[i].o.value, y:my_json.results.bindings[i].avgSal.value});

}
for (var i=0; i<mydata.length; i++){
// console.log(mydata[i].x);
// console.log(mydata[i].y);
}

       // mydata.forEach(function (d) {
       //
       //   //console.log(d.x);
       //   //console.log(d.y);
       //     d.x = +d.x;
       //     d.y = +d.y;
       // });


  var svg = d3.select("svg"),
      margin = {top: 10, right: 20, bottom: 220, left: 90},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom;

  var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
      y = d3.scaleLinear().rangeRound([height, 0]);

  var g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



    x.domain(mydata.map(function(d,i) {
console.log(d.x);
      return d.x;

     }));
    y.domain([0, d3.max(mydata, function(d) {
console.log(d.y);
      return d.y;

    })]);

    // g.append("g")
    //     .attr("class", "axis axis--x")
    //     .attr("transform", "translate(0," + height + ")")
    //     .call(d3.axisBottom(x));

        g.append("g")
			.classed("axis axis--x", true)
			.attr("transform", "translate(" + 0 + "," + height + ")")
			.call(d3.axisBottom(x))
				.selectAll("text")
					.classed("x-axis-label", true)
					.style("text-anchor", "end")
          .attr("font-size","9px")
					.attr("dx", -8)
					.attr("dy", 8)
					.attr("transform", "translate(0,0) rotate(-45)");

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(5))
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Average Salary");

    g.selectAll(".bar")
      .data(mydata)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.x); })
        .attr("y", function(d) { return y(d.y); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.y); });
}
function barChart2(my_json2){
$("#mysvg").html("");
  
var mydata = [];
var padding=100;
for (var i=0; i<my_json2.results.bindings.length; i++){
//console.log(my_json.results.bindings[i]);
//  console.log(my_json.results.bindings[i].o.value);
//  console.log(my_json.results.bindings[i].avgSal.value);


  // x_bar.push(my_json.results.bindings[i].o.value);
  // y_bar.push(my_json.results.bindings[i].avgSal.value);

mydata.push({x:my_json2.results.bindings[i].c.value, y:my_json2.results.bindings[i].average.value, z:splitString(my_json2.results.bindings[i].g.value)});

}
function splitString(s){
  var result;
  result = s.split("/");
return result[result.length-1];
};

for (var i=0; i<mydata.length; i++){
 console.log(mydata[i].x);
 console.log(mydata[i].y);
 console.log(mydata[i].z);
}

       // mydata.forEach(function (d) {
       //
       //   //console.log(d.x);
       //   //console.log(d.y);
       //     d.x = +d.x;
       //     d.y = +d.y;
       // });


  var svg = d3.select("svg"),
      margin = {top: 10, right: 20, bottom: 220, left: 90},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom;

  var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
      y = d3.scaleLinear().rangeRound([height, 0]);

  var g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



    x.domain(mydata.map(function(d,i) {
console.log(d.x);
      return d.x;

     }));
    y.domain([0, d3.max(mydata, function(d) {
console.log(d.y);
      return d.y;

    })]);



    // g.append("g")
    //     .attr("class", "axis axis--x")
    //     .attr("transform", "translate(0," + height + ")")
    //     .call(d3.axisBottom(x));

        g.append("g")
      .classed("x axis", true)
      .attr("transform", "translate(" + 0 + "," + height + ")")
      .call(d3.axisBottom(x))
        .selectAll("text")
          .classed("x-axis-label", true)
          .style("text-anchor", "end")
          .attr("font-size","9px")
          .attr("dx", -8)
          .attr("dy", 8)
          .attr("transform", "translate(0,0) rotate(-45)")
          .append("text")
          .text(function(d,i){
            return " | "+mydata[i].z;
          })
          .style("text-anchor", "end")
          .attr("font-size","9px")
          .attr("dx", -8)
          .attr("dy", 8)
          .attr("transform", "translate(0,0) rotate(-45)")

          ;

    g.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y).ticks(5))
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Base Salary")
      ;

    g.selectAll(".bar")
      .data(mydata)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.x); })
        .attr("y", function(d) { return y(d.y); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.y); })
        .attr("fill",function(d,i){

          console.log("what to do"+d.z);
          if(d.z==="lacity")
          {
            console.log("red");
            return "#E57373";
          }
          else{
            console.log("blue");
            return "steelblue";
          }

        })
        ;

      svg.append("text")
          .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
          .attr("transform", "translate(" + padding / 5 + "," + (height / 2) + ")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
          .text("AverageSalary")
          .style("fill", "#424242")
          .style("text-indent","20px")
          .style("font-size","12px")
          .style("font-weight","bold");

      svg.append("text")
          .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
          .attr("transform", "translate(" + (width / 2) + "," + (height + (padding + padding )) + ")")  // centre below axis
          .text("Department")
          .style("fill", "#424242")
          .style("text-indent","20px")
          .style("font-size","12px")
          .style("font-weight","bold");
}

//Deptwise avg sal LA
function barChart3(my_json3){
  $("#mysvg").html("");
var mydata = [];
var padding=100;
for (var i=0; i<my_json3.results.bindings.length; i++){
//console.log(my_json.results.bindings[i]);
//  console.log(my_json.results.bindings[i].o.value);
//  console.log(my_json.results.bindings[i].avgSal.value);


  // x_bar.push(my_json.results.bindings[i].o.value);
  // y_bar.push(my_json.results.bindings[i].avgSal.value);
mydata.push({x:my_json3.results.bindings[i].org.value, y:my_json3.results.bindings[i].avgSal.value});

}
for (var i=0; i<mydata.length; i++){
// console.log(mydata[i].x);
// console.log(mydata[i].y);
}

       // mydata.forEach(function (d) {
       //
       //   //console.log(d.x);
       //   //console.log(d.y);
       //     d.x = +d.x;
       //     d.y = +d.y;
       // });


  var svg = d3.select("svg"),
      margin = {top: 10, right: 20, bottom: 220, left: 90},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom;

  var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
      y = d3.scaleLinear().rangeRound([height, 0]);

  var g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



    x.domain(mydata.map(function(d,i) {
console.log(d.x);
      return d.x;

     }));
    y.domain([0, d3.max(mydata, function(d) {
console.log(d.y);
      return d.y;

    })]);



    // g.append("g")
    //     .attr("class", "axis axis--x")
    //     .attr("transform", "translate(0," + height + ")")
    //     .call(d3.axisBottom(x));

        g.append("g")
      .classed("x axis", true)
      .attr("transform", "translate(" + 0 + "," + height + ")")
      .call(d3.axisBottom(x))
        .selectAll("text")
          .classed("x-axis-label", true)
          .style("text-anchor", "end")
          .attr("font-size","9px")
          .attr("dx", -8)
          .attr("dy", 8)
          .attr("transform", "translate(0,0) rotate(-45)")
          ;

    g.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y).ticks(5))
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Average Salary(annual)")
      ;

    g.selectAll(".bar")
      .data(mydata)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.x); })
        .attr("y", function(d) { return y(d.y); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.y); })
        .attr("fill","steelblue")

      svg.append("text")
          .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
          .attr("transform", "translate(" + padding / 5 + "," + (height / 2) + ")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
          .text("Average Salary(annual)")
          .style("fill", "#424242")
          .style("text-indent","20px")
          .style("font-size","12px")
          .style("font-weight","bold");

      svg.append("text")
          .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
          .attr("transform", "translate(" + (width / 2) + "," + (height + (padding + padding )) + ")")  // centre below axis
          .text("Department")
          .style("fill", "#424242")
          .style("text-indent","20px")
          .style("font-size","12px")
          .style("font-weight","bold");





}

//Dept position wise avg sal LA
function barChart4(my_json4){
  $("#mysvg").html("");
var mydata = [];
var padding=100;
for (var i=0; i<my_json4.results.bindings.length; i++){
//console.log(my_json.results.bindings[i]);
//  console.log(my_json.results.bindings[i].o.value);
//  console.log(my_json.results.bindings[i].avgSal.value);


  // x_bar.push(my_json.results.bindings[i].o.value);
  // y_bar.push(my_json.results.bindings[i].avgSal.value);
  // {
  //   "deptTitle": { "type": "literal" , "value": "Los Angeles Convention Center" } ,
  //   "jobClass": { "type": "literal" , "value": "Accountant Ii" } ,
  //   "avgSal": { "type": "literal" , "datatype": "http://www.w3.org/2001/XMLSchema#decimal" , "value": "31.865" }
  // }
mydata.push({x:my_json4.results.bindings[i].deptTitle.value, y:my_json4.results.bindings[i].avgSal.value, z:my_json4.results.bindings[i].jobClass.value});

}
// function splitString(s){
//   var result;
//   result = s.split("/");
// return result[result.length-1];
// };

for (var i=0; i<mydata.length; i++){
 console.log(mydata[i].x);
 console.log(mydata[i].y);
 console.log(mydata[i].z);
}

       // mydata.forEach(function (d) {
       //
       //   //console.log(d.x);
       //   //console.log(d.y);
       //     d.x = +d.x;
       //     d.y = +d.y;
       // });


  var svg = d3.select("svg"),
      margin = {top: 10, right: 20, bottom: 220, left: 90},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom;

  var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
      y = d3.scaleLinear().rangeRound([height, 0]);

  var g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



    x.domain(mydata.map(function(d,i) {
console.log(d.x);
      return d.x;

     }));
    y.domain([0, d3.max(mydata, function(d) {
console.log(d.y);
      return d.y;

    })]);



    // g.append("g")
    //     .attr("class", "axis axis--x")
    //     .attr("transform", "translate(0," + height + ")")
    //     .call(d3.axisBottom(x));

        g.append("g")
      .classed("x axis", true)
      .attr("transform", "translate(" + 0 + "," + height + ")")
      .call(d3.axisBottom(x))
        .selectAll("text")
          .classed("x-axis-label", true)
          .style("text-anchor", "end")
          .attr("font-size","9px")
          .attr("dx", -8)
          .attr("dy", 8)
          .attr("transform", "translate(0,0) rotate(-45)")
          .append("text")
          .text(function(d,i){
            return " | "+mydata[i].z;
          })
          .style("text-anchor", "end")
          .attr("font-size","9px")
          .attr("dx", -8)
          .attr("dy", 8)
          .attr("transform", "translate(0,0) rotate(-45)")

          ;

    g.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y).ticks(5))
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Average Salary(hourly)")
      ;

    g.selectAll(".bar")
      .data(mydata)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.x); })
        .attr("y", function(d) { return y(d.y); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.y); })
        .attr("fill",function(d,i){

          console.log("what to do"+d.z);
          if(d.z==="Accountant II")
          {
            console.log("red");
            return "#424242";
          }
          else if(d.z==="Accountant I"){

            console.log("blue");
            return "steelblue";
          }
          else if(d.z==="Clerk")
          {
return "#009688";
          }
          else if(d.z ==="Accounting Clerk I")
          {
return "#E65100";
          }
          else if(d.z==="311 Director")
          {
return "#4A148C";
          }
          else if(d.z==="Accountant Ii")
          {
            return "#F57C00";
          }

        })
        ;

      svg.append("text")
          .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
          .attr("transform", "translate(" + padding / 5 + "," + (height / 2) + ")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
          .text("AverageSalary(hourly)")
          .style("fill", "#424242")
          .style("text-indent","20px")
          .style("font-size","12px")
          .style("font-weight","bold");

      svg.append("text")
          .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
          .attr("transform", "translate(" + (width / 2) + "," + (height + (padding + padding )) + ")")  // centre below axis
          .text("Department")
          .style("fill", "#424242")
          .style("text-indent","20px")
          .style("font-size","12px")
          .style("font-weight","bold");





}

//Compare total earnings dept wise LA
function barChart5(my_json5){
  $("#mysvg").html("");
var mydata = [];
var padding=100;
for (var i=0; i<my_json5.results.bindings.length; i++){
//console.log(my_json.results.bindings[i]);
//  console.log(my_json.results.bindings[i].o.value);
//  console.log(my_json.results.bindings[i].avgSal.value);


  // x_bar.push(my_json.results.bindings[i].o.value);
  // y_bar.push(my_json.results.bindings[i].avgSal.value);
  // {
  //   "deptTitle": { "type": "literal" , "value": "Los Angeles Convention Center" } ,
  //   "jobClass": { "type": "literal" , "value": "Accountant Ii" } ,
  //   "avgSal": { "type": "literal" , "datatype": "http://www.w3.org/2001/XMLSchema#decimal" , "value": "31.865" }
  // }
mydata.push({x:my_json5.results.bindings[i].deptTitle.value, y:my_json5.results.bindings[i].avgSal.value, z:my_json5.results.bindings[i].jobClass.value});

}
// function splitString(s){
//   var result;
//   result = s.split("/");
// return result[result.length-1];
// };

for (var i=0; i<mydata.length; i++){
 console.log(mydata[i].x);
 console.log(mydata[i].y);
 console.log(mydata[i].z);
}

       // mydata.forEach(function (d) {
       //
       //   //console.log(d.x);
       //   //console.log(d.y);
       //     d.x = +d.x;
       //     d.y = +d.y;
       // });


  var svg = d3.select("svg"),
      margin = {top: 10, right: 20, bottom: 220, left: 90},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom;

  var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
      y = d3.scaleLinear().rangeRound([height, 0]);

  var g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



    x.domain(mydata.map(function(d,i) {
console.log(d.x);
      return d.x;

     }));
    y.domain([0, d3.max(mydata, function(d) {
console.log(d.y);
      return d.y;

    })]);



    // g.append("g")
    //     .attr("class", "axis axis--x")
    //     .attr("transform", "translate(0," + height + ")")
    //     .call(d3.axisBottom(x));

        g.append("g")
      .classed("x axis", true)
      .attr("transform", "translate(" + 0 + "," + height + ")")
      .call(d3.axisBottom(x))
        .selectAll("text")
          .classed("x-axis-label", true)
          .style("text-anchor", "end")
          .attr("font-size","9px")
          .attr("dx", -8)
          .attr("dy", 8)
          .attr("transform", "translate(0,0) rotate(-45)")
          .append("text")
          .text(function(d,i){
            return " | "+mydata[i].z;
          })
          .style("text-anchor", "end")
          .attr("font-size","9px")
          .attr("dx", -8)
          .attr("dy", 8)
          .attr("transform", "translate(0,0) rotate(-45)")

          ;

    g.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y).ticks(5))
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Average Salary(annual)")
      ;

    g.selectAll(".bar")
      .data(mydata)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.x); })
        .attr("y", function(d) { return y(d.y); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.y); })
        .attr("fill",function(d,i){

          console.log("what to do"+d.z);
          if(d.z==="Accountant II")
          {
            console.log("red");
            return "#424242";
          }
          else if(d.z==="Accountant I"){

            console.log("blue");
            return "steelblue";
          }
          else if(d.z==="Clerk")
          {
return "#009688";
          }
          else if(d.z ==="Accounting Clerk I")
          {
return "#E65100";
          }
          else if(d.z==="311 Director")
          {
return "#4A148C";
          }
          else if(d.z==="Accountant Ii")
          {
            return "#F57C00";
          }

        })
        ;

      svg.append("text")
          .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
          .attr("transform", "translate(" + padding / 5 + "," + (height / 2) + ")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
          .text("Average Salary(annual)")
          .style("fill", "#424242")
          .style("text-indent","20px")
          .style("font-size","12px")
          .style("font-weight","bold");

      svg.append("text")
          .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
          .attr("transform", "translate(" + (width / 2) + "," + (height + (padding + padding )) + ")")  // centre below axis
          .text("Department")
          .style("fill", "#424242")
          .style("text-indent","20px")
          .style("font-size","12px")
          .style("font-weight","bold");





}

//compare base sal dept wise NYC
function barChart6(my_json6){
  $("#mysvg").html("");
var mydata = [];
var padding=100;
for (var i=0; i<my_json6.results.bindings.length; i++){
//console.log(my_json.results.bindings[i]);
//  console.log(my_json.results.bindings[i].o.value);
//  console.log(my_json.results.bindings[i].avgSal.value);


  // x_bar.push(my_json.results.bindings[i].o.value);
  // y_bar.push(my_json.results.bindings[i].avgSal.value);
mydata.push({x:my_json6.results.bindings[i].name.value, y:my_json6.results.bindings[i].salaryCount.value});

}
for (var i=0; i<mydata.length; i++){
// console.log(mydata[i].x);
// console.log(mydata[i].y);
}

       // mydata.forEach(function (d) {
       //
       //   //console.log(d.x);
       //   //console.log(d.y);
       //     d.x = +d.x;
       //     d.y = +d.y;
       // });


  var svg = d3.select("svg"),
      margin = {top: 10, right: 20, bottom: 220, left: 90},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom;

  var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
      y = d3.scaleLinear().rangeRound([height, 0]);

  var g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



    x.domain(mydata.map(function(d,i) {
console.log(d.x);
      return d.x;

     }));
    y.domain([0, d3.max(mydata, function(d) {
console.log(d.y);
      return d.y;

    })]);



    // g.append("g")
    //     .attr("class", "axis axis--x")
    //     .attr("transform", "translate(0," + height + ")")
    //     .call(d3.axisBottom(x));

        g.append("g")
      .classed("x axis", true)
      .attr("transform", "translate(" + 0 + "," + height + ")")
      .call(d3.axisBottom(x))
        .selectAll("text")
          .classed("x-axis-label", true)
          .style("text-anchor", "end")
          .attr("font-size","9px")
          .attr("dx", -8)
          .attr("dy", 8)
          .attr("transform", "translate(0,0) rotate(-45)")
          ;

    g.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y).ticks(5))
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Average Salary(hourly)")
      ;

    g.selectAll(".bar")
      .data(mydata)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.x); })
        .attr("y", function(d) { return y(d.y); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.y); })
        .attr("fill","steelblue");

      svg.append("text")
          .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
          .attr("transform", "translate(" + padding / 5 + "," + (height / 2) + ")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
          .text("Base Salary")
          .style("fill", "#424242")
          .style("text-indent","20px")
          .style("font-size","12px")
          .style("font-weight","bold");

      svg.append("text")
          .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
          .attr("transform", "translate(" + (width / 2) + "," + (height + (padding + padding )) + ")")  // centre below axis
          .text("Department")
          .style("fill", "#424242")
          .style("text-indent","20px")
          .style("font-size","12px")
          .style("font-weight","bold");





}

//compare base sal dept wise NYC
function barChart6(my_json6){
  $("#mysvg").html("");
var mydata = [];
var padding=100;
for (var i=0; i<my_json6.results.bindings.length; i++){
//console.log(my_json.results.bindings[i]);
//  console.log(my_json.results.bindings[i].o.value);
//  console.log(my_json.results.bindings[i].avgSal.value);


  // x_bar.push(my_json.results.bindings[i].o.value);
  // y_bar.push(my_json.results.bindings[i].avgSal.value);
mydata.push({x:my_json6.results.bindings[i].name.value, y:my_json6.results.bindings[i].salaryCount.value});

}
for (var i=0; i<mydata.length; i++){
// console.log(mydata[i].x);
// console.log(mydata[i].y);
}

       // mydata.forEach(function (d) {
       //
       //   //console.log(d.x);
       //   //console.log(d.y);
       //     d.x = +d.x;
       //     d.y = +d.y;
       // });


  var svg = d3.select("svg"),
      margin = {top: 10, right: 20, bottom: 220, left: 90},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom;

  var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
      y = d3.scaleLinear().rangeRound([height, 0]);

  var g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



    x.domain(mydata.map(function(d,i) {
console.log(d.x);
      return d.x;

     }));
    y.domain([0, d3.max(mydata, function(d) {
console.log(d.y);
      return d.y;

    })]);



    // g.append("g")
    //     .attr("class", "axis axis--x")
    //     .attr("transform", "translate(0," + height + ")")
    //     .call(d3.axisBottom(x));

        g.append("g")
      .classed("x axis", true)
      .attr("transform", "translate(" + 0 + "," + height + ")")
      .call(d3.axisBottom(x))
        .selectAll("text")
          .classed("x-axis-label", true)
          .style("text-anchor", "end")
          .attr("font-size","9px")
          .attr("dx", -8)
          .attr("dy", 8)
          .attr("transform", "translate(0,0) rotate(-45)")
          ;

    g.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y).ticks(5))
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Average Salary(hourly)")
      ;

    g.selectAll(".bar")
      .data(mydata)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.x); })
        .attr("y", function(d) { return y(d.y); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.y); })
        .attr("fill","steelblue");

      svg.append("text")
          .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
          .attr("transform", "translate(" + padding / 5 + "," + (height / 2) + ")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
          .text("Base Salary")
          .style("fill", "#424242")
          .style("text-indent","20px")
          .style("font-size","12px")
          .style("font-weight","bold");

      svg.append("text")
          .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
          .attr("transform", "translate(" + (width / 2) + "," + (height + (padding + padding )) + ")")  // centre below axis
          .text("Department")
          .style("fill", "#424242")
          .style("text-indent","20px")
          .style("font-size","12px")
          .style("font-weight","bold");





}

//avg ot hour dept wise NYC
function barChart8(my_json7){
  $("#mysvg").html("");
var mydata = [];
var padding=100;
for (var i=0; i<my_json7.results.bindings.length; i++){
//console.log(my_json.results.bindings[i]);
//  console.log(my_json.results.bindings[i].o.value);
//  console.log(my_json.results.bindings[i].avgSal.value);


  // x_bar.push(my_json.results.bindings[i].o.value);
  // y_bar.push(my_json.results.bindings[i].avgSal.value);
mydata.push({x:my_json7.results.bindings[i].name.value, y:my_json7.results.bindings[i].AvgOthours.value});

}
for (var i=0; i<mydata.length; i++){
// console.log(mydata[i].x);
// console.log(mydata[i].y);
}

       // mydata.forEach(function (d) {
       //
       //   //console.log(d.x);
       //   //console.log(d.y);
       //     d.x = +d.x;
       //     d.y = +d.y;
       // });


  var svg = d3.select("svg"),
      margin = {top: 10, right: 20, bottom: 220, left: 90},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom;

  var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
      y = d3.scaleLinear().rangeRound([height, 0]);

  var g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



    x.domain(mydata.map(function(d,i) {
console.log(d.x);
      return d.x;

     }));
    y.domain([0, d3.max(mydata, function(d) {
console.log(d.y);
      return d.y;

    })]);



    // g.append("g")
    //     .attr("class", "axis axis--x")
    //     .attr("transform", "translate(0," + height + ")")
    //     .call(d3.axisBottom(x));

        g.append("g")
      .classed("x axis", true)
      .attr("transform", "translate(" + 0 + "," + height + ")")
      .call(d3.axisBottom(x))
        .selectAll("text")
          .classed("x-axis-label", true)
          .style("text-anchor", "end")
          .attr("font-size","9px")
          .attr("dx", -8)
          .attr("dy", 8)
          .attr("transform", "translate(0,0) rotate(-45)")
          ;

    g.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y).ticks(5))
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Average Salary(hourly)")
      ;

    g.selectAll(".bar")
      .data(mydata)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.x); })
        .attr("y", function(d) { return y(d.y); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.y); })
        .attr("fill","steelblue");

      svg.append("text")
          .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
          .attr("transform", "translate(" + padding / 5 + "," + (height / 2) + ")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
          .text("Average OT Hours")
          .style("fill", "#424242")
          .style("text-indent","20px")
          .style("font-size","12px")
          .style("font-weight","bold");

      svg.append("text")
          .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
          .attr("transform", "translate(" + (width / 2) + "," + (height + (padding + padding )) + ")")  // centre below axis
          .text("Department")
          .style("fill", "#424242")
          .style("text-indent","20px")
          .style("font-size","12px")
          .style("font-weight","bold");





}

//
function barChart7(my_json8){
$("#mysvg").html("");
var mydata = [];
var padding=100;
for (var i=0; i<my_json8.results.bindings.length; i++){
//console.log(my_json.results.bindings[i]);
//  console.log(my_json.results.bindings[i].o.value);
//  console.log(my_json.results.bindings[i].avgSal.value);


  // x_bar.push(my_json.results.bindings[i].o.value);
  // y_bar.push(my_json.results.bindings[i].avgSal.value);
  // {
  //        "name": { "type": "literal" , "value": "POLICE DEPARTMENT" } ,
  //        "title": { "type": "literal" , "value": "P.O. DA DET GR3" } ,
  //        "AvgOthours": { "type": "literal" , "datatype": "http://www.w3.org/2001/XMLSchema#decimal" , "value": "450.5" }
  //      }


mydata.push({z:my_json8.results.bindings[i].name.value.trim(), x:my_json8.results.bindings[i].title.value, y:my_json8.results.bindings[i].AvgOthours.value});

}
// function splitString(s){
//   var result;
//   result = s.split("/");
// return result[result.length-1];
// };

for (var i=0; i<mydata.length; i++){
 console.log(mydata[i].x);
 console.log(mydata[i].y);
 console.log(mydata[i].z);
}

       // mydata.forEach(function (d) {
       //
       //   //console.log(d.x);
       //   //console.log(d.y);
       //     d.x = +d.x;
       //     d.y = +d.y;
       // });


  var svg = d3.select("svg"),
      margin = {top: 10, right: 20, bottom: 220, left: 90},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom;

  var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
      y = d3.scaleLinear().rangeRound([height, 0]);

  var g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



    x.domain(mydata.map(function(d,i) {
console.log(d.x);
      return d.x;

     }));
    y.domain([0, d3.max(mydata, function(d) {
console.log(d.y);
      return d.y;

    })]);



    // g.append("g")
    //     .attr("class", "axis axis--x")
    //     .attr("transform", "translate(0," + height + ")")
    //     .call(d3.axisBottom(x));

        g.append("g")
      .classed("x axis", true)
      .attr("transform", "translate(" + 0 + "," + height + ")")
      .call(d3.axisBottom(x))
        .selectAll("text")
          .classed("x-axis-label", true)
          .style("text-anchor", "end")
          .attr("font-size","9px")
          .attr("dx", -8)
          .attr("dy", 8)
          .attr("transform", "translate(0,0) rotate(-45)")
          .append("text")
          .text(function(d,i){
            return " | "+mydata[i].z;
          })
          .style("text-anchor", "end")
          .attr("font-size","9px")
          .attr("dx", -8)
          .attr("dy", 8)
          .attr("transform", "translate(0,0) rotate(-45)")

          ;

    g.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y).ticks(5))
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Average Salary(hourly)")
      ;

    g.selectAll(".bar")
      .data(mydata)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.x); })
        .attr("y", function(d) { return y(d.y); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.y); })
        .attr("fill",function(d,i){


          if(d.z==="POLICE DEPARTMENT")
          {
            console.log("red");
            return "#424242";
          }
          else if(d.z==="DISTRICT ATTORNEY-MANHATTAN"){

            console.log("blue");
            return "steelblue";
          }

        })
        ;

      svg.append("text")
          .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
          .attr("transform", "translate(" + padding / 5 + "," + (height / 2) + ")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
          .text("Average OT Hours")
          .style("fill", "#424242")
          .style("text-indent","20px")
          .style("font-size","12px")
          .style("font-weight","bold");

      svg.append("text")
          .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
          .attr("transform", "translate(" + (width / 2) + "," + (height + (padding + padding )) + ")")  // centre below axis
          .text("Job Title")
          .style("fill", "#424242")
          .style("text-indent","20px")
          .style("font-size","12px")
          .style("font-weight","bold");





}