/**
 * @file:        ChargeIcon.jsx
 * @project:     vehicle-dashboard
 * @author:      Saif Mahmud
 * @date:        2024-12-30
 * @version:     0.1
 * @contact:     msaifofficial@gmail.com
 *
 * @description: ChargeIcon component for the vehicle dashboard.
 */

import React from 'react';
import chargeIconGray from '../images/charging_gray.png';
import chargeIconGreen from '../images/charging_green.png';
import { useSupabaseService } from '../../hooks/useSupabaseService.js';
import '../../styles/ChargeIcon.css';

function ChargeIcon({ vehicleId }) {
  const indicatorData = useSupabaseService(vehicleId);

  const getChargeIcon = () => {
    return indicatorData.indicators.is_charging ? chargeIconGreen : chargeIconGray;
  }

  const handleIconClick = async () => {
    const newIndicatorStatus = !indicatorData.indicators.is_charging;

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/indicator-status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vehicle_id: parseInt(vehicleId, 10),
          type: 'is_charging',
          indicator: newIndicatorStatus,
        }),
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
      } else {
        throw new Error('Failed to update indicator status');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="charge-icon-button" onClick={handleIconClick}>
      <img src={getChargeIcon()} alt="charge icon" className="h-16 w-16" />
    </div>
  );
}

export default ChargeIcon;