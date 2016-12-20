var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("../JSON/foodgraining.json", function(d) {
  d.["3-2013"] = +d.["3-2013"];
  return d;
}, function(error, data) {
  if (error) throw error;
data.sort(function(a,b) {
      return b["3-2013"] - a["3-2013"];

    });

    

    xScale.domain(data.map(function(d) { return d.Particulars; }));
    yScale.domain([0, d3.max(data, function(d) { return d["3-2013"]; })]);

    
    svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr("height",0)
    .attr("y",height)
    .transition().duration(3000)
    .delay(function (d,i){return i*200 ;})
      .attr({
      "x": function(d) { return xScale(d.Particulars); },
      "y": function(d) { return yScale(d["3-2013"]); },
      "width": xScale.rangeBand(),
      "height": function(d) { return height - yScale(d["3-2013"]);}
      })
      .style("fill",function(d,i){return 'rgb(20,20, '+ ( (i * 30)+ 100) +')' });

      svg.selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .text(function(d){return d["3-2013"]; })
      .attr('x',function(d) {return xScale(d.Particulars)+xScale.rangeBand()/2;})
      .attr('y',function(d) {return yScale(d["3-2013"])+15; })
      .style("fill","white")
      .style("text-anchor","middle");




    
      svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll('text')
      .attr("transform", "rotate(-60)")
      .attr("dx","-.8em")
      .attr("dy", ".25em")
      .style("text-anchor","end")
      .style("font-size","12px");
 

      svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .style("font-size","15px");


});



