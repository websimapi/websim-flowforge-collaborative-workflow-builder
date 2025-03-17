import React from 'react';

export const NODE_TYPES = [
  // Trigger Nodes
  {
    type: 'webhook',
    label: 'Webhook',
    category: 'trigger',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
      </svg>
    ),
    description: 'Trigger on an incoming webhook',
    fields: [
      { key: 'path', label: 'Path', type: 'text', placeholder: '/my-webhook' },
      { key: 'method', label: 'HTTP Method', type: 'select', options: [
        { value: 'POST', label: 'POST' },
        { value: 'GET', label: 'GET' },
        { value: 'PUT', label: 'PUT' },
        { value: 'DELETE', label: 'DELETE' }
      ] }
    ]
  },
  {
    type: 'schedule',
    label: 'Schedule',
    category: 'trigger',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
    ),
    description: 'Trigger on a schedule',
    fields: [
      { key: 'schedule', label: 'Schedule (cron)', type: 'text', placeholder: '0 * * * *' },
      { key: 'timezone', label: 'Timezone', type: 'text', placeholder: 'UTC' }
    ]
  },
  {
    type: 'form',
    label: 'Form',
    category: 'trigger',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    ),
    description: 'Collect data using a form',
    fields: [
      { key: 'title', label: 'Form Title', type: 'text', placeholder: 'Contact Form' },
      { key: 'fields', label: 'Fields (JSON)', type: 'textarea', placeholder: '[{"name": "email", "label": "Email", "type": "email", "required": true}]' }
    ]
  },
  
  // Action Nodes
  {
    type: 'http',
    label: 'HTTP Request',
    category: 'action',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="14.31" y1="8" x2="20.05" y2="17.94"></line>
        <line x1="9.69" y1="8" x2="21.17" y2="8"></line>
        <line x1="7.38" y1="12" x2="13.12" y2="2.06"></line>
        <line x1="9.69" y1="16" x2="3.95" y2="6.06"></line>
        <line x1="14.31" y1="16" x2="2.83" y2="16"></line>
        <line x1="16.62" y1="12" x2="10.88" y2="21.94"></line>
      </svg>
    ),
    description: 'Make an HTTP request',
    fields: [
      { key: 'url', label: 'URL', type: 'text', placeholder: 'https://api.example.com' },
      { key: 'method', label: 'HTTP Method', type: 'select', options: [
        { value: 'GET', label: 'GET' },
        { value: 'POST', label: 'POST' },
        { value: 'PUT', label: 'PUT' },
        { value: 'DELETE', label: 'DELETE' }
      ] },
      { key: 'headers', label: 'Headers (JSON)', type: 'textarea', placeholder: '{"Content-Type": "application/json"}' },
      { key: 'body', label: 'Body', type: 'textarea', placeholder: '{"key": "value"}' }
    ]
  },
  {
    type: 'email',
    label: 'Email',
    category: 'action',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
      </svg>
    ),
    description: 'Send an email',
    fields: [
      { key: 'to', label: 'To', type: 'text', placeholder: 'recipient@example.com' },
      { key: 'subject', label: 'Subject', type: 'text', placeholder: 'Hello from FlowForge!' },
      { key: 'body', label: 'Body', type: 'textarea', placeholder: 'Email content goes here...' }
    ]
  },
  {
    type: 'delay',
    label: 'Delay',
    category: 'action',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
    ),
    description: 'Add a delay before continuing',
    fields: [
      { key: 'delay', label: 'Delay (seconds)', type: 'number', placeholder: '60' }
    ]
  },
  
  // Logic Nodes
  {
    type: 'condition',
    label: 'Condition',
    category: 'logic',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 3h5v5"></path>
        <path d="M8 3H3v5"></path>
        <path d="M3 16v5h5"></path>
        <path d="M16 21h5v-5"></path>
      </svg>
    ),
    description: 'Branch based on a condition',
    fields: [
      { key: 'condition', label: 'Condition', type: 'text', placeholder: 'input.value > 10' }
    ]
  },
  {
    type: 'switch',
    label: 'Switch',
    category: 'logic',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 3 21 3 21 9"></polyline>
        <polyline points="9 21 3 21 3 15"></polyline>
        <line x1="21" y1="3" x2="14" y2="10"></line>
        <line x1="3" y1="21" x2="10" y2="14"></line>
      </svg>
    ),
    description: 'Route based on a value',
    fields: [
      { key: 'field', label: 'Field to Switch On', type: 'text', placeholder: 'status' },
      { key: 'cases', label: 'Cases (JSON)', type: 'textarea', placeholder: '{"success": "Success Path", "error": "Error Path"}' }
    ]
  },
  {
    type: 'loop',
    label: 'Loop',
    category: 'logic',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4v7a4 4 0 0 0 4 4h12"></path>
        <path d="M20 20v-7a4 4 0 0 0-4-4H4"></path>
        <path d="M17 15l3 3-3 3"></path>
        <path d="M7 9l-3-3 3-3"></path>
      </svg>
    ),
    description: 'Iterate over a collection',
    fields: [
      { key: 'collection', label: 'Collection', type: 'text', placeholder: 'items' },
      { key: 'maxIterations', label: 'Max Iterations', type: 'number', placeholder: '100' }
    ]
  },
  
  // Data Nodes
  {
    type: 'transform',
    label: 'Transform',
    category: 'data',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20h4l8-16h4"></path>
        <path d="M15 4h6v6"></path>
      </svg>
    ),
    description: 'Transform data with JavaScript',
    fields: [
      { key: 'code', label: 'JavaScript Code', type: 'textarea', placeholder: 'return { ...input, transformed: true };' }
    ]
  },
  {
    type: 'filter',
    label: 'Filter',
    category: 'data',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
      </svg>
    ),
    description: 'Filter array items based on a condition',
    fields: [
      { key: 'array', label: 'Array Field', type: 'text', placeholder: 'items' },
      { key: 'condition', label: 'Condition', type: 'text', placeholder: 'item.value > 10' }
    ]
  },
  {
    type: 'merge',
    label: 'Merge',
    category: 'data',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3"></path>
        <path d="M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3"></path>
        <path d="M12 14h.01"></path>
        <path d="M12 2v20"></path>
      </svg>
    ),
    description: 'Merge multiple inputs',
    fields: [
      { key: 'strategy', label: 'Merge Strategy', type: 'select', options: [
        { value: 'shallow', label: 'Shallow' },
        { value: 'deep', label: 'Deep' },
        { value: 'array', label: 'Array' }
      ] }
    ]
  }
];

