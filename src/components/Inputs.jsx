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
    <div className='flex flex-row justify-center my-6'>
      <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
        <input
        value={city}
        onChange={(e)=>{setCity(e.currentTarget.value)}}
          placeholder="......Search"
          type="text"
          className='text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase'
        />
        <UilSearchAlt size={25} className='text-white cursor-pointer transition ease-out hover:scale-150' onClick={handleSearchClick}/>
        <UilLocationPoint size={25} className='text-white cursor-pointer transition ease-out hover:scale-150'
        onClick={handleLocationClick} />
      </div>
      <div className='flex flex-row w-1/4 items-center justify-center space-x-1'>
        <button className='text-white space-x-1 text-xl hover:scale-125 transition ease-out' name="metric"onClick={handleUnitsChange}>°C</button>
        <p className='text-white space-x-1 text-xl'>|</p>
        <button className='text-white space-x-1 text-xl hover:scale-125 transition ease-out' name="imperial"onClick={handleUnitsChange}>°F</button>
      </div>
    </div>
  );
}

export default Inputs;
