import React, { useState } from 'react';
import './App.css';
import { Home } from './Components/Home';
import { About } from './Components/About';
import { Contact } from './Components/Contact';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="portal-wrapper">
      {/* Dynamic Header */}
      <header className="portal-header">
        <div className="brand">
          <span className="brand-icon">🎓</span>
          <div>
            <h1>Student Portal</h1>
          </div>
        </div>

        {/* Dynamic Navigation */}
        <nav className="nav-tabs">
          <button
            className={`nav-btn ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            Home
          </button>
          <button
            className={`nav-btn ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            About
          </button>
          <button
            className={`nav-btn ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            Contact
          </button>
        </nav>
      </header>

      {/* Analytics Counter Row */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon stat-1">👥</div>
          <div className="stat-info">
            <h4>Total Enrolled</h4>
            <h2>1,248</h2>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon stat-2">📚</div>
          <div className="stat-info">
            <h4>Active Courses</h4>
            <h2>32</h2>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon stat-3">⚡</div>
          <div className="stat-info">
            <h4>Attendance Rate</h4>
            <h2>94.2%</h2>
          </div>
        </div>
      </div>

      {/* Dynamic View Switcher */}
      <main className="content-area">
        {activeTab === 'home' && <Home />}
        {activeTab === 'about' && <About />}
        {activeTab === 'contact' && <Contact />}
      </main>
    </div>
  );
}

export default App;