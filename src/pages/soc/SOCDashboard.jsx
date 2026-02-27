import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSOC } from '../../context/SOCContext';
import LifecycleOverview from '../../components/LifecycleOverview';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './SOCDashboard.css';

const SOCDashboard = () => {
  const navigate = useNavigate();
  const { alerts } = useSOC();

  const metrics = {
    activeAlerts: alerts.filter(a => a.status === 'Open').length,
    investigating: alerts.filter(a => a.status === 'Investigating').length,
    resolvedToday: alerts.filter(a => a.status === 'Resolved').length,
    avgRiskScore: Math.round(alerts.reduce((sum, a) => sum + (a.riskScore || 50), 0) / alerts.length)
  };

  const riskDistribution = [
    { name: 'Low', value: alerts.filter(a => a.risk === 'Low').length, color: '#22d3ee' },
    { name: 'Medium', value: alerts.filter(a => a.risk === 'Medium').length, color: '#f59e0b' },
    { name: 'High', value: alerts.filter(a => a.risk === 'High').length, color: '#dc2626' }
  ];

  const trendData = [
    { time: '00:00', score: 25 },
    { time: '04:00', score: 18 },
    { time: '08:00', score: 32 },
    { time: '12:00', score: 45 },
    { time: '16:00', score: 52 },
    { time: '20:00', score: metrics.avgRiskScore }
  ];

  return (
    <div className="soc-page">
      <h1 className="page-title">SOC Operations Center</h1>
      <LifecycleOverview />

      <div className="kpi-strip">
        <div className="kpi-card">
          <div className="kpi-label">Active Alerts</div>
          <div className="kpi-value">{metrics.activeAlerts}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Investigating</div>
          <div className="kpi-value">{metrics.investigating}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Resolved Today</div>
          <div className="kpi-value">{metrics.resolvedToday}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Avg Risk Score</div>
          <div className="kpi-value">{metrics.avgRiskScore}</div>
        </div>
      </div>

      <div className="main-grid">
        <div className="panel">
          <h2 className="panel-title">Recent Alerts</h2>
          <div className="alert-list">
            {alerts.slice(0, 5).map(alert => (
              <div 
                key={alert.id} 
                className="alert-row" 
                onClick={() => navigate('/soc/analyst', { state: { selectedAlert: alert } })}
                style={{ cursor: 'pointer' }}
              >
                <span className="alert-id">{alert.id}</span>
                <span className="alert-user">{alert.user}</span>
                <span className="alert-dept">{alert.department}</span>
                <span className={`risk-badge risk-${alert.risk.toLowerCase()}`}>{alert.risk}</span>
                <span className="alert-time">{alert.timestamp}</span>
                <span className={`status-badge status-${alert.status.toLowerCase()}`}>{alert.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <h2 className="panel-title">Risk Overview</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={riskDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value">
                {riskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: 'rgba(30, 41, 59, 0.95)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '8px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="legend">
            {riskDistribution.map((item, idx) => (
              <div key={idx} className="legend-item">
                <span className="legend-dot" style={{ backgroundColor: item.color }}></span>
                <span className="legend-label">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <h3 className="section-label">24h Trend</h3>
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={trendData}>
                <XAxis dataKey="time" stroke="#64748b" style={{ fontSize: '11px' }} />
                <YAxis stroke="#64748b" style={{ fontSize: '11px' }} />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(30, 41, 59, 0.95)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SOCDashboard;
