import { useState } from 'react'
import { ethers } from 'ethers'
import CounterAbi from '../utils/CounterAbi.json';
import { Biconomy } from "@biconomy/mexa";
import './App.css'

const counterAddress = "0xdD1d6640788F4277a85a42CC76C1200bd1166978";

function App() {
  const [count, setCount] = useState(0);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);


  async function connectAndGetCount() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract =  new ethers.Contract(counterAddress, CounterAbi, provider)
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const walletAddress = await signer.getAddress();
      setAddress(walletAddress);
      try{
        console.log('getting data')
        const data = await contract.currentCount();
        console.log({data: data.toNumber()})
        setCount(data.toNumber())
      } catch(error) {
        console.log({error})
      }
    }
  }

  async function handleConnect() {
    await requestAccounts();
    await currentCount();
    console.log("connect handled")
  }

  return (
    <div className="App">
      <h1>Gasless Counter</h1>
      <div className="card">
        {
          address ? (
          <button onClick={() => setCount((count) => count + 1)}>
          Count is {count}
        </button>
        ):(      
        <button onClick={() => connectAndGetCount()}>
          Connect
        </button>
        )
        }
        <p>
          All counts are recorded on the Polygon Blockchain
        </p>
      </div>
      <p className="read-the-docs">
      <a href="https://docs.biconomy.io/" target="_blank">
      Click here to learn more about Biconomy and building Gasless Transactions
        </a>
      </p>
    </div>
  )
}

export default App
