import React, { useState, useEffect} from 'react';
import { select, csv, timeParse, scaleTime, scaleLinear, max, extent, line, axisBottom, axisLeft  }  from 'd3';

function LineChart() {
    const url = 'https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv'
    const [data, setData] = useState([])

    useEffect(() => {    
    const parseDate = timeParse("%Y-%m-%d")  

     csv(url).then(items => {
        items.forEach(d=> {
            d.date = parseDate(d.date);
            d.value = +d.value;
        })
        setData(items)
        console.log(items)
     })  
    console.log('oo')

    //accessor functions 
    const xAccessor = d => d.date
    const yAccessor = d => d.value

    //dimensions
    const margin = { top: 20, right: 20, bottom: 50, left: 70 },
        width = 960 - margin.left - margin.right,
        height = 640 - margin.top - margin.bottom;

    
    //appending container
     const svg = select('#container').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    
    //x and y axis
    const xScale = scaleTime()
        .domain(extent(data, xAccessor))
        .range([0, width])

    const yScale = scaleLinear()
        .domain([0, max(data, yAccessor)])
        .range([height, 0])

        console.log(xScale.domain())
    
    svg.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(axisBottom(xScale))

    svg.append('g')
        .call(axisLeft(yScale))

    //line
    const lineGenerator = line()
        .x(d => xScale(d.date))
        .y(d => yScale(d.value))
    
    svg.append('path')
        .data([data])
        .attr('class', 'line')
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 1.5)
        .attr('d', lineGenerator)
    
    
    
    
    }, [data])
  return <div id='container'></div>;
}

export default LineChart;
