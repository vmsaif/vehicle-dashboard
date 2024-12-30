/**
 * @file:        useWebSocket.js
 * @project:     vehicle-dashboard
 * @author:      Saif Mahmud
 * @date:        2024-12-29
 * @version:     0.1
 * @contact:     msaifofficial@gmail.com
 *
 * @description: Custom hook to manage WebSocket connection
 */

import { useEffect, useState } from 'react';

/**
 * Custom hook to manage WebSocket connection and state updates.
 * @returns {object} The current state of all indicators.
 */
export function useWebSocket() {
  const [indicators, setIndicators] = useState({
    parkingBreak: 'gray',
    checkEngine: 'gray',
    motorStatus: 'gray',
    batteryPercentage: 'gray',
  });

  useEffect(() => {
    // Open WebSocket connection
    const wsUrl = import.meta.env.VITE_BACKEND_URL.replace(/^http(s)?:/, 'ws$1:');
    const ws = new WebSocket(wsUrl);

    // Listen for messages from the backend
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.indicator && data.type) {
        // Create a new state object by copying the previous state
        let updatedIndicators = { ...indicators };

        // Update the specific indicator type with the new value
        updatedIndicators[data.type] = data.indicator;

        // Set the new state
        setIndicators(updatedIndicators); // replce the state into indicators object
      }
    };

    // Cleanup WebSocket connection on component unmount
    return () => ws.close();
  }, [indicators]);

  return indicators;
}