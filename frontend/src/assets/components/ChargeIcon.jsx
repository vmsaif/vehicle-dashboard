
import React from 'react';
import chargeIconGray from '../images/charging_gray.png';
import chargeIconGreen from '../images/charging_green.png';
import { useIndicators } from '../../hooks/useIndicators.js';

function ChargeIcon({ vehicleId }) {

  const indicators = useIndicators(vehicleId);

  const getChargeIcon = () => {
    return indicators.is_charging ? chargeIconGreen : chargeIconGray;
  }

  return (
    <div className="border-2 rounded-sm border-customGray p-2" >
      <img src={getChargeIcon()} alt="charge icon" className="h-16 w-16" />
    </div>
  );
}

export default ChargeIcon;