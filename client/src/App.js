import './App.css';
import Channel from './components/Channel';
import Choose from './components/Choose';
import Container from "./components/Container";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/component1" element={<Container />} />
        <Route path="/component2" element={<Channel/>} />
        
      </Routes>
      <Choose />
     
    </Router>
  );
}

export default App;