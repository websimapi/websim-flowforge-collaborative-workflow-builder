import React, { useSyncExternalStore } from 'react';
import { NodePalette } from './NodePalette.js';
import { WorkflowList } from './WorkflowList.js';
import { useRoom } from '../hooks/useRoom.js';

export function Sidebar({ selectedWorkflowId, onSelectWorkflow, onNewWorkflow }) {
  const room = useRoom();
  
  const workflows = useSyncExternalStore(
    room.collection('workflow').subscribe,
    room.collection('workflow').getList
  );

  return (
    <div className="sidebar">
      <div className="node-palette">
        <div className="palette-title">Node Palette</div>
        <NodePalette />
      </div>
      
      <div className="workflow-list">
        <div className="palette-title">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Workflows</span>
            <button 
              className="button button-secondary" 
              style={{ padding: '4px 8px', fontSize: '0.75rem' }}
              onClick={onNewWorkflow}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              New
            </button>
          </div>
        </div>
        <WorkflowList 
          workflows={workflows} 
          selectedWorkflowId={selectedWorkflowId}
          onSelectWorkflow={onSelectWorkflow}
        />
      </div>
    </div>
  );
}

