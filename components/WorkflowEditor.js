import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactFlow, { 
  MiniMap, 
  Controls, 
  Background, 
  useNodesState, 
  useEdgesState, 
  addEdge,
  Panel
} from 'reactflow';
import { useRoom } from '../hooks/useRoom.js';
import { CustomNode } from './nodes/CustomNode.js';
import { getNodeConfig } from '../utils/nodes.js';
import { CollaboratorCursors } from './CollaboratorCursors.js';

const nodeTypes = {
  customNode: CustomNode
};

export function WorkflowEditor({ workflow, onNodeSelect, addToast }) {
  const room = useRoom();
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [isDirty, setIsDirty] = useState(false);
  
  // Initialize nodes and edges from workflow
  useEffect(() => {
    if (workflow) {
      try {
        const workflowNodes = Array.isArray(workflow.nodes) ? workflow.nodes : [];
        const workflowEdges = Array.isArray(workflow.edges) ? workflow.edges : [];
        
        setNodes(workflowNodes.map(node => ({
          ...node,
          data: {
            ...node.data,
            config: getNodeConfig(node.type),
          }
        })));
        setEdges(workflowEdges);
        setIsDirty(false);
      } catch (error) {
        console.error('Error loading workflow:', error);
        addToast('Error loading workflow', 'error');
      }
    }
  }, [workflow?.id]);

  // Track changes and mark as dirty
  useEffect(() => {
    if (workflow && (JSON.stringify(workflow.nodes) !== JSON.stringify(nodes) || 
                      JSON.stringify(workflow.edges) !== JSON.stringify(edges))) {
      setIsDirty(true);
    }
  }, [nodes, edges]);

  // Save workflow changes
  const saveWorkflow = async () => {
    if (!workflow || !isDirty) return;
    
    try {
      await room.collection('workflow').update(workflow.id, {
        nodes,
        edges,
        version: (workflow.version || 0) + 1
      });
      
      setIsDirty(false);
      addToast('Workflow saved successfully');
    } catch (error) {
      console.error('Error saving workflow:', error);
      addToast('Error saving workflow', 'error');
    }
  };

  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge(params, eds));
  }, []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const nodeData = JSON.parse(event.dataTransfer.getData('application/reactflow'));

      // Check if the dropped element is valid
      if (!nodeData || !nodeData.type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const nodeConfig = getNodeConfig(nodeData.type);
      
      const newNode = {
        id: `${nodeData.type}-${Date.now()}`,
        type: 'customNode',
        position,
        data: { 
          label: nodeConfig.label,
          type: nodeData.type,
          icon: nodeConfig.icon,
          config: nodeConfig,
          params: {}
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  // Share cursor position
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!reactFlowWrapper.current) return;
      
      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const y = e.clientY - bounds.top;
      
      room.party.updatePresence({
        cursor: { x, y },
        viewingWorkflow: workflow?.id
      });
    };

    const wrapperEl = reactFlowWrapper.current;
    if (wrapperEl) {
      wrapperEl.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (wrapperEl) {
        wrapperEl.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [reactFlowWrapper.current, workflow?.id]);

  // Handle node selection
  const onNodeClick = (event, node) => {
    onNodeSelect(node);
  };

  return (
    <div className="flow-container" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        className="custom-handles"
        fitView
      >
        <Controls />
        <MiniMap />
        <Background gap={12} size={1} />
        
        <Panel position="top-right" className="toolbar">
          {isDirty && (
            <button className="button button-primary" onClick={saveWorkflow}>
              Save Changes
            </button>
          )}
        </Panel>
      </ReactFlow>
      
      <CollaboratorCursors currentWorkflowId={workflow?.id} />
    </div>
  );
}

