// Constants
const gridWidth = 1000,
 gridHeight = 600,
 rectWidth = 40,
 rectHeight = 25,
 shift = 30,
 margin = {
  left: 5,
  right: 5,
  top: 5,
  bottom: 5,
};

// Calculate number of rows and columns based on dimensions
var gridColumns = Math.round(gridWidth / rectWidth),
  gridRows = Math.round(gridHeight / rectHeight)

var svg = d3.select("#grid").append("svg")
  .attr("width", gridWidth)
  .attr("height", gridHeight)
  .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

// Create grid, 'i = row number' and 'n = column number'
for (var i = 0; i < gridRows; i++) {
  var group = svg.append("g")
    .attr("id", "full-row-" + (i + 1));

  var rows = group.selectAll("rect" + ".row-" + (i + 1))
    .data(d3.range(gridColumns))
    .enter()
    .append("rect")
      .attr("class", (d, n) => "rect row-" + (i + 1) + " " + "col-" + (n + 1)) 
      .attr("id", (d, n) => "s-" + (i + 1) + (n + 1))
      .attr("width", rectWidth)
      .attr("height", rectHeight)
      .attr("x", (d, n) => n * rectWidth)
      .attr("y", i * rectHeight)
      .attr("fill", (d, n) => (n + 1) % 2 === 0 ? "white" : "black")
      .attr("stroke", "gray")
}

// Select slider and create listener
var slider = d3.select("#slider"),
 zones = gridRows / 4,
 shiftFrequency = 5

slider.on('input', (event, d) => {
  for (var j = 0; j < zones; j++) {
    var multiplier =  (j % 2 === 0) ? event.currentTarget.valueAsNumber : -event.currentTarget.valueAsNumber;

    for (var m = 2; m < shiftFrequency; m++) {
      var factor = ((m + (j * 4)) % 2) === 0 ? multiplier : multiplier * 1.5;
      d3.selectAll("g#full-row-" + (m + (j * 4)) + "> rect")
      .attr('transform', 'translate(' + shift * factor  + ',0)');
    }
  }
});