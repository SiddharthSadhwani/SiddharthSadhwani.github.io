var margin = {top: 10, right: 20, bottom: 30, left: 50},
    width = 1520 - margin.left - margin.right,
    height = 520 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("updated1.csv", function(data) {
  console.log(data[0]);
  // Add X axis
  var x = d3.scaleLinear()
    .domain([16, 42])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([58, 95])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add a scale for bubble size
  var z = d3.scaleLinear()
    .domain([80, 100])
    .range([ 5, 20]);

  // Add a scale for bubble color
  var myColor = d3.scaleOrdinal()
    .domain(['Algeria', 'Ghana', 'Japan', 'Liberia', 'Guinea', 'Turkey', 'North Macedonia', 'Burkina Faso', 'Albania', 'Slovakia', 'Ivory Coast', 'Togo', 'Iran', 'Georgia', 'Poland', 'Bolivia', 'Korea Republic', 'Argentina', 'Costa Rica', 'Switzerland', 'Northern Ireland', 'Australia', 'Iceland', 'Greece', 'Peru', 'Gambia', 'Netherlands', 'Namibia', 'Chile', 'Senegal', 'Tunisia', 'Wales', 'Austria', 'Italy', 'Canada', 'Portugal', 'Cameroon', 'Denmark', 'Nigeria', 'Honduras', 'DR Congo', 'Egypt', 'Mali', 'Russia', 'Serbia', 'Paraguay', 'Brazil', 'Hungary', 'Scotland', 'Montenegro', 'Zambia', 'Ecuador', 'Romania', 'France', 'Gabon', 'Republic of Ireland', 'Uruguay', 'Croatia', 'Morocco', 'Norway', 'Kosovo', 'Sweden', 'Venezuela', 'England', 'Ukraine', 'Trinidad &amp; Tobago', 'Czech Republic', 'Mexico', 'Cape Verde', 'United States', 'Jamaica', 'Slovenia', 'Colombia', 'Israel', 'New Zealand', 'Bosnia Herzegovina', 'Finland', 'Luxembourg', 'Korea DPR', 'Spain', 'Germany', 'Belgium'])
    .range(d3.schemeSet2);

  var tooltip = d3.select("#my_dataviz")
    .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "black")
      .style("border-radius", "5px")
      .style("padding", "10px")
      .style("color", "white")
      // .html(data.Name)

  // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
  var showTooltip = function(d) {
    tooltip
      .transition()
      .duration(200)
    tooltip
      .style("opacity", 1)
      .html('<img src="https://cdn.sofifa.com/players/000/488/08_120.png"/>'+"<br>Country: " + d.Nationality)
      .style("background-color","red")
      .style("left", (d3.mouse(this)[0]+30) + "px")
      .style("top", (d3.mouse(this)[1]+30) + "px")
  }
  var moveTooltip = function(d) {
    tooltip
      .style("left", (d3.mouse(this)[0]+30) + "px")
      .style("top", (d3.mouse(this)[1]+30) + "px")
  }
  var hideTooltip = function(d) {
    tooltip
      .transition()
      .duration(200)
      .style("opacity", 0)
  }

  // Add dots
  svg.append('g')
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
      .attr("class", "bubbles")
      .attr("cx", function (d) { console.log(d.OVA); return x(d.Age);  } )
      .attr("cy", function (d) { return y(d.OVA); } )
      .attr("r", function (d) { return z(d.POT); } )
      .style("fill", function (d) { return myColor(d.Nationality); } )
    .on("mouseover", showTooltip )
    .on("mousemove", moveTooltip )
    .on("mouseleave", hideTooltip )

  })