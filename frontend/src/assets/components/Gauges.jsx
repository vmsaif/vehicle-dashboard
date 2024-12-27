/**
 * @file:        Gauges.jsx
 * @project:     vehicle-dashboard
 * @author:      Saif Mahmud
 * @date:        2024-12-26
 * @version:     0.1
 * @contact:     msaifofficial@gmail.com
 *
 * @description: description here
 */

import React from "react";
import { RadialGauge } from "react-canvas-gauges";

function Gauges() {
  return (
    <div className="flex justify-around">
      <div>
        <RadialGauge
          units="kW"
          value={0}
          minValue={-1000}
          maxValue={1000}
          majorTicks={["-1000", "-500", "0", "500", "1000"]}
          highlights={[
            { from: -1000, to: 0, color: "rgba(200, 50, 50, .75)" },
            { from: 0, to: 1000, color: "rgba(50, 200, 50, .75)" },
          ]}
          width={200}
          height={200}
        />
      </div>
      <div>
        <RadialGauge
          units="RPM"
          value={0}
          minValue={0}
          maxValue={800}
          majorTicks={["0", "100", "200", "300", "400", "500", "600", "700", "800"]}
          highlights={[
            { from: 600, to: 800, color: "rgba(200, 50, 50, .75)" },
          ]}
          width={200}
          height={200}
        />
      </div>
    </div>
  );
}

export default Gauges;