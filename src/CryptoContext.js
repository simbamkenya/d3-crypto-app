import React, { useState, createContext, useContext, useEffect} from 'react';
import { timeParse, NumberValue, timeFormat, csv } from 'd3';

export const CryptoContext = createContext()

// const apiKey= '1ab2df8737a4bad216d26ab4fb9582c0e9ad899396e00fbc75244623ef1c0849';
// const url = `https://min-api.cryptocompare.com/data/v2/histohour?fsym=BTC&tsym=USD&limit=10&api_key=${apiKey}`;

// const gistUrl = 'https://gist.githubusercontent.com/simbamkenya/3ae91efdcd07f3d6a1f625a9cd4808b7/raw/e90c5632c9a014d5bf494a7b08fa9426501fdaac/stockdata.json'


// const fetchData = async (dataUrl) => {
//    return  await fetch(dataUrl).then(res => res.json())
// }




export function CryptoProvider({children}){
   
    const [data, setData] = useState([]) 
    useEffect(() => {
        csv('BTC-USD.csv').then(dat => {   
           const cryptoData=  dat.map(item => {
                return {
                    open: +item['Open'],
                    close: +item['Close'],
                    high: +item['High'],
                    low: +item['Low'],
                    volume: +item['Volume'],
                    date: item['Date'],
                    adjvol: +item['Adj Close']
                    
                }
            })
            setData(cryptoData)
            // console.log(cryptoData[0])
        })
        
    }, [])
    
   

    return (
        <CryptoContext.Provider value={data}>
            {children}
        </CryptoContext.Provider>
    )

}