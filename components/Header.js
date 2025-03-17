import React from 'react';
import { useRoom } from '../hooks/useRoom.js';

export function Header({ onNewWorkflow, onForkWorkflow, currentWorkflow }) {
  const room = useRoom();
  const username = room.party.client.username;
  
  return (
    <header className="header">
      <div className="logo">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
          <path d="M2 17l10 5 10-5"></path>
          <path d="M2 12l10 5 10-5"></path>
        </svg>
        FlowForge
      </div>
      
      <div className="header-actions">
        {currentWorkflow && (
          <span className="header-workflow-name">
            {currentWorkflow.name}
          </span>
        )}
      </div>
      
      <div className="header-buttons">
        <button className="button button-secondary" onClick={onNewWorkflow}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          New Workflow
        </button>
        
        {currentWorkflow && (
          <button className="button button-secondary" onClick={onForkWorkflow}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="6" r="3"></circle>
              <circle cx="6" cy="18" r="3"></circle>
              <circle cx="18" cy="18" r="3"></circle>
              <line x1="6" y1="15" x2="18" y2="9"></line>
              <line x1="6" y1="15" x2="18" y2="15"></line>
            </svg>
            Fork
          </button>
        )}
      </div>
      
      <div className="user-info">
        <span>{username}</span>
        <img 
          src={`https://images.websim.ai/avatar/${username}`} 
          alt={username} 
          className="avatar" 
        />
      </div>
    </header>
  );
}

