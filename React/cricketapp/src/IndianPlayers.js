function IndianPlayers() {

  const players = [
    "Virat",
    "Rohit",
    "Gill",
    "Rahul",
    "Hardik",
    "Jadeja"
  ];

  const [p1, p2, p3, p4, p5, p6] = players;

  const oddTeam = [p1, p3, p5];
  const evenTeam = [p2, p4, p6];

  const T20players = [
    "Surya",
    "Tilak",
    "Arshdeep"
  ];

  const RanjiPlayers = [
    "Pujara",
    "Rahane",
    "Iyer"
  ];

  const merged = [...T20players, ...RanjiPlayers];

  return (
    <div>

      <h2>Odd Team Players</h2>

      <ul>
        {oddTeam.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ul>

      <h2>Even Team Players</h2>

      <ul>
        {evenTeam.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ul>

      <h2>Merged Players</h2>

      <ul>
        {merged.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ul>

    </div>
  );
}

export default IndianPlayers;