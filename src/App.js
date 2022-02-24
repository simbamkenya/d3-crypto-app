import './App.css';
import React, { useState } from 'react'
import Chart from './components/Chart';
import LineChart from './components/LineChart';


function App() {
  const intialvalue = {
    "open": 55887.335938,
    "close": 56099.519531,
    "high": 57505.226563,
    "low": 54626.558594,
    "volume": 68145460026,
    "date": "2021-02-20",
    "adjvol": 56099.519531
}
  const [candle, setCandle] = useState(intialvalue)
  return (
    <div className='antialiased'>
      <main className='bg-gray-100 h-screen w-full overflow-y-auto'>
        <section>
          <header className='border-b border-gray-300 border-solid bg-gray-800'>
            <h2 className='p-6 text-white text-center text-3xl'>OHLC CHART- BTC/USD</h2>
          </header>
          <section className='m-4 bg-white border border-gray-300 border-solid rounded shadow'>
              <header className='border-b border-solid border-gray-300 p-4 text-lg text-center uppercase font-medium'>TRADING CHART</header>
             
              <section className='flex flex-row flex-wrap items-center text-center border-b border-solid border-gray-300'>
                
                <div className='p-4 w-full sm:w-1/2 lg:w-1/4 border-b border-solid bg-gray-800 sm:border-r md:border-b-0 rounded mt-1'>
                  <span className='text-lg font-medium text-white uppercase'>High Price</span>
                  <div className='py-4 flex items-center justify-center text-center'>
                    <span className='text-3xl text-white'>{candle.high ? candle.high.toFixed(2) : 'not defined'}</span>
                    {/* <span className='inline-flex items-center bg-green-500 h-6 px-2 rounded text-white text-xs'>+12.0%</span> */}
                  </div>
                </div>

                <div className='p-4 w-full sm:w-1/2 lg:w-1/4 border-b border-solid bg-gray-800 sm:border-r md:border-b-0 rounded mt-1'>
                  <span className='text-lg font-medium text-white uppercase'>Low Price</span>
                  <div className='py-4 flex items-center justify-center text-center'>
                    <span className='text-3xl text-white'>{candle.low ? candle.low.toFixed(2) : ''}</span>
                    {/* <span className='inline-flex items-center bg-green-500 h-6 px-2 rounded text-white text-xs'>+12.0%</span> */}
                  </div>
                </div>

                <div className='p-4 w-full sm:w-1/2 lg:w-1/4 border-b border-solid bg-gray-800 sm:border-r md:border-b-0 rounded mt-1'>
                  <span className='text-lg font-medium text-white uppercase'>Open Price</span>
                  <div className='py-4 flex items-center justify-center text-center'>
                    <span className='text-3xl text-white'>{candle.open ? candle.open.toFixed(2) : 'not defined'}</span>
                    {/* <span className='inline-flex items-center bg-green-500 h-6 px-2 rounded text-white text-xs'>+12.0%</span> */}
                  </div>
                </div>

                <div className='p-4 w-full sm:w-1/2 lg:w-1/4 border-b border-solid bg-gray-800 md:border-b-0 sm:border-r rounded mt-1'>
                    <span className='text-lg font-medium text-white uppercase'>Close Price</span>
                    <div className='p-4 flex items-center justify-center text-center'>
                      <span className='mr-4 text-3xl text-white'>{candle.close ? candle.close.toFixed(2) : 'not defined'}</span>
                      {/* <span className='inline-flex items-center bg-red-500 h-6 px-2 rounded text-white text-xs'>-12</span> */}
                    </div>
                  </div>
              </section>
              <section className='bg-gray-800 pt-8'>
                <LineChart setCandle={setCandle} candle={candle}/>
              </section>
              <div>
                {console.log(candle.high)}
              </div>
          </section>
        </section>
      </main>
    </div>
  );
}

export default App;
