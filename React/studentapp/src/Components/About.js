import React, { Component } from 'react';

export class About extends Component {
  render() {
    return (
      <div className="panel">
        <div className="panel-header">
          <h2>ℹ️ Welcome to the About Page of Student Management Portal</h2>
        </div>
        <p style={{ color: '#94a3b8', lineHeight: '1.7', fontSize: '1rem' }}>
          This portal provides complete administrative control over student profiles, enrollment tracking,
          academic evaluations, and department analytics in real-time. Built on React component architecture,
          it provides modular UI views and quick query capabilities.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '25px' }}>
          <div style={{ background: '#0f172a', padding: '20px', borderRadius: '12px' }}>
            <h3 style={{ color: '#38bdf8', marginTop: 0 }}>🎯 Mission</h3>
            <p style={{ color: '#64748b', margin: 0, fontSize: '0.9rem' }}>
              Streamline academic administration and streamline student management workflows.
            </p>
          </div>
          <div style={{ background: '#0f172a', padding: '20px', borderRadius: '12px' }}>
            <h3 style={{ color: '#34d399', marginTop: 0 }}>⚡ System Specs</h3>
            <p style={{ color: '#64748b', margin: 0, fontSize: '0.9rem' }}>
              React 18 Engine • Dynamic State Routing • Modular CSS Theme
            </p>
          </div>
        </div>
      </div>
    );
  }
}