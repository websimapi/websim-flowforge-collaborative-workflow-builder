import { NODE_TYPES } from '../constants/nodeTypes.js';

export function getNodeConfig(type) {
  return NODE_TYPES.find(node => node.type === type) || {
    type,
    label: 'Unknown Node',
    category: 'unknown',
    icon: '?',
    description: 'Unknown node type',
    fields: []
  };
}

