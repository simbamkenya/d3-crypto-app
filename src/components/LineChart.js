import React, { useState, useEffect, useRef, useContext } from 'react';
import { CryptoContext } from '../CryptoContext';
import { select, csv, area, curveCardinal, curveMonotoneX, timeParse, scaleTime, scaleLinear, max, min, extent, line, axisBottom, axisLeft, axisTop, axisRight  }  from 'd3';

function LineChart() {
    // const url = 'https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv'
    const data = useContext(CryptoContext)
    const svgRef = useRef(null) 
    console.log(data[0])

    useEffect(() => {    
    const parseDate = timeParse("%Y-%m-%d") 
    
     

    //accessor functions 
    const xAccessor = d => parseDate(d.date)

    const openAccessor = d => d.open
    const closeAccessor = d => d.close
    const highAccessor = d => d.high
    const lowAccessor = d => d.low

    const yAccessor = d => d.open

    

    //dimensions
    const margin = { top: 20, right: 20, bottom: 50, left: 70 },
        width = 960 - margin.left - margin.right,
        height = 640 - margin.top - margin.bottom;

    
    //appending container
     const svg = select(svgRef.current)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    
    //x and y axis
    const xScale = scaleTime()
        .domain(extent(data, xAccessor))
        .range([0, width])

        console.log(xScale.domain())

    const yScale = scaleLinear()
        .domain([min(data, openAccessor) - 5000, max(data, closeAccessor) + 5000])
        .range([height, 0])

        // console.log(xScale.domain())
    
    svg.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(axisBottom(xScale))

    svg.append('g')
        .call(axisLeft(yScale))

    svg.append('g')
        .call(axisTop(xScale))

    svg.append('g')
        .attr('transform', `translate(${width}, 0)`)
        .call(axisRight(yScale))

    //line
    const lineGenerator = line()
        .x(d => xScale(parseDate(d.date)))
        .y(d => yScale(d.open))

   
       
    
    svg.append('path')
        .data([data])
        .attr('class', 'line')
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 1.5)
        .attr('d', lineGenerator)

    //  const areaGen =  area()
    //     .x((d) => xScale(d.date))
    //     .y0(yScale(min(data, yAccessor)))
    //     .y1((d) => yScale(d.open))

    // svg.append('path')
    //     .datum(data)
    //     .attr("d", areaGen)
    //     .attr("fill", "green")
    
    
    
    
    }, [data])
  return (
    <svg ref={svgRef} viewBox="0 0 800 800" id='container'></svg>
  );
}

export default LineChart;
