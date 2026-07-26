import ListofPlayers from "./ListofPlayers";
import IndianPlayers from "./IndianPlayers";

function App() {

  const flag = true;

  if (flag) {
    return (
      <div>
        <h1>Cricket App</h1>
        <ListofPlayers />
      </div>
    );
  } else {
    return (
      <div>
        <h1>Cricket App</h1>
        <IndianPlayers />
      </div>
    );
  }
}

export default App;