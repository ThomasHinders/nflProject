import axios from "axios";
import { useState, useEffect } from "react";

const Lesoes = () => {
    const [injuries, setInjuries] = useState(null);

    useEffect(() => {
        const getInjuries = async () => {
            const season = await axios
            .get('https://api.sportsdata.io/v3/nfl/scores/json/CurrentSeason?key=e566fb98844241f4b54a3260540ed665');
            const currentSeason = season.data;

            const week = await axios
            .get('https://api.sportsdata.io/v3/nfl/scores/json/CurrentWeek?key=e566fb98844241f4b54a3260540ed665');
            const currentWeek = week.data;

            const resource = await axios
            .get(`https://api.sportsdata.io/v3/nfl/stats/json/Injuries/${currentSeason}/${currentWeek}?key=e566fb98844241f4b54a3260540ed665`);
            setInjuries(resource.data);
            console.log(resource.data)
        };

        getInjuries();
    }, []);

    return (
        <div className="container mt-5">
          <h1 className="text-center mb-4">Lesões</h1>
          {injuries ? (
            <table className="table table-striped table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th>Jogador</th>
                  <th>Time</th>
                  <th>Posição</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {injuries.map((injury, index) => (
                  <tr key={index}>
                    <td>{injury.Name}</td>
                    <td>{injury.Team}</td>
                    <td>{injury.Position}</td>
                    <td>Inativo</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Carregando...</p>
          )}
        </div>
      );
}

export default Lesoes