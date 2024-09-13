import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './Dashboard.css';
import GOTW from '../GOTW';
import Jogadores from '../jogadores/jogadores';

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
              <a className="nav-link text-white" href="#">Times</a>
            </li>
            <li className="nav-item mb-3">
              <a className="nav-link text-white" href="#">Colocação</a>
            </li>
            <li className="nav-item mb-3">
              <a className="nav-link text-white" href="#">Relatório de Lesões</a>
            </li>
            <li className="nav-item mb-3">
              <a className="nav-link text-white" href="#">Premiações</a>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={ <GOTW/>} />
          <Route path="/jogadores" element={ <Jogadores/>} />
        </Routes>
      </div>
    </Router>
    
  );
};

export default Dashboard;
