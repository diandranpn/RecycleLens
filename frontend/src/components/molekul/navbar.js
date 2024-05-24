"use client";
import { useState } from "react";
import { LuCodesandbox } from "react-icons/lu";

const Navbar = () => {
  const [query, setQuery] = useState(null);

  const handleChange = () => {};
  return (
    <div className="md:flex justify-around w-screen">
      <div className="p-5 text-2xl md:text-xl flex items-center">
        <LuCodesandbox className="text-3xl" />
        <div className="m-2 text-secondary">RecycleLens</div>
      </div>
      <div className="p-5 text-xl hidden md:flex">
        <input
          type="text"
          className="w-full max-w-md px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mx-5 text-base py-0 my-2 font-bold"
          placeholder="Search..."
          value={query}
          onChange={handleChange}
        />
        <div className="flex items-center text-white">
          <div className="mx-3">About</div>
          <div className="mx-3">Maps</div>
          <div className="mx-3">Scan</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
