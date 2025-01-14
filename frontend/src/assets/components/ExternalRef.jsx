/**
 * @file:        ExternalRef.jsx
 * @project:     vehicle-dashboard
 * @author:      Saif Mahmud
 * @date:        2025-01-13
 * @version:     0.1
 * @contact:     msaifofficial@gmail.com
 *
 * @description: External reference links like github, portfolio website etc.
 */

import React from 'react';
import { FaGithub, FaGlobe, FaTerminal } from 'react-icons/fa';

function ExternalRef() {
  let textColors = "text-white hover:text-gray-300 text-lg" ;
  return (
    <div>
      <div className="absolute top-0 right-0 m-4">
        <div className="flex justify-center gap-4">
          <a href="https://github.com/vmsaif/vehicle-dashboard" target="_blank" rel="noopener noreferrer" className={`${textColors} flex items-center gap-2`}>
            <FaGithub />
            GitHub Repository
          </a>
          <a href="https://saifmahmud.dev" target="_blank" rel="noopener noreferrer" className={`${textColors} flex items-center gap-2`}>
            <FaGlobe />
            Portfolio Website
          </a>
        </div>
      </div>
      {/* top left corner div */}
      <div className="absolute top-0 left-2 m-4">
        <a href="https://vehicle-dashboard.mahmudsaif-aws.us/" target="_blank" rel="noopener noreferrer" className={`${textColors} flex items-center gap-2`}>
          <FaTerminal />
          Backend Terminal
        </a>
      </div>
    </div>
  );
}

export default ExternalRef;