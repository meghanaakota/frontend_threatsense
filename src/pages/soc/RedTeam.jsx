import React, { useState } from 'react';
import { useSOC } from '../../context/SOCContext';
import './RedTeam.css';

const RedTeam = () => {
  const { simulateAttack, simulationInProgress, alerts } = useSOC();
  const [beforeRisk, setBeforeRisk] = useState(12);
  const [afterRisk, setAfterRisk] = useState(12);
  const [triggeredSignals, setTriggeredSignals] = useState([]);

  const simulations = [
    { id: 'abnormal-login', label: 'Simulate Abnormal Login', signals: ['Temporal'] },
    { id: 'volume-spike', label: 'Simulate Volume Spike', signals: ['Volume'] },
    { id: 'file-transition', label: 'Simulate Suspicious File Transition', signals: ['Sequential'] },
    { id: 'privilege-escalation', label: 'Simulate Privilege Escalation', signals: ['Temporal', 'Volume', 'Sequential'] }
  ];

  const handleSimulation = async (sim) => {
    const newRisk = Math.floor(Math.random() * 30) + 70;
    setAfterRisk(newRisk);
    setTriggeredSignals(sim.signals);
    await simulateAttack(sim.id);
  };

  const recentFindings = alerts.slice(0, 3).map(alert => ({
    title: alert.attackType || 'Behavioral Anomaly',
    severity: alert.risk,
    time: alert.timestamp
  }));

  return (
    <div className="soc-page">
      <h1 className="page-title">Red Team – Attack Simulation</h1>

      <div className="red-grid">
        <div className="panel">
          <h2 className="panel-title">Simulation Controls</h2>
          <div className="sim-buttons">
            {simulations.map(sim => (
              <button key={sim.id} className="sim-btn" onClick={() => handleSimulation(sim)} disabled={simulationInProgress}>
                {sim.label}
              </button>
            ))}
          </div>
        </div>

        <div className="panel">
          <h2 className="panel-title">Live Risk Response</h2>
          <div className="risk-comparison">
            <div className="risk-box">
              <span className="risk-label">Before</span>
              <span className="risk-value before">{beforeRisk}%</span>
            </div>
            <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
              <path d="M0 12h32m0 0l-8-8m8 8l-8 8" stroke="#dc2626" strokeWidth="2"/>
            </svg>
            <div className="risk-box">
              <span className="risk-label">After</span>
              <span className="risk-value after">{afterRisk}%</span>
            </div>
          </div>

          <div className="signals-section">
            <h3 className="section-label">Triggered Signals</h3>
            {['Temporal', 'Volume', 'Sequential'].map(signal => (
              <div key={signal} className={`signal-item ${triggeredSignals.includes(signal) ? 'triggered' : ''}`}>
                <span className="signal-name">{signal}</span>
                <span className="signal-status">{triggeredSignals.includes(signal) ? 'Flagged' : 'Normal'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="panel">
        <h2 className="panel-title">Recent Findings</h2>
        <div className="findings-list">
          {recentFindings.map((finding, idx) => (
            <div key={idx} className="finding-row">
              <span className="finding-title">{finding.title}</span>
              <span className={`risk-badge risk-${finding.severity.toLowerCase()}`}>{finding.severity}</span>
              <span className="finding-time">{finding.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RedTeam;
