import React from 'react';
import { NODE_TYPES } from '../constants/nodeTypes.js';

export function NodePalette() {
  const handleDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ type: nodeType.type }));
    event.dataTransfer.effectAllowed = 'move';
  };

  const nodeCategories = {
    'Triggers': NODE_TYPES.filter(n => n.category === 'trigger'),
    'Actions': NODE_TYPES.filter(n => n.category === 'action'),
    'Logic': NODE_TYPES.filter(n => n.category === 'logic'),
    'Data': NODE_TYPES.filter(n => n.category === 'data'),
  };

  return (
    <div>
      {Object.entries(nodeCategories).map(([category, nodes]) => (
        <div key={category} className="palette-group">
          <div className="palette-group-title">{category}</div>
          {nodes.map(nodeType => (
            <div
              key={nodeType.type}
              className="palette-item"
              draggable
              onDragStart={(e) => handleDragStart(e, nodeType)}
            >
              <div className="palette-item-icon">
                {nodeType.icon}
              </div>
              <div>{nodeType.label}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

