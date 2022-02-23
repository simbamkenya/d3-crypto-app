import './App.css';
import Chart from './components/Chart';
import LineChart from './components/LineChart';


function App() {
  return (
    <div className='antialiased'>
      <main className='bg-gray-100 h-screen w-full overflow-y-auto'>
        <section>
          <header className='border-b border-gray-300 border-solid bg-white'>
            <h2 className='p-6'>Peformance</h2>
          </header>
          <section className='m-4 bg-white border border-gray-300 border-solid rounded shadow'>
              <header className='border-b border-solid border-gray-300 p-4 text-lg font-medium'>Buliding overview</header>
             
              <section className='flex flex-row flex-wrap items-center text-center border-b border-solid border-gray-300'>
                
                <div className='p-4 w-full sm:w-1/2 lg:w-1/4 border-b border-solid bg-gray-300 sm:border-r md:border-b-0'>
                  <span className='text-xs font-medium text-gray-500 uppercase'>Total Revenue</span>
                  <div className='py-4 flex items-center justify-center text-center'>
                    <span className='text-3xl'>$487,000</span>
                    <span className='inline-flex items-center bg-green-500 h-6 px-2 rounded text-white text-xs'>+12.0%</span>
                  </div>
                </div>

                <div className='p-4 w-full sm:w-1/2 lg:w-1/4 border-b border-solid bg-gray-300 sm:border-r md:border-b-0'>
                  <span className='text-xs font-medium text-gray-500 uppercase'>Total Revenue</span>
                  <div className='py-4 flex items-center justify-center text-center'>
                    <span className='text-3xl'>$487,000</span>
                    <span className='inline-flex items-center bg-green-500 h-6 px-2 rounded text-white text-xs'>+12.0%</span>
                  </div>
                </div>

                <div className='p-4 w-full sm:w-1/2 lg:w-1/4 border-b border-solid bg-gray-300 sm:border-r md:border-b-0'>
                  <span className='text-xs font-medium text-gray-500 uppercase'>Total Revenue</span>
                  <div className='py-4 flex items-center justify-center text-center'>
                    <span className='text-3xl'>$487,000</span>
                    <span className='inline-flex items-center bg-green-500 h-6 px-2 rounded text-white text-xs'>+12.0%</span>
                  </div>
                </div>

                <div className='p-4 w-full sm:w-1/2 lg:w-1/4 border-b border-solid bg-gray-300 md:border-b-0 sm:border-r'>
                    <span className='text-xs font-medium to-gray-500 uppercase'>Predictied monthly revenue</span>
                    <div className='p-4 flex items-center justify-center text-center'>
                      <span className='mr-4 text-3xl'>152</span>
                      <span className='inline-flex items-center bg-red-500 h-6 px-2 rounded text-white text-xs'>-12</span>
                    </div>
                  </div>
              </section>
              <section className='bg-gray-800 pt-8'>
                <LineChart />
              </section>
              <div>
    
              </div>
          </section>
        </section>
      </main>
    </div>
  );
}

export default App;
