import React from 'react';
import { useSOC } from '../../context/SOCContext';
import LifecycleOverview from '../../components/LifecycleOverview';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './BlueTeam.css';

const BlueTeam = () => {
  const { alerts } = useSOC();

  const totalSessions = 124;
  const totalAnomalies = alerts.length;
  const highRiskCount = alerts.filter(a => a.risk === 'High').length;
  const highRiskPercent = Math.round((highRiskCount / totalAnomalies) * 100);
  const resolvedCount = alerts.filter(a => a.status === 'Resolved').length;
  const resolutionRate = Math.round((resolvedCount / totalAnomalies) * 100);

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
    { time: '20:00', score: 38 }
  ];

  const departmentMetrics = [
    { department: 'Sales', sessions: 32, anomalies: alerts.filter(a => a.department === 'Sales').length, avgRisk: 65 },
    { department: 'Engineering', sessions: 45, anomalies: alerts.filter(a => a.department === 'Engineering').length, avgRisk: 72 },
    { department: 'HR', sessions: 18, anomalies: alerts.filter(a => a.department === 'HR').length, avgRisk: 52 },
    { department: 'Support', sessions: 28, anomalies: alerts.filter(a => a.department === 'Support').length, avgRisk: 38 }
  ];

  const getRiskColor = (score) => {
    if (score < 40) return '#22d3ee';
    if (score < 70) return '#f59e0b';
    return '#dc2626';
  };

  return (
    <div className="soc-page">
      <h1 className="page-title">Blue Team – Strategic Security View</h1>
      <LifecycleOverview />

      <div className="kpi-strip">
        <div className="kpi-card">
          <div className="kpi-label">Total Sessions</div>
          <div className="kpi-value">{totalSessions}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Total Anomalies</div>
          <div className="kpi-value">{totalAnomalies}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">High Risk %</div>
          <div className="kpi-value">{highRiskPercent}%</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Resolution Rate</div>
          <div className="kpi-value">{resolutionRate}%</div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="panel">
          <h2 className="panel-title">Risk Distribution</h2>
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
        </div>

        <div className="panel">
          <h2 className="panel-title">24h Trend</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={trendData}>
              <XAxis dataKey="time" stroke="#64748b" style={{ fontSize: '11px' }} />
              <YAxis stroke="#64748b" style={{ fontSize: '11px' }} />
              <Tooltip contentStyle={{ backgroundColor: 'rgba(30, 41, 59, 0.95)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '8px' }} />
              <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="panel">
        <h2 className="panel-title">Department Risk Summary</h2>
        <table className="dept-table">
          <thead>
            <tr>
              <th>Department</th>
              <th>Sessions</th>
              <th>Anomalies</th>
              <th>Avg Risk</th>
            </tr>
          </thead>
          <tbody>
            {departmentMetrics.map((dept, idx) => (
              <tr key={idx}>
                <td>{dept.department}</td>
                <td>{dept.sessions}</td>
                <td>{dept.anomalies}</td>
                <td>
                  <span className="risk-score-cell" style={{ color: getRiskColor(dept.avgRisk) }}>
                    {dept.avgRisk}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlueTeam;
