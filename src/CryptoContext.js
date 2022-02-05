import React, { useState, createContext, useContext, useEffect} from 'react';
import { timeParse, NumberValue, timeFormat } from 'd3';

export const CryptoContext = createContext()

const apiKey= '1ab2df8737a4bad216d26ab4fb9582c0e9ad899396e00fbc75244623ef1c0849';
const url = `https://min-api.cryptocompare.com/data/v2/histohour?fsym=BTC&tsym=USD&limit=10&api_key=${apiKey}`;

// const gistUrl = 'https://gist.githubusercontent.com/simbamkenya/3ae91efdcd07f3d6a1f625a9cd4808b7/raw/e90c5632c9a014d5bf494a7b08fa9426501fdaac/stockdata.json'

const fetchData = async (dataUrl) => {
   return  await fetch(dataUrl).then(res => res.json())
}



export function CryptoProvider({children}){
    const [data, setData] = useState([])
     //time parse
     const parseDate = timeFormat("%Y-%m-%d");  
    useEffect(() => {
        fetchData(url).then(d => {
            setData(d.Data.Data)
    })
    }, [data])
    // console.log(data)
   

    return (
        <CryptoContext.Provider value={data}>
            {children}
        </CryptoContext.Provider>
    )

}