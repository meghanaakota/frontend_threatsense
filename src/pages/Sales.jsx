import React, { useState, useEffect } from 'react';
import './Sales.css';

const Sales = () => {
  const [currentUser] = useState({ name: 'Sales Executive', role: 'Sales' });
  const [salesMetrics, setSalesMetrics] = useState({});
  const [chartData, setChartData] = useState([]);
  const [deals, setDeals] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [interactions, setInteractions] = useState([]);
  const [riskScore, setRiskScore] = useState(0);
  const [isHighRisk, setIsHighRisk] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState([]);

  useEffect(() => {
    setSalesMetrics({
      totalRevenue: '₹ 24,50,000',
      totalLeads: '1,247',
      activeDeals: '89',
      conversionRate: 24.5
    });

    setChartData([
      { month: 'Jan', revenue: 2000000 },
      { month: 'Feb', revenue: 2400000 },
      { month: 'Mar', revenue: 2600000 },
      { month: 'Apr', revenue: 2300000 },
      { month: 'May', revenue: 3000000 },
      { month: 'Jun', revenue: 3400000 }
    ]);

    setDeals([
      { id: 'DL-5421', customer: 'John Smith', company: 'Acme Corp', value: '$125,000', status: 'Negotiation', executive: 'Sarah Chen', lastContact: '2024-01-14' },
      { id: 'DL-5422', customer: 'Emily Davis', company: 'TechStart Inc', value: '$89,500', status: 'New', executive: 'Mike Torres', lastContact: '2024-01-15' },
      { id: 'DL-5423', customer: 'Robert Wilson', company: 'Global Systems', value: '$210,000', status: 'Closed', executive: 'Emma Wilson', lastContact: '2024-01-13' },
      { id: 'DL-5424', customer: 'Lisa Anderson', company: 'DataFlow Ltd', value: '$156,000', status: 'Negotiation', executive: 'James Park', lastContact: '2024-01-15' }
    ]);

    setAppointments([
      { customer: 'John Smith', executive: 'Sarah Chen', meetingType: 'Product Demo', date: '2024-01-16', time: '10:00 AM' },
      { customer: 'Emily Davis', executive: 'Mike Torres', meetingType: 'Contract Review', date: '2024-01-16', time: '02:30 PM' },
      { customer: 'Lisa Anderson', executive: 'James Park', meetingType: 'Follow-up Call', date: '2024-01-17', time: '11:00 AM' }
    ]);

    setInteractions([
      { customer: 'John Smith', type: 'Email', timestamp: '2 hours ago', notes: 'Sent pricing proposal for enterprise plan...' },
      { customer: 'Robert Wilson', type: 'Phone Call', timestamp: '4 hours ago', notes: 'Discussed implementation timeline...' },
      { customer: 'Emily Davis', type: 'Meeting', timestamp: '1 day ago', notes: 'Product demonstration completed...' }
    ]);

    setTerminalLogs([
      { time: '14:23:15', message: 'Session monitoring active' },
      { time: '14:24:02', message: 'User accessed deal pipeline' },
      { time: '14:25:18', message: 'Filter applied: Negotiation status' }
    ]);

    setRiskScore(35);
    setIsHighRisk(false);
  }, []);

  return (
    <div className="sales-hub">
      <div className="sales-header">
        <div className="header-info">
          <h1>Sales Intelligence Hub</h1>
          <p className="header-subtitle">CRM operations with behavioral security monitoring enabled.</p>
        </div>
      </div>

      <section className="sales-section">
        <h2>Sales Overview</h2>
        
        <div className="performance-strip">
          <div className="strip-metric">
            <div className="strip-value">{salesMetrics.totalRevenue}</div>
            <div className="strip-label">Current Quarter</div>
          </div>
          <div className="strip-divider"></div>
          <div className="strip-metric">
            <div className="strip-value">{salesMetrics.totalLeads}</div>
            <div className="strip-label">Active Opportunities</div>
          </div>
          <div className="strip-divider"></div>
          <div className="strip-metric">
            <div className="strip-value">{salesMetrics.activeDeals}</div>
            <div className="strip-label">Ongoing Negotiations</div>
          </div>
        </div>

        <div className="graphical-metrics">
          <div className="chart-panel">
            <h3>Conversion Rate</h3>
            <div className="circular-chart">
              <svg width="180" height="180" viewBox="0 0 180 180">
                <circle
                  cx="90"
                  cy="90"
                  r="70"
                  fill="none"
                  stroke="rgba(59, 130, 246, 0.1)"
                  strokeWidth="12"
                />
                <circle
                  cx="90"
                  cy="90"
                  r="70"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="12"
                  strokeDasharray={`${2 * Math.PI * 70}`}
                  strokeDashoffset={`${2 * Math.PI * 70 * (1 - salesMetrics.conversionRate / 100)}`}
                  strokeLinecap="round"
                  transform="rotate(-90 90 90)"
                  style={{ transition: 'stroke-dashoffset 1s ease' }}
                />
                <text
                  x="90"
                  y="90"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="32"
                  fontWeight="700"
                  fill="#fff"
                >
                  {salesMetrics.conversionRate}%
                </text>
              </svg>
            </div>
          </div>

          <div className="chart-panel">
            <div className="chart-header">
              <h3>Revenue Growth</h3>
              <span className="growth-percentage positive">+12.4%</span>
            </div>
            <div className="line-chart">
              <svg width="100%" height="250" viewBox="0 0 500 250">
                {/* Grid lines */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <line
                    key={i}
                    x1="50"
                    y1={50 + i * 40}
                    x2="480"
                    y2={50 + i * 40}
                    stroke="rgba(59, 130, 246, 0.1)"
                    strokeDasharray="3 3"
                  />
                ))}
                
                {/* Y-axis labels */}
                {[34, 30, 26, 22, 18].map((value, i) => (
                  <text
                    key={i}
                    x="40"
                    y={55 + i * 40}
                    fontSize="12"
                    fill="#94a3b8"
                    textAnchor="end"
                  >
                    ₹ {value}L
                  </text>
                ))}
                
                {/* Line and dots */}
                {(() => {
                  const maxRevenue = 3400000;
                  const minRevenue = 1800000;
                  const range = maxRevenue - minRevenue;
                  const width = 430;
                  const height = 160;
                  const startX = 80;
                  const startY = 50;
                  
                  const points = chartData.map((item, index) => {
                    const x = startX + (index / (chartData.length - 1)) * width;
                    const y = startY + height - ((item.revenue - minRevenue) / range) * height;
                    return { x, y, ...item };
                  });
                  
                  const pathData = points.map((p, i) => 
                    `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
                  ).join(' ');
                  
                  return (
                    <>
                      <path
                        d={pathData}
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {points.map((point, index) => (
                        <circle
                          key={index}
                          cx={point.x}
                          cy={point.y}
                          r="4"
                          fill="#3b82f6"
                        />
                      ))}
                    </>
                  );
                })()}
                
                {/* X-axis labels */}
                {chartData.map((item, index) => {
                  const x = 80 + (index / (chartData.length - 1)) * 430;
                  return (
                    <text
                      key={index}
                      x={x}
                      y="230"
                      fontSize="12"
                      fill="#94a3b8"
                      textAnchor="middle"
                    >
                      {item.month}
                    </text>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="sales-section">
        <h2>Deal Pipeline</h2>
        <div className="table-container">
          <table className="sales-table">
            <thead>
              <tr>
                <th>Deal ID</th>
                <th>Customer Name</th>
                <th>Company</th>
                <th>Deal Value</th>
                <th>Status</th>
                <th>Assigned Executive</th>
                <th>Last Contact</th>
              </tr>
            </thead>
            <tbody>
              {deals.map(deal => (
                <tr key={deal.id}>
                  <td className="deal-id">{deal.id}</td>
                  <td>{deal.customer}</td>
                  <td>{deal.company}</td>
                  <td>{deal.value}</td>
                  <td><span className={`status-badge status-${deal.status.toLowerCase()}`}>{deal.status}</span></td>
                  <td>{deal.executive}</td>
                  <td>{deal.lastContact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="sales-section">
        <h2>Appointments & Interactions</h2>
        <div className="two-column-grid">
          <div className="column-panel">
            <h3>Upcoming Appointments</h3>
            <div className="table-container">
              <table className="sales-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Executive</th>
                    <th>Meeting Type</th>
                    <th>Date</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((apt, idx) => (
                    <tr key={idx}>
                      <td>{apt.customer}</td>
                      <td>{apt.executive}</td>
                      <td>{apt.meetingType}</td>
                      <td>{apt.date}</td>
                      <td>{apt.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="column-panel">
            <h3>Recent Interactions</h3>
            <div className="interaction-feed">
              {interactions.map((int, idx) => (
                <div key={idx} className="interaction-item">
                  <div className="interaction-header">
                    <span className="interaction-customer">{int.customer}</span>
                    <span className="interaction-time">{int.timestamp}</span>
                  </div>
                  <div className="interaction-type">{int.type}</div>
                  <div className="interaction-notes">{int.notes}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className={`monitoring-panel ${isHighRisk ? 'high-risk' : ''}`}>
        <div className="monitoring-header">
          <span className="monitoring-title">Monitoring Status</span>
          <span className={`monitoring-indicator ${isHighRisk ? 'risk' : 'normal'}`}></span>
        </div>
        <div className="risk-bar">
          <div className="risk-fill" style={{ width: `${riskScore}%` }}></div>
        </div>
        <div className="terminal-logs">
          {terminalLogs.map((log, idx) => (
            <div key={idx} className="log-entry">
              <span className="log-time">{log.time}</span>
              <span className="log-message">{log.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sales;
