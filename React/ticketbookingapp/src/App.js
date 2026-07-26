import { useState } from "react";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      <h1>Ticket Booking App</h1>

      {loggedIn ? (
        <div>
          <h2>Welcome User</h2>

          <h3>Available Flights</h3>

          <table>
            <thead>
              <tr>
                <th>Flight</th>
                <th>From</th>
                <th>To</th>
                <th>Price</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>AI101</td>
                <td>Kolkata</td>
                <td>Delhi</td>
                <td>₹6500</td>
              </tr>

              <tr>
                <td>AI202</td>
                <td>Kolkata</td>
                <td>Mumbai</td>
                <td>₹7200</td>
              </tr>
            </tbody>
          </table>

          <br />

          <button>Book Ticket</button>

          <br /><br />

          <button onClick={() => setLoggedIn(false)}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <h2>Welcome Guest</h2>

          <h3>You can browse available flights.</h3>

          <table>
            <thead>
              <tr>
                <th>Flight</th>
                <th>From</th>
                <th>To</th>
                <th>Price</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>AI101</td>
                <td>Kolkata</td>
                <td>Delhi</td>
                <td>₹6500</td>
              </tr>

              <tr>
                <td>AI202</td>
                <td>Kolkata</td>
                <td>Mumbai</td>
                <td>₹7200</td>
              </tr>
            </tbody>
          </table>

          <br />

          <button onClick={() => setLoggedIn(true)}>
            Login
          </button>
        </div>
      )}
    </div>
  );
}

export default App;