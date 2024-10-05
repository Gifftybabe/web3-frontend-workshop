import { useState, useEffect } from 'react';
import { ethers } from "ethers";

import './App.css';

function App() {
  const [greet, setGreet] = useState('')
  const [greetingValue, setGreetingValue] = useState('')
  const [depositValue, setDepositValue] = useState('')


  const handleDepositChange = (e) => {
    setDepositValue(e.target.value)
  }

  const handleGreetingChange = (e) => {
    setGreetingValue(e.target.value)
  }

  const handleDepositSubmit = (e) => {
    e.preventDefault()
    console.log(depositValue);
    
  }

  const handleGreetingSubmit = (e) => {
    e.preventDefault()
    console.log(greetingValue);
    
  }

  return (
    <div className="container">
  <div className="container text-center">
  <div className="row mt-5">
    <div className="col">
       <h3>Greeting</h3>
        <p>Contract Balance: 0</p>
    </div>
    <div className="col">
      <form onSubmit={handleDepositSubmit}>
      <div className="mb-3">
        <input type="number" className="form-control" placeholder="0" onChange={handleDepositChange} value={depositValue}/>
        <button type="submit" className="btn btn-success mt-2">Deposit</button>

      </div>
    </form>

    <form className="mt-5" onSubmit={handleGreetingSubmit}>
      <div className="mb-3">
        <input type="text" className="form-control" onChange={handleGreetingChange} value={greetingValue}/>
        <button type="submit" className="btn btn-dark mt-2">Change</button>

      </div>
    </form>
   
    </div>
   
  </div>
</div>
</div>
  );
}

export default App;
