/**
 * @file:        Dashboard.jsx
 * @project:     vehicle-dashboard
 * @author:      Saif Mahmud
 * @date:        2024-12-26
 * @version:     0.1
 * @contact:     msaifofficial@gmail.com
 *
 * @description: Dashboard component for the vehicle dashboard.
 */


import React from "react";
import Indicators from "./Indicators";
import Gauge from "./Gauge";
import Controls from "./Controls";
import InfoTile from "./InfoTile";

function Dashboard() {
  return (
    <div className="w-auto bg-customDarkGray rounded border-2 border-customBorderFull">
      { /* Top Row: Indicators */}
      <div className="grid grid-cols-2 border-2 border-customBorderFull rounded" style={{ margin: "-2px" }}>
        <Indicators />
      </div>


      {/* Middle Section: Gauges */}
      <div className="gap-24 flex justify-center px-20 bg-customGray border-2 border-customBorderFull rounded" style={{ margin: "-2px" }}>

        {/* Power Gauge */}
        <Gauge
          value={0}
          units="kW"
          majorTicks={['-1000', '-750', '-500', '-250', '0', '250', '500', '750', '1000']}
          minValue={-1000}
          maxValue={1000}
        />

        {/* Motor RPM Gauge */}
        <Gauge
          value={400}
          units="RPM"
          majorTicks={['0', '100', '200', '300', '400', '500', '600', '700', '800']}
          minValue={0}
          maxValue={800}
        />

      </div>

      {/* Info */}
      <div className="grid grid-cols-6 border-2 border-customBorderFull rounded" style={{ margin: "-2px", height: "100%" }}>
        <InfoTile value={"N/N"} label="" />
        <InfoTile value={"22"} label="%" />
        <InfoTile value={"33"} label="°C" />
        <InfoTile value={"0.0"} label="RPM" />

        <div className="col-span-2 flex flex-col justify-between">
          <Controls className="flex-grow" />
        </div>


      </div>
    </div>
  );
}

export default Dashboard;

