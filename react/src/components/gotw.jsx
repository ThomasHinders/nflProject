import axios from "axios";
import { useState,  useEffect } from "react";

const GOTW = () => {

    const [games, setGames] = useState([]);
    const [teams, setTeams] = useState([]);
    const [currentWeek, setCurrentWeek] = useState(null);
    const [teamRecord, setTeamRecord] = useState({});

    useEffect(() => {

        const getGame = async () => {
            const season = await axios
            .get('https://api.sportsdata.io/v3/nfl/scores/json/CurrentSeason?key=e566fb98844241f4b54a3260540ed665');
            const currentSeason = season.data;

            const week = await axios
            .get('https://api.sportsdata.io/v3/nfl/scores/json/CurrentWeek?key=e566fb98844241f4b54a3260540ed665');
            const currentWeek = week.data;
            setCurrentWeek(currentWeek);

            const matchup = await axios
            .get(`https://api.sportsdata.io/v3/nfl/scores/json/ScoresByWeek/${currentSeason}/${currentWeek}?key=e566fb98844241f4b54a3260540ed665`);
            setGames(matchup.data);

            const teams = await axios
            .get('https://api.sportsdata.io/v3/nfl/scores/json/AllTeams?key=e566fb98844241f4b54a3260540ed665');

            const teamData = {};
            teams.data.forEach((team) => {
                teamData[team.Key] = {
                    name: team.FullName,
                    logo: team.WikipediaLogoUrl,
                };
            });

            setTeams(teamData);

            const standings = await axios 
            .get(`https://api.sportsdata.io/v3/nfl/scores/json/Standings/${currentSeason}?key=e566fb98844241f4b54a3260540ed665`);

            const recordData = {};
            standings.data.forEach((team) => {
                recordData[team.Team] = `${team.Wins}-${team.Losses}-${team.Ties}`;
            });
            setTeamRecord(recordData);
            
        };
            getGame();
    }, []);
   
  return (
    <div className="container-fluid">
        <h2 className="text-center mb-5 mt-4">Jogos da Semana {currentWeek}</h2>
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Horário</th>
                    <th scope="col">Mandante</th>
                    <th scope="col">Visitante</th>
                </tr>
            </thead>
            <tbody>
            {games.map((game) => (
            <tr key={game.GameKey}>
              <td>{new Date(game.Date).toLocaleString()}</td>
              <td>
                {teams[game.HomeTeam] && (
                  <>
                    <img
                      src={teams[game.HomeTeam].logo}
                      alt={`${teams[game.HomeTeam].name} logo`}
                      style={{ width: "50px", marginRight: "10px" }}
                    />
                    {teams[game.HomeTeam].name}
                    <span style={{ fontSize: "0.75rem", marginLeft: "10px" }}>
                      ({teamRecord[game.HomeTeam]})
                    </span>
                  </>
                )}
              </td>
              <td>
                {teams[game.AwayTeam] && (
                  <>
                    <img
                      src={teams[game.AwayTeam].logo}
                      alt={`${teams[game.AwayTeam].name} logo`}
                      style={{ width: "50px", marginRight: "10px" }}
                    />
                    {teams[game.AwayTeam].name}
                    {/* Display the team's current record in small font */}
                    <span style={{ fontSize: "0.75rem", marginLeft: "10px" }}>
                      ({teamRecord[game.AwayTeam]})
                    </span>
                  </>
                )}
              </td>
            </tr>
          ))}
            </tbody>
        </table>
    </div>
  )
}

export default GOTW;