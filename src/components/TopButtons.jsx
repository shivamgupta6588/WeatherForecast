import React from 'react'

function TopButtons({setQuery}) {

    const cities=[
        {
            id:1,
            title:"Delhi",
        },
        {
            id:2,
            title:"Mumbai",
        },
        {
            id:3,
            title:"Shimla",
        },
        {
            id:4,
            title:"Dehradun",
        }
    ]


  return (
    <div className=' flex items-center justify-around my-6'>
         {cities.map((city)=>(
            <button className='text-white text-lg font-medium mx-' key={city.id} 
            onClick={()=>{setQuery({q:city.title})}}>{city.title}</button>
         ))}
    </div>
  )
}

export default TopButtons