import React, { useState, useEffect} from 'react';
import { select, csv, timeParse, scaleTime, scaleLinear  }  from 'd3';

function LineChart() {
    const url = 'https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv'
    const [data, setData] = useState()

    useEffect(() => {    
    const parseDate = timeParse("%Y-%m-%d")  

     csv(url).then(items => {
        items.forEach(d=> {
            d.date = parseDate(d.date);
            d.value = +d.value;
        })
        setData(items)
     })  
    console.log(data)

    //dimensions
    const margin = { top: 20, right: 20, bottom: 50, left: 70 },
        width = 960 - margin.left - margin.right,
        height = 640 - margin.top - margin.bottom;

    
    //appending container
     svg = d3.select('#container').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    
    
    
    }, [])
  return <div id='container'></div>;
}

export default LineChart;
