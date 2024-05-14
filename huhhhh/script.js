const data = [
    { name: 'Abortion', value: 100 },
    { name: 'Accessibility', value: 80 },
    { name: 'Accessibility', value: 280 },
    { name: 'Accessibility', value: 80 },
    { name: 'Accessibility', value: 80 },
    { name: 'Accessibility', value: 80 },
    { name: 'Accessibility', value: 80 },
    { name: 'Accessibility', value: 80 },
    { name: 'Accessibility', value: 80 },
    { name: 'Accessibility', value: 6080 },
    { name: 'Accessibility', value: 80 },
    { name: 'Accessibility', value: 80 },
  
  ];

  // Define color scale for categories
  const colorScale = d3.scaleOrdinal()
    .domain(data.map(d => d.name))
    .range(d3.schemeCategory10); // You can use a different color scheme if needed

  // Create treemap layout
  const treemap = d3.treemap()
    .size([window.innerWidth, window.innerHeight]) // Adjust to fit the screen size
    .padding(1);

  // Create SVG element for treemap
  const svg = d3.select('#treemap-container')
    .append('svg')
    .attr('width', '100vw')
    .attr('height', '100vh');

  // Convert data to hierarchical format
  const root = d3.hierarchy({ children: data })
    .sum(d => d.value);

  // Generate treemap layout
  treemap(root);

  // Append rectangles for each category
  svg.selectAll('rect')
    .data(root.leaves())
    .enter()
    .append('rect')
    .attr('x', d => d.x0)
    .attr('y', d => d.y0)
    .attr('width', d => d.x1 - d.x0)
    .attr('height', d => d.y1 - d.y0)
    .attr('fill', d => colorScale(d.data.name));

  // Add text labels
  svg.selectAll('text')
    .data(root.leaves())
    .enter()
    .append('text')
    .attr('x', d => (d.x0 + d.x1) / 2)
    .attr('y', d => (d.y0 + d.y1) / 2)
    .attr('dy', '0.35em')
    .attr('text-anchor', 'middle')
    .text(d => d.data.name);