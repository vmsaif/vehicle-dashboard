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
import '../../styles/Gauge.css';

const Gauge = ({ vehicleId, units, majorTicks, minValue, maxValue }) => {
  let value = minValue;
  const allData = useSupabaseService(vehicleId);

  if (units === "kW") {
    value = allData.gaugeData.power_consumption;
  } else if (units === "RPM") {
    value = allData.gaugeData.wheel_speed;
  }


  let minValueDigitCount = Math.abs(minValue).toString().length;
  let margin_left = 0.22;
  let margin_right = 0.22;

  if (minValueDigitCount < 3) {
    margin_left = 0.205;
    margin_right = 0.205;
  }

  return (
    <div className="gauge-wrapper">
      {/* Add the arc overlay */}
      <div className="gauge-overlay"></div>
      <GaugeComponent
        type="radial"
        value={value} // Value
        minValue={minValue} // Minimum value
        maxValue={maxValue} // Maximum value
        marginInPercent={{
          top: 0.06,
          bottom: -0.04,
          left: margin_left,
          right: margin_right
        }}
        style={{
          width: 250,
          height: 250,
        }}

        arc={{
          cornerRadius: 10, // Smooth corner radius
          padding: 0.0, // Padding between subArcs
          width: 0.0, // Arc width as a percentage of the radius
          colorArray: ["#1A1A1A"], // Custom colors
        }}

        pointer={{
          type: "needle", // Needle type
          color: "#FFFFFF", // Needle color
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
            maxDecimalDigits: 0,
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
                fill: "#D3D3D3",
                fontWeight: "semi-bold",
              },

            }
          },
        }}
      />

    </div>
  );
};

export default Gauge;
