import React, { useState, useEffect } from 'react';
import axios from './utils/axios';
import './App.css';

function App() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkHealth();
  }, []);

  const checkHealth = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/health');
      setHealth(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to connect to backend');
      console.error('Health check failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 MERN Stack Application</h1>
        <p>Week 7 - Deployment and DevOps</p>
        
        <div className="health-check">
          <h2>Backend Health Status</h2>
          {loading && <p>Checking backend...</p>}
          
          {error && (
            <div className="error">
              <p>❌ {error}</p>
              <button onClick={checkHealth}>Retry</button>
            </div>
          )}
          
          {health && !loading && (
            <div className="success">
              <p>✅ Backend is running!</p>
              <div className="health-details">
                <p><strong>Status:</strong> {health.message}</p>
                <p><strong>Uptime:</strong> {Math.floor(health.uptime / 60)} minutes</p>
                <p><strong>Timestamp:</strong> {new Date(health.timestamp).toLocaleString()}</p>
                {health.checks && (
                  <>
                    <p><strong>Database:</strong> {health.checks.database}</p>
                    <p><strong>Memory:</strong> {health.checks.memory}</p>
                  </>
                )}
              </div>
              <button onClick={checkHealth}>Refresh</button>
            </div>
          )}
        </div>

        <div className="info">
          <h3>Deployment Information</h3>
          <p>Frontend: Deployed on Vercel</p>
          <p>Backend: Deployed on Render</p>
          <p>Database: MongoDB Atlas</p>
          <p>CI/CD: GitHub Actions</p>
        </div>
      </header>
    </div>
  );
}

export default App;
