var margin = {top: 100, right: 0, bottom: 30, left: 50},
    width = 910,
    height = 450;

var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right+20)
    .attr("height", height + margin.top + margin.bottom)
    .style("float","left")
    // .style("background","url(pitch.jpg)")
    .style("background-size","cover")
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

d3.csv("updated1.csv", function(data) {

  var x = d3.scaleLinear()
    .domain([16, 42])
    .range([ 0, width]);
  svg.append("g")
    .attr("transform", "translate(-3," + height/1.2 + ")")
    .attr("class","yAxis")
    .call(d3.axisBottom(x));

  var y = d3.scaleLinear()
    .domain([75, 95])
    .range([ height-margin.top, 0]);
  svg.append("g")
    .attr("class","yAxis")
    .call(d3.axisLeft(y));
  
    svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height + margin.top + 20)
    .text("Age");

svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left+20)
    .attr("x", -margin.top-120)
    .text("Current Rating")
    .style('fill', 'white')

  var z = d3.scaleLinear()
    .domain([80, 95])
    .range([ 1, 25]);

  var myColor = d3.scaleOrdinal()
    .domain(['Algeria', 'Ghana', 'Japan', 'Liberia', 'Guinea', 'Turkey', 'North Macedonia', 'Burkina Faso', 'Albania', 'Slovakia', 'Ivory Coast', 'Togo', 'Iran', 'Georgia', 'Poland', 'Bolivia', 'Korea Republic', 'Argentina', 'Costa Rica', 'Switzerland', 'Northern Ireland', 'Australia', 'Iceland', 'Greece', 'Peru', 'Gambia', 'Netherlands', 'Namibia', 'Chile', 'Senegal', 'Tunisia', 'Wales', 'Austria', 'Italy', 'Canada', 'Portugal', 'Cameroon', 'Denmark', 'Nigeria', 'Honduras', 'DR Congo', 'Egypt', 'Mali', 'Russia', 'Serbia', 'Paraguay', 'Brazil', 'Hungary', 'Scotland', 'Montenegro', 'Zambia', 'Ecuador', 'Romania', 'France', 'Gabon', 'Republic of Ireland', 'Uruguay', 'Croatia', 'Morocco', 'Norway', 'Kosovo', 'Sweden', 'Venezuela', 'England', 'Ukraine', 'Trinidad &amp; Tobago', 'Czech Republic', 'Mexico', 'Cape Verde', 'United States', 'Jamaica', 'Slovenia', 'Colombia', 'Israel', 'New Zealand', 'Bosnia Herzegovina', 'Finland', 'Luxembourg', 'Korea DPR', 'Spain', 'Germany', 'Belgium'])
    .range(d3.schemeSet2);

  var defs = svg.append("defs");

  var tooltip = d3.select("#my_dataviz")
    .append("div")
      .style("opacity", 1)
      .attr("class", "tooltip")
      .style("background", "url(card7.png) 50% 50%")
      .style("background-size","cover")
      .style("height","100%")
      .style("width","35.4%")
      .style("color", "black")
      .style("float","right")

  var showTooltip = function(d) {
    tooltip
      .transition()
      .duration(200)
    tooltip
      .style("opacity", 1)
      .style("background-color","black")
      .style("left", (d3.mouse(this)[0]+30) + "px")
      .style("top", (d3.mouse(this)[1]+30) + "px")
      .html('<div class="tooly"><center><br><h1>'+d.Name+'</h1></center><br><img class="player" src="'+d.player_images+'"/><div class="extras"><img class="club" src="'+d.club_images+'"/><img class="country" src="'+d.country_images+'"/></div><h2>'+d.BP+' | Age : '+d.Age+'</h2><h2>OVA : '+d.OVA+' | POT : '+d.POT+'</h2><h2>Foot : '+d.foot+'</h2><h2>Nat : '+d.Nationality+'</h2></div>')
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
      .style("opacity", 1)
  }
  defs.selectAll(".bubble-image")
  .data(data)
  .enter().append("pattern")
  .attr("class", "bubble-image")
  .attr("id",function(d){
    return d.lastname
  })
  .attr("height","100%")
  .attr("width","100%")
  .attr("patternContentUnits","objectBoundingBox")
  .append("image")
  .attr("height",1)
  .attr("width",1)
  .attr("preserveAspectRatio","none")
  .attr("xmlns:xlink","http://www.w3.org/1999/xlink")
  .attr("xlink:href",function(d){
    return d.country_images
  })
  svg.append('g')
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
      .attr("class" , function(d){return "bubbles "+d.group})
      .attr("cx", function (d) { return x(d.Age);  } )
      .attr("cy", function (d) { return y(d.OVA); } )
      .attr("r", function (d) { return z(d.POT); } )
      .style("fill",function(d){return "url(#"+d.lastname+")"} )
    .on("mouseover", showTooltip )
    .on("mousemove", moveTooltip )
    .on("mouseleave", hideTooltip )

    function update(){

      d3.selectAll(".checkbox").each(function(d){
        cb = d3.select(this);
        grp = cb.property("value")

        if(cb.property("checked")){
          svg.selectAll("."+grp).transition().duration(1000).style("opacity", 1).attr("r", function(d){ return z(d.POT) })

        }else{
          svg.selectAll("."+grp).transition().duration(1000).style("opacity", 0).attr("r", 0)
        }
      })
    }

    d3.selectAll(".checkbox").on("change",update);

    update()
})

