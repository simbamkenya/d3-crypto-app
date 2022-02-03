import React, { useContext} from 'react';
import { CryptoContext } from '../CryptoContext'

function Chart() {
    const data = useContext(CryptoContext)
  return <div>Hey {console.log(data)}</div>;
}

export default Chart;
