import { createContext, useContext } from 'react';

// Create WebSocket connection
const room = new WebsimSocket();

// Create React context
const RoomContext = createContext(room);

// Custom hook to use the room context
export function useRoom() {
  return useContext(RoomContext);
}

// Provider component
export function RoomProvider({ children }) {
  return (
    <RoomContext.Provider value={room}>
      {children}
    </RoomContext.Provider>
  );
}

