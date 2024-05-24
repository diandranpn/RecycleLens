import Navbar from "@/components/molekul/navbar";
import Logo from "../../public/bg-main.svg";
import Image from "next/image";
import Carousell from "@/components/molekul/carousell";

export default function Home() {
  return (
    <main className="width-[100vw] min-h-screen overflow-hidden">
      <Navbar />
      <div className="md:mt-[15vh] mt-3 md:mx-[10vw] mx-5 md:w-[30%] max-w-[400px]">
        <div className="text-white md:text-2xl text-base drop-shadow-lg">
          An AI - based waste classification tool, ready to assist your
          sustainable journey!
        </div>
        <button className="font-bold text-primary w-full mt-5 bg-white rounded-xl p-1 shadow-lg hidden md:flex justify-center items-center">
          {" "}
          Scan and Classify{" "}
        </button>
        <button className="font-bold text-primary w-[40vw] mt-5 bg-white rounded-xl p-1 shadow-lg md:hidden">
          {" "}
          Scan now{" "}
        </button>
        <div className="absolute top-0 left-0 z-[-1] w-full md:h-full h-[40vh] overflow-x-hidden">
          <Image
            src={Logo}
            layout="fill"
            objectFit="cover"
            alt="Logo"
            className="md:min-w-[100vw] min-w-[400px]"
          />{" "}
        </div>
      </div>
      <div className="w-full flex justify-end">
        <div className="my-11 w-[430px] md:w-[580px] md:relative md:right-0 mx-auto md:mr-0">
          <Carousell />
        </div>
      </div>
    </main>
  );
}
