import dynamic from "next/dynamic";

const Leaflet = dynamic(() => import("./leafletClient"), {
  ssr: false,
});

export default Leaflet;
