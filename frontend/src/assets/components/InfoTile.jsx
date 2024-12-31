/**
 * @file:        InfoTile.jsx
 * @project:     vehicle-dashboard
 * @author:      Saif Mahmud
 * @date:        2024-12-27
 * @version:     0.1
 * @contact:     msaifofficial@gmail.com
 *
 * @description: InfoTile component for the vehicle dashboard.
 */

import React from "react";
import gearRatio from "../images/gear_ratio.png";
import batteryLow from "../images/battery_percentage_gray.png";
import batteryTemp from "../images/battery_temperature_gray.png";
import motorRPM from "../images/motor_status_gray.png";

import { useSupabaseService } from '../../hooks/useSupabaseService.js';

function InfoTile ({ vehicleId, value, label }) {
  const {infoTiles} = useSupabaseService(vehicleId);
  let image = "";
  let fontMargin = "ml-0";

  if (label === "") {
    image = gearRatio;
    value = infoTiles.gear_ratio;
  } else if (label === "%") {
    image = batteryLow;
    value = infoTiles.battery_percentage;
  } else if (label === "°C") {
    image = batteryTemp;
    value = infoTiles.battery_temperature;
    fontMargin = "-ml-4";
  } else if (label === "RPM") {
    value = infoTiles.motor_rpm;
    image = motorRPM;

  }
  return (
    <div className="flex flex-col items-center p-2 mr-px border-2 rounded-sm border-customGray justify-center">
      <img src={image} alt={label} className="h-12" />
      <div className={`text-xs mt-2 font-semibold ${fontMargin}`}>
        {value}
      </div>
      <div className={`text-sm text-gray-400 ${fontMargin}`}>
        {label}
      </div>
    </div>
  );
}

export default InfoTile;