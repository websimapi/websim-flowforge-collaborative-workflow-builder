import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

export const CustomNode = memo(({ data, isConnectable, selected }) => {
  return (
    <div className={`node ${selected ? 'selected' : ''}`}>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      
      <div className="node-header">
        <div className="node-icon">
          {data.icon}
        </div>
        <div className="node-title">
          {data.label}
        </div>
      </div>
      
      <div className="node-content">
        {data.params && Object.entries(data.params).length > 0 ? (
          <div>
            {Object.entries(data.params).map(([key, value]) => (
              <div key={key} style={{ fontSize: '0.75rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                <strong>{key}:</strong> {String(value).substring(0, 15)}{String(value).length > 15 ? '...' : ''}
              </div>
            ))}
          </div>
        ) : (
          <div>Configure this node</div>
        )}
      </div>
      
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
});

