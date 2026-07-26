import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [rupees, setRupees] = useState("");
  const [euro, setEuro] = useState("");

  function increment() {
    setCount(count + 1);
  }

  function sayHello() {
    alert("Hello! Counter Increased");
  }

  function handleIncrement() {
    increment();
    sayHello();
  }

  function decrement() {
    setCount(count - 1);
  }

  function welcome(message) {
    alert(message);
  }

  function syntheticEvent() {
    alert("I was clicked");
  }

  function convertCurrency() {
    const result = (parseFloat(rupees) / 90).toFixed(2);

    if (!isNaN(result)) {
      setEuro(result);
    }
  }

  return (
    <div className="App">

      <h1>Event Examples App</h1>

      <h2>Counter : {count}</h2>

      <button onClick={handleIncrement}>
        Increment
      </button>

      <button onClick={decrement}>
        Decrement
      </button>

      <br /><br />

      <button
        onClick={() => welcome("Welcome to React")}
      >
        Say Welcome
      </button>

      <br /><br />

      <button onClick={syntheticEvent}>
        OnPress
      </button>

      <hr />

      <h2>Currency Converter</h2>

      <input
        type="number"
        placeholder="Enter Rupees"
        value={rupees}
        onChange={(e) => setRupees(e.target.value)}
      />

      <button onClick={convertCurrency}>
        Convert
      </button>

      <h3>Euro : {euro}</h3>

    </div>
  );
}

export default App;