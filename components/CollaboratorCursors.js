import React, { useSyncExternalStore } from 'react';
import { useRoom } from '../hooks/useRoom.js';

export function CollaboratorCursors({ currentWorkflowId }) {
  const room = useRoom();
  
  const presence = useSyncExternalStore(
    room.party.subscribePresence,
    () => room.party.presence
  );
  
  const peers = useSyncExternalStore(
    room.party.subscribe,
    () => room.party.peers
  );
  
  // Get the current client ID
  const currentClientId = room.party.client.id;
  
  return (
    <>
      {Object.entries(presence).map(([clientId, data]) => {
        // Skip rendering cursor for the current user
        if (clientId === currentClientId) return null;
        
        // Skip users not viewing the current workflow
        if (data.viewingWorkflow !== currentWorkflowId) return null;
        
        // Get the username from peers
        const username = peers[clientId]?.username || 'Unknown';
        
        // Skip if no cursor data
        if (!data.cursor) return null;
        
        return (
          <div 
            key={clientId}
            className="cursor"
            style={{
              transform: `translate(${data.cursor.x}px, ${data.cursor.y}px)`,
              // Generate a unique color based on client ID
              color: `hsl(${clientId.charCodeAt(0) * 10 % 360}, 70%, 50%)`
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7,2L17,12L7,22V2Z" />
            </svg>
            <div 
              className="cursor-name"
              style={{
                backgroundColor: `hsl(${clientId.charCodeAt(0) * 10 % 360}, 70%, 50%)`
              }}
            >
              {username}
            </div>
          </div>
        );
      })}
    </>
  );
}

