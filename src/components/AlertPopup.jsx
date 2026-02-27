import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AlertPopup = ({ alert, onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 6000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const handleClick = () => {
    navigate('/soc/analyst');
    onClose();
  };

  return (
    <div
      onClick={handleClick}
      style={{
        position: 'fixed',
        top: '5rem',
        right: '2rem',
        width: '380px',
        background: 'rgba(30, 41, 59, 0.95)',
        backdropFilter: 'blur(20px)',
        border: alert.risk === 'High' ? '1px solid rgba(220, 38, 38, 0.5)' : '1px solid rgba(59, 130, 246, 0.3)',
        borderRadius: '12px',
        padding: '1.5rem',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        cursor: 'pointer',
        zIndex: 1000,
        animation: 'slideInRight 0.3s ease-out, pulse 2s ease-in-out infinite',
        transition: 'all 0.2s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.6)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.5)';
      }}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        style={{
          position: 'absolute',
          top: '0.75rem',
          right: '0.75rem',
          background: 'transparent',
          border: 'none',
          color: '#94a3b8',
          cursor: 'pointer',
          fontSize: '1.25rem',
          lineHeight: 1,
          padding: '0.25rem'
        }}
      >
        ×
      </button>

      <div style={{ marginBottom: '1rem' }}>
        <h3 style={{
          fontSize: '1rem',
          fontWeight: 600,
          color: '#fff',
          margin: 0
        }}>
          New Security Alert Detected
        </h3>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <div style={{ marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>User: </span>
          <span style={{ fontSize: '0.875rem', color: '#e2e8f0', fontWeight: 500 }}>{alert.user}</span>
        </div>
        <div style={{ marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Department: </span>
          <span style={{ fontSize: '0.875rem', color: '#e2e8f0', fontWeight: 500 }}>{alert.department}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Risk Level: </span>
          <span style={{
            padding: '0.25rem 0.75rem',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: 600,
            background: alert.risk === 'High' ? 'rgba(220, 38, 38, 0.2)' : alert.risk === 'Medium' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(34, 211, 238, 0.2)',
            color: alert.risk === 'High' ? '#dc2626' : alert.risk === 'Medium' ? '#f59e0b' : '#22d3ee',
            border: `1px solid ${alert.risk === 'High' ? 'rgba(220, 38, 38, 0.4)' : alert.risk === 'Medium' ? 'rgba(245, 158, 11, 0.4)' : 'rgba(34, 211, 238, 0.4)'}`
          }}>
            {alert.risk}
          </span>
        </div>
      </div>

      <div style={{
        fontSize: '0.75rem',
        color: '#64748b',
        textAlign: 'center',
        paddingTop: '0.75rem',
        borderTop: '1px solid rgba(59, 130, 246, 0.2)'
      }}>
        Click to investigate
      </div>

      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
          }
          50% {
            box-shadow: 0 8px 32px rgba(220, 38, 38, 0.3);
          }
        }
      `}</style>
    </div>
  );
};

export default AlertPopup;
