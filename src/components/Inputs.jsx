import React, { useState } from 'react';
import { UilLocationPoint, UilSearchAlt } from '@iconscout/react-unicons';

function Inputs({setQuery,units,setUnits}) {

const [city, setCity] = useState('');


const handleSearchClick=()=>{
  if(city!=='') setQuery({q:city})
}

const handleLocationClick=()=>{
  if(navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition((position)=>{
        let lat=position.coords.latitude;
        let lon=position.coords.longitude;

        setQuery({
          lat,
          lon
        });
      })
    }
}

const handleUnitsChange=(e)=>{
  const SelectedUnit=e.currentTarget.name;
  if(units!==SelectedUnit) setUnits(SelectedUnit);
}

  return (
    <div className='flex flex-row justify-center my-6 flex max-sm:flex-col max-sm:my-1'>
      <div className='flex flex-row max-sm:flex-col  sm:w-3/4 items-center justify-center max-sm:space-y-2 sm:space-x-4'>
        <input
        value={city}
          onChange={(e)=>{setCity(e.currentTarget.value)}}
          placeholder="...city"
          type="text"
          className='sm:text-xl rounded-lg font-light max-sm:p-1  sm:p-2  shadow-xl focus:outline-none capitalize placeholder:lowercase placeholder-gray-400'
        />
        <UilSearchAlt size={25} className='text-white cursor-pointer transition ease-out hover:scale-150' onClick={handleSearchClick}/>
        <UilLocationPoint size={25} className='text-white cursor-pointer transition ease-out hover:scale-150'
        onClick={handleLocationClick} />
      </div>
      <div className='flex flex-row sm:w-1/4 items-center max-sm:space-x-10 justify-center space-x-3'>
        <button className='text-white space-x-1 text-xl hover:scale-125 transition ease-out' name="metric"onClick={handleUnitsChange}>°C</button>
        <p className='text-white space-x-1 max-sm:hidden  text-xl'>|</p>
        <button className='text-white space-x-1 text-xl hover:scale-125 transition ease-out' name="imperial"onClick={handleUnitsChange}>°F</button>
      </div>
    </div>
  );
}

export default Inputs;
