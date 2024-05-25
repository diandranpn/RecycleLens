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
        className={`fixed bottom-0 left-0 px-4 w-full bg-white shadow-lg transform transition-transform duration-300 z-[900] h-[300px] ${
          isSearchVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <input
          type="text"
          className="w-full max-w-md border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 p-3 text-base py-0 my-2 font-bold"
          placeholder="Search..."
          value={query}
          onChange={handleChange}
        />
      </div>
      <FooterMobileView activePage={"maps"} />
    </>
  );
};

export default Search;
