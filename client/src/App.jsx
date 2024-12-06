import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router';
import Navbar from '/components/Navbar';

const HomePage = () => {
  return (
    <div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
