
var svgHeight = 500
var svgWidth = 900

var svg = d3.select("#scatter").append("svg").attr("width", svgWidth).attr("height", svgHeight)

var margin = {
    top: 40,
    right: 60,
    left: 60,
    bottom: 80
}

var chartWidth = svgWidth - margin.right - margin.left
var chartHeight = svgHeight - margin.top - margin.bottom

var chartGroup = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

var div = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0)

d3.csv("assets/data/data.csv").then(function (states){
    for (state of states){
        state.age = +state.age
        state.smokes = +state.smokes
    }
    
    
    var xScale = d3.scaleLinear().domain([28, d3.max(states, d => d.age)])
                    .range([0, chartWidth]);
    
    var yScale = d3.scaleLinear().domain([5, d3.max(states, d => d.smokes) + 5])
                    .range([chartHeight, 0]);

    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yScale);

    chartGroup.append("g").attr("transform", `translate(0, ${chartHeight})`).call(bottomAxis)
    chartGroup.append("g").call(leftAxis);

    var circlesGroup = chartGroup.selectAll("circle")
        .data(states)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.age))
        .attr("cy", d => yScale(d.smokes))
        .attr("r", 16)
        .attr("fill", "green")
        .attr("opacity", ".7")
        .attr("text", d => d.abbr)

    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (chartHeight / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Smoking Rate (%)")

    chartGroup.append("text")
        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + margin.top + 20})`)
        .attr("class", "axisText")
        .html("Average Age of Resident")

    var labels = chartGroup.selectAll(null).data(states).enter().append("text")

    labels.attr("x", d => xScale(d.age))
        .attr("y", d => yScale(d.smokes))
        .text(d => d.abbr)
        .attr("font-size", "12px")
        .attr("text-anchor", "middle")
        .attr("fill", "black")
    
})
