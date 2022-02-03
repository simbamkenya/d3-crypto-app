import './App.css';
import { CryptoProvider } from './CryptoContext'

function App() {
  return (
    <div className="flex">
      <div className='flex-1'>
        <h1>This is a title</h1>
      </div>
      <div className='flex-1 px-4 py-2  bg-gray-100'>
        <a className='rounded-full text-2xl  font-medium text-white hover:bg-blue-800 hover:text-blue-300 float-right'>Icon</a>
      </div>
    </div>
  );
}

export default App;
