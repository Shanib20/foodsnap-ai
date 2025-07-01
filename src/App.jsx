import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your actual designed components
import Home from './pages/Home.jsx'; // Make sure this path is correct
import Header from './components/Header.jsx'; // Make sure this path is correct
import Footer from './components/Footer.jsx'; // Make sure this path is correct
import FoodAnalysis from './pages/FoodAnalysis.jsx'; // Assuming FoodAnalysis.jsx is in the src/ folder
import DietPlan from './pages/DietPlan.jsx';     // Assuming DietPlan.jsx is in the src/ folder
import About from './pages/About.jsx';         // Assuming About.jsx is in the src/ folder
import FoodSearch from './pages/FoodSearch.jsx';
import HealthCheck from './Healthcheck.jsx';
// import FoodSearch from './FoodSearch.jsx'; // Uncomment this line once you provide the full FoodSearch.jsx code

import './App.css';
import './index.css';

function App() {
  return (
    <Router>
      <Header />
      <main className="container mx-auto"> {/* Added mx-auto for horizontal centering */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analyze" element={<FoodAnalysis />} /> {/* Use the imported FoodAnalysis component */}
          <Route path="/search" element={<FoodSearch />} /> */
          <Route path="/diet-plan" element={<DietPlan />} />     {/* Use the imported DietPlan component */}
          <Route path="/health-check" element={<HealthCheck />}/>
          <Route path="/about" element={<About />} />           {/* Use the imported About component */}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

// You no longer need the placeholder component definitions here,
// as you're importing them from their respective files.
// const FoodAnalysisSection = () => { ... };
// const FoodSearchSection = () => { ... };
// const DietRecommendationSection = () => { ... };
// const InfoSection = () => { ... };