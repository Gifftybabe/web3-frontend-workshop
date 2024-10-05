import { useState, useEffect } from 'react';
import { ethers } from "ethers";

import './App.css';

function App() {
  const [greet, setGreet] = useState('')
  const [balance, setBalance] = useState()
  const [greetingValue, setGreetingValue] = useState('')
  const [depositValue, setDepositValue] = useState('')

// connect to metamask re-adjusted code:
const [signer, setSigner] = useState(null);
const [provider, setProvider] = useState(null);
const [error, setError] = useState(null);
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

useEffect(() => {
  const initProvider = async () => {
    try {
      if (window.ethereum == null) {
        console.log("MetaMask not installed; using read-only defaults");
        const defaultProvider = ethers.getDefaultProvider();
        setProvider(defaultProvider);
      } else {
        const browserProvider = new ethers.BrowserProvider(window.ethereum);

        // Check if MetaMask is already requesting permission
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length === 0) {
          console.log('No accounts found, requesting access...');
          await window.ethereum.request({ method: 'eth_requestAccounts' });
        }

        const signerInstance = await browserProvider.getSigner();
        setProvider(browserProvider);
        setSigner(signerInstance);
      }

      // Get the current balance of the contract address
      const balance = await provider.getBalance(contractAddress);

      // Format the balance from wei to ether
      const balanceFormatted = ethers.formatEther(balance);
      setBalance(balanceFormatted);

    } catch (err) {
      setError(err);
      console.error('Error initializing provider:', err);
    }
  };

  initProvider(); // Call the async function
}, []);


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
       <h3>Gifftybabe</h3>
        <p>Contract Balance: {balance}</p>
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
