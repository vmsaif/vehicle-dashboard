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

import React from 'react';
import { useWebSocket } from '../../hooks/useWebSocket.js';
import parkingBreakIndicatorGray from "../images/parking_break_gray.png";
import parkingBreakIndicatorRed from "../images/parking_break_red.png";
import checkEngineIndicatorGray from "../images/check_engine_gray.png";
import checkEngineIndicatorRed from "../images/check_engine_red.png";
import motorStatusIndicatorGray from "../images/motor_status_gray.png";
import motorStatusIndicatorRed from "../images/motor_status_red.png";
import batteryPercentageIndicatorGray from "../images/battery_percentage_gray.png";
import batteryPercentageIndicatorRed from "../images/battery_percentage_red.png";

function Indicators() {
  const indicators = useWebSocket();

  const getIndicatorImage = (type) => {
    switch (type) {

      case 'parkingBreak':
        return indicators.parkingBreak === 'red' ? parkingBreakIndicatorRed : parkingBreakIndicatorGray;
      case 'checkEngine':
        return indicators.checkEngine === 'red' ? checkEngineIndicatorRed : checkEngineIndicatorGray;
      case 'motorStatus':
        return indicators.motorStatus === 'red' ? motorStatusIndicatorRed : motorStatusIndicatorGray;
      case 'batteryPercentage':
        return indicators.batteryPercentage === 'red' ? batteryPercentageIndicatorRed : batteryPercentageIndicatorGray;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-6">
      <div className="flex flex-col border-2 rounded-sm border-customGray justify-center items-center p-2 mr-px">
        <img src={getIndicatorImage('parkingBreak')} alt="Parking Break Indicator" className="h-16" />
      </div>
      <div className="flex flex-col border-2 rounded-sm border-customGray justify-center items-center p-2 mr-px">
        <img src={getIndicatorImage('checkEngine')} alt="Check Engine Indicator" className="h-16" />
      </div>
      <div className="flex flex-col border-2 rounded-sm border-customGray justify-center items-center p-2 mr-px">
        <img src={getIndicatorImage('motorStatus')} alt="Motor Status Indicator" className="h-16" />
      </div>
      <div className="flex flex-col border-2 rounded-sm border-customGray justify-center items-center p-2 mr-px">
        <img src={getIndicatorImage('batteryPercentage')} alt="Battery Percentage Indicator" className="h-16" />
      </div>
    </div>
  );
}

export default Indicators;
