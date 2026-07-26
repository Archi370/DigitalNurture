// src/App.js
import React from 'react';
import Posts from './Posts';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Tech Pulse Blog</h1>
        <p>Lab 4 — Component Lifecycle Hooks & Fetch API</p>
      </header>
      <main>
        <Posts />
      </main>
    </div>
  );
}

export default App;