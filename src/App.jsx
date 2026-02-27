import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import SOCSidebar from './components/SOCSidebar';
import LandingPage from './pages/LandingPage';
import DemoPage from './pages/DemoPage';
import Dashboard from './pages/Dashboard';
import RolesPage from './pages/RolesPage';
import { Owner, Finance, Sales, HR, Support } from './pages/Departments';
import { SOCProvider, useSOC } from './context/SOCContext';
import AlertPopup from './components/AlertPopup';
import SOCDashboard from './pages/soc/SOCDashboard';
import BlueTeam from './pages/soc/BlueTeam';
import RedTeam from './pages/soc/RedTeam';
import SOCAnalyst from './pages/soc/SOCAnalyst';
import SOCLogs from './pages/soc/SOCLogs';

const DashboardLayout = ({ children }) => {
  const socContext = useSOC();
  const [dashboardAlert, setDashboardAlert] = React.useState(null);

  React.useEffect(() => {
    if (socContext?.latestAlert) {
      setDashboardAlert(socContext.latestAlert);
    }
  }, [socContext?.latestAlert]);

  const handleCloseAlert = () => {
    setDashboardAlert(null);
    if (socContext?.clearLatestAlert) {
      socContext.clearLatestAlert();
    }
  };

  return (
  <div className="dashboard-layout" style={{ position: 'relative', minHeight: '100vh' }}>
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'linear-gradient(180deg, #0f1729 0%, #1a2332 50%, #0f1729 100%)',
      zIndex: -3
    }} />
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px)',
      backgroundSize: '50px 50px',
      zIndex: -2
    }} />
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 40%), radial-gradient(circle at 80% 30%, rgba(139, 92, 246, 0.1) 0%, transparent 40%), radial-gradient(circle at 50% 80%, rgba(34, 211, 238, 0.08) 0%, transparent 45%)',
      animation: 'gradientPulse 20s ease-in-out infinite',
      zIndex: -1
    }} />
    <Navbar />
    <Sidebar />
    <div className="main-content">
      {children}
    </div>
    {dashboardAlert && <AlertPopup alert={dashboardAlert} onClose={handleCloseAlert} />}
  </div>
  );
};

const SOCLayout = ({ children }) => (
  <div className="dashboard-layout" style={{ position: 'relative', minHeight: '100vh' }}>
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'linear-gradient(180deg, #0f1729 0%, #1a2332 50%, #0f1729 100%)',
      zIndex: -3
    }} />
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px)',
      backgroundSize: '50px 50px',
      zIndex: -2
    }} />
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'radial-gradient(circle at 20% 20%, rgba(239, 68, 68, 0.12) 0%, transparent 40%), radial-gradient(circle at 80% 30%, rgba(251, 146, 60, 0.1) 0%, transparent 40%), radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.08) 0%, transparent 45%)',
      animation: 'gradientPulse 20s ease-in-out infinite',
      zIndex: -1
    }} />
    <Navbar />
    <SOCSidebar />
    <div className="main-content">
      {children}
    </div>
  </div>
);

const App = () => {
  return (
    <Router>
      <SOCProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/dashboard/*" element={
            <DashboardLayout>
              <Routes>
                <Route index element={<Dashboard />} />
                <Route path="roles" element={<RolesPage />} />
                <Route path="owner" element={<Owner />} />
                <Route path="finance" element={<Finance />} />
                <Route path="sales" element={<Sales />} />
                <Route path="hr" element={<HR />} />
                <Route path="support" element={<Support />} />
                <Route path="alerts" element={<div style={{ padding: '2rem' }}><h2>Alerts</h2><p>System alerts will appear here.</p></div>} />
              </Routes>
            </DashboardLayout>
          } />
          <Route path="/soc/*" element={
            <SOCLayout>
              <Routes>
                <Route index element={<SOCDashboard />} />
                <Route path="blue" element={<BlueTeam />} />
                <Route path="red" element={<RedTeam />} />
                <Route path="analyst" element={<SOCAnalyst />} />
                <Route path="logs" element={<SOCLogs />} />
              </Routes>
            </SOCLayout>
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </SOCProvider>
    </Router>
  );
};

export default App;
