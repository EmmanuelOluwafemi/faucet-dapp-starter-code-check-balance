import "./App.css";

function App() {
  return (
    <div>
      <nav className="navbar">
        <h1 className="navbar-brand">GPT Token (GPT)</h1>
        <div id="navbarMenu" className="navbar-menu">
          <div>
            <button className="button button-secondary">
              <span className="is-link has-text-weight-bold">
                Connect Wallet
              </span>
            </button>
          </div>
        </div>
      </nav>
      <section className="hero">
        <h1 className="title">Faucet</h1>
        <p className="subtitle">Fast and reliable. 50 GPT/day.</p>
        <div className="box">
          <div className="columns">
            <input
              className="input"
              type="text"
              placeholder="Enter your wallet address (0x...)"
            />
            <button className="button button-primary">GET TOKENS</button>
          </div>
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
