import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './Dashboard.css';
import Gotw from '../GOTW';
import Jogadores from '../jogadores/jogadores';
import Standings from '../standings/standings';
import Lesoes from '../lesoes/lesoes';


const Dashboard = () => {
  return (
    <Router>
      <div className="d-flex">
        <nav className="bg-primary text-white p-3">
          <div className="text-center mb-4">
            <h2>NFL Stats</h2>
          </div>
          <ul className="nav flex-column">
            <li className="nav-item mb-3">
              <a className="nav-link text-white" href="/">Home</a>
            </li>
            <li className="nav-item mb-3">
              <a className="nav-link text-white" href="/jogadores">Jogadores</a>
            </li>
            <li className="nav-item mb-3">
              <a className="nav-link text-white" href="/standings">Rankings</a>
            </li>
            <li className="nav-item mb-3">
              <a className="nav-link text-white" href="/lesoes">Relatório de Lesões</a>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={ <Gotw/>} />
          <Route path="/jogadores" element={ <Jogadores/>} />
          <Route path="/standings" element={ <Standings/>} />
          <Route path="/lesoes" element={ <Lesoes/>} />
        </Routes>
      </div>
    </Router>
    
  );
};

export default Dashboard;
