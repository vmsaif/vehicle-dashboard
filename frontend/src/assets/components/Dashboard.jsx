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
import BottomRowButtons from './BottomRowButtons'
import appDrawer from '../images/app_drawer.png'
import chargeIconGray from '../images/charging_gray.png'
import chargeIconGreen from '../images/charging_green.png'

function Dashboard() {
  return (
    <div className="w-auto bg-customDarkGray rounded border-2 border-customBorderFull">
      {/* Top Row: Indicators */}
      <div
        className="grid grid-cols-2 border-2 border-customBorderFull rounded"
        style={{ margin: '-2px' }}
      >
        <Indicators />
      </div>

      {/* Middle Section: Gauges */}
      <div
        className="gap-36 flex justify-center px-40 bg-customGray border-2 border-customBorderFull rounded"
        style={{ margin: '-2px' }}
      >
        {/* Power Gauge */}
        <Gauge
          value={0}
          units="kW"
          majorTicks={[
            '-1000',
            '-750',
            '-500',
            '-250',
            '0',
            '250',
            '500',
            '750',
            '1000',
          ]}
          minValue={-1000}
          maxValue={1000}
        />

        {/* Motor RPM Gauge */}
        <Gauge
          value={400}
          units="RPM"
          majorTicks={[
            '0',
            '100',
            '200',
            '300',
            '400',
            '500',
            '600',
            '700',
            '800',
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
        <InfoTile value={'N/N'} label="" />
        <InfoTile value={'22'} label="%" />
        <InfoTile value={'33'} label="°C" />
        <InfoTile value={'0.0'} label="RPM" />

        <div className="col-span-2 flex flex-col justify-between">
          <Controls className="flex-grow" />
        </div>
      </div>

      {/* Bottom Row Buttons */}
      <div
        className="flex border-2 border-customBorderFull rounded bg-customGray"
        style={{ margin: '-2px' }}
      >
        {/* Left Section: BottomRowButtons */}
        <div className="justify-start border-2 rounded-md border-customGray bg-customDarkGray" style={{ width: '45.25%' }}>
          <BottomRowButtons />
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
          <div className="border-2 rounded-sm border-customGray p-2" >
            <img src={chargeIconGray} alt="charge icon" className="h-16 w-16" />
          </div>

        </div>

      </div>

    </div>
  )
}

export default Dashboard
