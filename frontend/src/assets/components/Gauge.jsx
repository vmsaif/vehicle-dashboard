/**
 * @file:        Gauges.jsx
 * @project:     vehicle-dashboard
 * @author:      Saif Mahmud
 * @date:        2024-12-26
 * @version:     0.1
 * @contact:     msaifofficial@gmail.com
 *
 * @description: Gauge component for the vehicle dashboard.
 */

import React from "react";
import { RadialGauge } from "react-canvas-gauges";
import { useSupabaseService } from '../../hooks/useSupabaseService.js';


const Gauge = ({ vehicleId, value, units, majorTicks, minValue, maxValue }) => {


  const allData = useSupabaseService(vehicleId);
  if (units === "kW") {
    value = allData.gaugeData.power_consumption;
  } else if (units === "RPM") {
    value = allData.gaugeData.motor_rpm;
  }


  return (
    <RadialGauge
      units={units}
      value={value}
      minValue={minValue}
      maxValue={maxValue}
      majorTicks={majorTicks}
      minorTicks={1}
      highlightsWidth={0}
      width={300}
      height={300}
      // listeners={
      //   {
      //     value: function (newValue, oldValue) {
      //       console.log(newValue, oldValue);
      //     }
      //   }
      // }
      animation={true}
      animationDuration={2500} // Set the duration of the animation
      // animationRule="linier" // Set the rule of the animation

      colorPlate="#333333"
      colorUnits="#808080"
      colorNumbers="#808080"
      colorMajorTicks="#333333"
      needleType="arrow"
      colorNeedle="#676767"
      colorNeedleEnd="#ffffff"
      colorNeedleShadowUp="#676767"
      colorNeedleShadowDown="#ffffff"
      needleShadow={false}
      needleStart="7"
      needleEnd="75"
      colorValueText="#FFFFFF"
      colorValueTextShadow="false"
      colorBorderOuter="#1A1A1A"
      colorBorderOuterEnd="#1A1A1A"
      colorBorderMiddle="#787878"
      colorBorderMiddleEnd="#787878"
      colorBorderInner="#1A1A1A"
      colorBorderInnerEnd="#1A1A1A"
      valueBoxWidth={1}
      valueInt={1}
      valueDec={0}
      colorValueBoxRect="#333333"
      colorValueBoxRectEnd="#333333"
      colorValueBoxBackground="#333333"
      colorValueBoxShadow="#333333"
      needleCircleOuter={false}
      needleCircleInner={false}
      borderOuterWidth="2"
      borderInnerWidth="4"
      numbersMargin={-15}
      fontUnitsWeight="bold"
      barStartPosition="middle"
      valueBox={true}
    />
  );
};

export default Gauge;
