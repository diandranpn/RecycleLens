import dynamic from "next/dynamic";

const LeafletSearch = dynamic(() => import("./leafletSearchClient"), {
  ssr: false,
});

export default LeafletSearch;
