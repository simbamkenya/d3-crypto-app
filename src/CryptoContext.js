import React, { useState, createContext, useContext, useEffect} from 'react';

export const CryptoContext = createContext()

const apiKey= '1ab2df8737a4bad216d26ab4fb9582c0e9ad899396e00fbc75244623ef1c0849';
const url = `https://min-api.cryptocompare.com/data/v2/histohour?fsym=BTC&tsym=USD&limit=10&api_key=${apiKey}`;

const fetchData = async (dataUrl) => {
   return  await fetch(dataUrl).then(res => res.json())
}



export function CryptoProvider({children}){
    const [data, setData] = useState()
    useEffect(() => {
        fetchData(url).then(data => setData(data))
    }, [])
    console.log(data)

    return (
        <CryptoContext.Provider value={data}>
            {children}
        </CryptoContext.Provider>
    )

}