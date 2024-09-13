import axios from "axios"
import { useState} from "react" 

const Jogadores = () => {

    const [player, setPlayer] = useState([]);
    const [search, setSearch] = useState("");

    const handleSearch = async () => {
        const response = await axios.get('https://api.sportsdata.io/v3/nfl/scores/json/PlayersByAvailable?key=e566fb98844241f4b54a3260540ed665', {
            headers: { 'Ocp-Apim-Subscription-Key': 'e566fb98844241f4b54a3260540ed665'}
        });
        

        const findPlayer = response.data.find(p => 
            p.Name.toLowerCase() === search.toLowerCase()
        );

        if (findPlayer) {
            setPlayer(findPlayer);
        } else {
            setPlayer(null);
        }

    }

  return (
    <div>
        <h1>Buscar Jogador</h1>
      <input
        type="text"
        placeholder="Digite o nome do jogador"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>

      {player && (
        <div>
          <h2>{player.Name}</h2>
          <p>Time: {player.Team}</p>
          <p>Posição: {player.Position}</p>
        </div>
      )}
    </div>
  )
}

export default Jogadores;