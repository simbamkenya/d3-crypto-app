import React, { useContext, useEffect, useState, useRef } from 'react';
import {scaleLinear, scaleTime, extent, min, max, timeParse, line, curveMonotoneX, select, axisBottom, axisRight} from 'd3'
import { CryptoContext } from '../CryptoContext'

function Chart() {
      const data = useContext(CryptoContext)
      // const [data, setData] = useState([])
      const svgRef = useRef(null)

      const width =  600,
              height= 300,
              margin= { top: 30, right: 30, bottom: 30, left: 60 }

      const svgWidth = width + margin.left + margin.right;
      const svgHeight = height + margin.top + margin.bottom;

      const xAccessor = d => new Date(d.time);
      const yAccessor = d => d.close;

      useEffect(() => {
        const svg = select(svgRef.current)
          .append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          // .call(responivefy)
          .append('g')
          .attr('transform', `translate(${margin.left}, ${margin.top})`)

          //min and max value
          const xMax = min(data, xAccessor)
          const xMin = max(data, xAccessor)

          //min and max value
          const yMax = min(data, yAccessor)
          const yMin = max(data, yAccessor)


          //x scale 
          const xScale = scaleTime()
            .domain([xMin, xMin])
            .range([0, width])
            console.log(xScale.domain())
          //y scale
          const yScale = scaleLinear()
            .domain([yMin - 5, yMax])
            .range([height, 0])
            console.log(yScale.domain())

          //axes group

          svg.append('g')
            .attr('id', 'xAxis')
            .attr('transform', `translate(0, ${height})`)
            .call(axisBottom(xScale))

          svg.append('g')
            .attr('id', 'xAxis')
            .attr('transform', `translate(${width}, 0)`)
            .call(axisRight(yScale))


          const lineGenerator = line()
            .x(d => xScale(new Date(d.time)))
            .y(d => yScale(d.close))

          svg.append('path')
            .data([data])
            .style('fill', 'none')
            .attr('id', 'priceChart')
            .attr('stroke', 'blue')
            .attr('stroke-width', '1.5')
            .attr('d', lineGenerator)

        

        }, [])
        // console.log(data)

  return (
    <div className='wrapper'>
        <svg ref={svgRef}></svg>
    </div>
    );
}

export default Chart;
