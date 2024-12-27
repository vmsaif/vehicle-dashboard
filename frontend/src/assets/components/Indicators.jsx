import React from "react";
import parkingBreakIndicatorGrey from "../images/parking_break_grey.png";
import parkingBreakIndicatorRed from "../images/parking_break_red.png";
import checkEngineIndicatorGrey from "../images/check_engine_grey.png";
import checkEngineIndicatorRed from "../images/check_engine_red.png";
import motorStatusIndicatorGrey from "../images/motor_status_grey.png";
import motorStatusIndicatorRed from "../images/motor_status_red.png";
import batteryPercentageIndicatorGrey from "../images/battery_percentage_grey.png";
import batteryPercentageIndicatorRed from "../images/battery_percentage_red.png";

function Indicators() {
  const greyIndicators = [
    parkingBreakIndicatorGrey,
    checkEngineIndicatorGrey,
    motorStatusIndicatorGrey,
    batteryPercentageIndicatorGrey,
  ];

  return (
    <div className="grid grid-cols-4">
      {greyIndicators.map((indicator, index) => (
        <div
          key={index}
          className={`flex flex-col border-2 border-gray-800 justify-center items-center p-2`}
        >
          <img src={indicator} alt="indicator" className="w-9 h-14" />
          <div className="text-sm text-gray-400"></div>

        </div>
      ))}
    </div>
  );
}

export default Indicators;