/**
 * @file:        Dashboard.jsx
 * @project:     vehicle-dashboard
 * @author:      Saif Mahmud
 * @date:        2024-12-26
 * @version:     0.1
 * @contact:     msaifofficial@gmail.com
 *
 * @description:
 */


import React from "react";
import Indicators from "./Indicators";
import Gauges from "./Gauges";
import Controls from "./Controls";

function Dashboard() {
  return (
    <div className="dashboard-container min-h-max bg-gray-900 text-white border-2 border-gray-500">
      {/* Top Row: Indicators */}
      <div className="grid grid-cols-2 mb-2 ">
        <Indicators />
      </div>

      {/* Middle Section: Gauges */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <Gauges />
      </div>

      {/* Bottom Section: Info and Controls */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 grid grid-cols-5 gap-4 bg-gray-800 p-4 rounded shadow" style={{ border: "2px solid yellow" }}>
          {/* Info Cards */}
          <div className="flex flex-col items-center" style={{ border: "2px solid yellow" }}>
            <div className="text-xl font-bold">N/N</div>
            <div className="text-sm text-gray-400">Gear Ratio</div>
          </div>
          <div className="flex flex-col items-center" style={{ border: "2px solid yellow" }}>
            <div className="text-xl font-bold">22%</div>
            <div className="text-sm text-gray-400">Battery %</div>
          </div>
          <div className="flex flex-col items-center" style={{ border: "2px solid yellow" }}>
            <div className="text-xl font-bold">33°C</div>
            <div className="text-sm text-gray-400">Battery Temp</div>
          </div>
          <div className="flex flex-col items-center" style={{ border: "2px solid yellow" }}>
            <div className="text-xl font-bold">0 RPM</div>
            <div className="text-sm text-gray-400">Motor RPM</div>
          </div>
        </div>

        <Controls />
      </div>

    </div>
  );
}

export default Dashboard;