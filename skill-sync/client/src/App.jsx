import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ParticleBackground from "./components/ParticleBackground";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

// Page Imports
import Roadmap from "./Pages/Roadmap";
import Learning from "./Pages/LearningModule";
import GoalsLandingPage from "./Pages/GoalsLandingPage";
import GoalsDisplay from "./Pages/GoalsDisplay";
import SkillSyncPortal from "./Pages/LoginPage";
import LoadingPage from "./Pages/Loading";

// Data Import
import roadmapData from "./output.json";
import Chatbox from "./components/ChatBox";

const App = () => {
  return (
    <Router>
      <div className="relative">
        {/* Background Animation */}
        <ParticleBackground />

        {/* Conditional Navbar */}
        <Routes>
          <Route path="/" element={<SkillSyncPortal />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route
            path="*"
            element={
              <>
                <Navbar />
                <div className="relative z-10 pt-20 min-h-screen">
                  <main className="p-4">
                    <Routes>
                      <Route path="/goals" element={<GoalsDisplay />} />
                      <Route path="/new-goals" element={<GoalsLandingPage />} />
                      <Route
                        path="/roadmap"
                        element={<Roadmap data={roadmapData} />}
                      />
                      <Route
                        path="/learning"
                        element={<Learning data={roadmapData} />}
                      />
                    </Routes>
                    <Chatbox />
                  </main>
                </div>
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
