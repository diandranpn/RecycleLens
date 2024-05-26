// Search.js
"use client";
import React, { useState, useEffect, useRef } from "react";
import FooterMobileView from "@/components/molekul/footerMobileView";
import LeafletSearch from "@/components/molekul/leafletSearchPage";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const Search = () => {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [keyWord, setKeyword] = useState("");
  const [landfills, setLandfills] = useState([]);
  const [mapPosition, setMapPosition] = useState(null); 
  const searchBarRef = useRef(null);
  
  const toggleSearchBar = () => {
    setSearchVisible(!isSearchVisible);
  };

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleClickOutside = (event) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
      setSearchVisible(false);
    }
  };

  const handleLandfillClick = (landfill) => {
    setMapPosition(landfill); // Update map position
    setSearchVisible(false); // Hide the search bar when an item is clicked
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (keyWord === "") {
      setLandfills([]);
      return;
    } else {
      const getData = setTimeout(() => {
        axios
          .get(
            process.env.NEXT_PUBLIC_BACKEND_URL + "/landfill/findByName?name=" + keyWord
          )
          .then((response) => {
            setLandfills(response.data);
          })
          .catch((err) => {
            console.error("Error fetching landfill list:", err);
          });
      }, 1000);

      return () => clearTimeout(getData);
    }
  }, [keyWord]);

  return (
    <>
      <LeafletSearch setPosition={mapPosition} /> {/* Pass setPosition prop */}
      <button
        onClick={toggleSearchBar}
        className="fixed bottom-[100px] p-2 bg-slate-400/40 hover:bg-slate-400 rounded-lg text-xl text-black z-[900] m-5"
      >
        <FaSearch />
      </button>
      <div
        ref={searchBarRef}
        className={`fixed bottom-[100px] left-0 px-4 w-full bg-white shadow-lg transform transition-transform duration-300 z-[900] h-[350px] rounded-t-xl ${
          isSearchVisible ? "translate-y-0" : "translate-y-full"
        } flex flex-col`}
      >
        <div className="text-3xl font-bold m-3">Find Nearby Landfill</div>
        <p className="text-xs m-2">
          Type your current location and we will find nearby landfill around
          you!
        </p>
        <div className="flex w-full mb-2">
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
            className="w-full max-w-md border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 p-5 text-xl py-0 my-2"
            placeholder="Search..."
            value={keyWord}
            onChange={handleChange}
          />
        </div>
        <div className="overflow-y-scroll flex-grow">
          {landfills.map((landfill, index) => (
            <div
              key={index}
              className="p-2 border-b border-gray-300"
              onClick={() => handleLandfillClick(landfill)}
            >
              <h2 className="font-bold text-lg">{landfill.name}</h2>
              <p className="text-sm">{landfill.description}</p>
            </div>
          ))}
        </div>
      </div>
      <FooterMobileView activePage={"maps"} />
    </>
  );
};

export default Search;
