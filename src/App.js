import { useEffect, useState } from "react";
import "./App.css";
import Web3 from "web3";


function App() {
  const [web3, setWeb3] = useState(null);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState();
  const [receiverAddress, setRecieverAddress] = useState("");

  useEffect(() => {
    // ensure that there is an injected the Ethereum provider
    if (window.ethereum) {
      // use the injected Ethereum provider to initialize Web3.js
      setWeb3(new Web3(window.ethereum));
    } else {
      console.log("Please install MetaMask!")
    }
  }, []);

  // get current connected wallet
  async function requestAccount() {
    if (web3 === null) {
      return;
    }

    // request accounts from MetaMask
    await window.ethereum.request({ method: "eth_requestAccounts" });

    // get list of accounts
    const allAccounts = await web3.eth.getAccounts();
    setAddress(allAccounts[0]);

    // get account balance
    const balance = await web3.eth.getBalance(allAccounts[0]);
    const ethBalance = web3.utils.fromWei(balance, "ether");
    setBalance(Math.round(ethBalance * 100) / 100);
  }

  async function sendTransaction(e) {
    e.preventDefault();

    if (web3 === null) return;

    // validate if receiver address is valid
    if (!web3.utils.isAddress(receiverAddress)) {
      alert("Invalid receiver address");
      return;
    }

    // send transaction
    try {
      await web3.eth.sendTransaction({
        from: address,
        to: receiverAddress,
        value: web3.utils.toWei("0.0001", "ether"),
      });
    } catch (err) {
      console.error("Error", err.message);
    }


  }

  return (
    <div>
      <nav className="navbar">
        <h1 className="navbar-brand">GPT Token (GPT)</h1>
        <div id="navbarMenu" className="navbar-menu">
          <div>
            <button className="button button-secondary" disabled={!!address} onClick={requestAccount}>
              <span className="is-link has-text-weight-bold">
                {address
                  ? `${address.substring(0, 6)}...${address.substring(38)} | Balance: ${balance} ETH`
                  : "Connect Wallet"}
              </span>
            </button>
          </div>
        </div>
      </nav>
      <section className="hero">
        <h1 className="title">Faucet</h1>
        <p className="subtitle">Fast and reliable. 50 GPT/day.</p>
        <div className="box">
          <form onSubmit={sendTransaction} className="columns">
            <input
              className="input"
              type="text"
              placeholder="Enter your wallet address (0x...)"
              onChange={(e) => setRecieverAddress(e.target.value)}
              value={receiverAddress}
            />
            <button disabled={receiverAddress === ""} className="button button-primary">Send TOKENS</button>
          </form>
          <article className="panel">
            <p className="panel-heading">Transaction Data</p>
            <div className="panel-block">
              <p>transaction data</p>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}

export default App;
