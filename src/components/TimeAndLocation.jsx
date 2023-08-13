import React from 'react'
import { formatToLocalTime } from '../Services/weatherService'

function TimeAndLocation({weather:{dt,timezone,name,country}}) {


  return (
    <div>
         <div className='flex items-center justify-center my-6'>
            <p className='text-white sm:text-xl font-extralight uppercase'>
              {formatToLocalTime(dt,timezone)}
            </p>
        </div>
        <div className='flex items-center justify-center my-6'>
            <p className='text-white text-3xl font-medium uppercase'>{`${name},${country}`}</p>
        </div>
    </div>
  )
}

export default TimeAndLocation;