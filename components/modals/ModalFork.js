import React, { useState } from 'react';

export function ModalFork({ workflow, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: `Fork of ${workflow.name}`,
    description: workflow.description,
    tags: workflow.tags || []
  });
  const [tagInput, setTagInput] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };
  
  const removeTag = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };
  
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3 className="modal-title">Fork Workflow</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                placeholder={`Fork of ${workflow.name}`}
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                className="form-control"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe what this workflow does..."
                rows={3}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Tags</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  className="form-control"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Add a tag"
                />
                <button 
                  type="button" 
                  className="button button-secondary"
                  onClick={handleAddTag}
                >
                  Add
                </button>
              </div>
              
              {formData.tags.length > 0 && (
                <div style={{ marginTop: '0.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                  {formData.tags.map(tag => (
                    <span key={tag} className="tag">
                      {tag}
                      <button 
                        type="button"
                        style={{ 
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          marginLeft: '0.25rem',
                          color: '#64748b'
                        }}
                        onClick={() => removeTag(tag)}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: '#f1f5f9', borderRadius: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: '#64748b' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <span>Forking will create a copy of the workflow that you can modify independently.</span>
              </div>
            </div>
          </div>
          
          <div className="modal-footer">
            <button type="button" className="button button-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="button button-primary">
              Fork Workflow
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

