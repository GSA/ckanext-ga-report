var barChart = function(dataArray, title, yAxis, chart, links, marginBottom) {
	if(marginBottom == undefined) { marginBottom = 0};
	adjust_label = 0;
	if(title == "Time on page") {
	  adjust_label = 3;
	}
	var rect_width = 25;
	var y_axis_num = "11px";
	if(dataArray.length == 0) { return; }
	var longestEntry =  dataArray.sort(function (a, b) { return b[1].length - a[1].length; })[0];
	dataArray = dataArray.sort(function(a, b){return b[0] - a[0];});
	dataArray = dataArray.map(function(item) {item[0] = Math.round(item[0]); return item;})

	var color = d3.scaleOrdinal(d3.schemeCategory20);

		var div = d3.select(chart).append("div")
		.attr("class", "barchart-tooltip")
		.style("opacity", 0);

		var margin = {top: 50, right: 20, bottom: longestEntry[1].length * 5.27 + marginBottom, left: 60},
		    width = 730 - margin.left - margin.right,
		    height = 450;
		    if(window.innerWidth < 990 && window.innerWidth > 800){
		      width = 730 - (990 - window.innerWidth) / 1.2 - margin.left - margin.right;
		      dataArray = dataArray.slice(0, 18);
		      rect_width = 23.5;
		    } else if (window.innerWidth <= 800 && window.innerWidth > 770) {
		      width = 730 - margin.left - margin.right;
                      dataArray = dataArray.slice(0, 20);
                      rect_width = 25;
		      margin.left = 100;
                    } else if (window.innerWidth <= 770 && window.innerWidth >= 735) {
		      width = 730 - margin.left - margin.right;
                      dataArray = dataArray.slice(0, 20);
                      rect_width = 25;
		      margin.left = 100;
		    } else if (window.innerWidth < 735 && window.innerWidth >= 700) {
		      width = 770 - (990 - window.innerWidth) / 4 - margin.left - margin.right;
                      dataArray = dataArray.slice(0, 18);
                      rect_width = 24;
                    } else if (window.innerWidth < 700 && window.innerWidth >= 620) {
                      width = 810 - (990 - window.innerWidth) / 2 - margin.left - margin.right;
                      dataArray = dataArray.slice(0, 17);
                      rect_width = 23.5;
                    } else if (window.innerWidth < 620 && window.innerWidth >= 520) {
                      width = 845 - (990 - window.innerWidth) / 1.5 - margin.left - margin.right;
                      dataArray = dataArray.slice(0, 16);
                      rect_width = 22.5;
                    } else if (window.innerWidth < 520 && window.innerWidth >= 460) {
                      width = 840 - (990 - window.innerWidth) / 1.5 - margin.left - margin.right;
                      dataArray = dataArray.slice(0, 15);
                      rect_width = 20;
		      margin.left = 50;
		      y_axis_num = "10px";
                    } else if (window.innerWidth < 460 && window.innerWidth >= 400) {
                      width = 820 - (990 - window.innerWidth) / 1.5 - margin.left - margin.right;
                      dataArray = dataArray.slice(0, 15);
                      rect_width = 18.5;
		      margin.left = 45;
                      y_axis_num = "9px";
                    } else if (window.innerWidth < 400 && window.innerWidth >= 100) {
                      width = 870 - (990 - window.innerWidth) / 1.3 - margin.left - margin.right;
                      dataArray = dataArray.slice(0, 13);
                      rect_width = 16;
		      margin.left = 40;
                      y_axis_num = "7px";
                    }
		    if(title == "Total Time on Page"){ y_axis_num = "6px";}
		var x = d3.scaleBand().range([0, dataArray.length * (width/dataArray.length)]);
		var y = d3.scaleLinear().range([height, 0]);

		var maxValue = d3.max(dataArray, function(d) { return d[0]; })
		maxValue = maxValue + maxValue/15
		y.domain([0, maxValue]);
		x.domain(dataArray.map(function(d) { return d[1]; }));

		var svg = d3.select(chart).append("svg")
					.attr("width", width + margin.left + margin.right)
					.attr("height", height + margin.top + margin.bottom)
					.append("g")
					.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		svg.selectAll("rect")
		    .data(dataArray)
		    .enter().append("rect")
		    .attr("class", "bar")
		    .attr("height", function(d, i) {return (d[0] * (height/maxValue))})
		    .attr("width", rect_width)
		    .style("opacity", function(d, i) {return ((1.8)*d[0]/maxValue + .2);})
		    .attr('fill', function(d, i) {
		        return color(d[1]);
		    })
		    .attr("x", function(d) {return x(d[1]) + 4;})
		    .attr("y", function(d, i) {return height - (d[0] * (height/maxValue))})
		    .on("mouseover", function(d) {
			
			d3.select(this)
			.style("opacity", 1)
			.style("stroke-width", 1)
	
			div.transition()
			.duration(100)
			.style("opacity", 1)
			.style("position", "fixed")
			.style("left", function() {
                                  if(window.innerWidth > 769){
                                    return "32%";
                                  } else {
                                    return "8%";
                                  }
                                })
			.style("top", "10%")

			div.html(d[1] + "<br>" + yAxis + ": " +  d[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
		    })
		    .on("mouseout", function(d) {
			div.transition()
			.duration(500)
			.style("opacity", 0);

			d3.select(this)
		 	.style("opacity", function(d, i) {return ((1.8)*d[0]/maxValue + .2);})
			.style("stroke-width", .2)
		    })
		    .on("click", function(d) {
			if(title=="Top Datasets"){
			  window.open("https://catalog.data.gov/dataset/" + d[2].replace(/ /g, '-').toLowerCase(), "_blank")
			} else if(title=="Search Keywords") {
			  window.open("https://catalog.data.gov/dataset?q=" + d[1], "_blank") 
			} else {
			  window.open("https://" + d[1], "_blank")
			}
		    })

		svg.append("g")
			.attr("class", 'y-axis')
			.call(d3.axisLeft(y))
			.style("font-size", y_axis_num)

		svg.append("g")
			.attr("class", 'x-axis')
			.call(d3.axisBottom(x))
			.attr("transform", "translate(0," + height + ")")
			.selectAll("text")
			.style("text-anchor", "start")
			.style("font-size", "11px")
			.attr("class", "x-axis-label")
			.attr("dx", ".8em")
			.attr("dy", "-.50em")
			.attr("transform", "rotate(90)")
			.data(dataArray)
			.on("mouseover", function(d) {
                                div.transition()
                                .duration(100)
                                .style("opacity", 1)
                                .style("position", "fixed")
                                .style("left", function() {
				  if(window.innerWidth > 769){
				    return "32%";
				  } else {
				    return "8%";
				  }		
				})
                                .style("top", "10%")
                                .style("width", d[1].length)
				
				div.html(d[1] + "<br>" + yAxis + ": " +  d[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                        })
                        .on("mouseout", function(d) {
                                div.transition()
                                .duration(200)
                                .style("opacity", 0);
                        })
			.on("click", function(d) {
                          if(title=="Top Datasets"){
                            window.open("https://catalog.data.gov/dataset/" + d[2].replace(/ /g, '-').toLowerCase(), "_blank")
                          } else if (title=="Search Keywords") {
                            window.open("https://catalog.data.gov/dataset?q=" + d[1], "_blank")
                          } else {
                            window.open("https://" + d[1], "_blank")
                          }
                        })
		svg.append("text")
			.attr("x", (width / 2) - 30)
			.attr("y", 10 - (margin.top / 2))
			.attr("text-anchor", "middle")
			.style("font-size", "30px")
			.style('font', 'sans-serif')
			.text(title);
}

var pieChart = function(dataArray, chart, title) {
	dataArray.forEach(function(d) {
	    d[2] = true;                        
	});
	
	var sum_of_values = 0;
	for(var i=0; i<dataArray.length; i++){
		sum_of_values += dataArray[i][0];
	}
	var remainingPercentage = (100 - sum_of_values).toFixed(2);
	dataArray.push([remainingPercentage, "Other", true])

	var width = 720;
	var height = 450;
	var radius = Math.min(360, height) / 2;
	var translate_width = 55;

	if(window.innerWidth < 970 && window.innerWidth > 800){
	  
        } else if (window.innerWidth < 700 && window.innerWidth >= 400) {
	  width = window.innerWidth;
	  radius = 190;
	  translate_width = 0;
        } else if (window.innerWidth < 400 && window.innerWidth >= 100) {
	  width = window.innerWidth;
          radius = (window.innerWidth) / 2 - 10;
	  translate_width = 0;
        }

	var color = d3.scaleOrdinal(d3.schemeCategory20);

	var svg = d3.select(chart)
	  .append('svg')
	  .attr('width', width)
	  .attr('height', height)
	  .append('g')
	  .attr('transform', 'translate(' + (width / 2 - translate_width)  +  ',' + (height / 2 + 25) + ')');

	var arc = d3.arc()
	  .innerRadius(0)
	  .outerRadius(radius);

	var pie = d3.pie()
	  .value(function(d) { return d[0]; })
	  .sort(null);

	var path = svg.selectAll('path')
	  .data(pie(dataArray))
	  .enter()
	  .append('path')
	  .attr('d', arc)
	  .attr('fill', function(d, i) {
	    return color(d.data[1]);
	  })
	  .each(function(d) { this._current = d; });

	path.on('mouseover', function(d) {
	  var total = d3.sum(dataArray.map(function(d) {
	    return (d[2]) ? d[0] : 0;
	  }));
	  var percent = d.data[0];
	  tooltip.select('.label1').html(d.data[1]);
	  tooltip.select('.percent').html(percent + '%');
	  tooltip.style('display', 'block');
	});

	path.on('mouseout', function() {
	  tooltip.style('display', 'none');
	});

	path.on('mousemove', function(d) {
	  tooltip.style('top', (d3.event.layerY + 10) + 'px')
	    .style('left', (d3.event.layerX + 10) + 'px');
	});

	var legendRectSize = 18;
	var legendSpacing = 4;

	var legend = svg.selectAll('.legend')
	  .data(color.domain())
	  .enter()
	  .append('g')
	  .attr('class', 'legend')
	  .attr('transform', function(d, i) {
	    var height = legendRectSize + legendSpacing;
	    var offset =  height * color.domain().length / 2;
	    var horz = window.innerWidth < 700 ? 1000 : 220
	    var vert = i * height - offset;
	    return 'translate(' + horz + ',' + vert + ')';
	  });

	legend.append('rect')
	  .attr('width', legendRectSize)
	  .attr('height', legendRectSize)
	  .style('fill', color)
	  .style('stroke', color)
	  .on('click', function(label) {
		  var rect = d3.select(this);
		  var enabled = true;
		  var totalEnabled = d3.sum(dataArray.map(function(d) {
		    return (d[2]) ? 1 : 0;
		  }));

		  if (rect.attr('class') === 'disabled') {
		    rect.attr('class', '');
		  } else {
		    if (totalEnabled < 2) return;
		    rect.attr('class', 'disabled');
		    enabled = false;
		  }

		  pie.value(function(d) {
		    if (d[1] === label) d[2] = enabled;
		    return (d[2]) ? d[0] : 0;
		  });

		  path = path.data(pie(dataArray));

		  path.transition()
		    .duration(750)
		    .attrTween('d', function(d) {
		      var interpolate = d3.interpolate(this._current, d);
		      this._current = interpolate(0);
		      return function(t) {
		        return arc(interpolate(t));
		      };
		    });
	  });

	legend.append('text')
	  .attr('x', legendRectSize + legendSpacing)
	  .attr('y', legendRectSize - legendSpacing)
	  .text(function(d) { return d; });

	var tooltip = d3.select(chart)         
	  .append('div')                            
	  .attr('class', 'pie-chart-tooltip');               

	tooltip.append('div')                        
	  .attr('class', 'label1');                  
	tooltip.append('div')                        
	  .attr('class', 'percent');

	// TITLE
        svg.append("text")
	   .attr("x", 0)
           .attr("y", -215)
           .attr("text-anchor", "middle")
           .style("font-size", "30px")
           .style('font', 'sans-serif')
	   .text(title);
}
