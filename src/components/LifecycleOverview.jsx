import React from 'react';
import { useSOC } from '../context/SOCContext';

const LifecycleOverview = () => {
  const { activeStage } = useSOC();

  const stages = [
    { id: 'red', label: 'Red Team', color: '#dc2626' },
    { id: 'ml', label: 'ML Detection Engine', color: '#8b5cf6' },
    { id: 'analyst', label: 'SOC Analyst', color: '#3b82f6' },
    { id: 'blue', label: 'Blue Team', color: '#22c55e' }
  ];

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '2rem',
      padding: '2rem',
      background: 'rgba(30, 41, 59, 0.6)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(59, 130, 246, 0.3)',
      borderRadius: '12px',
      marginBottom: '2rem'
    }}>
      {stages.map((stage, idx) => (
        <React.Fragment key={stage.id}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1.5rem',
            background: activeStage === stage.id ? `${stage.color}20` : 'rgba(15, 23, 42, 0.6)',
            border: `2px solid ${activeStage === stage.id ? stage.color : 'rgba(59, 130, 246, 0.2)'}`,
            borderRadius: '12px',
            minWidth: '180px',
            transition: 'all 0.3s ease',
            boxShadow: activeStage === stage.id ? `0 0 20px ${stage.color}40` : 'none'
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={activeStage === stage.id ? stage.color : '#94a3b8'} strokeWidth="2">
              {stage.id === 'red' && <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>}
              {stage.id === 'ml' && <><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6M5.6 5.6l4.2 4.2m4.4 4.4l4.2 4.2M1 12h6m6 0h6M5.6 18.4l4.2-4.2m4.4-4.4l4.2-4.2"/></>}
              {stage.id === 'analyst' && <><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></>}
              {stage.id === 'blue' && <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>}
            </svg>
            <span style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: activeStage === stage.id ? stage.color : '#e2e8f0',
              textAlign: 'center'
            }}>
              {stage.label}
            </span>
          </div>
          {idx < stages.length - 1 && (
            <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
              <path d="M0 12h32m0 0l-8-8m8 8l-8 8" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default LifecycleOverview;
