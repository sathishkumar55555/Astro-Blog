<!-- BarChart.svelte -->
<script>
    import { onMount } from "svelte";
    import { select, scaleLinear, scaleBand, axisBottom, axisLeft } from "d3";
  
    // Sample data
    const data = [
      { name: "Category A", value: 30 },
      { name: "Category B", value: 45 },
      { name: "Category C", value: 25 },
      { name: "Category D", value: 60 },
      { name: "Category E", value: 20 },
    ];
  
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;
  
    let svg;
  
    onMount(() => {
      // Create the SVG container
      svg = select("#chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
  
      // Create scales
      const xScale = scaleBand()
        .domain(data.map((d) => d.name))
        .range([0, width])
        .padding(0.2);
  
      const yScale = scaleLinear()
        .domain([0, Math.max(...data.map((d) => d.value))])
        .nice()
        .range([height, 0]);
  
      // Add x-axis
      svg
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height})`)
        .call(axisBottom(xScale));
  
      // Add y-axis
      svg.append("g").attr("class", "y-axis").call(axisLeft(yScale));
  
      // Create bars
      svg
        .selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d) => xScale(d.name))
        .attr("y", (d) => yScale(d.value))
        .attr("width", xScale.bandwidth())
        .attr("height", (d) => height - yScale(d.value))
        .style("fill", "steelblue")
        .on("mouseover", (event, d) => {
          // Handle mouseover event (e.g., show tooltip)
        })
        .on("mouseout", () => {
          // Handle mouseout event (e.g., hide tooltip)
        });
    });
  </script>
  
  <style>
    /* Add your chart styles here */
    .bar {
      fill: steelblue;
    }
  
    .bar:hover {
      fill: orange;
    }
  
    .x-axis path,
    .x-axis line,
    .y-axis path,
    .y-axis line {
      fill: none;
      shape-rendering: crispEdges;
    }
  
    .x-axis text {
      font-size: 14px;
    }
  
    .y-axis text {
      font-size: 14px;
    }
  </style>
  
  <div id="chart"></div>
  