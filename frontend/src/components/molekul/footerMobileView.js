"use client"
import React from 'react'
import { AiTwotoneEnvironment } from "react-icons/ai";
import { AiTwotoneHome } from "react-icons/ai";
import { IoScanOutline } from "react-icons/io5";
import { useRouter } from 'next/navigation';

const FooterMobileView = ({ activePage }) => {
  const router = useRouter();

  const getActiveClass = (page) => {
    return activePage == page ? 'text-black' : 'text-slate-400';
  };

  const navigateTo = (page) => {
    router.push(page);
  };

  return (
    <div className='absolute bottom-0 z-[900] w-full bg-white shadow-[0_-10px_20px_-15px_rgba(0,0,0,0.3)] md:hidden h-[100px] flex justify-around'>
      <div
        className={`mx-3 h-full flex flex-col justify-center items-center ${getActiveClass('home')}`}
        onClick={() => navigateTo('/')}
        style={{ cursor: 'pointer' }}
      >
        <AiTwotoneHome className='text-3xl'/>
        Home
      </div>
      <div className={`mx-3 h-full flex flex-col justify-center items-center `}>
        <div
          className={`relative top-[-30px] flex flex-col justify-center items-center ${getActiveClass('recycleLens')}`}
          onClick={() => navigateTo('/scan')}
          style={{ cursor: 'pointer' }}
        >
          <IoScanOutline className='text-7xl shadow-lg bg-white rounded-xl text-black'/>
          RecycleLens
        </div>
      </div>
      <div
        className={`mx-3 h-full flex flex-col justify-center items-center ${getActiveClass('maps')}`}
        onClick={() => navigateTo('/search')}
        style={{ cursor: 'pointer' }}
      >
        <AiTwotoneEnvironment className='text-3xl'/>
        Maps
      </div>
    </div>
  );
}

export default FooterMobileView;
