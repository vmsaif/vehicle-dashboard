/**
 * @file:        Controls.jsx
 * @project:     vehicle-dashboard
 * @author:      Saif Mahmud
 * @date:        2024-12-26
 * @version:     0.1
 * @contact:     msaifofficial@gmail.com
 *
 * @description: description here
 */


import React from "react";

function Controls() {
  return (
    <div className="bg-gray-800 p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-4 text-center">Motor Speed Setting</h2>
      <div className="flex items-center justify-between">
        <span>OFF</span>
        <input type="range" min="0" max="4" className="w-full mx-4" />
        <span>4</span>
      </div>
      <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
        Start Charging
      </button>
    </div>
  );
}

export default Controls;
