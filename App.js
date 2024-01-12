// import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Donation from './Component/Donation';
// import Donation from './Component/Donation';
import Webpage from './Webpage';
import DonorList from './Component/DonorList';

function App() {
  return (
    <div className="App">
     <Router>
        <Routes>
        <Route path="/" element={<Webpage />} />
          <Route path="/donation" element={<Donation />} />
          <Route path="/about" element={<DonorList />} />
        </Routes>
      </Router>
     
    </div>
  );
}

export default App;
