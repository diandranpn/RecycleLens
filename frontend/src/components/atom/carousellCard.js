import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Import Link from next for client-side navigation

const CarousellCard = (row) => {
  const imageDataUrl = `data:image/jpeg;base64,${row?.row?.image}`;
  
  return (
    <Link href={`/article/${row.row._id}`}>
        <div className='w-[130px] h-[130px] bg-white rounded-lg mx-auto'>
          <Image src={imageDataUrl} alt={row?.row?.title} width={100} height={100} className="w-full h-[70%] rounded-t-lg" />
          <p className='w-full h-[30%] text-xs font-bold rounded-b-lg line-clamp-1 p-5'>{row?.row?.title}</p> 
        </div>
    </Link>
  );
}

export default CarousellCard;
