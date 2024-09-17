import axios from "axios";
import { useState, useEffect } from "react";

const Standings = () => {
  const [standings, setStandings] = useState(null);
  
  useEffect(() => {
  const getStandings = async () => {

    const season = await axios
    .get('https://api.sportsdata.io/v3/nfl/scores/json/CurrentSeason?key=e566fb98844241f4b54a3260540ed665');
      
      const resource = await axios
      .get(`https://api.sportsdata.io/v3/nfl/scores/json/Standings/${season.data}?key=e566fb98844241f4b54a3260540ed665`);
      setStandings(resource.data);
      console.log(resource.data)
  };

  
    getStandings();
  }, []);

  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Ranking NFL</h1>
      {standings ? (
        chunkArray(standings, 4).map((teamGroup, index) => (
          <table key={index} className="table table-striped table-bordered mb-4">
            <thead className="thead-dark">
              <tr>
                <th>Time</th>
                <th>V</th>
                <th>D</th>
                <th>E</th>
                <th>Pontos Ofensivos</th>
                <th>Pontos Contra</th>
                <th>Divisão</th>
              </tr>
            </thead>
            <tbody>
              {teamGroup.map((team, idx) => (
                <tr key={idx}>
                  <td>{team.Name}</td>
                  <td>{team.Wins}</td>
                  <td>{team.Losses}</td>
                  <td>{team.Ties}</td>
                  <td>{team.PointsFor}</td>
                  <td>{team.PointsAgainst}</td>
                  <td>{team.Division}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ))
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default Standings;