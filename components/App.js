import React, { useState, useEffect } from 'react';
import { WorkflowEditor } from './WorkflowEditor.js';
import { Sidebar } from './Sidebar.js';
import { Header } from './Header.js';
import { NodePropertiesPanel } from './NodePropertiesPanel.js';
import { ModalNewWorkflow } from './modals/ModalNewWorkflow.js';
import { ModalFork } from './modals/ModalFork.js';
import { useRoom } from '../hooks/useRoom.js';
import { Toast } from './Toast.js';

export function App() {
  const room = useRoom();
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [showNewWorkflowModal, setShowNewWorkflowModal] = useState(false);
  const [showForkModal, setShowForkModal] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [propertiesPanelOpen, setPropertiesPanelOpen] = useState(false);

  // Auto-select first workflow if available
  useEffect(() => {
    const workflows = room.collection('workflow').getList();
    if (workflows.length > 0 && !selectedWorkflow) {
      setSelectedWorkflow(workflows[0]);
    }
  }, []);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 5000);
  };

  const handleNodeSelect = (node) => {
    setSelectedNode(node);
    setPropertiesPanelOpen(true);
  };

  const handleCreateWorkflow = async (data) => {
    try {
      const newWorkflow = await room.collection('workflow').create({
        name: data.name,
        description: data.description,
        nodes: [],
        edges: [],
        tags: data.tags || [],
        parent_id: null,
        version: 1,
      });
      
      setSelectedWorkflow(newWorkflow);
      setShowNewWorkflowModal(false);
      addToast(`Workflow "${data.name}" created successfully`);
    } catch (error) {
      console.error('Error creating workflow:', error);
      addToast('Failed to create workflow', 'error');
    }
  };

  const handleForkWorkflow = async (data) => {
    if (!selectedWorkflow) return;
    
    try {
      const forkedWorkflow = await room.collection('workflow').create({
        name: data.name,
        description: data.description,
        nodes: selectedWorkflow.nodes,
        edges: selectedWorkflow.edges,
        tags: selectedWorkflow.tags || [],
        parent_id: selectedWorkflow.id,
        version: 1,
      });
      
      setSelectedWorkflow(forkedWorkflow);
      setShowForkModal(false);
      addToast(`Forked workflow "${selectedWorkflow.name}" successfully`);
    } catch (error) {
      console.error('Error forking workflow:', error);
      addToast('Failed to fork workflow', 'error');
    }
  };

  return (
    <div className="app-container">
      <Header 
        onNewWorkflow={() => setShowNewWorkflowModal(true)}
        onForkWorkflow={() => setShowForkModal(true)}
        currentWorkflow={selectedWorkflow}
      />
      
      <div className="main-content">
        <Sidebar 
          selectedWorkflowId={selectedWorkflow?.id}
          onSelectWorkflow={setSelectedWorkflow}
          onNewWorkflow={() => setShowNewWorkflowModal(true)}
        />
        
        {selectedWorkflow ? (
          <WorkflowEditor 
            workflow={selectedWorkflow} 
            onNodeSelect={handleNodeSelect}
            addToast={addToast}
          />
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">⚙️</div>
            <h2 className="empty-state-title">No Workflow Selected</h2>
            <p className="empty-state-description">
              Select an existing workflow from the sidebar or create a new one to get started.
            </p>
            <button 
              className="button button-primary" 
              onClick={() => setShowNewWorkflowModal(true)}
            >
              Create New Workflow
            </button>
          </div>
        )}
        
        {selectedNode && (
          <NodePropertiesPanel 
            node={selectedNode}
            isOpen={propertiesPanelOpen}
            onClose={() => setPropertiesPanelOpen(false)}
            addToast={addToast}
          />
        )}
      </div>
      
      {showNewWorkflowModal && (
        <ModalNewWorkflow 
          onClose={() => setShowNewWorkflowModal(false)}
          onSubmit={handleCreateWorkflow}
        />
      )}
      
      {showForkModal && selectedWorkflow && (
        <ModalFork 
          workflow={selectedWorkflow}
          onClose={() => setShowForkModal(false)}
          onSubmit={handleForkWorkflow}
        />
      )}
      
      <div className="toast-container">
        {toasts.map(toast => (
          <Toast 
            key={toast.id} 
            message={toast.message} 
            type={toast.type} 
          />
        ))}
      </div>
    </div>
  );
}

