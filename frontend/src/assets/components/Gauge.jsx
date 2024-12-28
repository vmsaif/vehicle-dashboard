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

import React from 'react';
import { RadialGauge } from 'react-canvas-gauges';

const Gauge = ({ value, units, majorTicks, minValue, maxValue }) => {
  return (
    <RadialGauge
      units={units}
      value={value}
      minValue={minValue}
      maxValue={maxValue}
      majorTicks={majorTicks}
      minorTicks={1}
      highlightsWidth={0}
      width={200}
      height={200}
      animationRule='elastic'
      animationDuration='500'
      animatedValue={true}
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

