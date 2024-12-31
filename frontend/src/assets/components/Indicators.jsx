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
import { useSupabaseService } from '../../hooks/useSupabaseService.js';
import parkingBrakeIndicatorGray from '../images/parking_break_gray.png';
import parkingBrakeIndicatorRed from '../images/parking_break_red.png';
import checkEngineIndicatorGray from '../images/check_engine_gray.png';
import checkEngineIndicatorRed from '../images/check_engine_red.png';
import motorStatusIndicatorGray from '../images/motor_status_gray.png';
import motorStatusIndicatorRed from '../images/motor_status_red.png';
import batteryLowIndicatorGray from '../images/battery_percentage_gray.png';
import batteryLowIndicatorRed from '../images/battery_percentage_red.png';

function Indicators({ vehicleId }) {
  const { indicators } = useSupabaseService(vehicleId);

  const getIndicatorImage = (type) => {
    switch (type) {
      case 'parking_brake':
        return indicators.parking_brake
          ? parkingBrakeIndicatorRed
          : parkingBrakeIndicatorGray;
      case 'check_engine':
        return indicators.check_engine
          ? checkEngineIndicatorRed
          : checkEngineIndicatorGray;
      case 'motor_status':
        return indicators.motor_status
          ? motorStatusIndicatorRed
          : motorStatusIndicatorGray;
      case 'battery_low':
        return indicators.battery_low
          ? batteryLowIndicatorRed
          : batteryLowIndicatorGray;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-6">
      <div className="flex flex-col border-2 rounded-sm border-customGray justify-center items-center p-2 mr-px">
        <img
          src={getIndicatorImage('parking_brake')}
          alt="Parking Break Indicator"
          className="h-16"
        />
      </div>
      <div className="flex flex-col border-2 rounded-sm border-customGray justify-center items-center p-2 mr-px">
        <img
          src={getIndicatorImage('check_engine')}
          alt="Check Engine Indicator"
          className="h-16"
        />
      </div>
      <div className="flex flex-col border-2 rounded-sm border-customGray justify-center items-center p-2 mr-px">
        <img
          src={getIndicatorImage('motor_status')}
          alt="Motor Status Indicator"
          className="h-16"
        />
      </div>
      <div className="flex flex-col border-2 rounded-sm border-customGray justify-center items-center p-2 mr-px">
        <img
          src={getIndicatorImage('battery_low')}
          alt="Battery Percentage Indicator"
          className="h-16"
        />
      </div>
    </div>
  );
}

export default Indicators;
