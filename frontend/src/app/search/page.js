import FooterMobileView from "@/components/molekul/footerMobileView";
import LeafletSearch from "@/components/molekul/leafletSearchPage";
import React from "react";

const Search = () => {
  return(
    <>
    <LeafletSearch />;
    <FooterMobileView activePage={"maps"}/>
    </>
  ) 
};

export default Search;
