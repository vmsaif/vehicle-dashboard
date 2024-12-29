/**
 * @file:        BottomRowButtons.jsx
 * @project:     vehicle-dashboard
 * @author:      Saif Mahmud
 * @date:        2024-12-28
 * @version:     0.1
 * @contact:     msaifofficial@gmail.com
 *
 * @description: description here
 */

import React from "react";
import gearRatio from "../images/gear_ratio.png";
import motorStatusIndicatorGray from "../images/motor_status_gray.png";
import batteryTemp from "../images/battery_temparature_gray.png";

function BottomRowButtons() {
  return (
    <div className="grid grid-cols-3 w-fit">
      <div className="flex flex-col border-2 rounded-sm border-customGray justify-center items-center p-2 mr-px">
        <img src={gearRatio} alt="gear ratio" className="h-16" />
      </div>

      <div className="flex flex-col border-2 rounded-sm border-customGray justify-center items-center p-2 mr-px">
        <img src={motorStatusIndicatorGray} alt="motor status" className="h-16" />
      </div>

      <div className="flex flex-col border-2 rounded-sm border-customGray justify-center items-center p-2 mr-px">
        <img src={batteryTemp} alt="battery temperature" className="h-16" />
      </div>
    </div>
  );
}

export default BottomRowButtons;
