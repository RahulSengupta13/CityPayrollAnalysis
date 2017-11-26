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
