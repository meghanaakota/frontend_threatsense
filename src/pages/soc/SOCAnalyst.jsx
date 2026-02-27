import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSOC } from '../../context/SOCContext';
import LifecycleOverview from '../../components/LifecycleOverview';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './SOCAnalyst.css';

const SOCAnalyst = () => {
  const location = useLocation();
  const { alerts, updateAlertStatus } = useSOC();
  const [selectedAlert, setSelectedAlert] = useState(alerts[0] || null);

  useEffect(() => {
    if (location.state?.selectedAlert) {
      setSelectedAlert(location.state.selectedAlert);
    }
  }, [location.state]);

  const trendData = [
    { time: '14:00', score: 20 },
    { time: '14:15', score: 35 },
    { time: '14:30', score: 45 },
    { time: '14:45', score: 62 },
    { time: '15:00', score: selectedAlert?.riskScore || 78 }
  ];

  const getRiskColor = (score) => {
    if (score < 40) return '#22d3ee';
    if (score < 70) return '#f59e0b';
    return '#dc2626';
  };

  const handleAction = (action) => {
    if (!selectedAlert) return;
    const status = action === 'false-positive' ? 'Resolved' : 'Investigating';
    updateAlertStatus(selectedAlert.id, status);
  };

  return (
    <div className="soc-page">
      <h1 className="page-title">SOC Analyst – Investigation Console</h1>
      <LifecycleOverview />

      <div className="analyst-grid">
        <div className="panel">
          <h2 className="panel-title">Live Alert Stream</h2>
          <div className="alert-stream">
            {alerts.map(alert => (
              <div key={alert.id} className={`alert-card ${selectedAlert?.id === alert.id ? 'selected' : ''}`} onClick={() => setSelectedAlert(alert)}>
                <div className="alert-header">
                  <span className="alert-id">{alert.id}</span>
                  <span className={`status-badge status-${alert.status.toLowerCase()}`}>{alert.status}</span>
                </div>
                <div className="alert-body">
                  <span className="alert-user">{alert.user}</span>
                  <span className="alert-dept">{alert.department}</span>
                </div>
                <div className="alert-footer">
                  <span className={`risk-badge risk-${alert.risk.toLowerCase()}`}>{alert.risk}</span>
                  <span className="alert-time">{alert.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <h2 className="panel-title">Session Intelligence</h2>
          {selectedAlert && (
            <>
              <div className="session-section">
                <h3 className="section-label">Session Context</h3>
                <div className="context-grid">
                  <div className="context-item">
                    <span className="context-label">User</span>
                    <span className="context-value">{selectedAlert.user}</span>
                  </div>
                  <div className="context-item">
                    <span className="context-label">IP Address</span>
                    <span className="context-value">192.168.1.45</span>
                  </div>
                  <div className="context-item">
                    <span className="context-label">Device</span>
                    <span className="context-value">Windows 11 Pro</span>
                  </div>
                  <div className="context-item">
                    <span className="context-label">Department</span>
                    <span className="context-value">{selectedAlert.department}</span>
                  </div>
                </div>
              </div>

              <div className="session-section">
                <h3 className="section-label">Risk Assessment</h3>
                <div className="risk-bar-track">
                  <div className="risk-bar-fill" style={{ width: `${selectedAlert.riskScore}%`, backgroundColor: getRiskColor(selectedAlert.riskScore) }}></div>
                </div>
                <div className="risk-info">
                  <span className="risk-score">{selectedAlert.riskScore}%</span>
                  <span className="risk-confidence">Confidence: 92%</span>
                </div>
              </div>

              <div className="session-section">
                <h3 className="section-label">Behavioral Signals</h3>
                {['Temporal', 'Volume', 'Sequential'].map(signal => (
                  <div key={signal} className="signal-row">
                    <span className="signal-label">{signal}</span>
                    <span className={`signal-status ${selectedAlert.riskScore > 70 ? 'flagged' : 'normal'}`}>
                      {selectedAlert.riskScore > 70 ? 'Flagged' : 'Normal'}
                    </span>
                  </div>
                ))}
              </div>

              <div className="session-section">
                <h3 className="section-label">Risk Timeline</h3>
                <ResponsiveContainer width="100%" height={120}>
                  <LineChart data={trendData}>
                    <XAxis dataKey="time" stroke="#64748b" style={{ fontSize: '11px' }} />
                    <YAxis stroke="#64748b" style={{ fontSize: '11px' }} />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(30, 41, 59, 0.95)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '8px' }} />
                    <Line type="monotone" dataKey="score" stroke="#dc2626" strokeWidth={2} dot={{ fill: '#dc2626', r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="action-panel">
                <button className="action-btn danger" onClick={() => handleAction('lock')}>Lock Account</button>
                <button className="action-btn danger" onClick={() => handleAction('logout')}>Force Logout</button>
                <button className="action-btn secondary" onClick={() => handleAction('false-positive')}>Mark False Positive</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SOCAnalyst;
