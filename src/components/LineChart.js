import React, { useState, useEffect, useRef, useContext } from 'react';
import { CryptoContext } from '../CryptoContext';
import { select, bisector, csv, area, curveCardinal, curveMonotoneX, timeParse, scaleTime, scaleLinear, max, min, extent, line, axisBottom, axisLeft, axisTop, axisRight  }  from 'd3';

function LineChart({setCandle, candle}) {
   
    const data = useContext(CryptoContext)
    const svgRef = useRef(null)
    const container = useRef(null)
   

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
    const margin = { top: 30, right: 20, bottom: 50, left: 30 },
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

        // console.log(xScale.domain())

    const yScale = scaleLinear()
        .domain([min(data, openAccessor) - 5000, max(data, closeAccessor) + 5000])
        .range([height, 0])

        // console.log(xScale.domain())

        //volume bars series
    const volData = data.filter(d => d['volume'] !== null && d['volume']   !== 0)

    const yMinVol = min(volData, d => Math.min(d['volume']))
    const yMaxVol = max(volData, d => Math.max(d['volume']))

    const yVolScale = scaleLinear()
        .domain([yMinVol, yMaxVol])
        .range([height, 0])

    // console.log(yVolScale.range())

    svg.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(axisBottom(xScale))
        .attr('stroke', 'white').style("font-size",'0.875rem')
        .attr('class', 'xAxis')
        .attr('class', 'font-monts')

    svg.append('g')
    
        .call(axisLeft(yScale)).attr('stroke', 'white').style("font-size",'0.875rem')
        .attr('class', 'yAxis')
        .attr('class', 'font-monts')


    svg.append('g')
        .call(axisTop(xScale)).attr('stroke', 'white').style("font-size",'0.875rem')
        .attr('class', 'xAxis')
        .attr('class', 'font-monts')

    svg.append('g')
        .attr('transform', `translate(${width}, 0)`)
        .call(axisRight(yScale)).attr('stroke', 'white').style("font-size",'0.875rem')
        .attr('class', 'yAxis')
        .attr('class', 'font-monts')

    //line
    const lineGenerator = line()
        .x(d => xScale(parseDate(d.date)))
        .y(d => yScale(d.open))

        svg
        .append('rect')
        .attr('class', 'overlay')
        .attr('width', width)
        .attr('height', height)
        .on('mouseover', () => focus.style('display', null))
        .on('mouseout', () => focus.style('display', 'none'))

        .on('mousemove', (e)=>{
            const bisectDate = bisector(d => parseDate(d.date)).left;

            //returns corresponding value from the domain
            const correspondingDate = xScale.invert(e.pageX);
            //gets insertion point
            const i = bisectDate(data, correspondingDate, 1);
            const d0 = data[i - 1];
            const d1 = data[i];
            const currentPoint = correspondingDate - parseDate(d0['date']) > parseDate(d1['date']) - correspondingDate ? d1 : d0;
            // console.log(d0, d1)
            // console.log('o', correspondingDate)
            setCandle(currentPoint)
            

            focus.select('.yLine')          
            .attr('x1', xScale(parseDate(currentPoint['date'])))
            .attr('x2', xScale(parseDate(currentPoint['date'])))

            focus.select('.xLine')
            .attr('y1', yScale(currentPoint['close']))
            .attr('y2', yScale(currentPoint['close']))                      

        })

        svg.selectAll("rect")
           .data(data)
           .enter().append("rect")
           .attr("x", d =>  xScale(parseDate(d.date)))
               .attr("y", d=>  yScale(max([d.open, d.close])))
           .attr("height", d =>  yScale(min([d.open, d.close]))-yScale(max([d.open, d.close])))
           .attr("width", d=>  0.5 * (width - 2*margin.left)/data.length)
               .attr("fill", d=>  d.open > d.close ? "red" : "green");

        svg.selectAll("line.stem")
            .data(data)
            .enter().append("line")
            .attr("class", "stem")
            .attr("x1", d =>  xScale(parseDate(d.date)) + 0.25 * (width - 2 * margin.left)/ data.length)
            .attr("x2", d => xScale(parseDate(d.date)) + 0.25 * (width - 2 * margin.left)/ data.length)
            .attr("y1", d => yScale(d.high))
            .attr("y2", d => yScale(d.low))
            .attr("stroke", d => d.open > d.close ? "red" : "green")

        const focus = svg
            .append('g')
            .attr('class', 'focus')
            .style('display', 'none')
            

          focus.append('circle').attr('r', 4.5).style('fill', 'white');


          focus.append('line')
            .attr("x1", 0)
            .attr("x2", width)
            .attr("class", "xLine")
            .style("stroke-width", 2)
            .style("stroke", "white")
            .style("stroke-dasharray", 4)
            .style("fill", "none")
        //   .classed('x', true);

          focus.append('line')
            .attr("y1", 0)
            .attr("y2", height)
            .attr("class", "yLine")
            .style("stroke-width", 2)
            .style("stroke", "white")
            .style("stroke-dasharray", 4)
            .style("fill", "none")
            
          //   .classed('y', true);

          select('.overlay').style('fill', 'none');
          select('.overlay').style('pointer-events', 'all');

        

        svg.selectAll()
        .data(volData)
        .enter()
        .append('rect')
        .attr('x', d => xScale(parseDate(d.date)))
        .attr('y', d => yVolScale(d.volume))
        .attr('height', d => height - yVolScale(d.volume))
        .attr('width', 10).style('fill', 'gray')


    }, [data])
  return (
      <div className='relative' ref={container}>
          <div className='absolute h-auto w-24 bg-gray-700 text-white text-lg flex flex-col p-2 ml-1 rounded' id='tooltip'>
              <span className='flex'>Open: {candle.open.toFixed(2)}</span>
              <span>Close: {candle.close.toFixed(2)}</span>
              <span>High: {candle.high.toFixed(2)}</span>
              <span>Low: {candle.low.toFixed(2)}</span>
            </div>
          <svg ref={svgRef} viewBox="0 0 800 800" id='container'></svg>
      </div>
    
  );
}

export default LineChart;
