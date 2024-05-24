import React from 'react'


const CarousellCard = (row) => {
  return (
        <div className='w-[130px] h-[130px] bg-red-600 rounded-lg mx-auto'>
            <div className='w-full h-[70%]'>image</div>
            <div className='w-full h-[30%] bg-slate-600 rounded-b-lg'>title</div> 
        </div>
  )
}

export default CarousellCard