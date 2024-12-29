/**
 * @file:        Indicators.jsx
 * @project:     vehicle-dashboard
 * @author:      Saif Mahmud
 * @date:        2024-12-27
 * @version:     0.1
 * @contact:     msaifofficial@gmail.com
 *
 * @description: Indicators component for the vehicle dashboard.
 */

import React, { useState, useEffect } from 'react';
import parkingBreakIndicatorGray from "../images/parking_break_gray.png";
import parkingBreakIndicatorRed from "../images/parking_break_red.png";
import checkEngineIndicatorGray from "../images/check_engine_gray.png";
import checkEngineIndicatorRed from "../images/check_engine_red.png";
import motorStatusIndicatorGray from "../images/motor_status_gray.png";
import motorStatusIndicatorRed from "../images/motor_status_red.png";
import batteryPercentageIndicatorGray from "../images/battery_percentage_gray.png";
import batteryPercentageIndicatorRed from "../images/battery_percentage_red.png";

function Indicators() {

  const [indicator, setIndicator] = useState('gray'); // Default to 'gray'

  // Fetch the current indicator state on load
  useEffect(() => {
    // Open WebSocket connection
    const wsUrl = import.meta.env.VITE_BACKEND_URL.replace(/^http(s)?:/, 'ws$1:');
    const ws = new WebSocket(wsUrl); // it will be ws://localhost:3001/

    // Listen for messages from the server
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.indicator) {
        setIndicator(data.indicator);
      }
    };

    // Cleanup WebSocket connection on component unmount
    return () => ws.close();
  }, []);

  const grayIndicators = [
    parkingBreakIndicatorGray,
    checkEngineIndicatorGray,
    motorStatusIndicatorGray,
    batteryPercentageIndicatorGray,
  ];

  const redIndicators = [
    parkingBreakIndicatorRed,
    checkEngineIndicatorRed,
    motorStatusIndicatorRed,
    batteryPercentageIndicatorRed,
  ];

  let choosenIndicators;
  if (indicator === 'red') {
    choosenIndicators = redIndicators;
  } else {
    choosenIndicators = grayIndicators;
  }

  let defaultWidth = "w-6";

  return (
    <div className="grid grid-cols-6">
      {choosenIndicators.map((indicator, index) => (
        <div
          key={index}
          className={`flex flex-col border-2 rounded-sm border-customGray justify-center items-center p-2 mr-px`}
        >
          <img
            src={indicator}
            alt="indicator"
            className={`${indicator === parkingBreakIndicatorGray ? "w-8" : defaultWidth} h-10`}
          />
        </div>
      ))}
    </div>
  );
}

export default Indicators;
