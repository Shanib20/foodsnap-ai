import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import FoodAnalysis from './pages/FoodAnalysis.jsx';
import DietPlan from './pages/DietPlan.jsx';
import About from './pages/About.jsx';
import FoodSearch from './pages/FoodSearch.jsx';
import HealthCheck from './Healthcheck.jsx';

import './App.css';
import './index.css';

function App() {
  return (
    <Router>
      <Header />
      <main> {/* Removed container mx-auto here */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analyze" element={<FoodAnalysis />} />
          <Route path="/search" element={<FoodSearch />} />
          <Route path="/diet-plan" element={<DietPlan />} />
          <Route path="/health-check" element={<HealthCheck />}/>
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;