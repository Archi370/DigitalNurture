import React from 'react';
import styles from './CohortDetails.module.css';

function CohortDetails({ cohort }) {
  // Destructure safe defaults with Indian fallbacks
  const {
    cohortCode = 'CTS-IND-01',
    technology = 'Java FSD',
    startDate = 'N/A',
    status = 'Scheduled',
    coach = 'Aathma Sharma',
    trainer = 'Apoorv Banerjee',
    location = 'India'
  } = cohort || {};

  const isOngoing = status.trim().toLowerCase() === 'ongoing';

  // Strict Lab Rule Compliance: Green for Ongoing, Blue for others
  const primaryColor = isOngoing ? '#10b981' : '#2563eb'; 
  const badgeBgColor = isOngoing ? '#ecfdf5' : '#eff6ff';

  // Dynamic inline style for top border accent and <h3> header text
  const titleStyle = {
    color: primaryColor,
  };

  return (
    <div className={styles.box} style={{ color: primaryColor }}>
      {/* Dynamic Header */}
      <h3 className={styles.header} style={titleStyle}>
        <span>{cohortCode}</span>
        <span className={styles.techTag}>- {technology}</span>
      </h3>

      {/* Details Grid */}
      <dl className={styles.detailsList}>
        <dt>Started On</dt>
        <dd>{startDate}</dd>

        <dt>Current Status</dt>
        <dd>
          <span
            className={styles.statusBadge}
            style={{ backgroundColor: badgeBgColor, color: primaryColor }}
          >
            <span className={styles.statusDot}></span>
            {status}
          </span>
        </dd>

        <dt>Coach</dt>
        <dd>{coach}</dd>

        <dt>Trainer</dt>
        <dd>{trainer}</dd>

        <dt>Location</dt>
        <dd>{location}</dd>
      </dl>
    </div>
  );
}

export default CohortDetails;