import React, { createContext, useContext, useState } from 'react';

const SOCContext = createContext();

export const useSOC = () => {
  const context = useContext(SOCContext);
  if (!context) throw new Error('useSOC must be used within SOCProvider');
  return context;
};

export const SOCProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([
    { id: 'ALT-8472', user: 'rajesh.kumar@company.com', department: 'Sales', risk: 'High', riskScore: 78, timestamp: '2m ago', status: 'Open' },
    { id: 'ALT-8471', user: 'priya.sharma@company.com', department: 'HR', risk: 'Medium', riskScore: 52, timestamp: '15m ago', status: 'Investigating' }
  ]);

  const [activeStage, setActiveStage] = useState(null);
  const [simulationInProgress, setSimulationInProgress] = useState(false);
  const [latestAlert, setLatestAlert] = useState(null);

  const addAlert = (alert) => {
    setAlerts(prev => [alert, ...prev]);
    setLatestAlert(alert);
  };
  
  const updateAlertStatus = (alertId, status) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, status } : a));
  };

  const clearLatestAlert = () => setLatestAlert(null);

  const triggerLifecycleAnimation = async (stages) => {
    for (const stage of stages) {
      setActiveStage(stage);
      await new Promise(resolve => setTimeout(resolve, 800));
    }
    setActiveStage(null);
  };

  const simulateAttack = async (attackType) => {
    setSimulationInProgress(true);
    await triggerLifecycleAnimation(['red', 'ml', 'analyst']);
    
    const newAlert = {
      id: `ALT-${Math.floor(Math.random() * 10000)}`,
      user: 'test.user@company.com',
      department: 'Engineering',
      risk: 'High',
      riskScore: Math.floor(Math.random() * 30) + 70,
      timestamp: 'Just now',
      status: 'Open',
      attackType
    };
    
    addAlert(newAlert);
    setSimulationInProgress(false);
  };

  return (
    <SOCContext.Provider value={{ alerts, addAlert, updateAlertStatus, activeStage, simulateAttack, simulationInProgress, latestAlert, clearLatestAlert }}>
      {children}
    </SOCContext.Provider>
  );
};
