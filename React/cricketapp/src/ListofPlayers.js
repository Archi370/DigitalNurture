const players = [
  { name: "Virat Kohli", score: 82 },
  { name: "Rohit Sharma", score: 45 },
  { name: "Shubman Gill", score: 91 },
  { name: "KL Rahul", score: 55 },
  { name: "Hardik Pandya", score: 74 },
  { name: "Ravindra Jadeja", score: 63 },
  { name: "Rishabh Pant", score: 80 },
  { name: "Mohammed Shami", score: 20 },
  { name: "Jasprit Bumrah", score: 15 },
  { name: "Kuldeep Yadav", score: 40 },
  { name: "Mohammed Siraj", score: 18 }
];

function ListofPlayers() {
  const below70 = players.filter(player => player.score < 70);

  return (
    <div>
      <h2>All Players</h2>

      <ul>
        {players.map((player, index) => (
          <li key={index}>
            {player.name} - {player.score}
          </li>
        ))}
      </ul>

      <h2>Players with Score Below 70</h2>

      <ul>
        {below70.map((player, index) => (
          <li key={index}>
            {player.name} - {player.score}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListofPlayers;