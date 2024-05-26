import React from "react";
import { FaRecycle } from "react-icons/fa";

const ResultModal = ({ show, onClose, children, data }) => {
    console.log(data.class_probs)
  const color =
    data?.predicted_class === "Organic_Waste" || data.predicted_class === "Wood"
      ? "#21744E"
      : "#DB0000";

  if (!show) {
    return null;
  }

  return (
    <div
      className={`bg-[${color}] absolute top-0 bottom-0 w-screen h-screen bg-black/25 z-[950]`}
    >
      <div className="bg-white shadow-[0_-10px_20px_-15px_rgba(0,0,0,0.3)] rounded-lg absolute bottom-0 h-[75vh] w-full">
        <div className="font-bold mx-auto text-black text-3xl text-center m-5">
          {data?.predicted_class}
        </div>
        {data?.predicted_class === "Organic_Waste" || "Wood" ? (
          <div className="flex w-full justify-center flex-col text-xl text-[#DB0000] items-center">
            <div className="flex justify-center items-center">
              <FaRecycle />
              <p className="font-bold m-3"> UNRECYCLEABLE</p>
            </div>
            <p className="text-black text-justify p-5">
              Sampah tersebut merupakan jenis sampah plastik yang tidak dapat
              didaur ulang. Jangan lupa untuk memilah sampah sesuai dengan
              kategorinya dan buang sampah sesuai pada tempatnya, ya!
            </p>
          </div>
        ) : (
          <div className="flex w-full justify-center flex-col text-xl text-[#21744E] items-center">
            <div className="flex justify-center items-center">
              <FaRecycle />
              <p className="font-bold m-3"> RECYCLEABLE</p>
            </div>
            <p className="text-black text-justify p-5">
              Sampah tersebut merupakan jenis sampah plastik yang tidak dapat
              didaur ulang. Jangan lupa untuk memilah sampah sesuai dengan
              kategorinya dan buang sampah sesuai pada tempatnya, ya!
            </p>
          </div>
        )}
        {data?.class_probs && (
          <div className="text-left p-5">
            <p className="font-bold">Details:</p>
            <ul className="list-disc pl-5">
              {data.class_probs.map((row, index) => (
                <li key={index}>
                  <span className="font-bold">{row[0]}:</span>{" "}
                  {parseFloat(row[1]).toFixed(4)}
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* {children} */}
      </div>
    </div>
  );
};

export default ResultModal;
