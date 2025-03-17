import React, { useState, useEffect } from 'react';
import { useRoom } from '../hooks/useRoom.js';

export function NodePropertiesPanel({ node, isOpen, onClose, addToast }) {
  const room = useRoom();
  const [formData, setFormData] = useState({});
  const [activeTab, setActiveTab] = useState('properties');
  
  useEffect(() => {
    if (node) {
      setFormData(node.data.params || {});
    }
  }, [node]);
  
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleCodeChange = (field, value) => {
    handleChange(field, value);
  };
  
  const handleSave = async () => {
    try {
      const updatedNodes = room.collection('workflow')
        .getList()
        .find(w => w.nodes.some(n => n.id === node.id))
        ?.nodes.map(n => {
          if (n.id === node.id) {
            return {
              ...n,
              data: {
                ...n.data,
                params: formData
              }
            };
          }
          return n;
        });
      
      if (updatedNodes) {
        await room.collection('workflow').update(
          room.collection('workflow')
            .getList()
            .find(w => w.nodes.some(n => n.id === node.id))
            .id,
          { nodes: updatedNodes }
        );
        
        addToast('Node updated successfully');
      }
    } catch (error) {
      console.error('Error updating node:', error);
      addToast('Error updating node', 'error');
    }
  };
  
  if (!node || !isOpen) return null;
  
  const config = node.data.config;
  
  return (
    <div className={`node-properties ${isOpen ? 'open' : ''}`}>
      <div className="properties-header">
        <h3 className="properties-title">{config.label} Properties</h3>
        <button className="properties-close" onClick={onClose}>×</button>
      </div>
      
      <div className="tabs">
        <div 
          className={`tab ${activeTab === 'properties' ? 'active' : ''}`} 
          onClick={() => setActiveTab('properties')}
        >
          Properties
        </div>
        <div 
          className={`tab ${activeTab === 'code' ? 'active' : ''}`} 
          onClick={() => setActiveTab('code')}
        >
          Custom Code
        </div>
      </div>
      
      {activeTab === 'properties' && (
        <div className="node-form">
          {config.fields?.map(field => (
            <div className="form-group" key={field.key}>
              <label className="form-label">{field.label}</label>
              
              {field.type === 'text' && (
                <input
                  type="text"
                  className="form-control"
                  value={formData[field.key] || ''}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                />
              )}
              
              {field.type === 'number' && (
                <input
                  type="number"
                  className="form-control"
                  value={formData[field.key] || ''}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                />
              )}
              
              {field.type === 'select' && (
                <select
                  className="form-control"
                  value={formData[field.key] || ''}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                >
                  <option value="">Select...</option>
                  {field.options?.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}
              
              {field.type === 'boolean' && (
                <div className="form-check">
                  <input
                    type="checkbox"
                    checked={formData[field.key] || false}
                    onChange={(e) => handleChange(field.key, e.target.checked)}
                    id={`field-${field.key}`}
                  />
                  <label htmlFor={`field-${field.key}`}>
                    {field.checkLabel || 'Enabled'}
                  </label>
                </div>
              )}
              
              {field.type === 'textarea' && (
                <textarea
                  className="form-control"
                  value={formData[field.key] || ''}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  rows={3}
                />
              )}
            </div>
          ))}
        </div>
      )}
      
      {activeTab === 'code' && (
        <div className="node-form">
          <div className="form-group">
            <label className="form-label">Custom JS transformation</label>
            <p style={{ fontSize: '0.75rem', marginBottom: '0.5rem' }}>
              Write custom JavaScript to transform data from this node.
              Use the `input` variable to access data from previous nodes.
            </p>
            <textarea
              className="code-editor"
              value={formData.customCode || '// Example: \n// return { ...input, transformed: true };'}
              onChange={(e) => handleCodeChange('customCode', e.target.value)}
              rows={10}
            />
          </div>
        </div>
      )}
      
      <div className="modal-footer">
        <button className="button button-secondary" onClick={onClose}>
          Cancel
        </button>
        <button className="button button-primary" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}

