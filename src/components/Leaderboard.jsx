import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading'

import "./Leaderboard.css"

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([])
  const [loading, setLoading] = useState(
    <div>
      <ReactLoading type="bubbles" color="#000000" margin />
      <span>Waking up the database...</span>
    </div>
  )

  // compares elements in leaderboardData for total kills
  function compareKills(a, b) {
    if (a.totalKills < b.totalKills){
      return 1;
    }
    if (a.totalKills > b.totalKills){
      return -1;
    }
    return 0;
  }

  // runs on first site load
  useEffect(() => {
    axios
      .get('https://senior-assassins-backend.aletya.repl.co/students')
      .then((response) => {

        // sorts the leaderboard using compare function
        var sortedLeaderboard = response.data
        sortedLeaderboard.sort(compareKills)
        setLeaderboardData(sortedLeaderboard)
        setLoading();
        
      })
      .catch((error) => console.log(error));

    
  }, []);
 
  var count = 0;
  const leaderboardSpots = leaderboardData.map((item, key) => {
    count++;
    var itemColor = {color: "white"}
    var topColors = {color:"white", backgroundColor: "#CC120C"}
    if(item.alive === true)
      topColors = {color:"white", backgroundColor: "#2B940B"}
    return (
      <div key={key} style={topColors} className="leaderboardHeader py-2">
        <div className="lh-item">&nbsp;#{count}</div>
        <div className="lh-item">{item.alive ? item.name : <s>{item.name}</s>}</div>
        <div className="lh-item">{item.roundKills}</div>
        <div className="lh-item">{item.totalKills}</div>
        <div className="lh-item"><span style={itemColor} className="">{item.alive ? "safe": "tagged"}</span></div>
      </div>
    );
  });

  return (
    <div className="">
      <div className="container mt-4">
        <div className="leaderboardHeader">
          <div className="lh-item"><strong>Rank</strong></div>
          <div className="lh-item"><strong>Name</strong></div>
          <div className="lh-item"><strong>Round Kills</strong></div>
          <div className="lh-item"><strong>Total Kills</strong></div>
          <div className="lh-item"><strong>Status</strong></div>
        </div>
        {loading}
        {leaderboardSpots}
      </div>
    </div>
    
  );
}