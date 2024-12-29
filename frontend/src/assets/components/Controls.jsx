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
import '../../styles/Controls.css'; // Import the CSS file

function Controls() {
  return (
    <div className="rounded flex flex-col items-center justify-center p-4 h-full">
      <h2 className="text-sm font-semibold text-center">MOTOR SPEED SETTINGS</h2>
      <div className="flex items-center mt-4 w-full">
        <input type="range" min="0" max="4" className="custom-range w-full" />
      </div>
      <div className="flex justify-between w-full mt-2 text-xs text-white">
        <span>OFF</span>
        <span className="mx-2">1</span>
        <span className="mx-2">2</span>
        <span className="mx-2">3</span>
        <span className="mx-2">4</span>
      </div>
    </div>
  );
}

export default Controls;
