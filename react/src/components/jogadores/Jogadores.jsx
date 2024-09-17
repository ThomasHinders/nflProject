import axios from "axios"
import {useState} from "react" 

const Jogadores = () => {

    const [search, setSearch] = useState("");
    const [players, setPlayers] = useState(null);
    const [teamInfo, setTeamInfo] = useState(null);

    const handleSearch = async () => {  
      
      const response = await axios.get(`https://api.sportsdata.io/v3/nfl/scores/json/AllTeams?key=e566fb98844241f4b54a3260540ed665`);
      const teams = response.data;

      const findTeam = teams.find((team) => 
        team.Name.toLowerCase() === search.toLowerCase());
  
        if (findTeam) {
          setTeamInfo({
            name: findTeam.Name,
            logo: findTeam.WikipediaLogoUrl,
          });
        }
        const season = await axios
        .get('https://api.sportsdata.io/v3/nfl/scores/json/CurrentSeason?key=e566fb98844241f4b54a3260540ed665');

      const playerStats = await axios
      .get(`https://api.sportsdata.io/v3/nfl/stats/json/PlayerSeasonStatsByTeam/${season.data}/${findTeam.Key}?key=e566fb98844241f4b54a3260540ed665`);
      setPlayers(playerStats.data)
      console.log(playerStats.data)
      
    };


    return (
      <div className="container mt-5">
        <h1 className="text-center mb-4">Buscar Jogadores do Time</h1>
        <div className="form-group">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Digite o nome do jogador"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            Buscar
          </button>
        </div>
  
        {teamInfo && (
          <div className="mt-4">
          <p>
            <strong>Time:</strong> {teamInfo.name} <br />
            <img src={teamInfo.logo} alt={teamInfo.name} style={{ width: "100px" }} />
          </p>
        </div>
        )}
  
        {players && players.length > 0 && (
              <table className="table table-striped table-bordered mt-4">
                <thead className="thead-dark">
                  <tr>
                    <th>Nome</th>
                    <th>Posição</th>
                    <th>Número</th>
                    <th>Jogos</th>
                    <th>TDs</th>
                  </tr>
                </thead>
                <tbody>
                  {players.map((player, index) => (
                    <tr key={index}>
                      <td>{player.Name}</td>
                      <td>{player.Position}</td>
                      <td>{player.Number}</td>
                      <td>{player.Played}</td>
                      <td>{player.Touchdowns}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
      </div>
    );
}

export default Jogadores;