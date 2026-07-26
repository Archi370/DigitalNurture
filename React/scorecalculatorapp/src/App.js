import React, { useState } from 'react';
import { CalculateScore } from './Components/CalculateScore';
import './Stylesheets/mystyle.css';

function App() {
  const [student, setStudent] = useState({
    Name: "Archismita",
    School: "DNV Public School",
    total: 642,
    goal: 7
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent(prev => ({
      ...prev,
      [name]: name === 'total' || name === 'goal' ? Number(value) : value
    }));
  };

  return (
    <div className="lab-app-container">
      {/* Header Banner */}
      <header style={{ marginBottom: '30px' }}>
        <h1 style={{ margin: 0, fontSize: '2.2rem', fontWeight: 800 }}>⚡ Performance Portal</h1>
        <p style={{ color: '#94a3b8', margin: '6px 0 0 0' }}>Real-time academic evaluation module</p>
      </header>

      {/* Metrics Row */}
      <div className="stats-banner">
        <div className="stat-box">
          <div className="stat-label">Active Student</div>
          <div className="stat-value">{student.Name || 'N/A'}</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">Institution</div>
          <div className="stat-value" style={{ fontSize: '1.1rem', color: '#f87171' }}>
            {student.School || 'N/A'}
          </div>
        </div>
        <div className="stat-box">
          <div className="stat-label">Target Goal</div>
          <div className="stat-value" style={{ color: '#c084fc' }}>
            {student.goal || 0} Subjects
          </div>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="controls-panel">
        <div className="input-field">
          <label>Student Name</label>
          <input
            type="text"
            name="Name"
            value={student.Name}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label>School Name</label>
          <input
            type="text"
            name="School"
            value={student.School}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label>Total Score</label>
          <input
            type="number"
            name="total"
            value={student.total}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label>Goal Divider</label>
          <input
            type="number"
            name="goal"
            value={student.goal}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Main Card View */}
      <div className="score-card-glass">
        <CalculateScore
          Name={student.Name}
          School={student.School}
          total={student.total}
          goal={student.goal}
        />
      </div>
    </div>
  );
}

export default App;