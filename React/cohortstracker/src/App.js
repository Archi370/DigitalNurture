import React from 'react';
import CohortDetails from './CohortDetails';

export const cohortsData = [
  {
    cohortCode: "INTADMDF10",
    technology: ".NET FSD",
    startDate: "22-Feb-2026",
    status: "Scheduled",
    coach: "Aathma Sharma",
    trainer: "Jojo Jose",
    location: "Bengaluru"
  },
  {
    cohortCode: "ADM21JF014",
    technology: "Java FSD",
    startDate: "10-Sep-2025",
    status: "Ongoing",
    coach: "Apoorv Banerjee",
    trainer: "Elisa Chatterjee",
    location: "Kolkata"
  },
  {
    cohortCode: "CDBJF21025",
    technology: "Java FSD",
    startDate: "24-Dec-2025",
    status: "Ongoing",
    coach: "Aathma Sharma",
    trainer: "John Deshmukh",
    location: "Hyderabad"
  },
  {
    cohortCode: "CTS2026PY01",
    technology: "Python AI/ML",
    startDate: "15-Jan-2026",
    status: "Completed",
    coach: "Rohan Verma",
    trainer: "Priyanka Sen",
    location: "Chennai"
  }
];

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px' }}>
        Cohorts Details
      </h2>
      <div>
        {cohortsData.map((cohort, index) => (
          <CohortDetails key={index} cohort={cohort} />
        ))}
      </div>
    </div>
  );
}

export default App;