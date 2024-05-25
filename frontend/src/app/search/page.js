"use client";
import React, { useState, useEffect, useRef } from "react";
import FooterMobileView from "@/components/molekul/footerMobileView";
import LeafletSearch from "@/components/molekul/leafletSearchPage";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [query, setQuery] = useState("");
  const searchBarRef = useRef(null);

  const toggleSearchBar = () => {
    setSearchVisible(!isSearchVisible);
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleClickOutside = (event) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
      setSearchVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <LeafletSearch />
      <button
        onClick={toggleSearchBar}
        className="fixed bottom-[100px] p-2 bg-slate-400/40 hover:bg-slate-400 rounded-lg text-xl text-black z-[900] m-5"
      >
        <FaSearch />
      </button>
      <div
        ref={searchBarRef}
        className={`fixed bottom-0 left-0 px-4 w-full bg-white shadow-lg transform transition-transform duration-300 z-[900] h-[350px] rounded-t-xl ${
          isSearchVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="text-3xl font-bold m-3">Find Nearby Landfill</div>
        <p className="text-xs m-2">
          Type your current location and we will find nearby landfill around
          you!
        </p>
        <div className="flex w-full">
          <div>
          <img
            src={"./marker.svg"}
            layout="fill"
            objectFit="cover"
            alt="Logo"
            className="max-w-[40px] max-h-[40px] relative"
          />
          </div>
          <input
            type="text"
            className="w-full max-w-md border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 p-5 text-xl py-0 my-2 font-bold"
            placeholder="Search..."
            value={query}
            onChange={handleChange}
          />
        </div>
        <button className="rounded-full p-3 bg-primary text-white font-bold my-3 w-full">
          Search
        </button>
      </div>
      <FooterMobileView activePage={"maps"} />
    </>
  );
};

export default Search;
