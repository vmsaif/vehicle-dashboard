/**
 * @file:        Controls.jsx
 * @project:     vehicle-dashboard
 * @author:      Saif Mahmud
 * @date:        2024-12-26
 * @version:     0.1
 * @contact:     msaifofficial@gmail.com
 *
 * @description: Controls component for the vehicle dashboard.
 */


import React from "react";

function Controls() {
  return (
    <div className="bg-gray-800 rounded flex flex-col items-center justify-center p-4">
      <h2 className="text-sm font-semibold text-center">MOTOR SPEED SETTINGS</h2>
      <div className="flex items-center mt-4">
        <span>OFF</span>
        <input type="range" min="0" max="4" className="w-full mx-2" />
        <span>4</span>
      </div>
    </div>
  );
}

export default Controls;
