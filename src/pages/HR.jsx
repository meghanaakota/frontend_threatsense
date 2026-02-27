import React, { useState, useEffect } from 'react';
import './HR.css';

const HR = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [accessCount, setAccessCount] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const itemsPerPage = 10;
  const threshold = 20;

  const employees = [
    { name: 'Rajesh Kumar', email: 'rajesh.k@company.com', department: 'Engineering', role: 'Senior Developer', status: 'Active', hireDate: '2021-03-15' },
    { name: 'Priya Sharma', email: 'priya.s@company.com', department: 'Sales', role: 'Sales Manager', status: 'Active', hireDate: '2020-07-22' },
    { name: 'Amit Patel', email: 'amit.p@company.com', department: 'Support', role: 'Support Lead', status: 'Active', hireDate: '2019-11-08' },
    { name: 'Sneha Reddy', email: 'sneha.r@company.com', department: 'Marketing', role: 'Marketing Specialist', status: 'Active', hireDate: '2022-01-10' },
    { name: 'Vikram Singh', email: 'vikram.s@company.com', department: 'Engineering', role: 'DevOps Engineer', status: 'Active', hireDate: '2021-09-05' },
    { name: 'Ananya Iyer', email: 'ananya.i@company.com', department: 'HR', role: 'HR Manager', status: 'Active', hireDate: '2020-04-18' },
    { name: 'Karthik Menon', email: 'karthik.m@company.com', department: 'Sales', role: 'Account Executive', status: 'Active', hireDate: '2022-06-12' },
    { name: 'Deepa Nair', email: 'deepa.n@company.com', department: 'Engineering', role: 'QA Engineer', status: 'Departed', hireDate: '2019-02-20' },
    { name: 'Rohan Gupta', email: 'rohan.g@company.com', department: 'Support', role: 'Support Engineer', status: 'Active', hireDate: '2021-12-01' },
    { name: 'Meera Joshi', email: 'meera.j@company.com', department: 'Marketing', role: 'Content Writer', status: 'Active', hireDate: '2022-03-25' },
    { name: 'Arjun Desai', email: 'arjun.d@company.com', department: 'Engineering', role: 'Frontend Developer', status: 'Active', hireDate: '2020-10-14' },
    { name: 'Kavya Rao', email: 'kavya.r@company.com', department: 'Sales', role: 'Sales Representative', status: 'Active', hireDate: '2021-05-30' }
  ];

  const deptData = [
    { name: 'Engineering', value: 5, color: '#3b82f6' },
    { name: 'Sales', value: 3, color: '#8b5cf6' },
    { name: 'Support', value: 2, color: '#22d3ee' },
    { name: 'Marketing', value: 2, color: '#f59e0b' },
    { name: 'HR', value: 1, color: '#22c55e' }
  ];

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(e => e.status === 'Active').length;
  const departedEmployees = employees.filter(e => e.status === 'Departed').length;

  const calculateTenure = (hireDate) => {
    const hire = new Date(hireDate);
    const now = new Date();
    const months = (now.getFullYear() - hire.getFullYear()) * 12 + (now.getMonth() - hire.getMonth());
    return months;
  };

  const avgTenure = Math.round(employees.reduce((sum, e) => sum + calculateTenure(e.hireDate), 0) / employees.length);

  const handleSimulateMassAccess = () => {
    setIsSimulating(true);
    let count = 0;
    const interval = setInterval(() => {
      count += Math.floor(Math.random() * 3) + 2;
      setAccessCount(count);
      if (count >= threshold) {
        setShowAlert(true);
      }
      if (count >= 35) {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 150);
  };

  const getVelocityColor = () => {
    const percentage = (accessCount / threshold) * 100;
    if (percentage < 70) return '#22d3ee';
    if (percentage < 100) return '#f59e0b';
    return '#dc2626';
  };

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          emp.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = filterDept === 'All' || emp.department === filterDept;
    return matchesSearch && matchesDept;
  });

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedEmployees = filteredEmployees.slice(startIdx, startIdx + itemsPerPage);

  const total = deptData.reduce((sum, d) => sum + d.value, 0);
  const centerX = 150;
  const centerY = 150;
  const radius = 100;
  let currentAngle = -90;

  return (
    <div className="hr-dashboard">
      <div className="hr-header">
        <div>
          <h1 className="hr-title">HR Workforce Overview</h1>
          <p className="hr-subtitle">Employee governance and lifecycle monitoring</p>
        </div>
        <button 
          onClick={handleSimulateMassAccess} 
          disabled={isSimulating}
          style={{
            padding: '0.625rem 1.25rem',
            backgroundColor: isSimulating ? '#6b7280' : '#991b1b',
            color: '#fff',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: '500',
            cursor: isSimulating ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.3s ease',
            opacity: isSimulating ? 0.6 : 1
          }}
          onMouseEnter={(e) => !isSimulating && (e.target.style.backgroundColor = '#7f1d1d')}
          onMouseLeave={(e) => !isSimulating && (e.target.style.backgroundColor = '#991b1b')}
        >
          {isSimulating ? 'Simulating...' : 'Simulate Mass Access'}
        </button>
      </div>

      <div className="hr-kpi-strip">
        <div className="hr-kpi-card">
          <div className="hr-kpi-label">Total Employees</div>
          <div className="hr-kpi-value">{totalEmployees}</div>
        </div>
        <div className="hr-kpi-card">
          <div className="hr-kpi-label">Active Employees</div>
          <div className="hr-kpi-value">{activeEmployees}</div>
        </div>
        <div className="hr-kpi-card">
          <div className="hr-kpi-label">Departed Employees</div>
          <div className="hr-kpi-value">{departedEmployees}</div>
        </div>
        <div className="hr-kpi-card">
          <div className="hr-kpi-label">Average Tenure (months)</div>
          <div className="hr-kpi-value">{avgTenure}</div>
        </div>
      </div>

      <div style={{
        background: 'rgba(30, 41, 59, 0.4)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(59, 130, 246, 0.2)',
        borderRadius: '0.75rem',
        padding: '1.25rem',
        marginBottom: '1.5rem',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
      }}>
        <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#94a3b8', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Access Velocity Monitor
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '0.75rem' }}>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: getVelocityColor() }}>
              {accessCount}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>accesses</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Last 60 seconds</div>
            <div style={{ position: 'relative', height: '1.5rem', backgroundColor: 'rgba(15, 23, 42, 0.6)', borderRadius: '0.5rem', overflow: 'hidden' }}>
              <div style={{
                position: 'absolute',
                left: 0,
                top: 0,
                height: '100%',
                width: `${Math.min((accessCount / 40) * 100, 100)}%`,
                backgroundColor: getVelocityColor(),
                transition: 'all 0.3s ease',
                borderRadius: '0.5rem'
              }} />
              <div style={{
                position: 'absolute',
                left: `${(threshold / 40) * 100}%`,
                top: 0,
                height: '100%',
                width: '2px',
                backgroundColor: '#f59e0b',
                boxShadow: '0 0 8px rgba(245, 158, 11, 0.5)'
              }} />
            </div>
            <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.25rem', textAlign: 'right' }}>
              Threshold: {threshold}
            </div>
          </div>
        </div>
      </div>

      <div className="hr-chart-section">
        <h2 className="hr-section-title">Department Distribution</h2>
        <svg width="100%" height="300" viewBox="0 0 500 300">
          {deptData.map((dept, idx) => {
            const percentage = (dept.value / total) * 100;
            const angle = (percentage / 100) * 360;
            const startAngle = currentAngle;
            const endAngle = currentAngle + angle;
            
            const startRad = (startAngle * Math.PI) / 180;
            const endRad = (endAngle * Math.PI) / 180;
            
            const x1 = centerX + radius * Math.cos(startRad);
            const y1 = centerY + radius * Math.sin(startRad);
            const x2 = centerX + radius * Math.cos(endRad);
            const y2 = centerY + radius * Math.sin(endRad);
            
            const largeArc = angle > 180 ? 1 : 0;
            const path = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
            
            const labelAngle = (startAngle + endAngle) / 2;
            const labelRad = (labelAngle * Math.PI) / 180;
            const labelX = centerX + (radius + 40) * Math.cos(labelRad);
            const labelY = centerY + (radius + 40) * Math.sin(labelRad);
            
            currentAngle = endAngle;
            
            return (
              <g key={idx}>
                <path d={path} fill={dept.color} opacity="0.8" />
                <text x={labelX} y={labelY} textAnchor="middle" fill="#e2e8f0" fontSize="12" fontWeight="600">
                  {dept.name}
                </text>
                <text x={labelX} y={labelY + 15} textAnchor="middle" fill="#94a3b8" fontSize="11">
                  {dept.value} ({percentage.toFixed(0)}%)
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="hr-table-section">
        <h2 className="hr-section-title">Employee Directory</h2>
        
        {showAlert && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(127, 29, 29, 0.3), rgba(153, 27, 27, 0.2))',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(220, 38, 38, 0.3)',
            borderRadius: '0.75rem',
            padding: '1rem 1.25rem',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            animation: 'slideDown 0.4s ease-out',
            boxShadow: '0 4px 16px rgba(220, 38, 38, 0.2)'
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 0L12.2451 7.75486H20L13.8775 12.2451L16.1225 20L10 15.5098L3.87746 20L6.12254 12.2451L0 7.75486H7.75486L10 0Z" fill="#dc2626" opacity="0.8"/>
              <circle cx="10" cy="10" r="8" stroke="#dc2626" strokeWidth="1.5" fill="none"/>
              <text x="10" y="14" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">!</text>
            </svg>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#fca5a5' }}>
                Volumetric Anomaly Detected – High Data Access Velocity
              </div>
            </div>
          </div>
        )}
        
        <div className="hr-table-controls">
          <input
            type="text"
            placeholder="Search by name or email..."
            className="hr-search-input"
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
          <select
            className="hr-filter-select"
            value={filterDept}
            onChange={(e) => { setFilterDept(e.target.value); setCurrentPage(1); }}
          >
            <option value="All">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Sales">Sales</option>
            <option value="Support">Support</option>
            <option value="Marketing">Marketing</option>
            <option value="HR">HR</option>
          </select>
        </div>

        <table className="hr-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Role</th>
              <th>Status</th>
              <th>Hire Date</th>
              <th>Tenure</th>
            </tr>
          </thead>
          <tbody>
            {paginatedEmployees.map((emp, idx) => (
              <tr key={idx} style={{ cursor: 'pointer', transition: 'background-color 0.2s ease' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.05)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>{emp.role}</td>
                <td>
                  <span className={`hr-status-badge ${emp.status.toLowerCase()}`}>
                    {emp.status}
                  </span>
                </td>
                <td>{emp.hireDate}</td>
                <td>{calculateTenure(emp.hireDate)} months</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="hr-pagination">
          <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default HR;
