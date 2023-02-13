import react, { useState } from 'react';
import "./Control.css";

const Control = ({ bgcallback, realdatacallback, landingscallback, moonquake, bgboolean, landingsboolean, yearcallback }) => {
  const [year, setYear] = useState(1996);

  return (
    <div className='controls'>
      <div className='sidebar'>
        {/* <div className='controlElement'>
          <span>Background: </span>
          <button onClick={bgcallback} className="toggle">{bgboolean? "off" : "on"}</button>
        </div> */}
        <div className='controlElement'>
          <span>Moonquakes: </span>
          <button onClick={realdatacallback} className="toggle">{moonquake ? "hide" : "show"}</button>
        </div>
        <div className='controlElement'>
          <span>Landings: </span>
          <button onClick={landingscallback} className="toggle">{landingsboolean ? "hide" : "show"}</button>
        </div>
      </div>
      <div className='scroll'>
        <div className='year'>{`Year: ${year}`}</div>
        <input min={1969} max={2022} value={year} className='slide' type='range'
          onChange={(e) => {
            setYear(e.target.value);
            yearcallback(e.target.value);
          }}
        />
      </div>
    </div>
  );
}

export default Control;