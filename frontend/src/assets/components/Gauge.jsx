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
import { GaugeComponent } from 'react-gauge-component';
import { useSupabaseService } from '../../hooks/useSupabaseService.js';

const Gauge = ({ vehicleId, units, majorTicks, minValue, maxValue }) => {
  let value = minValue;
  const allData = useSupabaseService(vehicleId);
  if (units === "kW") {
    value = allData.gaugeData.power_consumption;
  } else if (units === "RPM") {
    value = allData.gaugeData.motor_rpm;
  }

  let minValueDigitCount = Math.abs(minValue).toString().length;
  let margin_left = 0.13;
  let margin_right = 0.14;

  if (minValueDigitCount < 3) {
    margin_left = 0.11;
    margin_right = 0.09;
  }

  return (
    <div>
      <GaugeComponent
        type="radial"
        value={value} // Value
        minValue={minValue} // Minimum value
        maxValue={maxValue} // Maximum value
        marginInPercent={{
          top: 0.06,
          bottom: 0.00,
          left: margin_left,
          right: margin_right
        }}
        style={{
          width: "200px", // Width of the gauge
          height: "195px", // Height of the gauge
          border: "3px solid #1A1A1A",
          borderRadius: "50%", // Make the border circular
          boxShadow: "0 0 0 4px #787878, 0 0 0 7px #1A1A1A",
        }}

        arc={{
          cornerRadius: 10, // Smooth corner radius
          padding: 0.0, // Padding between subArcs
          width: 0.0, // Arc width as a percentage of the radius
          colorArray: ["#1A1A1A"], // Custom colors
        }}

        pointer={{
          type: "needle", // Needle type
          color: "#676767", // Needle color
          animate: true, // Enable animation
          width: 17, // Width of the needle
          length: 0.95, // Length of the needle relative to the radius
        }}
        labels={{
          valueLabel: {
            style: {
              whiteSpace: "pre-wrap",
              fontSize: "30px",
            },
            formatTextValue: (value) => `${value}\n${units}`,
          },
          tickLabels: {
            type: "outer",
            hideMinMax: false, // Show min and max labels
            ticks: majorTicks,
            defaultTickLineConfig: {
              hide : true,
            },
            defaultTickValueConfig: {
              style: {
                fill: "#808080",
              }
            }
          },


        }}
      />
    </div>
  );
};

export default Gauge;
