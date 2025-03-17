import React from 'react';
import { formatDistanceToNow } from '../utils/date.js';

export function WorkflowList({ workflows, selectedWorkflowId, onSelectWorkflow }) {
  if (!workflows || workflows.length === 0) {
    return (
      <div className="empty-state" style={{ padding: '1rem' }}>
        <p className="empty-state-description" style={{ fontSize: '0.875rem' }}>
          No workflows yet. Create your first workflow to get started.
        </p>
      </div>
    );
  }

  // Sort workflows by creation date, newest first
  const sortedWorkflows = [...workflows].sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  });

  return (
    <div>
      {sortedWorkflows.map(workflow => (
        <div 
          key={workflow.id} 
          className={`workflow-item ${workflow.id === selectedWorkflowId ? 'workflow-item-selected' : ''}`}
          onClick={() => onSelectWorkflow(workflow)}
          style={workflow.id === selectedWorkflowId ? { borderLeft: '3px solid var(--primary)' } : {}}
        >
          <div className="workflow-item-header">
            <div className="workflow-item-title">{workflow.name}</div>
          </div>
          
          <div className="workflow-item-created">
            {formatDistanceToNow(new Date(workflow.created_at))} ago
          </div>
          
          <div className="workflow-item-author">
            <img 
              src={`https://images.websim.ai/avatar/${workflow.username}`} 
              alt={workflow.username} 
              className="workflow-item-avatar" 
            />
            {workflow.username}
          </div>
          
          {workflow.parent_id && (
            <div className="fork-indicator">
              <svg className="fork-indicator-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="18" r="3"></circle>
                <circle cx="6" cy="6" r="3"></circle>
                <circle cx="18" cy="6" r="3"></circle>
                <path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9"></path>
                <line x1="12" y1="12" x2="12" y2="15"></line>
              </svg>
              Forked
            </div>
          )}
          
          {workflow.tags && workflow.tags.length > 0 && (
            <div className="workflow-item-tags" style={{ marginTop: '0.5rem' }}>
              {workflow.tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

