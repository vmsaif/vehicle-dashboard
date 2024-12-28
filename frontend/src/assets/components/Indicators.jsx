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

    console.log("Hello, World!");


import React from "react";
import parkingBreakIndicatorGray from "../images/parking_break_gray.png";
import parkingBreakIndicatorRed from "../images/parking_break_red.png";
import checkEngineIndicatorGray from "../images/check_engine_gray.png";
import checkEngineIndicatorRed from "../images/check_engine_red.png";
import motorStatusIndicatorGray from "../images/motor_status_gray.png";
import motorStatusIndicatorRed from "../images/motor_status_red.png";
import batteryPercentageIndicatorGray from "../images/battery_percentage_gray.png";
import batteryPercentageIndicatorRed from "../images/battery_percentage_red.png";

function Indicators() {
  const grayIndicators = [
    parkingBreakIndicatorGray,
    checkEngineIndicatorGray,
    motorStatusIndicatorGray,
    batteryPercentageIndicatorGray,
  ];

  return (
    <div className="grid grid-cols-6">
      {grayIndicators.map((indicator, index) => (
        <div
          key={index}
          className={`flex flex-col border-2 rounded-sm border-customGray justify-center items-center p-2 mr-px`}
        >
          <img src={indicator} alt="indicator" className="w-6 h-10" />


        </div>
      ))}
    </div>
  );
}

export default Indicators;