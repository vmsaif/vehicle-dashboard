/**
 * @file:        Instructions.jsx
 * @project:     vehicle-dashboard
 * @version:     0.1
 * @contact:     msaifofficial@gmail.com
 *
 * @description: Instructions for using the vehicle dashboard.
 */

import React from 'react';
import '../../styles/Instructions.css'; // Ensure you have a CSS file for styling

function Instructions() {
  const command = `
curl -X POST https://vehicle-dashboard.mahmudsaif-aws.us/api/indicator-status \\
  -H "Content-Type: application/json" \\
  -d '{
    "vehicle_id": 1,
    "type": "check_engine",
    "indicator": false
  }'
  `;

  return (
    <div className="instructions-container">
      <h2>Instructions</h2>
      <p>To turn off the Engine Light, use the following command in your terminal:</p>
      <div className="command-box">
        <pre>
          <code>{command}</code>
        </pre>
      </div>
    </div>
  );
}

export default Instructions;


