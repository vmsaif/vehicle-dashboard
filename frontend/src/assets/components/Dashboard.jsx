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

import React from 'react'
import Indicators from './Indicators'
import Gauge from './Gauge'
import Controls from './Controls'
import InfoTile from './InfoTile'
import ChargeIcon from './ChargeIcon'
import BottomRowButtons from './BottomRowButtons'
import appDrawer from '../images/app_drawer.png'


function Dashboard() {
  // Vehicle ID the dashboard belongs to.
  const vehicleId = 1;

  return (
    <div className="w-auto bg-customDarkGray rounded border-2 border-customBorderFull">
      {/* Top Row: Indicators */}
      <div
        className="grid grid-cols-2 border-2 border-customBorderFull rounded"
        style={{ margin: '-2px' }}
      >
        <Indicators vehicleId={vehicleId}/>
      </div>

      {/* Middle Section: Gauges */}
      <div
        className="gap-36 flex justify-center px-40 py-4 bg-customGray border-2 border-customBorderFull rounded"
        style={{ margin: '-2px' }}
      >
        {/* Power Gauge */}
        <Gauge
          vehicleId={vehicleId}
          units="kW"
          majorTicks={[
            {value : '-1000'},
            {value : '-750'},
            {value : '-500'},
            {value : '-250'},
            {value : '0'},
            {value : '250'},
            {value : '500'},
            {value : '750'},
            {value : '1000'},
          ]}
          minValue={-1000}
          maxValue={1000}
        />

        {/* Motor RPM Gauge */}
        <Gauge
          vehicleId={vehicleId}
          value={400}
          units="RPM"
          majorTicks={[
            {value : '0'},
            {value : '100'},
            {value : '200'},
            {value : '300'},
            {value : '400'},
            {value : '500'},
            {value : '600'},
            {value : '700'},
            {value : '800'},
          ]}
          minValue={0}
          maxValue={800}
        />
      </div>

      {/* Info */}
      <div
        className="grid grid-cols-6 border-2 border-customBorderFull rounded"
        style={{ margin: '-2px', height: '100%' }}
      >
        <InfoTile vehicleId={vehicleId} label="" />
        <InfoTile vehicleId={vehicleId} label="%" />
        <InfoTile vehicleId={vehicleId} label="°C" />
        <InfoTile vehicleId={vehicleId} label="RPM" />

        <div className="col-span-2 flex flex-col justify-between">
          <Controls vehicleId = {vehicleId} className="flex-grow" />
        </div>
      </div>

      {/* Bottom Row Buttons */}
      <div
        className="flex border-2 border-customBorderFull rounded bg-customGray"
        style={{ margin: '-2px' }}
      >
        {/* Left Section: BottomRowButtons */}
        <div className="justify-start border-2 rounded-md border-customGray bg-customDarkGray" style={{ width: '45.25%' }}>
          <BottomRowButtons vehicleId={vehicleId} />
        </div>

        {/* App Drawer */}
        <div
          className="flex justify-center items-center border-2 border-customBorderDark rounded-lg"
          style={{ width: '9.5%', margin: '2px 0' }}
        >
          <img src={appDrawer} alt="app drawer" className="h-16 w-16" />
        </div>

        {/* Charge Icon */}

        <div className="flex justify-end border-2 rounded-md border-customGray bg-customDarkGray" style={{ width: '45.25%' }} >
          <ChargeIcon vehicleId = {vehicleId} />
        </div>

      </div>

    </div>
  )
}

export default Dashboard
